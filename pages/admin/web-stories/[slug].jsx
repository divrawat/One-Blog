import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '@/actions/auth';
import slugify from 'slugify';
import { singleStory, updateStory } from '@/actions/story';
import { useRouter } from 'next/router';
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import dynamic from 'next/dynamic';
import toast, { Toaster } from "react-hot-toast";

const StoryUpdate = () => {
    const router = useRouter();
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: new FormData(),
        title: '',
        coverphoto: '',
        coverphotoheight: '',
        coverphotowidth: '',
        description: '',
        slug: '',
        link: '',
        ads: '',
        lastheading: '',
        lastimage: '',
        draft: 'Save Draft',
        publishstory: 'Update Story',
        slides: [],
    });

    const { error, success, formData, draft, publishstory, title, coverphoto, coverphotoheight, coverphotowidth, description, slug, slides, link, lastheading, lastimage, ads } = values;
    const token = getCookie('token');

    useEffect(() => {
        // setValues({ ...values, formData: new FormData() });
        initBlog();
    }, [router.query.slug]);


    const [message, setMessage] = useState('');

    const editStory = (e, status) => {
        e.preventDefault();
        formData.set('status', status);
        if (status === 'Draft') { setValues({ ...values, draft: 'Saving Draft...', loading: true }); }
        if (status === 'Publish') { setValues({ ...values, publishstory: 'Publishing...', loading: true }); }

        updateStory(formData, token, router.query.slug).then(data => {
            if (data.error) {
                setValues({ ...values }); setMessage(data.error)
                function removemsg() { setMessage("") } setTimeout(removemsg, 2500)
            }
            else {
                setValues({ ...values, success: `WebStory titled "${data.title}" is successfully updated` });

                if (status === 'Draft') { toast.success(`"${data.title}" is saved as draft`); }
                if (status === 'Publish') { toast.success(`A Web Story titled "${data.title}" is created`); }

                let postslug = slugify(slug).toLowerCase();
                function redirect() { Router.push(`/web-stories/${postslug}`); }
                setTimeout(redirect, 500)
            }
        });
    };

    const showError = () => (<div className="text-[red] mb-[20px]" >{message}</div>);
    const showSuccess = () => (<div className="text-[green] mb-[20px]">{success}</div>);

    const initBlog = (res) => {
        if (router?.query?.slug) {
            singleStory(router?.query?.slug).then(data => {
                // console.log(data);
                if (!data) {
                    if (!isAuth()) {
                        Router.push(`/signin`);
                    } else if (isAuth()?.role == 1) { Router.push(`/admin`); }
                    else if (isAuth()?.role !== 1) { Router.push(`/`); }
                } else {
                    setValues({ ...values, title: data?.webstory?.title, description: data?.webstory?.description, slug: data?.webstory?.slug, ads: data?.webstory?.ads, coverphoto: data?.webstory?.coverphoto, coverphotowidth: data?.webstory?.coverphotowidth, coverphotoheight: data?.webstory?.coverphotoheight, link: data?.webstory?.link, lastheading: data?.webstory?.lastheading, lastimage: data?.webstory?.lastimage, slides: data?.webstory?.slides });
                }
            });
        }
    };

    const handleAddSlide = () => {
        const updatedSlides = [...slides, { image: '', heading: '', paragraph: '', height: '', width: '' }];
        setValues({ ...values, slides: updatedSlides });
        formData.set('slides', JSON.stringify(updatedSlides));
    };

    const handleRemoveSlide = index => () => {
        const updatedSlides = [...slides];
        updatedSlides.splice(index, 1);
        setValues({ ...values, slides: updatedSlides });
        formData.set('slides', JSON.stringify(updatedSlides));
    };


    const handletitle = name => e => {
        const value = e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleSlideChange = (index, property) => e => {
        const updatedSlides = [...slides];
        updatedSlides[index] = { ...updatedSlides[index], [property]: e.target.value };
        setValues({ ...values, slides: updatedSlides });
        formData.set('slides', JSON.stringify(updatedSlides));
    };

    const boxShadowStyle = { boxShadow: '0 6px 24px 0 rgba(0, 0, 0, .05), 0 0 0 1px rgba(0, 0, 0, .08)' };



    const updateStoryForm = () => {
        return (
            <div className="bg-[#efeaea] min-h-[100vh]">
                <form onSubmit={editStory} >
                    <Toaster />
                    <div className="flex p-[20px]">
                        <div className="p-[20px] pl-[50px]">
                            {showError()}
                            {showSuccess()}

                            <button onClick={e => editStory(e, 'Draft')} type='submit' className="px-5 py-2 rounded bg-[black] text-[15px] mb-5 font-bold tracking-wider text-white hover:opacity-50">{draft}</button>

                            <br />

                            <button onClick={e => editStory(e, 'Publish')} type='submit' className="px-5 py-2 rounded bg-[black] text-[15px] mb-5 font-bold tracking-wider text-white hover:opacity-50">{publishstory}</button>

                            <div className='mb-2'>640w X 853h</div>
                            <div>
                                <input style={boxShadowStyle} className="p-[8px] text-[14px] w-[300px] mb-[25px] pl-[15px] h-[35px] outline-none rounded" placeholder='Cover Photo Link' value={coverphoto} onChange={handletitle("coverphoto")} />
                            </div>

                            <div className='flex gap-3'>
                                <input className="p-3 w-[100px] rounded outline-none text-sm" style={boxShadowStyle} type="number" value={coverphotowidth} onChange={handletitle("coverphotowidth")} placeholder="Width" /><span className='pt-2'>px</span>
                                <input className="p-3 w-[100px] rounded outline-none text-sm" style={boxShadowStyle} type="number" value={coverphotoheight} onChange={handletitle("coverphotoheight")} placeholder="Height" /> <span className='pt-2'>px</span>
                            </div>



                            <div className="mt-[30px]">
                                <textarea style={boxShadowStyle} className='text-[14px] w-[300px] h-[150px] p-[8px] border-none outline-none pl-[15px] rounded' placeholder='Description' value={description} onChange={handletitle("description")} />
                            </div>

                            <input style={boxShadowStyle} className="p-[8px] text-[14px] w-[300px] h-[35px] mt-[25px] border-none outline-none pl-[15px] rounded" value={slug} placeholder='slug' onChange={handletitle("slug")} />
                            <br /><br /> <br /><br />

                            <input style={boxShadowStyle} className="p-[8px] text-[14px] w-[300px] h-[35px] mt-[25px] border-none outline-none pl-[15px] rounded " value={ads} placeholder='Ads ?' onChange={handletitle("ads")} />

                            <br /><br /> <br /><br />
                            <input style={boxShadowStyle} className="p-[8px] text-[14px] w-[300px] h-[35px] mt-[25px] border-none outline-none pl-[15px] rounded " value={link} placeholder='Swipe Up Link' onChange={handletitle("link")} />
                            <input style={boxShadowStyle} className="p-[8px] text-[14px] w-[300px] h-[35px] mt-[25px] border-none outline-none pl-[15px] rounded " value={lastimage} placeholder='Lastimage' onChange={handletitle("lastimage")} />
                            <input style={boxShadowStyle} className="p-[8px] text-[14px] w-[300px] h-[35px] mt-[25px] border-none outline-none pl-[15px] rounded " value={lastheading} placeholder='Lastheading' onChange={handletitle("lastheading")} />
                        </div>



                        <div className="pt-[5px] pl-[20px] p-[50px] pr-[90px]">
                            <input placeholder='Web Story Title' className="w-[95%] text-[30px] font-bold mb-[30px] p-[12px] outline-none bg-[#efeaea] border-b border-gray-400" value={title} onChange={handletitle("title")} autoFocus={true} />
                            <div>
                                {slides?.map((slide, index) => (
                                    <div key={index} className="pb-[140px]">
                                        <div className="w-[80%]">
                                            <span className="bg-black w-[40px] rounded px-3 py-1 font-bold mx-auto mb-5 text-white text-center flex justify-center">{index + 1}</span>
                                        </div>
                                        <div className='font-bold mb-2'>Image</div>
                                        <input style={boxShadowStyle} className='text-[14px] block p-[7px] pl-[12px] mb-[25px] w-[80%] border-none outline-none rounded' placeholder="Image URL" type="text" value={slide?.image} onChange={handleSlideChange(index, 'image')} />
                                        <div className='font-bold mb-2'>Heading</div>
                                        <input style={boxShadowStyle} className='text-[14px] block p-[7px] pl-[12px] mb-[25px] w-[80%] border-none outline-none rounded' type="text" placeholder="Heading" value={slide?.heading} onChange={handleSlideChange(index, 'heading')} />
                                        <textarea style={boxShadowStyle} className='text-[14px] block p-[7px] pl-[12px] h-[100px] mb-[25px] w-[80%] border-none outline-none rounded' placeholder="Paragraph" value={slide?.paragraph} onChange={handleSlideChange(index, 'paragraph')} />

                                        <div className='flex gap-3'>
                                            <input className="p-3 w-[100px] rounded outline-none text-sm" style={boxShadowStyle} type="number" placeholder="Height" value={slide.height} onChange={handleSlideChange(index, 'height')} /> <span className='pt-2'>px</span>
                                            <input className="p-3 w-[100px] rounded outline-none text-sm" style={boxShadowStyle} type="number" placeholder="Width" value={slide.width} onChange={handleSlideChange(index, 'width')} /><span className='pt-2'>px</span>
                                        </div>


                                        <div className="ml-[800px] mt-[-165px]">
                                            <button type="button" onClick={handleRemoveSlide(index)} className=" bg-[black] p-[8px] text-white outline-none cursor-pointer mt-[10px] text-[18px] font-extrabold rounded hover:opacity-70 "> <MdDelete /> </button>
                                        </div>
                                    </div>
                                ))}
                                <button className="ml-[800px] mt-[-165px] bg-[black] p-[8px] hover:opacity-70 text-white outline-none cursor-pointer text-[17px] font-extrabold rounded" type="button" onClick={handleAddSlide}> <FaPlus /> </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    };



    const head = () => (<Head> <title>Update This Story</title> </Head>);

    return (
        <>
            {head()}
            {isAuth()?.role == 1 && (updateStoryForm())}
        </>
    );
};

// export default StoryUpdate;
export default dynamic(() => Promise.resolve(StoryUpdate), { ssr: false })