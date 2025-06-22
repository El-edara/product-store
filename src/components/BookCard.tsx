import { Link } from "react-router-dom";

interface BookCardProps {
  id: number;
  title: string;
  image: string;
  price: number;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, image, price }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded mb-3"
        />
        <h2 className="font-semibold text-base line-clamp-2">{title}</h2>
        <p className="text-gray-700 mt-1 font-medium">${price}</p>
      </Link>
    </div>
  );
};

export default BookCard;
