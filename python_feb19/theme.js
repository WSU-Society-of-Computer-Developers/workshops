import { themes } from "mdx-deck";

export default {
  fonts: {
    body: "Blinker, sans-serif",
    monospace: '"Roboto Mono", monospace',
  },
  colors: {
    background: "#1a1a1a",
  },
  styles: {
    h1: {
      letterSpacing: "-0.05em",
      fontSize: "2em"

    }
  },
  ...themes.prism,
};
