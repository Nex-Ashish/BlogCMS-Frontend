"use client"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTag, faImage, faLayerGroup, faPaperPlane, faEye } from "@fortawesome/free-solid-svg-icons"
import { createBlog, updateBlog } from "@/utils/blog/helper"
import SuccessMessageCard from "./SuccessMessageCard"
import { fetchCategories } from "@/utils/category/helper"

export default function CreateBlogForm({ blogId: propBlogId, onSuccess }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const blogId = propBlogId || searchParams.get("blogId")
  const isEdit = !!blogId
  const [categories, setCategories] = useState([])
  const [existingImage, setExistingImage] = useState("")

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    image: null,
    isPublic: true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState("")

  const editor = useEditor({
    extensions: [StarterKit],
    content: form.content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
        setForm(prev => ({ ...prev, content: editor.getHTML() }))
    },
  })

  useEffect(() => {
    if (!propBlogId) return
    const fetchBlog = async () => {
        try {
        const token = document.cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1]
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${propBlogId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        const blog = data.blog || data
        // console.log(blog,'blog-data')
        setExistingImage(blog.coverImage || "")
        setForm({
            title: blog.title || "",
            content: blog.content || "",
            category: blog.category?.title || "",
            tags: blog.tags?.join(", ") || "",
            image: null,
            isPublic: blog.isPublic ?? true,
        })
        editor?.commands.setContent(blog.content || "")
        } catch (err) {
        console.log(err)
        }
    }
    fetchBlog()
    }, [propBlogId, editor])

  const showSuccess = (msg) => {
    setSuccessMsg(msg)
    setTimeout(() => {
      setSuccessMsg("")
      if (onSuccess) onSuccess()
      else router.push("/user")
    }, 2500)
  }

  useEffect(() => {
    const getCategories = async () => {
        try {
        const data = await fetchCategories()
        setCategories(data)
        } catch (err) {
        console.log(err)
        }
    }
    getCategories()
  }, [])

  const handleSubmit = async () => {
    setError(null)
    setLoading(true)
    try {
      const tagsArray = form.tags.split(",").map(t => t.trim()).filter(Boolean)

      if (isEdit) {
        const formData = new FormData()
        formData.append("title", form.title)
        formData.append("content", form.content)
        formData.append("category", form.category)
        formData.append("tags", JSON.stringify(tagsArray))
        formData.append("isPublic", form.isPublic)
        if (form.image) formData.append("coverImage", form.image)
        await updateBlog(blogId, formData)
        showSuccess("Your blog has been updated successfully.")
      } else {
        const formData = new FormData()
        formData.append("title", form.title)
        formData.append("content", form.content)
        formData.append("category", form.category)
        formData.append("tags", JSON.stringify(tagsArray))
        formData.append("isPublic", form.isPublic)
        if (form.image) formData.append("image", form.image)
        await createBlog(formData)
        showSuccess("Your blog has been published successfully.")
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const toolbarButtons = [
    { label: "B", action: () => editor.chain().focus().toggleBold().run(), active: editor?.isActive("bold") },
    { label: "I", action: () => editor.chain().focus().toggleItalic().run(), active: editor?.isActive("italic") },
    { label: "H1", action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor?.isActive("heading", { level: 1 }) },
    { label: "H2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive("heading", { level: 2 }) },
    { label: "• List", action: () => editor.chain().focus().toggleBulletList().run(), active: editor?.isActive("bulletList") },
    { label: "1. List", action: () => editor.chain().focus().toggleOrderedList().run(), active: editor?.isActive("orderedList") },
    { label: "❝", action: () => editor.chain().focus().toggleBlockquote().run(), active: editor?.isActive("blockquote") },
  ]

  const fields = [
    {
      icon: faPen,
      label: "Title",
      node: (
        <input
          type="text"
          placeholder="Your blog title..."
          maxLength={20}
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="w-full bg-white/10 border border-white/10 text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      ),
    },
    {
        icon: faLayerGroup,
        label: "Category",
        node: (
            <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
            <option value="" disabled className="bg-[#1a1a2e]">Select a category...</option>
            {categories.map(cat => (
                <option key={cat._id} value={cat.title} className="bg-[#1a1a2e]">
                {cat.title}
                </option>
            ))}
            </select>
        ),
    },
    {
      icon: faTag,
      label: "Tags",
      hint: "comma separated",
      node: (
        <input
          type="text"
          placeholder="travel, nature, hiking"
          value={form.tags}
          onChange={e => setForm({ ...form, tags: e.target.value })}
          className="w-full bg-white/10 border border-white/10 text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      ),
    },
    ...(!isEdit ? [
      {
        icon: faImage,
        label: "Cover Image",
        node: (
          <div>
            {existingImage && (
              <div className="mb-2">
                <Image src={existingImage} alt="current" className="rounded-xl object-cover w-20 h-20" />
                <p className="text-white/30 text-xs mt-1">Current image — upload new to replace</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={e => setForm({ ...form, image: e.target.files[0] })}
              className="w-full bg-white/10 border border-white/10 text-white/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-indigo-500/20 file:text-indigo-300 cursor-pointer"
            />
          </div>
        ),
      },
    ] : []),
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0d0614] to-black px-4 sm:px-6 lg:px-20 py-16">
      {successMsg && <SuccessMessageCard message={successMsg} />}

      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-1">
          {isEdit ? "Edit Blog" : "Create Blog"}
        </h1>
        <p className="text-white/40 text-sm mb-8">
          {isEdit ? "Update your blog details below." : "Fill in the details and publish your blog."}
        </p>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="flex flex-col gap-5 mb-6">
          {fields.map((field) => (
            <div key={field.label}>
              <label className="flex items-center gap-2 text-xs font-semibold text-white/50 mb-2">
                <FontAwesomeIcon icon={field.icon} className="h-3 w-3 text-indigo-400" />
                {field.label}
                {field.hint && <span className="text-white/25 font-normal">({field.hint})</span>}
              </label>
              {field.node}
            </div>
          ))}

          {/* Visibility Toggle */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-white/50 mb-2">
              <FontAwesomeIcon icon={faEye} className="h-3 w-3 text-indigo-400" />
              Visibility
            </label>
            <button
              type="button"
              onClick={() => setForm({ ...form, isPublic: !form.isPublic })}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-colors
                ${form.isPublic
                  ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-300"
                  : "bg-white/5 border-white/10 text-white/40"
                }`}
            >
              <div className={`w-8 h-4 rounded-full transition-colors relative ${form.isPublic ? "bg-indigo-500" : "bg-white/20"}`}>
                <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${form.isPublic ? "left-4" : "left-0.5"}`} />
              </div>
              {form.isPublic ? "Public — everyone can see this" : "Private — only you can see this"}
            </button>
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-white/50 mb-2">
              <FontAwesomeIcon icon={faPen} className="h-3 w-3 text-indigo-400" />
              Content
            </label>
            <div className="rounded-xl overflow-hidden border border-white/10 bg-white">
              <div className="flex gap-2 px-3 py-2 border-b border-slate-200 bg-slate-50 flex-wrap">
                {toolbarButtons.map((btn) => (
                  <button
                    key={btn.label}
                    type="button"
                    onClick={btn.action}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors
                      ${btn.active
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
              <EditorContent
                editor={editor}
                className="prose prose-sm max-w-none px-4 py-3 min-h-[200px] text-slate-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !form.title || !form.content}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2
            ${!loading && form.title && form.content
              ? "bg-indigo-600 text-white hover:bg-indigo-500"
              : "bg-white/5 text-white/30 cursor-not-allowed"
            }`}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="h-3.5 w-3.5" />
          {loading
            ? (isEdit ? "Updating..." : "Publishing...")
            : (isEdit ? "Update Blog" : "Publish Blog")
          }
        </button>
      </div>
    </div>
  )
}