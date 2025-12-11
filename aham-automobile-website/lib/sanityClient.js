import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: "0v9orvow",
  dataset: "autos",
  apiVersion: "2023-10-01",
  useCdn: true,
});
