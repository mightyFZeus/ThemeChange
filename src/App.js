import "./styles.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";
import storage from "local-storage-fallback";
import styled from "styled-theming";

const getBackground = styled("node", {
  light: "#EEE",
  dark: "#111"
});

const getForeground = styled("node", {
  light: "#111",
  dark: "#EEE"
});

const getFontsize = styled("textZoom", {
  normal: "1em",
  magnify: "1.5em"
});

const Globalstyle = createGlobalStyle`
body{
  background-color: ${getBackground};
 color: ${getForeground};
 font-size:${getFontsize}

}
`;
function getInitialTheme() {
  const SavedTheme = storage.getItem("Theme");

  return SavedTheme
    ? JSON.parse(SavedTheme)
    : { node: "light", textZoom: "normal" };
}

export default function App() {
  const [Theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    storage.setItem("Theme", JSON.stringify(Theme));
  }, [Theme]);
  return (
    <ThemeProvider theme={Theme}>
      <>
        <Globalstyle />
        <div className="App">
          <h1>Hello User</h1>
          <h2>Click the button to change theme and font size!</h2>
          <button
            onClick={(e) =>
              setTheme(
                Theme.node === "dark"
                  ? { ...Theme, node: "light" }
                  : { ...Theme, node: "dark" }
              )
            }
          >
            {" "}
            Toggle theme{" "}
          </button>
          <button
            onClick={(e) =>
              setTheme(
                Theme.textZoom === "normal"
                  ? { ...Theme, textZoom: "magnify" }
                  : { ...Theme, textZoom: "normal" }
              )
            }
          >
            {" "}
            Toggle Text Size{" "}
          </button>
        </div>
      </>
    </ThemeProvider>
  );
}
