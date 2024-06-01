import toast, { Toaster } from "react-hot-toast";
import AdminDashboard from "@/components/AdminDashboard";
import { useState, useEffect } from "react";
import { updateAllToDraft, updateAllToPublish } from "@/actions/blog";
import { getCookie } from "@/actions/auth";
const token = getCookie('token');

const BlogsBulk = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen0, setIsOpen0] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModel = () => {
        setIsOpen(false);
        setInputValue("");
    };

    const confirmdraft= () => {
        updateAllToDraft(token).then(data => {
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setIsOpen(false);
                setInputValue("");
            }
        });
        setIsOpen(false);
        setInputValue("");
    };


















    const handleInputChange0 = (event) => {
        setInputValue(event.target.value);
    };

    const showModal0 = () => {
        setIsOpen0(true);
    };

    const hideModel0 = () => {
        setIsOpen0(false);
        setInputValue("");
    };

    const confirmdraft0= () => {
        updateAllToPublish(token).then(data => {
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setIsOpen(false);
                setInputValue("");
            }
        });
        setIsOpen0(false);
        setInputValue("");
    };








    return (
        <AdminDashboard>
            <Toaster />

            <h2 className="3xl font-bold text-center mb-5">Convert All Articles To Draft</h2>
            <div className="flex justify-center">
                <button onClick={() => showModal()} type="submit" className="bg-slate-900 text-white tracking-wider px-3 py-2 font-semibold rounded-md hover:shadow-md transition-transform hover:scale-105 hover:text-[yellow] active:scale-95 text-sm mt-2">Submit</button>
            </div>




            <h2 className="3xl font-bold text-center mb-5 mt-[120px]">Convert All Articles To Publish</h2>
            <div className="flex justify-center">
                <button onClick={() => showModal0()} type="submit" className="bg-slate-900 text-white tracking-wider px-3 py-2 font-semibold rounded-md hover:shadow-md transition-transform hover:scale-105 hover:text-[yellow] active:scale-95 text-sm mt-2">Submit</button>
            </div>
















            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${isOpen ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg z-10">
                    <h2 className="text-lg font-semibold mb-4">Confirm Updation</h2>
                    <p className="mb-4">Are you sure you want to convert all to Draft</p>
                    <p className="mb-4">Type: <span className="font-bold">I want to update all articles to draft</span></p>

                    <input autoComplete="off" value={inputValue} onChange={handleInputChange} required name="name" type="text" placeholder="Name" className="border border-red-500 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none rounded-md" />

                    <div className="flex justify-end mt-8">
                        <button onClick={() => confirmdraft()}
                            className={`text-sm bg-red-600 mr-2 hover:bg-red-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded ${inputValue !== 'I want to update all articles to draft' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={inputValue !== 'I want to update all articles to draft'}
                        >
                            Yes
                        </button>

                        <button className="bg-slate-800 text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2"
                            onClick={hideModel}
                        >Cancel</button>
                    </div>
                </div>
            </div>
















            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${isOpen0 ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg z-10">
                    <h2 className="text-lg font-semibold mb-4">Confirm Updation</h2>
                    <p className="mb-4">Are you sure you want to convert all to publish</p>
                    <p className="mb-4">Type: <span className="font-bold">I want to update all articles to publish</span></p>

                    <input autoComplete="off" value={inputValue} onChange={handleInputChange0} required name="name" type="text" placeholder="Name" className="border border-red-500 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none rounded-md" />

                    <div className="flex justify-end mt-8">
                        <button onClick={() => confirmdraft0()}
                            className={`text-sm bg-red-600 mr-2 hover:bg-red-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded ${inputValue !== 'I want to update all articles to publish' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={inputValue !== 'I want to update all articles to publish'}
                        >
                            Yes
                        </button>

                        <button className="bg-slate-800 text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2"
                            onClick={hideModel0}
                        >Cancel</button>
                    </div>
                </div>
            </div>














        </AdminDashboard>
    );
}


export default BlogsBulk;

