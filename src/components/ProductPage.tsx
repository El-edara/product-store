import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}
const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error(`Error fetching product data: ${error}`);
        });
    }
  }, [id]);
  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-5 w-full max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="bg-black text-white px-4 py-2 mb-5 rounded"
      >
        Back
      </button>
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full sm:w-[60%] h-auto mb-5 rounded"
      />
      <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
      <p className="mb-4 text-gray-800">{product.description}</p>
      <div className="flex flex-wrap gap-4">
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating}</p>
      </div>
    </div>
  );
};
export default ProductPage;
