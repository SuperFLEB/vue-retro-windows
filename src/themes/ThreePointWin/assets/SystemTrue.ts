import DocFont from "@int/util/DocFont.ts";
import ttf from "./SystemTrue/SystemTrue.ttf";
import woff from "./SystemTrue/SystemTrue.woff";
import woff2 from "./SystemTrue/SystemTrue.woff2";

const systemTrue = new DocFont("System True", { ttf, woff, woff2 });
export default systemTrue;
