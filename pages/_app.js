import { Layout } from "./../components";
import { ModalProvider } from "../context/modalContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </ModalProvider>
  );
}

export default MyApp;
