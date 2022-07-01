import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import MainLayout from "../components/layouts/MainLayout";
import store from "../store";

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) return null;

  return (
    <Provider store={store}>
      <ChakraProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
