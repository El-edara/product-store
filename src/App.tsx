import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import TopSellers from "./components/Top Sellers & Blogs/TopSellers";
import PopularBlogs from "./components/Top Sellers & Blogs/PopularBlogs";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-3/4 flex justify-center flex-wrap p-4">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </div>
          <div className="w-full md:w-1/4 p-4 space-y-4 hidden md:block">
            <TopSellers />
            <PopularBlogs />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
