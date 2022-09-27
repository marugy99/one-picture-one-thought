import { createClient } from "next-sanity";

export default createClient({
  projectId: "zmwej6fq",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false,
});
