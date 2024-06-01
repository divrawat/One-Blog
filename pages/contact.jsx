import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DOMAIN, APP_NAME } from "@/config";
import Head from "next/head";

const Contact = () => {


    const description = "Thank you for reaching out to our Train Speed Test Tool. We value your feedback and inquiries. Please use the following information to get in touch with us."

    const head = () => (
        <Head>
            <title>Conatact</title>
            <meta name="description" content={description} />
            <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <link rel="canonical" href={`${DOMAIN}/contact`} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content={APP_NAME} />
            <meta property="og:title" content={`${APP_NAME} - Disclaimer`} />
            <meta property="og:description" content={description} />
            <meta property="og:url" href={`${DOMAIN}/contact`} />
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
                        <h1 className="text-center p-3 font-bold text-3xl">Contact</h1>

                        <p className="mt-2 mb-[40px]">Thank you for reaching out to our Twitter Trends Tools. We value your feedback and inquiries. Please use the following information to get in touch with us:</p>

                        <h2 className="text-3xl font-bold mb-6">General Inquiries</h2>
                        <p className="mt-2 mb-[10px]"><b>Email:</b> divrawat2001@gmail.com</p>
                        <p className="mt-2 mb-[40px]"><b>Phone:</b> Will Update Soon</p>



                        <h2 className="text-3xl font-bold mb-6">Customer Support</h2>
                        <p className="mt-2 mb-[30px]">For assistance with our products or services, please contact our customer support team:</p>
                        <p className="mt-2 mb-[10px]"><b>Email:</b> divrawat2001@gmail.com</p>
                        <p className="mt-2 mb-[40px]"><b>Phone:</b> Will Update Soon</p>



                        <h2 className="text-3xl font-bold mb-6">Business Enquiry</h2>
                        <p className="mt-2 mb-[30px]">For assistance with our products or services, please contact our customer support team:</p>
                        <p className="mt-2 mb-[10px]"><b>Email:</b> divrawat2001@gmail.com</p>
                        <p className="mt-2 mb-[10px]"><b>Phone:</b> Will Update Soon</p>


                    </div>
                </div>
            </div>
            <Footer />


        </>
    )
}


export default Contact