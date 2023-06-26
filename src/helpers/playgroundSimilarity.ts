import { ApiKey } from "@prisma/client";

type functionProps = {
  data: string[];
  auth: string;
};

export async function createSimilarity({ data, auth }: functionProps) {
  const res = await fetch("/api/v1/similarity", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      authorization: auth,
    },
  });

  // if (data.error || !data.createdApiKey) {
  //   // if the error message is in an array format,
  //   // we return it by join everthing together as one string
  //   if (data.error instanceof Array) {
  //     throw new Error(data.error.join(" "));
  //   }

  //   throw new Error(data.error ?? "Something went wrong");
  // }

  return res.json;
}
