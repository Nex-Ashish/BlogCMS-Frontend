import { Suspense } from "react";
import CreateBlogForm from "../../../../../components/Card/CreateBlogForm";

export default function CreateBlog() {
    return(
        <div >
            <Suspense fallback={<div className="text-center mt-10 text-white/40 text-sm">Loading...</div>}>
                <CreateBlogForm customClassname="min-h-screen bg-white py-7" />
            </Suspense>
        </div>
    )
}