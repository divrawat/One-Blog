
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import fetch from "isomorphic-fetch";
import { DOMAIN } from "@/config";
import { getCookie } from '../../actions/auth';
const token = getCookie('token');
import { useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import AdminDashboard from "@/components/AdminDashboard";


function ImageGallary() {

    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_apiKey,
        authDomain: process.env.NEXT_PUBLIC_authDomain,
        projectId: process.env.NEXT_PUBLIC_projectId,
        storageBucket: process.env.NEXT_PUBLIC_storageBucket,
        messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
        appId: process.env.NEXT_PUBLIC_appId,
        measurementId: process.env.NEXT_PUBLIC_measurementId,
    };

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);


    const [file, setFile] = useState("");
    const [images, setImages] = useState([]);
    const [imagescount, setImagescount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [copiedStatus, setCopiedStatus] = useState({});

    const [ModalOpen, setModalOpen] = useState(false);
    const [currentBlogSlug, setCurrentBlogSlug] = useState("");



    useEffect(() => { if (file.length > 0) { handleUpload(); } }, [file]);
    useEffect(() => { fetchData(); }, [currentPage]);


    const showModal = (slug) => {
        setModalOpen(true);
        setCurrentBlogSlug(slug);
    };

    const hideModel = () => {
        setModalOpen(false);
        setCurrentBlogSlug("");
    };

    const handleConfirmDelete = () => {
        handledelete(currentBlogSlug);
        setModalOpen(false);
        document.body.style.overflow = 'auto';
    };



    const getImages = async (page) => {
        try {
            const response = await fetch(`${DOMAIN}/api/images/get?page=${page}`, { method: 'GET' });
            return await response.json();
        } catch (err) { return console.log(err); }
    };

    const fetchData = async () => {
        try {
            const data = await getImages(currentPage); setImages(data.data || []); setImagescount(data.totalImages || "0")
        } catch (error) { console.error('Error fetching images:', error); }
    };

    function handleChange(event) { const selectedFiles = event.target.files; setFile(selectedFiles); }

    const handleUpload = () => {
        for (let i = 0; i < file.length; i++) {
            const storageRef = ref(storage, `/newblogs/${file[i].name}-${Date.now()}`);
            const uploadTask = uploadBytesResumable(storageRef, file[i]);

            uploadTask.on("state_changed", () => { },
                (err) => { console.log(err); },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        saveUrlToMongoDB(url, token);
                        setImages(prevImages => [{ url, _id: Date.now() }, ...prevImages]);
                        // fetchData();
                    });
                });
        }
    };


    const saveUrlToMongoDB = async (url, token) => {
        try {
            const response = await fetch(`${DOMAIN}/api/images/upload`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ url })
            });
            return await response.json();
        } catch (err) { return console.log(err); }
    };


    const removeImage = async (url, token) => {
        try {
            const encodedUrl = encodeURIComponent(url);
            const response = await fetch(`${DOMAIN}/api/images/delete?url=${encodedUrl}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error(error); return { error: 'Failed to delete image' };
        }
    };

    const handleCopy = async (url) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopiedStatus(prevStatus => ({ ...prevStatus, [url]: true, }));
            setTimeout(() => { setCopiedStatus(prevStatus => ({ ...prevStatus, [url]: false, })); }, 2000);
        } catch (err) { console.error('Error copying to clipboard:', err); }
    };

    const handledelete = async (url) => {
        try {
            removeImage(url, token);
            const imageRef = ref(storage, url);
            await deleteObject(imageRef);
            fetchData();
        } catch (error) { console.error('Error Deleting:', error); }
    }


    const handlePageChange = (newPage) => { setCurrentPage(newPage); };



    return (
        <AdminDashboard>

            <div className="text-center">
                {imagescount ? (<h3 className="font-bold">Total &nbsp; Images &nbsp; - &nbsp; <span> {imagescount} </span></h3>) : (<></>)}
                <br />

                <div>
                    <label className="cursor-pointer mr-5 px-3 py-2 bg-[#1c2434] text-sm font-semibold tracking-wide text-white rounded-[8px] hover:text-[yellow]">
                        Upload Images
                        <input type="file" className="hidden" onChange={handleChange} multiple accept="image/*" />
                    </label>
                </div>
            </div>

            <br />

            <div className="text-center">
                <button className={`rounded-[8px] tracking-wide text-white mr-5 px-2 py-1 text-[12px] font-semibold ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1c2434] hover:text-[yellow] cursor-pointer hover:scale-105 active:scale-95  transistion-transform'
                    }`} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>

                <span>{currentPage}</span>

                <button className={`rounded-[8px] tracking-wide text-white ml-5 px-2 py-1 text-[12px] font-semibold ${currentPage >= Math.ceil(imagescount / 10) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1c2434] hover:text-[yellow] cursor-pointer hover:scale-105 active:scale-95  transistion-transform'
                    }`} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= Math.ceil(imagescount / 10)}>Next</button>
            </div>

            <div className="max-w-[1100px]" >
                <div className="flex mt-[18px] flex-row flex-wrap justify-center">
                    {images && images.map((image) => (
                        <div key={image._id} className="mb-8">
                            <img src={image.url} alt={image.description} loading="lazy" className="object-cover m-2.5 h-[160px] w-[170px]" />
                            <div className="text-center">
                                <button className="px-2 py-1 bg-[#1c2434] text-[12px] font-semibold tracking-wide text-white rounded-[8px] hover:scale-105 active:scale-95 hover:text-[yellow] transition-transform" onClick={() => handleCopy(image.url)}> {copiedStatus[image.url] ? 'URL Copied!' : 'Copy URL'}</button>

                                <div> <button className="px-2 py-1 mt-2 bg-[#1c2434] text-[12px] font-semibold tracking-wide text-white rounded-[8px] hover:scale-105 active:scale-95 hover:text-[yellow] transition-transform" onClick={() => showModal(image.url)} >Delete </button></div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>


            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${ModalOpen ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg z-10">
                    <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this Image ?</h2>


                    <div className="flex justify-end mt-8">
                        <button className="bg-slate-800 text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2" onClick={() => handleConfirmDelete()} >Delete</button>
                        <button className="bg-slate-800 text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2"
                            onClick={hideModel}>Cancel</button>

                    </div>
                </div>
            </div>



        </AdminDashboard>
    );
}

export default ImageGallary