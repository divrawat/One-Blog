import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { DOMAIN, APP_NAME } from "@/config";
import Link from "next/link";


const Disclaimer = () => {

    const description = "Thank you for visiting Our Website. By using our website, you agree to comply with and be bound by the following disclaimer. If you do not agree with any part of this disclaimer, please do not use our website."

    const head = () => (

        <Head>
            <title>Disclaimer</title>
            <meta name="description" content={description} />
            <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <link rel="canonical" href={`${DOMAIN}/disclaimer`} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content={APP_NAME} />
            <meta property="og:title" content={`${APP_NAME} - Disclaimer`} />
            <meta property="og:description" content={description} />
            <meta property="og:url" href={`${DOMAIN}/disclaimer`} />
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

                        <h1 className="text-center p-3 font-bold text-3xl">Disclaimer</h1>

                        <p className="mt-2 mb-[40px]">Thank you for visiting Our <Link href="/">Train Speed Test Tool</Link>. By using our website, you agree to comply with and be bound by the following disclaimer. If you do not agree with any part of this disclaimer, please do not use our website.</p>

                        <h2 className="text-2xl font-bold mb-6">1. Content Accuracy</h2>
                        <p className="mt-2 mb-[40px]">While we strive to provide accurate and up-to-date information on our website, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>


                        <h2 className="text-2xl font-bold mb-6">2. External Links</h2>
                        <p className="mt-2 mb-[40px]">Our website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>



                        <h2 className="text-2xl font-bold mb-6">3. Changes to the Website</h2>
                        <p className="mt-2 mb-[40px]">We reserve the right to modify, update, or discontinue our website at any time without prior notice. We are not liable for any consequences resulting from the unavailability of the website.</p>



                        <h2 className="text-2xl font-bold mb-6">4. No Professional Advice</h2>
                        <p className="mt-2 mb-[40px]">The information provided on this website is for general informational purposes only and is not intended as professional advice. You should not rely on the information on this website as an alternative to professional advice.</p>

                        <h2 className="text-2xl font-bold mb-6">5. Limitation of Liability</h2>
                        <p className="mt-2 mb-[40px]">In no event will we be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.</p>


                        <h2 className="text-2xl font-bold mb-6">6. Changes to the Disclaimer</h2>
                        <p className="mt-2 mb-[40px]">We reserve the right to amend or update this disclaimer at any time. Any changes will be posted on this page.</p>


                        <h2 className="text-2xl font-bold mb-6">7. Contact Information</h2>
                        <p className="mt-2 mb-[40px]">If you have any questions regarding this disclaimer, you can contact us at divrawat2001@gmail.com</p>


                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}


export default Disclaimer