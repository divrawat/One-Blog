import { DOMAIN } from "../config";
import { webstoryslugs } from '@/actions/story';
import { format, utcToZonedTime } from 'date-fns-tz';

const generateXmlSitemap = (blogs) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  blogs.forEach((blog) => {
    const utcDate = new Date(blog.date);
    const istDate = utcToZonedTime(utcDate, 'Asia/Kolkata');
    const formattedDate = format(istDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", { timeZone: 'Asia/Kolkata' });
    xml += `
    <url>
      <loc>${`${DOMAIN}/web-stories/${blog.slug}`}</loc>
      <lastmod>${formattedDate}</lastmod>
      <changefreq>weekly</changefreq>
    </url>`;
  });

  xml += '</urlset>';
  return xml;
};

const Sitemap = () => null;

export async function getServerSideProps({ res }) {
  const blogs = await webstoryslugs();
  res.setHeader('Content-Type', 'text/xml');
  res.write(generateXmlSitemap(blogs));
  res.end();

  return { props: {} };
}

export default Sitemap;
