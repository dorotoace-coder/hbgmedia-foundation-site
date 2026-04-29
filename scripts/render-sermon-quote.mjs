import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const propsPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, "examples", "sermon-quote-brief.json");
const outputPath = process.argv[3]
  ? path.resolve(process.argv[3])
  : path.join(root, "renders", "hbg-sermon-quote-reel.mp4");

if (!fs.existsSync(propsPath)) {
  throw new Error(`Data brief not found: ${propsPath}`);
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const inputProps = JSON.parse(fs.readFileSync(propsPath, "utf8"));
const entryPoint = path.join(root, "remotion", "index.ts");

console.log("Bundling Remotion project...");
const serveUrl = await bundle({
  entryPoint,
  webpackOverride: (config) => config
});

console.log("Selecting composition...");
const composition = await selectComposition({
  serveUrl,
  id: "SermonQuoteReel",
  inputProps
});

console.log(`Rendering MP4 to ${outputPath}...`);
await renderMedia({
  composition,
  serveUrl,
  codec: "h264",
  outputLocation: outputPath,
  inputProps,
  chromiumOptions: {
    disableWebSecurity: true
  }
});

console.log(`Done: ${outputPath}`);
