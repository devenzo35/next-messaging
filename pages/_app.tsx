import { wrapper } from "../redux/store";
import { AppProps } from "next/dist/next-server/lib/router/router";

import useLogin from "../helpers/useLogin";

import "../styles/reset.css";
import "../styles/custom.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useLogin();
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
