import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export default function SuccessMessageCard({ message }) {
    return (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-green-100 shadow-xl rounded-2xl px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 text-base" />
            </div>
            <p className="text-sm font-medium text-slate-700">{message}</p>
        </div>
    )
}