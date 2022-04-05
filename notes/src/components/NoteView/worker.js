import { marked } from "marked";
import * as Comlink from "comlink";

console.log("The worker is starting...");

const processData = (data) => marked(data);

Comlink.expose({
  processData,
});
