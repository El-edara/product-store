/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useFilter } from "./Context/useFilter";
import { Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";
import { MdOutlineAlignHorizontalLeft } from "react-icons/md";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [product, setProduct] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [icon, setIcon] = useState(<Tally3 className="mr-2" />);
  const itemsPerPage = 12;
  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProduct(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = [...product];
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filter === "cheap") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (filter === "expensive") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    } else if (filter === "popular") {
      filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    return filteredProducts;
  };
  const filteredProducts = getFilteredProducts();

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="max-w-screen-xl w-full mx-auto px-4 py-8">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button
              onClick={() => {
                setDropDownOpen(!dropDownOpen);
                if (!dropDownOpen) {
                  setIcon(
                    <MdOutlineAlignHorizontalLeft className="mr-2 transition duration-200" />
                  );
                } else {
                  setIcon(<Tally3 className="mr-2 transition duration-200" />);
                }
              }}
              className="border px-4 py-2 rounded-full flex items-center cursor-pointer hover:bg-[#f5f5f5] "
            >
              {icon}
              {filter === "all" ? (
                <span className="font-semibold">Filter</span>
              ) : (
                filter.charAt(0).toUpperCase() + filter.slice(1)
              )}
            </button>
            {dropDownOpen && (
              <div className="absolute bg-white border rounded shadow-md border-gray-300 w-full mt-2 sm:w-40">
                <button
                  onClick={() => {
                    setFilter("cheap");
                    setDropDownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-200 text-left w-full cursor-pointer"
                >
                  Cheap
                </button>
                <button
                  onClick={() => {
                    setFilter("expensive");
                    setDropDownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-200 text-left w-full cursor-pointer"
                >
                  Expensive
                </button>
                <button
                  onClick={() => {
                    setFilter("popular");
                    setDropDownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-200 text-left w-full cursor-pointer"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
        {/* BookCard */}
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] gap-6 mt-5">
          {filteredProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
          {/* previous */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="[@media(max-width:40rem)]:mb-2 border border-gray-500 px-4 py-2 mx-2 rounded-full font-semibold hover:bg-gray-100 cursor-pointer transition duration-100"
          >
            Prev
          </button>
          {/* 1,2,3,4,... */}
          <div className="flex flex-wrap justify-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 mx-1 rounded-full font-semibold ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "border border-gray-500 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          {/* next */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border border-gray-500 px-4 py-2 mx-2 rounded-full font-semibold hover:bg-gray-200 cursor-pointer transition duration-100"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
export default MainContent;
