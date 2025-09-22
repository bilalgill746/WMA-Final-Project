import DataUriParser from "datauri/parser.js";
import { get } from "http";
import path from "path";

const parser = new DataUriParser();

export default async function getDataUri(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}
