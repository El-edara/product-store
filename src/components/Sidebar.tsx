import React, { useEffect, useState } from "react";
import { useFilter } from "./Context/useFilter";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}
const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    // keyword,
    setKeyword,
  } = useFilter();
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((products) => products.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };

    fetchCategories();
  }, []);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const price = value ? parseFloat(value) : undefined; // ✅ Prevents NaN when input is cleared
    if (name === "min") {
      setMinPrice(price);
    } else if (name === "max") {
      setMaxPrice(price);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <div className="w-full lg:w-64 p-5 lg:h-screen border-b lg:border-r border-gray-200 sticky top-0 bg-white z-10">
      <h1 className="text-2xl font-bold mb-10 mt-4 text-center">
        Product Store
      </h1>
      <section>
        <input
          type="text"
          name="search"
          className="border-2 rounded px-3 py-1 mb-2 w-full "
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex justify-center items-center space-x-3">
          <input
            type="number"
            name="min"
            className="border-2 px-4 py-2 w-full rounded"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handlePriceChange}
          />
          <input
            type="number"
            name="max"
            className="border-2 px-4 py-2 w-full rounded"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handlePriceChange}
          />
        </div>

        {/* Categories Section  */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mt-5 mb-3">Categories</h2>

          <section>
            {categories.map((category, index) => (
              <label key={index} className="block mb-2">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  checked={selectedCategory === category}
                  className="mr-2 w-[16px] h-[16px] cursor-pointer "
                />
                {category.toUpperCase()}
              </label>
            ))}
          </section>
        </div>
        {/* Keywords section*/}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mt-5 mb-3">Keywords</h2>
          <section>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyword)}
                className="block mb-2 w-full px-4 py-2 text-left hover:bg-gray-200 rounded border cursor-pointer"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </section>
        </div>

        {/* Reset Filter */}
        <button
          onClick={handleResetFilters}
          className="w-full font-medium mb=[4rem] py-2 bg-black text-white cursor-pointer rounded mt-5 "
        >
          Reset Filter
        </button>
      </section>
    </div>
  );
};
export default Sidebar;
