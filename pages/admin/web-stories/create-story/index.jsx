import { useState } from 'react';
import { getCookie, isAuth } from '@/actions/auth';
import { createwebstory } from '@/actions/story';
import slugify from 'slugify';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

import { useRouter } from 'next/navigation';

const CreateStory = () => {
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
        publishstory: 'Publish',
        slides: Array(7).fill({ image: '', heading: '', paragraph: '', height: '', width: '' }),
    });

    const { error, success, formData, publishstory, draft, title, coverphoto, coverphotowidth, coverphotoheight, description, slug, slides, link, lastheading, lastimage, ads } = values;
    const token = getCookie('token');


    const showError = () => (
        <div className="text-[red] mb-[20px]" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="text-[green] mb-[20px]" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );





    const handleAddSlide = () => {
        const updatedSlides = [...slides, { image: '', heading: '', paragraph: '' }];
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


    const publishwebstory = (e, status) => {
        e.preventDefault();
        formData.set('status', status);

        if (status === 'Draft') { setValues({ ...values, draft: 'Saving Draft...', loading: true }); }
        if (status === 'Publish') { setValues({ ...values, publishstory: 'Publishing...', loading: true }); }


        createwebstory(formData, token).then(data => {
            if (data.error) { setValues({ ...values, error: data.error }); }
            else {
                setValues({ ...values, title: '', link: '', description: '', link: '', slides: [], coverphoto: '', coverphotowidth: '', coverphotoheight: '', ads: '', slug: '', error: '', success: `` });

                if (status === 'Draft') { toast.success(`"${data.title}" is saved as draft`); }
                if (status === 'Publish') { toast.success(`A Web Story titled "${data.title}" is Published`); }

                let storyslug = slugify(slug).toLowerCase();
                function redirect() {
                    router.push(`/web-stories/${storyslug}`);
                }
                setTimeout(redirect, 200)
            }
        });
    };

    const boxShadowStyle = {
        boxShadow: '0 6px 24px 0 rgba(0, 0, 0, .05), 0 0 0 1px rgba(0, 0, 0, .08)'
    };


    return (
        <div className="bg-[#efeaea] min-h-[100vh]">
            <form onSubmit={publishwebstory} >
                <Toaster />
                <div className="flex p-[20px]">
                    <div className="p-[20px] pl-[50px]">
                        {showError()}
                        {showSuccess()}

                        <button onClick={e => publishwebstory(e, 'Draft')} type='submit' className="px-5 py-2 rounded bg-[black] text-[15px] mb-5 font-bold tracking-wider text-white hover:opacity-50">{draft}</button>

                        <br />

                        <button onClick={e => publishwebstory(e, 'Publish')} type='submit' className="px-5 py-2 rounded bg-[black] text-[15px] mb-5 font-bold tracking-wider text-white hover:opacity-50">{publishstory}</button>


                        <div className='mb-2'>640w X 853h</div>
                        <div>  <input style={boxShadowStyle} className="p-[8px] text-[14px] w-[300px] mb-[25px] pl-[15px] h-[35px] outline-none rounded" placeholder='Cover Photo Link' value={coverphoto} onChange={handletitle("coverphoto")} /></div>



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
                        <br /><br />

                        <input style={boxShadowStyle} className="p-[8px] text-[14px] w-[300px] h-[35px] mt-[25px] border-none outline-none pl-[15px] rounded " value={link} placeholder='Swipe Up Link' onChange={handletitle("link")} />
                        <input style={boxShadowStyle} className="p-[8px] text-[14px] w-[300px] h-[35px] mt-[25px] border-none outline-none pl-[15px] rounded " value={lastimage} placeholder='Image' onChange={handletitle("lastimage")} />
                        <input style={boxShadowStyle} className="p-[8px] text-[14px] w-[300px] h-[35px] mt-[25px] border-none outline-none pl-[15px] rounded " value={lastheading} placeholder='Heading' onChange={handletitle("lastheading")} />


                    </div>



                    <div className="pt-[5px] pl-[20px] p-[50px] pr-[90px]">

                        <input placeholder='Web Story Title' className="w-[95%] text-[30px] font-bold mb-[30px] p-[12px] outline-none bg-[#efeaea] border-b border-gray-400" value={title} onChange={handletitle("title")} autoFocus={true} />

                        <div>
                            {slides.map((slide, index) => (
                                <div key={index} className="pb-[140px]">
                                    <div className="w-[80%]">
                                        <span className="bg-black w-[40px] rounded px-3 py-1 font-bold mx-auto mb-5 text-white text-center flex justify-center">{index + 1}</span>
                                    </div>


                                    <input style={boxShadowStyle} className='text-[14px] block p-[7px] pl-[12px] mb-[25px] w-[80%] border-none outline-none rounded' type="text" placeholder="Image URL" value={slide.image} onChange={handleSlideChange(index, 'image')} />
                                    <input style={boxShadowStyle} className='text-[14px] block p-[7px] pl-[12px] mb-[25px] w-[80%] border-none outline-none rounded' type="text" placeholder="Heading" value={slide.heading} onChange={handleSlideChange(index, 'heading')} />
                                    <textarea style={boxShadowStyle} className='text-[14px] block p-[7px] pl-[12px] h-[100px] mb-[25px] w-[80%] border-none outline-none rounded' placeholder="Paragraph" value={slide.paragraph} onChange={handleSlideChange(index, 'paragraph')} />

                                    <div className='flex gap-3'>
                                        <input className="p-3 w-[100px] rounded outline-none text-sm" style={boxShadowStyle} type="number" placeholder="Width" value={slide.width} onChange={handleSlideChange(index, 'width')} /><span className='pt-2'>px</span>
                                        <input className="p-3 w-[100px] rounded outline-none text-sm" style={boxShadowStyle} type="number" placeholder="Height" value={slide.height} onChange={handleSlideChange(index, 'height')} /> <span className='pt-2'>px</span>
                                    </div>

                                    <div className="ml-[800px] mt-[-165px]">
                                        <button type="button" onClick={handleRemoveSlide(index)} className=" bg-[black] p-[8px] text-white outline-none cursor-pointer mt-[10px] text-[18px] font-extrabold rounded hover:opacity-70 "> <MdDelete /> </button>
                                    </div>

                                </div>
                            ))}
                            <button className="ml-[800px] mt-[-165px] bg-[black] p-[8px] hover:opacity-70 text-white outline-none cursor-pointer text-[17px] font-extrabold rounded" type="button" onClick={handleAddSlide}> <FaPlus /> </button>



                        </div>


                    </div>


                    {/* ---------------------------------------------------------------------------------------------------------------------- */}


                </div>
            </form>
        </div>
    )

};

export default CreateStory