import { createGlobalStyle } from "styled-components";
import {CartContextProvider} from "@/components/CartContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #eee; 
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
        <SpeedInsights />
      </CartContextProvider>
    </>
  );
}
