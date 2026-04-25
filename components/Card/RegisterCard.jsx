"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import registerIcon from "../../public/assets/registerIcon.png"
import { registerUser } from "@/utils/auth/helper";

export default function RegisterCard() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", role: "user" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const isReady = form.name && form.email && form.password && form.confirm;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const data = await registerUser({ name: form.name, email: form.email, password: form.password, role: form.role });
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-4xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">

      <div className="md:w-1/2 h-56 md:h-auto bg-gradient-to-br from-indigo-500/80 to-purple-700/80 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-900/40" />
        <div className="relative text-center text-white px-8 z-10">
            <Image src={registerIcon} alt="registerIcon" width={140} height={140} className="mx-auto mb-5" />
            <h2 className="text-2xl font-bold">Join Us Today</h2>
            <p className="text-indigo-200 text-sm mt-2">
                Create your account and get started
            </p>
        </div>
      </div>

      <div className="md:w-1/2 flex flex-col justify-center px-8 py-10 lg:py-12">
        <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
        <p className="text-white/40 text-sm mb-6">
          Already have an account?{" "}
          <button onClick={() => router.push('/auth/login')} className="text-indigo-400 cursor-pointer hover:text-indigo-300">Sign in</button>
        </p>

        <label className="text-xs font-semibold text-white/50 mb-2 block">Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={form.name}
          onChange={update("name")}
          className="w-full bg-white/10 border border-white/10 text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
        />

        <label className="text-xs font-semibold text-white/50 mb-2 block">Email Address</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={update("email")}
          className="w-full bg-white/10 border border-white/10 text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
        />

        <label className="text-xs font-semibold text-white/50 mb-2 block">Password</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={form.password}
            onChange={update("password")}
            className="w-full bg-white/10 border border-white/10 text-white placeholder-white/25 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 text-base"
          >
            {
                showPassword ?
                    <FontAwesomeIcon icon={faEye} />
                :
                    <FontAwesomeIcon icon={faEyeSlash} />
            }
          </button>
        </div>

        <label className="text-xs font-semibold text-white/50 mb-2 block">Confirm Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={form.confirm}
          onChange={update("confirm")}
          className="w-full bg-white/10 border border-white/10 text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-6"
        />

        <label className="text-xs font-semibold text-white/50 mb-2 block">Role</label>
        <div className="flex gap-3 mb-6">
          {["user", "admin"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setForm({ ...form, role: r })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-colors border
                ${form.role === r
                  ? "bg-indigo-600 text-white border-indigo-500"
                  : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"
                }`}
            >
              {r === "user" ? "User" : "Admin"}
            </button>
          ))}
        </div>

        {error && ( <p className="text-red-400 text-xs mb-3">{error}</p> )}

        <button
          onClick={handleRegister}
          disabled={!isReady || loading}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors
            ${isReady
              ? "bg-indigo-600 text-white hover:bg-indigo-500"
              : "bg-white/5 text-white/30 cursor-not-allowed"
            }`}
        >
          {loading ? "Creating..." : isReady ? "Create Account" : "Register"}
        </button>
      </div>
    </div>
  );
}