/** Browser stub for Node's `module` (pulled in by Verovio/Emscripten). */
export default {};
export const createRequire = () => {
  throw new Error("createRequire is not available in the browser");
};
