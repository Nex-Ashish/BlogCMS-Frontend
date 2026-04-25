"use client"
import { faNewspaper } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSearchParams } from "next/navigation"

export default function EmptyCard() {
    const searchParams = useSearchParams()
    const category = searchParams.get("category")

    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4 ring-4 ring-indigo-100">
                <FontAwesomeIcon icon={faNewspaper} className="text-2xl text-indigo-300" />
            </div>

            <h3 className="text-slate-700 font-semibold text-lg tracking-tight">
                No blogs found
            </h3>

            <p className="text-slate-400 text-sm mt-1.5 font-light max-w-xs leading-relaxed">
                {category
                    ? `No blogs available in the "${category}" category yet.`
                    : "No blogs available at the moment."}
            </p>

            <div className="mt-3 w-8 h-0.5 rounded-full bg-indigo-200" />
        </div>
    )
}