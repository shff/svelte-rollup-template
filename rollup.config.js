import svelte from "rollup-plugin-svelte-hot";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import html from "@rollup/plugin-html";
import { terser } from "rollup-plugin-terser";
import zip from "rollup-plugin-gzip";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import hmr, { autoCreate } from "rollup-plugin-hot";

import { gzip } from "node-zopfli";

const dev = !!process.env.ROLLUP_WATCH;
const hot = !!process.env.NOLLUP;

export default {
  input: "app/index.js",
  output: {
    file: "dist/bundle.js",
    strict: true,
    format: "iife",
  },
  watch: {
    clearScreen: false,
  },
  plugins: [
    svelte({
      emitCss: true,
      dev: dev,
      hot: hot && { optimistic: true },
    }),
    resolve(),
    babel(),
    html({
      title: "Hello, Svelte!",
    }),
    !dev && terser(),
    !dev &&
      zip({
        customCompression: (content) => gzip(Buffer.from(content)),
      }),
    dev && !hot && livereload(),
    dev &&
      !hot &&
      serve({
        open: true,
        contentBase: "dist",
      }),
    hot &&
      autoCreate({
        include: "app/*",
        recreate: true,
      }),
    hot &&
      hmr({
        public: "",
        inMemory: true,
        compatModuleHot: !hot,
      }),
  ],
};
