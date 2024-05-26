import { useEffect, useRef, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'

function App() {
  const id = window.location.href.split("/")[3];
  if (!id) {
    const randomId = Math.random().toString(36).substr(2, 6)
    window.location.href = window.location.href + randomId;
  }

  useEffect(()=>{
    axios.get(`https://shrib-clone-server.vercel.app/${id}`).then((res)=>{
      textContentRef.current.value = atob(res.data);
    })
  },[])


  const textContentRef = useRef();

  const handleDataUpload = () => {
    const textContent = textContentRef.current.value;
    toast.promise(
      axios.post(`https://shrib-clone-server.vercel.app/${id}`, { textContent: textContent }),
       {
         loading: 'Saving...',
         success: <b>Data Saved</b>,
         error: <b>Could not save.</b>,
       }
     );
  }

  return (
    <main className='relative bg-[#202020]'>
    <section className='flex justify-center items-center w-full h-fit'>
      <textarea name="" ref={textContentRef}  id="" placeholder="Enter Your Note Here....." className='focus:outline-none bg-[#202020] py-3 w-[50%] min-h-screen text-white bg care caret-white placeholder-slate-400 resize-none'></textarea>
    </section>
    <button onClick={()=>{
        handleDataUpload()
      }} className='top-4 right-10 absolute flex items-center gap-3 bg-red-400 hover:bg-white shadow-md px-5 py-2 rounded-lg duration-300 group hover:outline-1'>
        <img src="/save.png" alt="" className='w-6 h-6' />
        <h1 className='group-hover:text-black text-white'>SAVE</h1>
      </button>
    <div><Toaster/></div>
    </main>
  )
}

export default App
