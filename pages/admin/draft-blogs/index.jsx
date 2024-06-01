import AdminDashboard from '@/components/AdminDashboard';
import { useEffect, useState } from 'react';
import { API } from '@/config';
import { isAuth, getCookie } from "@/actions/auth";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { removeDraftBlog, draftlist } from "@/actions/blog";
import toast, { Toaster } from 'react-hot-toast';
import { TailSpin } from "react-loader-spinner";

const token = getCookie('token');

const AllBlogs = () => {

    const [blogs, setblogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogscount, setblogscount] = useState(0);
    const [currentuserID, setcurrentuserID] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setloading] = useState(false);

    const [inputValue, setInputValue] = useState('');

    const showModal = (user) => {
        setIsOpen(true);
        setcurrentuserID(user);
    };

    const hideModel = () => {
        setIsOpen(false);
        setcurrentuserID([]);
        setInputValue("");
    };


    const handleConfirmDelete = (slug) => {
        handledelete(slug);
        setIsOpen(false);
        setcurrentuserID([]);
        setInputValue("");
        setloading(true);
    };



    const handledelete = async (slug) => {
        try {
            const data = await removeDraftBlog(slug, token);
            if (data && data.error) {
                toast.error(data.error);
                setloading(false);
            } else {
                setloading(false);
                toast.success(data.message);
                setTimeout(() => { fetchData(); }, 350);
            }
        } catch (error) {
            console.error("Error while deleting user:", error);
        }
    };





    const fetchData = async () => {
        try {
            const data = await draftlist(currentPage, searchQuery, token); setblogs(data?.data); setblogscount(data?.totalBlogs)
            console.log(data.data);
        } catch (error) { console.error('Error fetching Blogs:', error); }
    };

    const formatCreatedAt = (isoDateString) => {
        const date = new Date(isoDateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
    };

    const handlePageChange = (newPage) => { setCurrentPage(newPage); };

    // useEffect(() => { fetchData(); }, [currentPage]);

    const [searchQuery, setSearchQuery] = useState('');
    const handleChangeSearch = (e) => { setSearchQuery(e.target.value); setCurrentPage(1); };
    useEffect(() => { setTimeout(() => { fetchData(); }, 500) }, [currentPage, searchQuery]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };


    return (
        <AdminDashboard>
            <Toaster />
            {loading && <div className='flex justify-center'>
                <TailSpin color="black" height="30" width="30" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="" visible={true} />
            </div>}

            <div className="text-center text-sm mb-2">Total Articles &nbsp;-&nbsp; {blogscount}</div>

            <input type="search" id="default-search" className="outline-none block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Articles"
                value={searchQuery} onChange={handleChangeSearch} />


            {/* <div className="flex justify-center items-center gap-10 mt-5 text-sm ">
                <button className="px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 cursor-pointer transition-transform" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>

                <span className="text-black">{currentPage}</span>

                <button className="px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 cursor-pointer transition-transform" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div> */}

            <div className="flex justify-center items-center gap-10 mt-5 text-sm ">
                <button className="px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 cursor-pointer transition-transform" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span className="text-black">{currentPage}</span>
                <button className={`px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 transition-transform ${((currentPage * 10) >= blogscount) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => handlePageChange(currentPage + 1)} disabled={(currentPage * 10) >= blogscount}>Next</button>
            </div>


            {blogscount === 0 && <div className="text-center text-[black] mt-10 text-lg font-bold">No Articles Found</div>}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Publish Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Author
                            </th>

                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>


                        {blogs && blogs.map((blog, index) => (

                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div>{blog.title}</div>
                                </th>
                                <td className="px-6 py-4">
                                    {formatCreatedAt(blog.date)}
                                </td>
                                <td className="px-6 py-4">
                                    {blog.postedBy.name}
                                </td>


                                <td className="flex items-center gap-10 px-6 py-4">
                                    <div className="cursor-pointer text-black"> <a target="_blank" href={`/admin/draft/${blog.slug}`}> <FaEdit size={20} /></a></div>
                                    <div className="cursor-pointer text-[red]" onClick={() => showModal(blog)}>  <MdDelete size={20} /></div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>



            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${isOpen ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg z-10">
                    <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                    <p className="mb-4">Are you sure you want to delete &nbsp;<span className="font-bold text-xl">{currentuserID.title}</span></p>
                    <div className="text-sm text-[#d35e5e]">Type the name of the Article</div>
                    <input autoComplete="off" value={inputValue} onChange={handleInputChange} required name="name" type="text" placeholder="Name" className="border border-red-500 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none rounded-md" />

                    <div className="flex justify-end mt-8">
                        <button disabled={inputValue !== currentuserID.title} onClick={() => handleConfirmDelete(currentuserID.slug)} className={`text-sm bg-red-600 mr-2 hover:bg-red-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded ${inputValue !== currentuserID.title ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            Delete
                        </button>
                        <button className="bg-slate-800 text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2"
                            onClick={hideModel}
                        >Cancel</button>
                    </div>
                </div>
            </div>







        </AdminDashboard>
    )
}



export default AllBlogs