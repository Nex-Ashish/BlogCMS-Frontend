import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function LoginButton({ title, onClick }) {
  return (
    <div className="p-1 border border-white/50 rounded-full self-start">
        <button onClick={onClick} className="flex items-center gap-2.5 bg-white rounded-full text-[#111] text-sm font-medium border border-purple-500/30 shadow-[0_0_15px_rgba(124,58,237,0.3)] pl-5 pr-2.5 py-2.5" >
        {title}
        <span className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center shrink-0">
            <FontAwesomeIcon icon={faArrowRight} className="text-white h-3 w-3" />
        </span>
        </button>
    </div>
  )
}