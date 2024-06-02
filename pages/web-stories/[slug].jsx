import Head from "next/head";
import { singleStory, webstoryslugs } from "../../actions/story";
import { DOMAIN, APP_NAME } from "../../config";
import Script from 'next/script';
import { format } from 'date-fns';
export const config = { amp: true };
import React from "react";

const Stories = ({ story, errorCode }) => {

  if (errorCode) {
    return (
      <>
        <Head>
          <title>{`404 Error - ${APP_NAME}`}</title>
        </Head>
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <div style={{ textAlign: "center", fontWeight: "800", fontSize: "30px", fontFamily: "sans-serif" }}>404 Error! Story Not Found</div>
        <br /><br /><br /><br /><br /><br /><br />
      </>
    );
  }


  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${DOMAIN}/#organization`,
        "name": `${APP_NAME}`,
        "logo": {
          "@type": "ImageObject",
          "@id": `${DOMAIN}/#logo`,
          "url": `${DOMAIN}/images/logo-96x96.png`,
          "width": "96",
          "height": "96"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${DOMAIN}/#website`,
        "url": `${DOMAIN}`,
        "name": `${APP_NAME}`,
        "alternateName": `${APP_NAME}`,
        "publisher": {
          "@id": `${DOMAIN}/#organization`
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "ImageObject",
        "@id": `${story?.coverphoto}`,
        "url": `${story?.coverphoto}`,
        "width": "640",
        "height": "853",
        "caption": `${story?.title}`,
        "inLanguage": "en-US"
      },
      {
        "@type": "WebPage",
        "@id": `${DOMAIN}/${story?.slug}/#webpage`,
        "url": `${DOMAIN}/${story?.slug}`,
        "name": `${story?.title}`,
        "datePublished": `${story?.date}`,
        "dateModified": `${story?.date}`,
        "isPartOf": {
          "@id": `${DOMAIN}/#website`
        },
        "primaryImageOfPage": {
          "@id": `${story?.coverphoto}`
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Person",
        "@id": `${DOMAIN}/profile/divrawat`,
        "name": "Divyanshu Rawat",
        "url": `${DOMAIN}/profile/divrawat`,
        "image": {
          "@type": "ImageObject",
          "@id": `${DOMAIN}/author.png`,
          "url": `${DOMAIN}/author.png`,
          "caption": "Divyanshu Rawat",
          "inLanguage": "en-US"
        },
        "worksFor": {
          "@id": `${DOMAIN}/#organization`
        }
      },
      {
        "@type": "NewsArticle",
        "headline": `${story?.title} - ${APP_NAME}`,
        "datePublished": `${story?.date}`,
        "dateModified": `${story?.date}`,
        "author": {
          "@id": `${DOMAIN}/profile/divrawat`,
          "name": "Divyanshu Rawat"
        },
        "publisher": {
          "@id": `${DOMAIN}/#organization`
        },
        "description": `${story?.description} - ${APP_NAME}`,
        "@id": `${DOMAIN}/${story?.slug}/#richSnippet`,
        "isPartOf": {
          "@id": `${DOMAIN}/web-stories/${story?.slug}/#webpage`
        },
        "image": {
          "@id": `${story?.coverphoto}`
        },
        "inLanguage": "en-US",
        "mainEntityOfPage": {
          "@id": `${DOMAIN}/web-stories/${story?.slug}/#webpage`
        }
      }
    ],
  };


  const head = () => (
    <Head>
      <title>{`${story?.title} - ${APP_NAME}`}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={`${story?.description}`} />
      <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="article" />
      <link rel="preconnect" href="https://cdn.ampproject.org" />
      <link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-story-1.0.js" />
      <meta property="og:title" content={`${story?.title} - ${APP_NAME}`} />
      <meta property="og:description" content={`${story?.description}`} />
      <meta property="og:url" content={`${DOMAIN}/web-stories/${story?.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:updated_time" content={`${story?.date}`} />
      <meta property="og:image" content={`${story?.coverphoto}`} />
      <meta property="og:image:secure_url" content={`${story?.coverphoto}`} />
      <meta property="og:image:width" content="640" />
      <meta property="og:image:height" content="853" />
      <meta property="og:image:alt" content={story?.title} />
      <meta property="og:image:type" content="image/jpeg" />
      <link rel="canonical" href={`${DOMAIN}/web-stories/${story?.slug}`} />
      <link rel="amphtml" href={`${DOMAIN}/web-stories/${story?.slug}`} />
      <meta property="article:published_time" content={`${story?.date}`} />
      <meta property="article:modified_time" content={`${story?.date}`} />
      <link rel="icon" href={`${DOMAIN}/images/logo-32x32.png`} sizes="32x32" />
      <link rel="icon" href={`${DOMAIN}/images/logo-192x192.png`} sizes="192x192" />
      <link rel={`${DOMAIN}/api`} href={`${DOMAIN}/api`} />
      <link rel="alternate" type="application/json" href={`${DOMAIN}/api/webstories/${story?.slug}`} />
      <link rel="apple-touch-icon" href={`${DOMAIN}/images/logo-180x180.png`} />
      <link rel="alternate" type="application/rss+xml" title={`${APP_NAME} - Feed`} href={`${DOMAIN}/feeds.xml`} />
      {/* <link rel="alternate" type="application/rss+xml" title={`${APP_NAME} » Stories Feed`} href="https://www.liquorprices.in/web-stories/feed/" /> */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script async custom-element="amp-story-auto-analytics" src="https://cdn.ampproject.org/v0/amp-story-auto-analytics-0.1.js" />

    </Head>
  );

  const date0 = new Date(story?.date);
  const formattedDate = format(date0, 'dd MMM, yyyy');

  return (

    <>
      {head()}
      <Script src="https://cdn.ampproject.org/v0.js" async />
      <Script custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js" async />
      <Script custom-element="amp-story-auto-ads" src="https://cdn.ampproject.org/v0/amp-story-auto-ads-0.1.js" async />
      <Script custom-element="amp-story-auto-analytics" src="https://cdn.ampproject.org/v0/amp-story-auto-analytics-0.1.js" />

      <amp-story standalone="" title={`${story?.title}`} publisher={`${APP_NAME}`} publisher-logo-src={`${DOMAIN}/images/logo-192x192.png`} poster-portrait-src={`${story?.coverphoto}`} >


        <amp-story-page id="cover" className="myclass" auto-advance-after="4s">
          <amp-story-grid-layer template="vertical">
            <amp-img src={`${story?.coverphoto}`} layout="responsive" width={story?.coverphotowidth} height={story?.coverphotoheight} />
          </amp-story-grid-layer>

          <amp-story-grid-layer template="vertical" className="bottom">
            <h1>{story?.title}</h1>
            <p>{`By ${APP_NAME} Team`}</p>
            <p>{formattedDate}</p>
          </amp-story-grid-layer>
        </amp-story-page>

        {story?.slides.map((slide, i) => (
          <React.Fragment key={i}>
            <amp-story-page id={`page${i}`} key={i} auto-advance-after="5s">
              <amp-story-grid-layer template="vertical">
                <amp-img src={`${slide.image}`} layout="responsive" animate-in="fade-in" width={slide.width} height={slide.height} />
              </amp-story-grid-layer>

              <amp-story-grid-layer template="vertical" className="bottom">
                {slide.heading && (
                  <h2 animate-in="fade-in" animate-in-delay="0.2s" animate-in-duration="0.5s">{slide.heading}</h2>
                )}
                <p animate-in="fade-in" animate-in-delay="0.3s" animate-in-duration="0.5s">{slide.paragraph}</p>
              </amp-story-grid-layer>
            </amp-story-page>


            {i === 2 && slide.ads ? (
              <amp-story-page key="00" ad="" id="i-amphtml-ad-page-00" className="i-amphtml-element i-amphtml-layout-container i-amphtml-built i-amphtml-layout i-amphtml-story-page-loaded" i-amphtml-layout="container" role="region" xdomain-ad="" i-amphtml-return-to="page2" i-amphtml-advance-to="page3" i-amphtml-visited="" active="">
                <amp-story-grid-layer template="fill" className="i-amphtml-element i-amphtml-layout-container i-amphtml-story-layer i-amphtml-built i-amphtml-layout" i-amphtml-layout="container">
                  <amp-ad type="adsense" data-ad-client="ca-pub-1721485376950080" data-ad-slot="6021303939" className="i-amphtml-story-ad i-amphtml-element i-amphtml-layout-fill i-amphtml-layout-size-defined i-amphtml-built i-amphtml-layout" layout="fill" amp-story="" i-amphtml-layout="fill" data-amp-slot-index="1" data-a4a-upgrade-type="amp-ad-network-adsense-impl" ></amp-ad>
                  <amp-story-grid-layer template="fill" className="i-amphtml-element i-amphtml-layout-container i-amphtml-story-layer i-amphtml-built i-amphtml-layout" i-amphtml-layout="container"><div className="i-amphtml-glass-pane"></div></amp-story-grid-layer>
                  <div className="i-amphtml-story-spinner" aria-hidden="true" aria-label="Loading video"><div className="i-amphtml-story-spinner-container"><div className="i-amphtml-story-spinner-layer"><div className="i-amphtml-story-spinner-circle-clipper left"></div><div className="i-amphtml-story-spinner-circle-clipper right"></div></div></div></div>
                </amp-story-grid-layer>
              </amp-story-page>

            ) : null}

            {i === 5 && slide.ads ? (
              <amp-story-page key="01" ad="" id="i-amphtml-ad-page-01" className="i-amphtml-element i-amphtml-layout-container i-amphtml-built i-amphtml-layout i-amphtml-story-page-loaded" i-amphtml-layout="container" role="region" xdomain-ad="" i-amphtml-return-to="page5" i-amphtml-advance-to="page6" i-amphtml-visited="" active="">

                <amp-story-grid-layer template="fill" className="i-amphtml-element i-amphtml-layout-container i-amphtml-story-layer i-amphtml-built i-amphtml-layout" i-amphtml-layout="container">
                  <amp-ad type="adsense" data-ad-client="ca-pub-1721485376950080" data-ad-slot="6021303939" className="i-amphtml-story-ad i-amphtml-element i-amphtml-layout-fill i-amphtml-layout-size-defined i-amphtml-built i-amphtml-layout" layout="fill" amp-story="" i-amphtml-layout="fill" data-amp-slot-index="1" data-a4a-upgrade-type="amp-ad-network-adsense-impl" ></amp-ad>
                  <amp-story-grid-layer template="fill" className="i-amphtml-element i-amphtml-layout-container i-amphtml-story-layer i-amphtml-built i-amphtml-layout" i-amphtml-layout="container"><div className="i-amphtml-glass-pane"></div></amp-story-grid-layer>
                  <div className="i-amphtml-story-spinner" aria-hidden="true" aria-label="Loading video"><div className="i-amphtml-story-spinner-container"><div className="i-amphtml-story-spinner-layer"><div className="i-amphtml-story-spinner-circle-clipper left"></div><div className="i-amphtml-story-spinner-circle-clipper right"></div></div></div></div>
                </amp-story-grid-layer>
              </amp-story-page>
            ) : null}
          </React.Fragment>
        ))}

        {story?.link && story?.lastheading && story?.lastimage && (
          <amp-story-page id={`page${story?.slides.length + 1}`} key="000">
            <amp-story-grid-layer template="vertical">
              <amp-img src={`${story?.lastimage}`} layout="responsive" animate-in="fade-in" width="720" height="1280" />
            </amp-story-grid-layer>

            <amp-story-grid-layer template="vertical" className="bottom">
              <h3 animate-in="fade-in" animate-in-delay="0.2s" animate-in-duration="0.5s">{story?.lastheading}</h3>
            </amp-story-grid-layer>

            <amp-story-cta-layer>
              <a href={`${story?.link}`} className="button">Click Here</a>
            </amp-story-cta-layer>
          </amp-story-page>
        )}




        {/* <amp-story-auto-ads>
          <script type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "ad-attributes": {
                  "type": "adsense",
                  "data-ad-client": "ca-pub-1721485376950080",
                  "data-ad-slot": "6021303939",
                }
              })
            }} />
        </amp-story-auto-ads> */}

        <amp-story-auto-analytics gtag-id="G-BN0814FKHT"></amp-story-auto-analytics>

      </amp-story>
    </>
  );
};
/*
export async function getStaticPaths() {
  const slugs = await webstoryslugs();
  return { paths: slugs.map((slugObject) => ({ params: { slug: slugObject.slug } })), fallback: "blocking" };
}
*/

export async function getStaticPaths() {
  const slugs = ["btc-slips-as-economic-indicators-shake"];
  const paths = slugs.map(slug => ({ params: { slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params, res }) {
  try {
    const data = await singleStory(params.slug);
    if (data.webstory == null) { return { props: { errorCode: 404 } }; }
    return { props: { story: data.webstory } };
  } catch (error) { console.error(error); return { props: { errorCode: 500 } }; }
}




/*
export async function getServerSideProps({ params }) {
  try {
    const data = await singleStory(params.slug);
    if (data.webstory == null) {
      return { props: { errorCode: 404 } };
    }
    return { props: { story: data.webstory } };
  } catch (error) {
    console.error(error);
    return { props: { errorCode: 500 } };
  }
}
*/


export default Stories;