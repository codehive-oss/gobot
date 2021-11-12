import "../styles/globals.css";
import type { AppProps } from "next/app";
import LayoutComponent from "../components/LayoutComponent";
import { createClient, Provider } from "urql";

const client = createClient({ url: "http://localhost:4000/graphql" });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider value={client}>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </Provider>
  );
};

export default App;
