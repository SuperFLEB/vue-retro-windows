"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.id = void 0;
var SampleImage_vue_1 = require("./SampleImage.vue");
var LauncherIconWith_1 = require("@/components/Launcher/LauncherIconWith");
var imgview_png_1 = require("@/assets/icons/imgview.png");
exports.id = Symbol("SampleImageApp");
exports.default = {
    id: exports.id,
    displayName: "Sample Image Viewer",
    component: SampleImage_vue_1.default,
    launcherIcon: (0, LauncherIconWith_1.default)({ src: imgview_png_1.default }),
};
