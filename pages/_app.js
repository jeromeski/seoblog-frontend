// import App from 'next/app'

const { Head } = require('next/document');

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        ;
      </Head>
    </Component>
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

export default MyApp;
