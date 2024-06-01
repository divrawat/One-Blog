import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DOMAIN, URL, APP_NAME } from "@/config";
import Head from "next/head";
import Link from "next/link";

const PrivacyPolicy = () => {


    const description = "Thanks you for visiting our website. This Privacy Policy is designed to help you understand how we collect, use, disclose, and safeguard your personal information when you visit our website or use our services through Google AdSense. By accessing or using our website, you consent to the practices described in this Privacy Policy."

    const head = () => (
        <Head>
            <title>Privacy Policy</title>
            <meta name="description" content={description} />
            <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <link rel="canonical" href={`${DOMAIN}/privacy-policy`} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content={APP_NAME} />
            <meta property="og:title" content={`${APP_NAME} - Privacy Policy`} />
            <meta property="og:description" content={description} />
            <meta property="og:url" href={`${DOMAIN}/privacy-policy`} />
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
                        <h1 className="text-center p-3 font-bold text-3xl">Privacy Policy</h1>

                        <p className="mt-2 mb-[40px]">Thanks you for visiting our <Link href="/">Train Speed Test Tool</Link>. This Privacy Policy is designed to help you understand how we collect, use, disclose, and safeguard your personal information when you visit our website or use our services through Google AdSense. By accessing or using our website, you consent to the practices described in this Privacy Policy.</p>

                        <h2 className="text-2xl font-bold mb-6">Information We Collect</h2>

                        <p className="mt-2 mb-[20px]"> When you visit our website, we may collect certain information from and about you, which includes:</p>

                        <p className="mt-2 mb-[20px]">Personal Information: We do not directly gather personal information such as your name, address, phone number, or email address through our website.</p>
                        <p className="mt-2 mb-[40px]">Non-Personal Information: For analytical purposes aimed at enhancing our website&apos;s functionality and user experience, we may collect non-personal information about your visit. This may include your IP address, browser type, device information, operating system, referring/exit pages, and clickstream data.</p>


                        <h2 className="text-2xl font-bold mb-6">Cookies and Tracking Technologies</h2>

                        <p className="mt-2 mb-[40px]">We utilize cookies, web beacons, and similar tracking technologies to gather information about your interactions with our website. These tools assist in analyzing trends, administering the site, tracking user movements around the site, and compiling demographic information.</p>

                        <h2 className="text-2xl font-bold mb-6">Google AdSense</h2>


                        <p className="mt-2 mb-[40px]">On our website, Google AdSense is implemented to display advertisements. Google AdSense utilizes cookies to serve ads based on your visits to our site and other internet locations. The use of advertising cookies by Google and its partners allows them to deliver ads to you based on your visits to our site and/or other sites on the Internet.</p>

                        <h2 className="text-2xl font-bold mb-6">Third-Party Links</h2>

                        <p className="mt-2 mb-[40px]">Our website may contain links to third-party websites or services that are not under our ownership or control. We do not assume responsibility for the privacy practices or content of these third-party sites and encourage you to review their privacy policies.</p>

                        <h2 className="text-2xl font-bold mb-6">Your Choices</h2>

                        <p className="mt-2 mb-[40px]">You have the option to disable or block cookies orlocation through your browser settings. However, please be aware that disabling cookies may impact the functionality and user experience of our website.</p>

                        <h2 className="text-2xl font-bold mb-6">Children’s Privacy</h2>

                        <p className="mt-2 mb-[40px]">Our website is not intended for individuals under the age of 13. We do not knowingly collect or solicit personal information from anyone under 13 years old. If you are under 13, please refrain from using our website or providing any personal information.</p>


                        <h2 className="text-2xl font-bold mb-6">Changes to This Privacy Policy</h2>


                        <p className="mt-2 mb-[40px]"> To reflect changes in our practices or for operational, legal, or regulatory reasons, we may periodically update this Privacy Policy. The revised policy will be posted on this page with an updated “Effective Date.”</p>



                        <h2 className="text-2xl font-bold mb-6"> Contact Us</h2>

                        <p className="mt-2 mb-[40px]">If you have any questions about this Privacy Policy, please reach out to us via our contact page.</p>


                        <p className="mt-2 mb-[40px]">By using our website, you acknowledge that you have read and comprehended this Privacy Policy, agreeing to its terms and conditions.</p>

                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}


export default PrivacyPolicy