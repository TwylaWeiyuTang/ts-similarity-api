import { CreateApiData } from "@/types/api";

export async function createApiKey() {
  const res = await fetch("/api/api-key/create");
  const data = (await res.json()) as CreateApiData;

  if (data.error || !data.createdApiKey) {
    // if the error message is in an array format,
    // we return it by join everthing together as one string
    if (data.error instanceof Array) {
      throw new Error(data.error.join(" "));
    }

    throw new Error(data.error ?? "Something went wrong");
  }

  return data.createdApiKey.key;
}
