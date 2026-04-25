"use client"
import Image from "next/image"
import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getBlogs, deleteBlog } from "@/utils/blog/helper"
import EmptyCard from "./EmptyCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrash, faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import SuccessMessageCard from "./SuccessMessageCard"
import Loading from "./Loading"

const AVATAR_COLORS = [
    "bg-violet-100 text-violet-600",
    "bg-rose-100 text-rose-600",
    "bg-amber-100 text-amber-600",
    "bg-teal-100 text-teal-600",
    "bg-sky-100 text-sky-600",
    "bg-pink-100 text-pink-600",
]

function getAvatarColor(name = "") {
    const index = name.charCodeAt(0) % AVATAR_COLORS.length
    return AVATAR_COLORS[index]
}

function getInitials(name = "") {
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
}

function DeleteConfirmCard({ onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-[320px] flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={faTrash} className="text-red-400 text-base" />
                </div>
                <h3 className="text-slate-800 font-semibold text-base mb-1">Delete Blog</h3>
                <p className="text-slate-400 text-sm mb-6">Are you sure you want to delete this blog?</p>
                <div className="flex gap-3 w-full">
                    <button onClick={onCancel} className="flex-1 py-2 rounded-full border border-slate-200 text-slate-500 text-sm hover:bg-slate-50 transition-colors cursor-pointer">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="flex-1 py-2 rounded-full bg-red-500 text-white text-sm hover:bg-red-600 transition-colors cursor-pointer">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function BlogCard() {
    const [showFull, setShowFull] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [successMsg, setSuccessMsg] = useState("")
    const router = useRouter()
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()

    // const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    const token = typeof window !== "undefined" ? document.cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1] : null
    const isLoggedIn = !!token

    const category = searchParams.get("category")?.toLowerCase() || ""
    const userId = searchParams.get("userId") || ""

    const showSuccess = (msg) => {
        setSuccessMsg(msg)
        setTimeout(() => setSuccessMsg(""), 3000)
    }

    useEffect(() => {
        setShowFull(null)
        const fetchData = async () => {
            try {
                setLoading(true)
                setBlogs([])
                const data = await getBlogs(category)
                const allBlogs = data.blogs || []
                setBlogs(userId ? allBlogs.filter(b => b?.author?._id === userId) : allBlogs)
            } catch (err) {
                console.log(err)
                setBlogs([])
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [category, userId])

    const handleSeeMore = (index, isOpen) => {
        if (!isLoggedIn) {
            router.push("/auth/login")
            return
        }
        setShowFull(isOpen ? null : index)
    }

    const handleEdit = (blogId) => {
        router.push(`/user/editBlog?blogId=${blogId}`)
    }

    const handleConfirmDelete = async () => {
        try {
            await deleteBlog(deleteId)
            setBlogs(prev => prev.filter(b => b._id !== deleteId))
            showSuccess("Your blog has been successfully deleted.")
        } catch (err) {
            console.log(err)
        } finally {
            setDeleteId(null)
        }
    }

    if (loading) {
        return <Loading />
    }

    if (!loading && blogs.length === 0) {
        return (
            <Suspense fallback={<div className="text-center mt-10 text-slate-400 text-sm">Loading...</div>}>
                <EmptyCard />
            </Suspense>
        )
    }
    return (
        <>
            {deleteId && <DeleteConfirmCard onConfirm={handleConfirmDelete} onCancel={() => setDeleteId(null)} />}
            {successMsg && <SuccessMessageCard message={successMsg} />}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 py-8">
                {blogs.map((blog, index) => {
                    const isOpen = showFull === index
                    const shortText = blog.content?.slice(0, 100) || ""
                    const authorName = blog.author?.name || ""
                    const initials = getInitials(authorName)
                    const avatarColor = getAvatarColor(authorName)

                    return (
                        <div key={blog._id} className="bg-white rounded-2xl flex flex-col border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                            <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-slate-50">
                                <div className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden ring-2 ring-offset-1 ring-indigo-100">
                                    {blog.coverImage ? (
                                        <Image src={blog.coverImage} width={44} height={44} alt={blog.title} className="object-cover w-full h-full" />
                                    ) : (
                                        <div className={`w-full h-full flex items-center justify-center text-sm font-semibold ${avatarColor}`}>
                                            {initials}
                                        </div>
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-slate-800 truncate">{authorName}</p>
                                    <span className="text-xs text-indigo-400 font-medium">{blog.category?.title}</span>
                                </div>

                                {userId && (
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button onClick={() => handleEdit(blog._id)} className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center hover:bg-indigo-100 transition-colors cursor-pointer">
                                            <FontAwesomeIcon icon={faPen} className="text-indigo-400 text-xs" />
                                        </button>
                                        <button onClick={() => setDeleteId(blog._id)} className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer">
                                            <FontAwesomeIcon icon={faTrash} className="text-red-400 text-xs" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="px-5 py-4 flex flex-col flex-1">
                                <h2 className="font-bold text-sm text-slate-800 leading-snug mb-2">{blog.title}</h2>
                                <p className="text-sm text-slate-500 leading-relaxed font-light flex-1">
                                    {isOpen ? blog.content : `${shortText}...`}
                                </p>
                                <button onClick={() => handleSeeMore(index, isOpen)} className="mt-3 self-start text-xs cursor-pointer font-medium text-indigo-500 hover:text-indigo-700 tracking-widest uppercase transition-colors duration-200">
                                    {isOpen ? "See less" : "See more"}
                                </button>
                            </div>

                            {blog.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 px-5 pb-5">
                                    {blog.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="text-xs font-medium bg-indigo-50 text-indigo-500 px-2.5 py-0.5 rounded-full border border-indigo-100">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </>
    )
}