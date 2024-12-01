export default defineContentScript({
  matches: ["https://dev.to/*"],
  async main() {
    await injectScript("/script.js", {
      keepInDom: true,
    });
  },
});
