import BlogCard from "../../../../../components/Card/BlogCard";
import MainHeading from "../../../../../components/Heading/MainHeading";

export default function viewBlog() {
    return(
        <div className="pb-20">
            <MainHeading heading="View Your Blogs Here..." />

            <div className="w-full px-4 py-3 lg:py-20 lg:px-20 overflow-hidden">
                <BlogCard />
            </div>
        </div>
    )
}