export default function Button({title, customClassName, onClick}) {
    const defaultClass = "cursor-pointer flex-1 py-2.5 rounded-full bg-[#7C3AED] text-white text-sm";
    return(
        <button onClick={onClick} className={customClassName ? customClassName : defaultClass}>
            {title}
        </button>
    )
}