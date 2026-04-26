"use client"

import { useRouter } from "next/navigation"

export default function CreateBlogButton() {
  const router = useRouter()
  const handleCreate = () => {
    // const token = localStorage.getItem('token')
    const token = document.cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1]
    if(token){
      router.push('/user/createBlog')
    }else{
      router.push('/auth/login')
    }
  }
    return (
        <div className="flex justify-end ">
            <button onClick={handleCreate} className="group flex items-center gap-2 px-5 py-3 rounded-full bg-[#7C3AED] text-white text-sm font-medium shadow-lg shadow-purple-200 hover:bg-[#6D28D9] hover:shadow-purple-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 whitespace-nowrap" >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-base leading-none group-hover:rotate-90 transition-transform duration-300">
                +
              </span>
              Create Blog
            </button>
        </div>
    )
}