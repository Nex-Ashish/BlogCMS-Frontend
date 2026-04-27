"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {faEnvelope, faCalendar, faLocationDot, faCamera, faShield, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Buttons/Button";
import { getProfile } from "@/utils/profile/helper";
import Loading from "./Loading";

export default function ProfileCard() {

  const router = useRouter();
  // const fileInputRef = useRef(null);
  // const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        console.log(data,'profile-data')
        setUser(data.user);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    return name.trim().split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  //   setImage(URL.createObjectURL(file));
  // };

  const infoData = [
    { icon: faShield, text: user?.role },
    { icon: faEnvelope, text: user?.email },
    { icon: faCalendar, text: `Joined ${new Date(user?.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}` },
  ];

  // if (loading) return <p className="text-center mt-10 text-slate-400 text-sm">Loading...</p>;
  if (loading) return <Loading />;

  return (
    <main className="py-10 px-4">
      <div className="max-w-lg mx-auto bg-gradient-to-br from-black via-[#0d0614] to-black rounded-3xl overflow-hidden">
        <div className="h-24 bg-[#7C3AED] relative">
          <div className="absolute -bottom-9 left-7">
            <div className="relative w-[72px] h-[72px]">
              <div className="w-full h-full rounded-full bg-white border-4 border-white overflow-hidden flex items-center justify-center">
                {/* {image ? (
                  <img src={image} alt="Profile" className="w-full h-full object-cover" />
                ) : ( */}
                  <div className="w-full h-full rounded-full bg-[#7C3AED] flex items-center justify-center text-white font-medium text-lg">
                    {getInitials(user?.name)}
                  </div>
                {/* )} */}
              </div>

              {/* <button onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white border border-slate-200 shadow flex items-center justify-center" >
               <FontAwesomeIcon icon={faCamera} className="text-xs text-slate-600" />
              </button>
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleImageChange} /> */}
            </div>
          </div>
        </div>

        <div className="pt-12 px-7 pb-7">
          <div>
            <h1 className="text-xl font-semibold text-slate-100">
              {user.name}
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Blog Writer · Blog4u
            </p>
          </div>

          <p className="text-sm text-slate-500 mt-4 mb-3">
            Passionate writer covering tech, productivity, and design.
          </p>

          {infoData.map((item) => (
            <div key={item.text} className="flex items-center mb-2 gap-3 text-sm text-slate-500" >
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-slate-600 text-xs"
                />
              </div>
              {item.text}
            </div>
          ))}

          <div className="flex gap-3 mt-6">
            {/* <Button title="Edit Profile" /> */}
            <Button title="Logout" onClick={() => { 
              // localStorage.removeItem("token"); 
              document.cookie = "token=; path=/; max-age=0";
              router.push("/"); 
            }} customClassName="flex-1 py-2.5 cursor-pointer hover:bg-red-300 hover:text-white rounded-full border border-red-200 text-red-500 text-sm" />
          </div>
        </div>
      </div>
    </main>
  );
}
