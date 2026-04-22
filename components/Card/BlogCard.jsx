"use client"
import Image from "next/image"
import personImage1 from "../../public/assets/personImage1.png"
import { useState } from "react"

const blogData = [
    {
        story: "Working with Virtual Dedicated Developers & Teams has been a game-changer for our business. They delivered high-quality work on time and exceeded expectations.",
        img: personImage1,
        name: "Emily Johnson",
    },
    {
        story: "I highly recommend Virtual Dedicated Developers & Teams for their exceptional communication and technical expertise. Truly reliable partners.",
        img: personImage1,
        name: "Michael Smith",
    },
    {
        story: "Choosing Virtual Dedicated Developers & Teams was the best decision we made. Their speed and quality are unmatched in the industry.",
        img: personImage1,
        name: "Sophia Williams",
    },
    {
        story: "Working with Virtual Dedicated Developers & Teams has been a game-changer for our business. They delivered high-quality work on time and exceeded expectations.",
        img: personImage1,
        name: "Emily Johnson",
    },
    {
        story: "I highly recommend Virtual Dedicated Developers & Teams for their exceptional communication and technical expertise. Truly reliable partners.",
        img: personImage1,
        name: "Michael Smith",
    },
    {
        story: "Choosing Virtual Dedicated Developers & Teams was the best decision we made. Their speed and quality are unmatched in the industry.",
        img: personImage1,
        name: "Sophia Williams",
    },
]

function BlogCard() {
    const [showFull, setShowFull] = useState(null)

    return (
        <>        
            <div className=" flex justify-between gap-8 flex-wrap items-center px-4">
                {blogData.map((user, index) => {
                    const isOpen = showFull === index
                    const shortText = user.story.slice(0, 90)

                    return (
                        <div key={index} className="cursor-pointer bg-white w-[320px] rounded-2xl p-7 flex flex-col items-center text-center border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" >
                            <div className="w-[72px] h-[72px] rounded-full ring-4 ring-indigo-100 overflow-hidden">
                                <Image src={user.img} width={72} height={72} alt={user.name} className="object-cover w-full h-full" />
                            </div>

                            <h2 className="mt-4 font-bold text-base text-slate-800 tracking-tight">
                                {user.name}
                            </h2>

                            <div className="mt-1 w-8 h-0.5 rounded-full bg-indigo-400" />

                            <p className="text-sm text-slate-500 mt-4 leading-relaxed font-light">
                                {isOpen ? user.story : `${shortText}...`}
                            </p>

                            <button
                                onClick={() => setShowFull(isOpen ? null : index)}
                                className="mt-4 text-sm cursor-pointer font-medium text-indigo-500 hover:text-indigo-700 tracking-widest transition-colors duration-200"
                            >
                                {isOpen ? "See less" : "See more"}
                            </button>
                        </div>
                    )
                })}
            </div>
        </>

    )
}

export default BlogCard