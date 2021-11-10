import "../styles/globals.css";
import type { AppProps } from "next/app";
import LayoutComponent from "../components/LayoutComponent";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
  );
};

export default App;