import Head from 'next/head';
import '../node_modules/react-quill/dist/quill.snow.css';
import '../public/css/styles.modules.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Component {...pageProps}>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
        </Head>
      </Component>
    </React.Fragment>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }
