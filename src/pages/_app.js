import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import MainLayout from "../components/layouts/MainLayout";
import store from '../store';


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </Provider>

  )
}

export default MyApp
