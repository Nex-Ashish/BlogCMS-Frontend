"use client"
import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faCheck } from "@fortawesome/free-solid-svg-icons";
import { fetchCategories } from "@/utils/category/helper";

export default function FilterButton({ onFilterChange }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(["All"]);
  const dropdownRef = useRef(null);

  const rawCategory = searchParams.get("category");
  const active = rawCategory ? rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1) : "All";

  useEffect(() => {
    const getCategories = async () => {
      try {
        const titles = await fetchCategories();
        // setFilters(["All", ...titles]); 
        setFilters(["All", ...titles.map(cat => cat.title)]);
      } catch (err) {
        console.error("Categories fetch failed:", err.message);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (rawCategory && onFilterChange) {
      const formatted = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);
      onFilterChange(formatted);
    }
  }, [rawCategory]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "All") {
      params.delete("category");
    } else {
      params.set("category", filter.toLowerCase());
    }
    router.push(`?${params.toString()}`);
    if (onFilterChange) onFilterChange(filter);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>

      <button onClick={() => setIsOpen((prev) => !prev)} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-black/20 text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all duration-200 bg-white shadow-sm">
        {active}
        <FontAwesomeIcon icon={faFilter} width={10} height={10} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-black/10 rounded-2xl shadow-xl shadow-black/10 overflow-hidden z-50 max-h-60 overflow-y-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilter(filter)}
              style={active === filter ? { backgroundColor: "#7C3AED15" } : {}}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors duration-150
                ${active === filter
                  ? "text-[#7C3AED] font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#7C3AED]"
                }`}
            >
              {filter}
              {active === filter && (
                <FontAwesomeIcon icon={faCheck} width={10} height={10} />
              )}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}