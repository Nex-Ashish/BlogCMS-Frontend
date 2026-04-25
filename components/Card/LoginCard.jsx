"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loginIcon from "../../public/assets/loginIcon.png"
import { loginUser } from "@/utils/auth/helper";

export default function LoginCard(  ) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSignup = () => {
    router.push('/auth/register')
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      // localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}; path=/; max-age=604800`;

      const payload = JSON.parse(atob(data.token.split(".")[1]));
      const role = payload?.role;

      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/user");
      }

    } catch (err) {
      setError(err.message);
    }
  };

  const isReady = email && password;

  return (
    <div className="relative w-full max-w-4xl lg:min-h-[420px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">

      <div className="md:w-1/2 h-56 md:h-auto bg-gradient-to-br from-indigo-500/80 to-purple-700/80 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-900/40" />
        <div className="relative text-center text-white px-8 z-10 flex flex-col items-center justify-center h-full">
            <Image src={loginIcon} alt="loginIcon" width={110} height={110} className=" mx-auto mb-5" />
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-indigo-200 text-sm mt-2">
                Sign in to continue your journey
            </p>
        </div>
      </div>

      <div className="md:w-1/2 flex flex-col justify-center px-8 py-12 lg:py-16">
        <p className="text-2xl font-bold text-white mb-1">Sign In</p>
        <p className="text-white/40 text-sm mb-8">
          Don't have an account?{" "}
          <button  onClick={handleSignup} className="text-indigo-400 cursor-pointer hover:text-indigo-300">Sign up</button>
        </p>

        {error && ( <p className="text-red-400 text-xs mb-3 ">{error}</p> )}

        <label className="text-xs font-semibold text-white/50 mb-2 block">
          Email Address
        </label>
        <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/10 border border-white/10 text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4" />

        <label className="text-xs font-semibold text-white/50 mb-2 block">
          Password
        </label>
        <div className="relative mb-2">
          <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/10 border border-white/10 text-white placeholder-white/25 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 text-base" >
            {
                showPassword ?
                    <FontAwesomeIcon icon={faEye} />
                :
                    <FontAwesomeIcon icon={faEyeSlash} />
            }
          </button>
        </div>

        <div className="text-right mb-6">
          <span className="text-xs text-indigo-400 cursor-pointer hover:text-indigo-300">
            Forgot password?
          </span>
        </div>

        <button
          onClick={handleLogin}
          disabled={!isReady}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors
            ${isReady
              ? "bg-indigo-600 text-white hover:bg-indigo-500"
              : "bg-white/5 text-white/30 cursor-not-allowed"
            }`}
        >
          {isReady ? "Sign In" : "Login"}
        </button>
      </div>
    </div>
  );
}