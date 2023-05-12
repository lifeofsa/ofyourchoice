import React from "react";
import ReactDOM from "react-dom/client";
import { ColorModeScript } from "@chakra-ui/react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./constants/theme";
import { Provider } from "react-redux";
import store from "./store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HelmetProvider, Helmet } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.StrictMode>
      <HelmetProvider>
        <ChakraProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Provider store={store}>
            <Helmet>
              <title>Of Your Choice</title>
              <meta
                name="description"
                content="Explore latest blogs and content"
              />
              <meta
                name="keywords"
                content="blogs,news,latest,blogs,latest,news,global,news,local news,domestic news,ofyourchoice,of your choice"
              />
            </Helmet>
            <App />
          </Provider>
        </ChakraProvider>
      </HelmetProvider>
    </React.StrictMode>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
