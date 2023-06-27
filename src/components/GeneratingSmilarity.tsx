"use client";
import { FC, useState } from "react";
import Button from "./ui/Button";
import { ApiKey } from "@prisma/client";
import { toast } from "./ui/Toast";
import Paragraph from "./ui/Paragraph";

type GeneratingSimilarityProps = {
  activeApiKey: ApiKey;
};

type functionProps = {
  auth: string;
};

const GeneratingSmilarity = ({ activeApiKey }: GeneratingSimilarityProps) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [text1, setText1] = useState<string>("");
  const [text2, setText2] = useState<string>("");
  const [score, setScore] = useState<string>();

  let urlencoded = new URLSearchParams();
  urlencoded.append("text1", text1);
  urlencoded.append("text2", text2);

  async function createSimilarity({ auth }: functionProps) {
    setScore(undefined);
    setIsGenerating(true);
    const res = await fetch("/api/v1/similarity", {
      method: "POST",
      body: urlencoded,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: auth,
      },
    })
      .then((res) => res.json())
      .then((resData) => resData.similarity);

    setIsGenerating(false);

    if (res) {
      setScore((res * 100).toFixed(4));
      toast({
        title: "Similarity score generated",
        message: "Successfully generated similarity score",
        type: "success",
      });
    }
    return res;
  }
  //   const simRes = await createSimilarity({ data, auth: activeApiKey.key });

  //   const handleResponse = () => {
  //     console.log(simRes);
  //   };

  return (
    <div>
      <div className="flex flex-col items-start mb-6">
        <span className="whitespace-nowrap font-bold mb-2 dark:text-slate-200">
          Text 1
        </span>
        <textarea
          className="flex w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 mb-2 text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
          rows={5}
          value={text1}
          onChange={(e) => setText1(e.target.value)}
        />
        <div className="flex flex-row">
          <span
            className={`font-bold ${
              text1.length > 1000
                ? "text-red-700 dark:text-red-400"
                : "text-black dark:text-white"
            }`}
          >
            {text1.length} &nbsp;
          </span>
          <span className="font-bold dark:text-slate-200"> / 1000</span>
        </div>
      </div>
      <div className="flex flex-col items-start mb-6">
        <span className="whitespace-nowrap font-bold mb-2 dark:text-slate-200">
          Text 2
        </span>
        <textarea
          className="flex w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 mb-2 text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
          rows={5}
          value={text2}
          onChange={(e) => setText2(e.target.value)}
        />
        <div className="flex flex-row">
          <span
            className={`font-bold ${
              text2.length > 1000
                ? "text-red-700 dark:text-red-400"
                : "text-black dark:text-white"
            }`}
          >
            {text2.length} &nbsp;
          </span>
          <span className="font-bold dark:text-slate-200"> / 1000</span>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <Button
          disabled={!activeApiKey}
          isLoading={isGenerating}
          onClick={async () =>
            await createSimilarity({ auth: activeApiKey.key })
          }
          size={"lg"}
          className="text-md"
        >
          Generate Similarity
        </Button>
      </div>

      {score && (
        <div className="flex flex-row items-center justify-center pb-6">
          <Paragraph className="max-w-full mt-10 text-left lg:text-center">
            The similarity between these two texts is: &nbsp;
          </Paragraph>
          <Paragraph className="mt-10 font-bold" size={"lg"}>
            {score}
          </Paragraph>
        </div>
      )}
    </div>
  );
};

export default GeneratingSmilarity;
