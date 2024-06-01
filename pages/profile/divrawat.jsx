import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { DOMAIN, APP_NAME } from "@/config";
import Link from "next/link";

const About = () => {


    const description = "At our website, our mission is to revolutionize how passengers interact with train travel. We recognize that knowing your train&apos;s speed can add an extra layer of insight and excitement to your trip. Our committed team of technology enthusiasts and train aficionados has collaborated to create a platform seamlessly integrating modern GPS capabilities with train travel, putting a world of information at your fingertips."

    const head = () => (
        <Head>
            <title>Author</title>
            <meta name="description" content={description} />
            <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <link rel="canonical" href={`${DOMAIN}/about`} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content={APP_NAME} />
            <meta property="og:title" content={`${APP_NAME} - About`} />
            <meta property="og:description" content={description} />
            <meta property="og:url" href={`${DOMAIN}/about`} />
            <meta property="og:site_name" content={APP_NAME} />
        </Head>
    );


    return (
        <>
            <Navbar />
            {head()}
            <div className="bg-[#f7f8f9] pt-5 pb-5">
                <div className="max-w-[1200px] mx-auto p-3 bg-[white] border border-solid border-[#d7d7d7] rounded-lg">

                    <div className=" max-w-[1100px] pt-3 pb-10 pr-3 pl-3 mx-auto">
                        <h1 className="text-center p-3 font-bold text-3xl">Divyanshu Rawat</h1>

                        <p className="mt-2 mb-[40px]">Divyanshu Rawat is a passionate writer with a profound love for trains and train travel. Born and raised in a region where the rhythmic chug of locomotives echoed through the valleys, Divyanshu's fascination with trains began at a young age. His childhood memories are intertwined with the sights, sounds, and scents of railway stations, igniting a lifelong passion for all things related to railroads.</p>
                        <p className="mt-2 mb-[40px]">As an avid traveler, Divyanshu has embarked on numerous train journeys across diverse landscapes, from bustling metropolises to remote countryside regions. Each journey has provided him with a unique perspective, enriching his understanding of the intricate tapestry of cultures, histories, and experiences that intertwine along railway routes.</p>
                        <p className="mt-2 mb-[40px]">In his blog, Divyanshu shares his wealth of knowledge and firsthand experiences, offering insights into the world of trains and train travel. From practical tips for planning the perfect rail adventure to captivating stories that evoke the romance of the rails, his writing captures the essence of locomotive travel in all its glory.</p>
                        <p className="mt-2 mb-[40px]">Beyond his passion for trains, Divyanshu is also an advocate for sustainable transportation solutions. He believes in the power of railways to connect people, drive economic growth, and reduce carbon emissions, making the case for investing in rail infrastructure to create a more sustainable future.</p>
                        <p className="mt-2 mb-[40px]">Join Divyanshu on a journey through the fascinating world of trains, where every whistle blow and clickety-clack of the tracks tells a story waiting to be explored.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}


export default About