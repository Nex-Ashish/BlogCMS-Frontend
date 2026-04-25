export default function MainHeading({ heading }) {
    return (
        <div className="flex justify-center pt-20">
            <span className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-600 text-sm font-medium px-5 py-2 rounded-full tracking-wide">
                {heading}
            </span>
        </div>
    )
}