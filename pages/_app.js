import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
