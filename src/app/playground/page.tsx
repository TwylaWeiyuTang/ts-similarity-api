import GeneratingSmilarity from "@/components/GeneratingSmilarity";
import Icons from "@/components/Icons";
import CustomizedSnackbars from "@/components/ui/Alert";
import Alert from "@/components/ui/Alert";
import Button, { buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Similarity API | Playground",
  description: "Free & open-source text similarity API",
};

const page = async ({}) => {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  const apiKeys = await db.apiKey.findMany({
    where: {
      userId: user.user.id,
    },
  });

  const activeApiKey = apiKeys.find((apiKey) => apiKey.enabled);

  if (!activeApiKey)
    return (
      <section className="relative container h-[90vh] max-w-7xl mx-auto text-center flex flex-col gap-6 items-center justify-center z-10">
        <LargeHeading>API key not found</LargeHeading>
        <Paragraph>
          To access this feature, please request a free API key first
        </Paragraph>
        <Paragraph>
          If you have an active API key, please try refreshing the page!
        </Paragraph>
        <Link
          className={buttonVariants({
            variant: "ghost",
            className: "w-fit",
          })}
          href="/dashboard"
        >
          <Icons.ChevronLeft className="mr-2 h-4 w-4" />
          Get a free API key
        </Link>
      </section>
    );
  return (
    <div className="relative container flex flex-col gap-6 max-w-7xl mx-auto mt-16 z-10 pb-10">
      <LargeHeading>Welcome back, {user.user.name}</LargeHeading>
      <CustomizedSnackbars />
      <Paragraph className="text-left">
        Please provide two pieces of texts to generate the similarity score
      </Paragraph>
      <GeneratingSmilarity activeApiKey={activeApiKey} />
    </div>
  );
};

export default page;
