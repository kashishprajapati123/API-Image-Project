import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithubAlt } from "react-icons/fa";
import { BiSolidRocket } from "react-icons/bi";
import { BsSendFill } from "react-icons/bs";

const Api = () => {
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(false);
  const searchInput = useRef(null);

  const API = "https://pixabay.com/api";
  const API_KEY = "39531366-e478b5957a28d78b92b84bff7";
  const IMAGES_PER_PAGE = 28;

  const fetchAPI = async () => {
    try {
      const res = await axios.get(
        `${API}/?key=${API_KEY}&q=${searchInput.current.value}&image_type=photo&per_page=${IMAGES_PER_PAGE}&page=${page}`
      );
      setResult(res.data.hits);
      setTotalPages(Math.ceil(res.data.totalHits / IMAGES_PER_PAGE));
      setError(res.data.hits.length === 0);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, [page]);

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1); // Reset to the first page on a new search
    fetchAPI();
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    setPage(1); // Reset to the first page on a new search
    fetchAPI();
  };

  const GoToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="bg-slate-800 flex justify-between items-center w-[100%] fixed top-0 pt-1 pb-1 pl-5 pr-5">
        <h1 className="text-slate-300 text-2xl font-semibold mb-5 mt-2">Artify</h1>
        <form className="flex justify-center w-full items-center pl-5" onSubmit={handleSearch}>
          <div className="border-2 rounded border-slate-300 flex justify-start pl-5 items-center w-full">
            <FaSearch className="text-slate-300 mr-2" />
            <input
              className="placeholder:text-slate-300 text-slate-300 bg-slate-800 font-semibold pt-1 pb-1 pl-2 pr-2 w-[100%] text-lg outline-none rounded"
              ref={searchInput}
              placeholder="Search Your Favourites....."
              type="search"
            />
          </div>
        </form>
      </div>
      <h1 className="text-center mt-24 font-sans font-bold text-[35px]">Find Your Favourate Images</h1>
      <div className="text-center mt-8 flex font-semibold justify-center items-center">
        {["Nature", "Birds", "Coding", "Food"].map((item) => (
          <div
            key={item}
            onClick={() => handleSelection(item)}
            className="cursor-pointer text-white bg-slate-800 rounded pl-3 pr-3 pt-2 pb-2 ml-4 mr-4 max-[380px]:ml-6"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center m-10">
        {error && <span className="font-semibold text-2xl text-slate-800 p-60 h-[500px]">NOT FOUND IMAGE</span>}
        {result.map((value) => (
          <img
            key={value.id}
            className="h-80 w-80 m-1 object-cover rounded-lg"
            src={value.largeImageURL}
            alt={value.alt_description}
          />
        ))}
      </div>

      {!error && (
        <div className="mb-6 flex justify-center items-center">
          {page > 1 && (
            <button
              onClick={() => setPage(page - 1)}
              className="text-white font-semibold bg-slate-800 pt-2 pb-2 rounded pl-4 pr-4"
            >
              Previous
            </button>
          )}
          {page < totalPages && (
            <button
              onClick={() => setPage(page + 1)}
              className="text-white font-semibold bg-slate-800 pt-2 pb-2 rounded pl-4 pr-4 ml-8"
            >
              Next 
            </button>
          )}
        </div>
      )}

      <button onClick={GoToTop} className="bg-slate-800 left-0 bottom-[57px] rounded-full p-1 sticky transform -rotate-45">
        <BiSolidRocket className="text-3xl text-slate-300 rounded-full" />
      </button>

      <footer className="bg-slate-800 h-40 mt-10 pb-5 pt-2 flex-wrap flex justify-between pl-5 pr-5 items-center">
        <div className="text-slate-300 font-semibold text-3xl">Artify</div>
        <div>
          <div className="flex gap-5 mb-2 max-[445px]:mt-3">
            <Link to="https://www.linkedin.com/in/kashish-prajapati-ab5064236/"><FaLinkedinIn className="p-2 bg-slate-300 text-4xl rounded" /></Link>
            <Link to="https://x.com/Kashish90927918"><FaTwitter className="p-2 bg-slate-300 text-4xl rounded" /></Link>
            <Link to="https://github.com/kashishprajapati123"><FaGithubAlt className="p-2 bg-slate-300 text-4xl rounded" /></Link>
          </div>
          <form className="flex justify-center items-center" action="https://formspree.io/f/xdoqzglg" method="POST">
            <input
              name="email"
              type="email"
              placeholder="Enter Your Email..."
              className="bg-slate-300 pt-2 pb-2 rounded-l pl-3 w-80 max-[445px]:w-64 pr-3 outline-none placeholder:text-slate-800 font-semibold"
            />
            <button className="pt-3 pb-3 pl-2 pr-2 rounded-r border-l-2 border-l-slate-800 bg-slate-300 text-slate-800 font-semibold">
              <BsSendFill className="object-cover" />
            </button>
          </form>
        </div>
      </footer>
    </>
  );
};

export default Api;