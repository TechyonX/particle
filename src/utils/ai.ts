import { Configuration, OpenAIApi } from "openai";

export async function generateEmbeddings(text: string) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openAi = new OpenAIApi(configuration);

  const input = text.replace(/\n/g, " ");

  const embeddingResponse = await openAi.createEmbedding({
    model: "text-embedding-ada-002",
    input,
  });

  const [{ embedding }] = embeddingResponse.data.data;

  return embedding;
}
