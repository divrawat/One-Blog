import { Feeds } from '@/actions/blog';
import { DOMAIN, APP_NAME, APP_DESCRIPTION } from '@/config';
import { format, utcToZonedTime } from 'date-fns-tz';

const generateRssItem = (post) => {

  const utcDate = new Date(post?.date);
  const istDate = utcToZonedTime(utcDate, 'Asia/Kolkata');
  const formattedDate = format(istDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", { timeZone: 'Asia/Kolkata' });

  return `
    <item>
      <title>${post?.title}</title>
      <link>${DOMAIN}/${post?.slug}</link>
      <pubDate>${formattedDate}</pubDate>
      <guid>${DOMAIN}/${post?.slug}</guid>
      <dc:creator><![CDATA[${post?.postedBy.name}]]></dc:creator>
      <description><![CDATA[${post?.mdesc}]]></description>
      <content:encoded><![CDATA[
        <div><img decoding="async" src="${post?.photo}" /></div>
        ${post?.body}
      ]]></content:encoded>
    </item>
  `;
};

const generateRss = (posts) => `
  <rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${APP_NAME}</title>
      <atom:link href="${DOMAIN}/feeds/" rel="self" type="application/rss+xml" />
      <link>${DOMAIN}</link>
      <description>${APP_DESCRIPTION}</description>
      <language>en-US</language>
      <generator>Next.js</generator>

      <image>
      <url>${DOMAIN}/images/logo-192x192.png</url>
      <title>${APP_NAME}</title>
      <link>${DOMAIN}</link>
      <width>192</width>
      <height>192</height>
  </image> 

      ${posts?.map(generateRssItem).join('')}
    </channel>
  </rss>
`;

export default function Rss() {
  return null;
}

export async function getServerSideProps({ res }) {
  const posts = await Feeds();

  const rss = generateRss(posts);

  res.setHeader('Content-Type', 'text/xml');
  res.write(rss);
  res.end();

  return {
    props: {},
  };
}
