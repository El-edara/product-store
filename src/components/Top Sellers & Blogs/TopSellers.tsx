import { useEffect, useState } from "react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  picture: {
    medium: string;
  };
}

const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=5");
        const data = await response.json();
        const authorsData: Author[] = data.results.map((user: RandomUser) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };
    fetchData();
  }, []);

  const toggleFollow = (index: number) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  };

  return (
    <div className="bg-white p-5 w-full md:w-[23rem] mt-12 border rounded shadow-sm">
      <h2 className="text-2xl font-semibold mb-5">Top Sellers</h2>
      <ul className="space-y-4">
        {authors.map((author, index) => (
          <li key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={author.image}
                alt={author.name}
                className="w-10 h-10 object-cover rounded-full"
              />
              <span className="text-sm font-medium">{author.name}</span>
            </div>
            <button
              onClick={() => toggleFollow(index)}
              className={`px-3 py-1 text-sm font-medium rounded transition ${
                author.isFollowing
                  ? "bg-red-500 text-white"
                  : "bg-black text-white"
              }`}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellers;
