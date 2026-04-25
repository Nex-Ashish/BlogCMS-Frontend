import RegisterCard from "../../../../components/Card/RegisterCard";

export default function Register() {
    return (
        <div className="min-h-screen py-3 lg:py-0 flex items-center justify-center bg-[#0f0f0f] relative px-4 overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-700/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
            
            <RegisterCard />
        </div>
    )
}