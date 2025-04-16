import DocFont from "@/util/DocFont.ts";
import ttf from "./DOS437Unicode/DOS437Unicode.ttf";
import woff from "./DOS437Unicode/DOS437Unicode.woff";
import woff2 from "./DOS437Unicode/DOS437Unicode.woff2";

const dos437Unicode = new DocFont("DOS437Unicode", { ttf, woff, woff2 });
export default dos437Unicode;
