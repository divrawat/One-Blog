import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { DOMAIN, APP_NAME } from "@/config";
import Link from "next/link";

const About = () => {


    const description = "At our website, our mission is to revolutionize how passengers interact with train travel. We recognize that knowing your train&apos;s speed can add an extra layer of insight and excitement to your trip. Our committed team of technology enthusiasts and train aficionados has collaborated to create a platform seamlessly integrating modern GPS capabilities with train travel, putting a world of information at your fingertips."

    const head = () => (
        <Head>
            <title>About</title>
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
                        <h1 className="text-center p-3 font-bold text-3xl">About</h1>

                        <p className="mt-2 mb-[40px]">  Welcome to our website, your premier destination for real-time <Link href="/">Train Speed</Link> tracking using GPS technology. Our innovative tool is crafted to enhance your train travel experience by providing accurate and up-to-the-minute information about your train&apos;s speed. Whether you are a regular commuter, an adventurous traveler, or simply curious about the mechanics of your journey, our website is dedicated to keeping you well-informed.</p>


                        <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
                        <p className="mt-2 mb-[40px]">At our website, our mission is to revolutionize how passengers interact with train travel. We recognize that knowing your train&apos;s speed can add an extra layer of insight and excitement to your trip. Our committed team of technology enthusiasts and train aficionados has collaborated to create a platform seamlessly integrating modern GPS capabilities with train travel, putting a world of information at your fingertips.</p>

                        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
                        <p className="mt-2 mb-[40px]">Our platform harnesses cutting-edge GPS technology on your mobile device to accurately calculate and display your train&apos;s current speed. Here&apos;s a simple breakdown:</p>


                        <p className="mt-2 mb-[20px]"><b>1. Simple Setup:</b> Just use a mobile device with GPS functionality; no additional downloads or installations required.</p>

                        <p className="mt-2 mb-[20px]"><b>2. Real-Time Tracking:</b> Once onboard the train, open our website in your mobile browser. The website will automatically detect your location and start tracking your train&apos;s speed.</p>

                        <p className="mt-2 mb-[40px]"><b>3. Instant Results:</b> Within seconds, access real-time information about your train&apos;s speed. Watch the speedometer rise as you journey through picturesque landscapes or slow down during brief station stops.</p>


                        <h2 className="text-2xl font-bold mb-6">Why Choose our website ?</h2>

                        <p className="mt-2 mb-[20px]"><b>1. Accuracy:</b> Our advanced GPS algorithms ensure you receive the most accurate and reliable speed information available.</p>
                        <p className="mt-2 mb-[20px]"><b>2. User-Friendly:</b> our website is designed with user simplicity in mind, making it accessible to anyone, regardless of technical expertise.</p>
                        <p className="mt-2 mb-[20px]"><b>3. Comprehensive Coverage:</b> Whether you&apos;re on high-speed rail, commuter trains, or scenic routes, our website works across various types of train journeys.</p>

                        <p className="mt-2 mb-[20px]"><b>4. Enhanced Travel Experience:</b> Forge a deeper connection with your train journey by understanding the dynamics of speed and movement.</p>

                        <p className="mt-2 mb-[40px]"><b>5. Free to Use:</b> Our contribution to making train travel engaging and informative for everyone; the service is entirely free to use.</p>



                        <h2 className="text-2xl font-bold mb-6">Join Us on this Journey</h2>
                        <p className="mt-2 mb-[40px]">We are passionate about elevating your train travel experience. Join us on this exciting journey of discovery as we continuously refine and expand our platform&apos;s features. At our website, we believe every train ride has a story to tell, and we are here to help you uncover the thrilling tale of speed, distance, and exploration.</p>
                        <p className="mt-2 mb-[40px]"> Thank you for choosing our website for your train speed tracking needs. Embark on your next train adventure with us and gain a new perspective on the world of rail travel.</p>

                        <p className="mt-2 mb-[40px]">All aboard the future of train speed tracking!</p>




                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}


export default About