import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const builder = client
  ? createImageUrlBuilder(client)
  : createImageUrlBuilder({ projectId: "placeholder", dataset: "production" });

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
