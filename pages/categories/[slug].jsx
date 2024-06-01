import Head from 'next/head';
import { singleCategory } from '../../actions/category';
import { DOMAIN, APP_NAME } from '../../config';
import Card from '@/components/Card';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Category = ({ category, blogs, query, errorCode, totalCount }) => {

    if (errorCode) {
        return (
            <>
                <Navbar />
                <div>
                    <br />
                    <div className="flex justify-center items-center h-[70vh]">
                        <img src="/images/404.jpg" className="max-w-full max-h-full" alt="" />
                    </div>
                    <div className=' text-center font-bold text-5xl mb-10'>Page Not Found</div>
                </div>
                <Footer />
            </>
        );
    }

    const head = () => (
        <Head>
            <title>{`${category.name} - ${APP_NAME}`}</title>
            <meta name="description" content={`Best programming tutorials on ${category.name}`} />
            <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:title" content={`${category.name}| ${APP_NAME}`} />
            <meta name="robots" content="index, follow" />
            <meta property="og:description" content={`Best programming tutorials on ${category.name}`} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
        </Head>
    );

    const showAllBlogs = () => {
        return blogs.map((blog, i) => (
            <article key={i}><Card blog={blog} /></article>
        ));
    };

    return (
        <>
            {head()}
            <Navbar />
            <main className='dark:bg-[#10141c] dark:text-[#cecdcd]'>
                <h1 className='text-3xl font-bold text-center py-5 dark:text-white'>{`${category.name}`}</h1>
                <div className='text-center mb-5'>Total Articles - <span className='font-bold'> {totalCount}</span></div>
                <div className=' max-w-[1200px] flex sm:gap-[70px] gap-5 md:mt-10 mt-3 pb-5 justify-center mx-auto flex-wrap'>{showAllBlogs()}</div>
                <br /> <br />
            </main>
            <Footer />
        </>
    );
};

export async function getServerSideProps({ query, res }) {
    try {
        const data = await singleCategory(query.slug);
        if (data.error) { res.statusCode = 404; return { props: { errorCode: 404 } }; }
        const formattedBlogs = data.blogs.map(blog => ({ ...blog, formattedDate: format(new Date(blog.date), 'dd MMMM, yyyy') }));
        return { props: { category: data.category, blogs: formattedBlogs, query, totalCount: data.totalCount } };
    } catch (error) {
        console.error(error);
        return { props: { errorCode: 500 } };
    }
}

export default Category;
