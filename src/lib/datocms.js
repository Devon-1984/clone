import { executeQuery as libExecuteQuery } from "@datocms/cda-client";
import { DATOCMS_CDA_TOKEN } from "astro:env/server";

export async function executeQuery(query, options) {
  return await libExecuteQuery(query, {
    ...options,
    token: DATOCMS_CDA_TOKEN,
  });
}
