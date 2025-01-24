import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DOMAIN, URL, APP_NAME } from "@/config";
import Head from "next/head";
import Link from "next/link";

const PrivacyPolicy = () => {


    const description = "This website is for sale"

    const head = () => (
        <Head>
            <title>Website For Sale</title>
            <meta name="description" content={description} />
            <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <link rel="canonical" href={`${DOMAIN}/website-for-sale`} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content={APP_NAME} />
            <meta property="og:title" content={`${APP_NAME} - Website For Sale`} />
            <meta property="og:description" content={description} />
            <meta property="og:url" href={`${DOMAIN}/website-for-sale`} />
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


                        <h1 className="text-center p-3 font-bold text-3xl">Website For Sale</h1>


                        <p className="mt-2 mb-[20px]">This Website is for Sale.</p>
                        <p className="mt-2 mb-[40px]">Contact Email: divrawat2001@gmail.com</p>






                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}


export default PrivacyPolicy