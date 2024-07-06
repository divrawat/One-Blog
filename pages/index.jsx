import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef, RefObject } from 'react';
import { FaStopwatch } from "react-icons/fa6";
import { AiFillStop } from "react-icons/ai";
import { TbFreeRights } from "react-icons/tb";
const ReactSpeedometer = dynamic(() => import("react-d3-speedometer"), { ssr: false });
import Head from "next/head";
import { MdOutlineGpsFixed } from "react-icons/md";
import { IoHappySharp } from "react-icons/io5";
import { FaTachometerAlt } from "react-icons/fa";
import { FaCarRear } from "react-icons/fa6";
import { PiPaintBucketFill } from "react-icons/pi";
import { DOMAIN, APP_NAME } from "@/config";
import Link from "next/link";
import { format, utcToZonedTime } from 'date-fns-tz';
import Script from 'next/script';

const Home = ({ blogs }) => {


  const showAllBlogs = () => {
    return blogs && blogs.map((blog, i) => (
      <article key={i}><Card blog={blog} /></article>
    )).slice(0, 6);
  }


  const [speed, setSpeed] = useState(0);
  const [isGeolocationActive, setIsGeolocationActive] = useState(false);
  const [watchId, setWatchId] = useState(null);

  function calculate() {
    if (isGeolocationActive) {
      navigator.geolocation.clearWatch(watchId);
      setIsGeolocationActive(false);
    }

    else {
      const newWatchId = navigator.geolocation.watchPosition(
        (position) => { const newSpeed = position.coords.speed || 0; setSpeed(newSpeed); },
        (error) => { console.error('Error getting location:', error.message); },
        { enableHighAccuracy: true }
      );
      setIsGeolocationActive(true);
      setWatchId(newWatchId);
    }
  }


  const list = [
    {
      country: "China",
      continent: "Asia",
      MaxSpeed: "350",
      RailNetWork: "45000 km"
    },
    {
      country: "Spain",
      continent: "Europe",
      MaxSpeed: "310",
      RailNetWork: "4327.1 km"
    },
    {
      country: "France",
      continent: "Europe",
      MaxSpeed: "320",
      RailNetWork: "2735 km"
    },
    {
      country: "Germany",
      continent: "Europe",
      MaxSpeed: "300",
      RailNetWork: "1630.6 km"
    },
    {
      country: "Japan",
      continent: "Asia",
      MaxSpeed: "320",
      RailNetWork: "2727 km"
    },
    {
      country: "Italy",
      continent: "Europe",
      MaxSpeed: "300",
      RailNetWork: "921 km"
    },
    {
      country: "United Kingdom",
      continent: "Europe",
      MaxSpeed: "300",
      RailNetWork: "113 km"
    },
    {
      country: "South Korea",
      continent: "Asia",
      MaxSpeed: "305",
      RailNetWork: "660.9 km"
    },
    {
      country: "Turkey",
      continent: "Europe/Asia",
      MaxSpeed: "300",
      RailNetWork: "1211 km"
    },
    {
      country: "Finland",
      continent: "Europe",
      MaxSpeed: "220",
      RailNetWork: "1120 km"
    },
    {
      country: "Sweden",
      continent: "Europe",
      MaxSpeed: "205",
      RailNetWork: "860 km"
    },
    {
      country: "Uzbekistan",
      continent: "Asia",
      MaxSpeed: "250",
      RailNetWork: "741 km"
    },
    {
      country: "United States",
      continent: "North America",
      MaxSpeed: "240",
      RailNetWork: "735 km"
    },
    {
      country: "Greece",
      continent: "Europe",
      MaxSpeed: "200",
      RailNetWork: "700 km"
    },
    {
      country: "Russia",
      continent: "Europe",
      MaxSpeed: "250",
      RailNetWork: "650 km"
    },
    {
      country: "Saudi Arabia",
      continent: "Asia",
      MaxSpeed: "300",
      RailNetWork: "449 km"
    },
    {
      country: "Taiwan",
      continent: "Asia",
      MaxSpeed: "300",
      RailNetWork: "332.1 km"
    },
    {
      country: "Austria",
      continent: "Europe",
      MaxSpeed: "230",
      RailNetWork: "254 km"
    },
    {
      country: "Portugal",
      continent: "Europe",
      MaxSpeed: "220",
      RailNetWork: "227 km"
    },
    {
      country: "Poland",
      continent: "Europe",
      MaxSpeed: "200",
      RailNetWork: "224 km"
    },
    {
      country: "Belgium",
      continent: "Europe",
      MaxSpeed: "300",
      RailNetWork: "209 km"
    },
    {
      country: "Morocco",
      continent: "Africa",
      MaxSpeed: "320",
      RailNetWork: "186 km"
    },
    {
      country: "Switzerland",
      continent: "Europe",
      MaxSpeed: "230",
      RailNetWork: "178 km"
    },
    {
      country: "Indonesia",
      continent: "Asia",
      MaxSpeed: "350",
      RailNetWork: "142.3 km"
    },
    {
      country: "Norway",
      continent: "Europe",
      MaxSpeed: "210",
      RailNetWork: "139.5 km"
    },
    {
      country: "Netherlands",
      continent: "Europe",
      MaxSpeed: "300",
      RailNetWork: "90 km"
    },
    {
      country: "Serbia",
      continent: "Europe",
      MaxSpeed: "200",
      RailNetWork: "75 km"
    },
    {
      country: "Denmark",
      continent: "Europe",
      MaxSpeed: "200",
      RailNetWork: "56 km"
    },
    {
      country: "Hong Kong",
      continent: "Asia",
      MaxSpeed: "200",
      RailNetWork: "26 km"
    }
  ];




  const description = "Welcome here to check your train speed, where you can have a bit of fun exploring how fast different trains zip around! 🚂💨 Whether you&apos;re a big train fan or just curious, our website lets you peek into the speedy world of trains in a super easy way."


  const schema =
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://trainspeedtest.in.net/"
    },
    "headline": "Train Speed Test: Feel The Need For Speed",
    "description": "Welcome here to check your train speed, where you can have a bit of fun exploring how fast different trains zip around! 🚂💨 Whether you&apos;re a big train fan or just curious, our website lets you peek into the speedy world of trains in a super easy way.",
    "image": "https://trainspeedtest.in.net/train.jpg",
    "author": {
      "@type": "Person",
      "name": "Divyanshu Rawat",
      "url": "https://www.linkedin.com/in/divyanshu-rawat-380911210/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Divyanshu Rawat",
      "logo": {
        "@type": "ImageObject",
        "url": "https://trainspeedtest.in.net/train.jpg"
      }
    },
  }



  const Faqschema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I check my train speed ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can check train speed through trainspeedtest.in.net."
        }
      },
      {
        "@type": "Question",
        "name": "Is a train speed test accurate ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, train speed test is not accurate as it fully depends on GPS signal and your internet connectivity."
        }
      },
      {
        "@type": "Question",
        "name": "Is it legal to do a train speed test ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes you can check your train speed, it is completely safe."
        }
      },
      {
        "@type": "Question",
        "name": "What is the average speed of a train in India ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average speed of train in India is just 55 km/s ."
        }
      },
      {
        "@type": "Question",
        "name": "How do this train speed tool work ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This train speed tool access your location from the browser using the Geolocation API and updates when position changes. It watches the user's position and updates the provided callback whenever the position changes and hence the speed is predicted."
        }
      }
    ]
  };


  const head = () => (
    <Head>
      <title>Train Speed Test: Check Your Train Speed Now</title>
      <meta name="description" content={description} />
      <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
      <link rel="canonical" href={DOMAIN} />
      <meta property="og:title" content={`${APP_NAME}:  Check Your Train Speed Now`} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={DOMAIN} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={DOMAIN} />
      <meta property="og:site_name" content={DOMAIN} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(Faqschema) }} />
      <script src="https://www.googletagmanager.com/gtag/js?id=G-BN0814FKHT" />

      <script type='text/javascript'
        dangerouslySetInnerHTML={{
          __html: `{window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-BN0814FKHT');}`
        }}
      />
    </Head>
  );



  return (
    <>
      {head()}
      <Navbar />
      <div className="pt-5 pb-5 text-[white] bg-[#141414]">
        <main>
          <article>
            <div className="max-w-[1200px] mx-auto p-3 rounded-lg  opacity-90" >

              <h1 className="text-3xl font-extrabold text-center mt-5 ">Train Speed - Feel the Need for Speed</h1>

              <div className='flex justify-center mt-[100px] h-[220px] '>
                <ReactSpeedometer value={speed} needleColor="red" startColor="#09cb09" endColor="#ff1919" segments={10} maxSegmentLabels={10}
                  minValue={0} maxValue={500} width={350} height={350} />
              </div>

              <div className="text-center font-bold text-2xl mt-5 ">{speed.toFixed(2)} km/hr</div>

              <div className="flex justify-center items-center mt-8">
                <a href="https://thampolsi.com/4/7457654" target="_blank" onClick={calculate} className="flex items-center border border-gray-300 bg-black text-white px-4 py-2 tracking-wider font-bold rounded-md transition duration-300 ease-in-out hover:bg-[#2b2a2b] hover:text-gray-300">
                  {isGeolocationActive ? (<><AiFillStop className="mr-2" color="#ff3838" />STOP</>) : (<><FaStopwatch className="mr-2" color="#84fb66" />START</>)}
                </a>
              </div>


              <div className="mt-10 max-w-[1100px] pt-3 pb-10 pr-3 pl-3 mx-auto">

                <p className="mb-[35px] text-center text-[17.5px]"><Link href="/">Check your train speed</Link> while you are travelling</p>

                <p className="mb-[35px] text-center text-[17.5px]">   Ever wondered how fast your train goes ? You can check it through our tool which is 100% free.</p>

                <p className="mb-[35px] text-center text-[17.5px]">  You will only need to turn on your GPS and allow browser to track your location.</p>

                <p className="mb-[35px] text-center text-[17.5px]"> Now you will have a question of this tool&apos;s accuracy, generally it is not 100% accurate as it is dependent on Browser&apos;s GeoLocation API and your Internet speed.</p>


                <h2 className="text-3xl font-bold bg-black mt-[45px] text-white p-3 text-center">Requirements</h2>

                <p className="mt-[25px]">1. To check your train speed You should have a smartphone with both GPS and Internet.</p>
                <p className="mt-[10px]">2. Go to https://trainspeedtest.in.net  for testing train speed.</p>
                <p className="mt-[10px]">3. You have to give access to the browser to activate browser&apos;s location API.</p>


                <h2 className="text-3xl font-bold mt-[45px] bg-black text-white p-3 text-center">Train Speed</h2>
                <p className="mt-[20px]">
                  Train Speed is a very important criteria for an developed or developing country. Generally the trains in developed country moves at a very fast rate then developing or under developed world. China and japan have the most advanced and fastest trains as well as train routes. Fastest train in the world is Maglev train which is in Japan. It can reach a speed of 603 km/hr. So it is very important to have a good train speed for a country and you have to test your train speed throughout your train journey.
                </p>


                <h2 className="text-3xl font-bold mb-11 mt-[70px] bg-black text-white text-center p-3">Features</h2>

                <div className="md:grid md:grid-cols-2 gap-10 mb-11">

                  <div className=" p-4 ">
                    <div className="flex justify-center"><TbFreeRights size={120} /></div>
                    <div className="text-2xl font-bold text-center mt-2">Lifetime Free</div>
                    <p className="text-center mt-5 mb-5 p-2">You can freely utilize this website without the need for any subscription or purchase. It is available for use on any device at no cost.</p>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-center"><MdOutlineGpsFixed size={120} /></div>
                    <div className="text-2xl font-bold text-center mt-2">95% Accuracy</div>
                    <p className="text-center mt-5 mb-5 p-2">Our website can only provide vehicle speed with 95% Accuracy since it is dependent on browser&apos;s Geolocation API. It also depends on your Internet connectivity</p>
                  </div>


                  <div className="p-4">
                    <div className="flex justify-center"><IoHappySharp size={120} /></div>
                    <div className="text-2xl font-bold text-center mt-2">Easy To Use</div>
                    <p className="text-center mt-5 mb-5 p-2">Our tool is very easy to use as you just have to click the start button and allow your location to your browser. Moreover we also have a simple interface.</p>
                  </div>


                  <div className="p-4">
                    <div className="flex justify-center"><FaTachometerAlt size={120} /></div>
                    <div className="text-2xl font-bold text-center mt-2">Range</div>
                    <p className="text-center mt-5 mb-5 p-2">Our <Link href="/">train speed test</Link> train tool can detect a speed of a vehicle ranging from 0 km/hr to 500 km/hr.</p>
                  </div>


                  <div className="p-4">
                    <div className="flex justify-center"><PiPaintBucketFill size={120} /></div>
                    <div className="text-2xl font-bold text-center mt-2">Attractive Design</div>
                    <p className="text-center mt-5 mb-5 p-2">Our website is beautiful, attractive, simple and easy to use by any age group. Our tool is made in Next.js and works fine in all browsers.</p>
                  </div>


                  <div className="p-4">
                    <div className="flex justify-center"><FaCarRear size={120} /></div>
                    <div className="text-2xl font-bold text-center mt-2">Multiple Vehicles</div>
                    <p className="text-center mt-5 mb-5 p-2">This website can not only detect train speed but also other vehicles like bus, car, motorcycle etc. as it works like a speedometer.
                    </p>
                  </div>

                </div>





                <h2 className="text-3xl font-bold mt-[45px] mb-5 bg-black text-white p-3 text-center">Online GPS Speedometer</h2>

                <p className="mb-[35px]">The GPS Speedometer, additionally referred to as the Global Positioning System Speedometer, is a device that operates based at the governor principle to provide particular velocity measurements. It is broadly recognized for its accuracy in tracking velocity across various automobiles. In modern instances, actually each car international is prepared with a speedometer to gauge velocity.</p>
                <p className="mb-[35px]">The Online GPS Speedometer is readily available via the internet. Leveraging your cell device&apos;s GPS competencies, it efficiently pinpoints your region even as you&apos;re in transit. Our on line speedometer device harnesses this technology to correctly discover the speed of trains. By using GPS era, we will meticulously screen train speeds and offer you with specific measurements.</p>

                <p className="mb-[35px]">Our device makes use of online GPS generation, harnessing your device&apos;s GPS capability via net connectivity. This allows us to gather precise vicinity data and coordinates, that are then translated into an online speedometer able to appropriately determining educate speeds.</p>


                <h2 className="text-3xl font-bold mt-[45px] mb-5 bg-black text-white p-3 text-center">Conclusion</h2>


                <p className="mb-[35px]"> This is a top notch tool that can give upto 90% accuracy on train speed with the use of Browser&apos;s Geolocation API whether it is google chrome or brave browser or Microsoft&apos;s Bing. This is a very easy to use tool and I highly recommend it to use to measure your train&apos;s speed.</p>

                <p className="mb-[35px]"> Turn on your GPS using this website and give your location access permission to your browser  and after that it will start tracking your train&apos;s speed.</p>

                <p className="mb-[35px]"> A train speed test is a very important metric for Engineers and high authority companies relating to railways for maintenance and development. Railway authorities use this tool to ensure passenger safety and enhance overall train performance.</p>


                <h2 className="text-3xl font-bold mt-[45px] mb-5 bg-black text-white p-3 text-center">Frequently Asked Questions</h2>

                <h3 className="text-2xl font-bold mb-2">How can I check my train speed ?</h3>
                <p className="mb-[35px]">You can check train speed through this website.</p>

                <h3 className="text-2xl font-bold mb-2">Is a train speed test accurate ?</h3>
                <p className="mb-[35px]">No, train speed test is not accurate as it fully depends on GPS signal and your internet connectivity.</p>

                <h3 className="text-2xl font-bold mb-2">Is it legal to do a train speed test ?</h3>
                <p className="mb-[35px]">Yes you can check your train speed, it is completely safe.</p>

                <h3 className="text-2xl font-bold mb-2">What is the average speed of a train in India ?</h3>
                <p className="mb-[35px]">The average speed of train in India is just 55 km/s .</p>

                <h3 className="text-2xl font-bold mb-2">How do this train speed tool work ?</h3>
                <p className="mb-[35px]">This train speed tool access your location from the browser using the Geolocation API and updates when position changes. It watches the user&apos;s position and updates the provided callback whenever the position changes and hence the speed is predicted.</p>


                <h2 className="text-3xl font-bold mb-11 mt-[100px] bg-black text-white p-3 text-center">List Of High-Speed Railway Lines</h2>



                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Country
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Continent
                        </th>
                        <th scope="col" className="px-4 py-3">
                          MaxSpeed (in km/hr)
                        </th>
                        <th scope="col" className="px-4 py-3">
                          RailNetwork
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((list, index) => (
                        <tr key={index}>
                          <th scope="row" className="px-8 py-4 font-medium whitespace-nowrap ">
                            {list.country}
                          </th>
                          <td className="px-6 py-4">
                            {list.continent}
                          </td>
                          <td className="px-6 py-4">
                            {list.MaxSpeed}
                          </td>
                          <td className="px-6 py-4">
                            {list.RailNetWork}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-10 text-center">The Above data is taken from <a className="text-[blue]" target="_blank" href="https://en.wikipedia.org/wiki/List_of_high-speed_railway_lines">Wikipedia</a>  page.</p>



                {/* <iframe className="mt-10 mx-auto" src="https://www.youtube.com/embed/aetpC1_0QEs?si=rl8XgybMtf-xGcNC" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}


              </div>

            </div>
          </article>
        </main>
      </div>
      <Footer />

    </>
  );
}

export async function getStaticProps() {
  try {
    const data = await listBlogsWithCategoriesAndTags();
    const formattedBlogs = data.blogs.map(blog => {
      const utcDate = new Date(blog.date);
      const istDate = utcToZonedTime(utcDate, 'Asia/Kolkata');
      const formattedDate = format(istDate, 'dd MMM, yyyy', { timeZone: 'Asia/Kolkata' });
      return { ...blog, formattedDate };
    });
    return { props: { blogs: formattedBlogs } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { blogs: [] } };
  }
}




export default Home;