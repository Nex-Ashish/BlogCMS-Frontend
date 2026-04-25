const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/api/categories`);
  
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();

  return data?.categories?.map(item => item?.title ? item.title.charAt(0).toUpperCase() + item.title.slice(1) : "" ) ?? [];
}