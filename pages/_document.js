import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style amp-custom="" dangerouslySetInnerHTML={{
            __html: `
              amp-story-page {
                 background-image: url("/images/walls.jpg");
              }
              amp-story-grid-layer{
                margin: auto;
              }
              amp-story-page h1{
                font-weight: 800;
                font-size: 28px;
                line-height: 1.5;
                color: white;
                text-transform: capitalize;
                font-family: Arial, Helvetica, sans-serif;
                padding-left: 20px;
                padding-right: 20px;
                padding-bottom: 25px;
                word-wrap: break-word;
              }
              amp-story-page h3 {
                font-weight: 800;
                font-size: 28px;
                line-height: 1.5;
                color: white;
                text-transform: capitalize;
                font-family: Arial, Helvetica, sans-serif;
                padding-left: 20px;
                padding-right: 20px;
                padding-bottom: 45px;
                word-wrap: break-word;
              }
              amp-story-page h2 {
                font-weight: 800;
                font-size: 30px;
                line-height: 1.5;
                color: white;
                text-transform: capitalize;
                font-family: Arial, Helvetica, sans-serif;
                text-align: center;
                padding-left: 20px;
                padding-right: 20px;
                word-wrap: break-word;
              }
              amp-story-page p {
                padding-left: 20px;
                padding-right: 20px;
                font-weight: 700;
                font-size: 20px;
                line-height: 1.6;
                color: white;
                font-family: Arial, Helvetica, sans-serif;
              }
              amp-story-grid-layer.bottom {
                align-content: end;
                padding-bottom: 60px;
              }
              .myclass amp-story-grid-layer.bottom{
                padding-bottom: 40px;
              }
              amp-story-grid-layer.noedge {
                padding: 0px;
              }
              amp-story-grid-layer.center-text {
                align-content: center;
              }
              amp-img {
                height: auto;
              }
            `
          }} />
        </>
      )
    };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" /> */}

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Chewy&family=Darumadrop+One&family=Shantell+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />




          {/* <script src="https://www.googletagmanager.com/gtag/js?id=G-BN0814FKHT" />

          <script type='text/javascript'
            dangerouslySetInnerHTML={{
              __html: `{window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-BN0814FKHT');}`
            }}
          /> */}






          {/* Monetag */}
          <meta name="monetag" content="202980d1238b2520d154075667ed8701" />
          {/* <script async="async" data-cfasync="false" src="//thubanoa.com/1?z=7462318"></script> */}


          {/* <script src="https://alwingulla.com/88/tag.min.js" data-zone="64435" async data-cfasync="false"></script> */}


        </Head>




        <body>
          <Main />
          <NextScript />

        </body>
      </Html>
    );
  }
}
