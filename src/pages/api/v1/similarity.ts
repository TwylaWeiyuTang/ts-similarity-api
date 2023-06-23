import { cosineSimilarity } from "@/helpers/cosine-similarity";
import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { openai } from "@/lib/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

// the below schema force user to pass in the exact required value
// no other value like text3 can be passed in
const reqSchema = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as unknown;

  const apiKey = req.headers.authorization;
  if (!apiKey) {
    return res.status(401).json({ error: "Unauthorised" });
  }

  // // check if the passed in body value from request meets the criteria of reqSchema
  // const parsed = reqSchema.safeParse(body)

  // if (!parsed.success) {
  //     return res.status(400).json({error: 'Bad Request'})
  // }

  try {
    // check if the passed in body value from request meets the criteria of reqSchema
    // if it does, then get the text1 and text2 value from it
    const { text1, text2 } = reqSchema.parse(body);

    const validApiKey = await db.apiKey.findFirst({
      where: {
        key: apiKey,
        enabled: true,
      },
    });

    if (!validApiKey) {
      return res.status(401).json({ error: "Unauthorised" });
    }

    const start = new Date();

    // Promise.all() allows us to make multiple requests simultaneously
    const embeddings = await Promise.all(
      [text1, text2].map(async (text) => {
        const res = await openai.createEmbedding({
          model: "text-embedding-ada-002",
          input: text,
        });

        // translating our texts into vector values
        return res.data.data[0].embedding;
      })
    );

    const similarity = cosineSimilarity(embeddings[0], embeddings[1]);

    // get how long it takes to generate similarity score between two texts
    const duration = new Date().getTime() - start.getTime();

    // persit request
    await db.apiRequest.create({
      data: {
        duration,
        method: req.method as string,
        path: req.url as string,
        status: 200,
        apiKeyId: validApiKey.id,
        usedApiKey: validApiKey.key,
      },
    });

    return res.status(200).json({ success: true, text1, text2, similarity });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default withMethods(["POST"], handler);
