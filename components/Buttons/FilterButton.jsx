"use client"
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faCheck } from "@fortawesome/free-solid-svg-icons";
import { fetchCategories } from "@/utils/category/helper";

export default function FilterButton({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(["All"]);
  const [activeFilter, setActiveFilter] = useState("All");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const titles = await fetchCategories();
        setFilters(["All", ...titles.map(cat => cat.title)]);
      } catch (err) {
        console.error("Categories fetch failed:", err.message);
      }
    };
    getCategories();
  }, []);

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
    setActiveFilter(filter);
    if (onFilterChange) onFilterChange(filter);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-black/20 text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all duration-200 bg-white shadow-sm"
      >
        {activeFilter}
        <FontAwesomeIcon icon={faFilter} width={10} height={10} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-black/10 rounded-2xl shadow-xl shadow-black/10 overflow-hidden z-50 max-h-60 overflow-y-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilter(filter)}
              style={activeFilter === filter ? { backgroundColor: "#7C3AED15" } : {}}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors duration-150
                ${activeFilter === filter
                  ? "text-[#7C3AED] font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#7C3AED]"
                }`}
            >
              {filter}
              {activeFilter === filter && (
                <FontAwesomeIcon icon={faCheck} width={10} height={10} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
