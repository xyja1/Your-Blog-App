import { Link, useSearchParams } from "react-router-dom";
import BlogsCard from "../../components/ui/BlogsCard";
import { categories, capitalizeFirstLetter } from "../../lib/categories";
import { sampleBlogs } from "../../lib/sampleBlogs";
import { BiSearchAlt } from "react-icons/bi";
import Footer from "../../components/Footer";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const search = useRef("");
  const [searchRes, setSearchRes] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const data = sampleBlogs.filter(
    (blog) => blog.category === category || category === "all"
  );

  const searchHandler = async () => {
    const value = search.current.value.toLowerCase();
    const res = sampleBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(value) ||
        blog.category.toLowerCase().includes(value) ||
        blog.author.toLowerCase().includes(value)
    );
    setSearchRes(res);
    res && res.length > 0 && setIsFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-rose-100 min-h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#fcdede_1px,transparent_1px),linear-gradient(to_bottom,#fcdede_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-[0.05]" />
      <div className="absolute size-96 bg-rose-200 top-0 rounded-full blur-[150px] -z-50" />
      <div className="my-44 sm:my-52 flex flex-col gap-14 items-center justify-center text-center">
        <h1 className="text-5xl md:w-[75%] md:text-6xl xl:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-rose-400 to-rose-700 bg-opacity-50 leading-tight px-4 md:px-0">
          YOUR BLOG°✿⋆.ೃ߿*: ·
        </h1>
        <p className="w-11/12 md:w-[55%] sm:text-xl text-rose-600">
          Let your words bloom. <span className="text-rose-800">Write, express, and inspire on a platform made for stories that matter.</span>
          A space for thoughts, emotions, and inspiration.
        </p>
        <div className="w-4/5 md:w-[40%] relative">
          <Input
            type="text"
            placeholder="Search Blogs"
            className="rounded-xl h-12 bg-white bg-opacity-30 backdrop-blur-sm text-rose-800"
            ref={search}
            onChange={searchHandler}
            onFocus={() => setIsFocused(true)}
            onBlur={handleInputBlur}
          />
          <BiSearchAlt className="absolute h-11 top-1 right-5 text-xl text-rose-800" />
          {searchRes && searchRes.length > 0 && isFocused && (
            <motion.div
              className="absolute backdrop-blur-xl bg-white mt-5 p-5 rounded-xl max-h-80 overflow-y-scroll"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <ul className="w-[30rem] flex flex-col gap-2 items-start">
                {searchRes.map((blogs) => {
                  return (
                    <li
                      key={blogs._id}
                      className="p-2 rounded-xl hover:bg-rose-100 hover:text-rose-800 flex items-center h-10 text-left"
                    >
                      <Link
                        to={`/blogs/${blogs._id}`}
                        className="cursor-pointer flex gap-2 items-center"
                      >
                        <BiSearchAlt />
                        <p className="line-clamp-1">{blogs.title}</p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
      <div className="space-y-10 w-[80%] md:w-[50rem] xl:w-[80rem]" id="blogs">
        <h1 className="text-3xl sm:text-4xl text-rose-800 font-semibold">Categories</h1>
        <ul className="flex gap-4 flex-wrap leading-loose">
          {categories.map((items, index) => {
            return (
              <li key={index}>
                <Link
                  to={`/?category=${items}`}
                  className={`px-4 py-[6px] shadow-md rounded-full cursor-pointer transition ${
                    category === items
                      ? "bg-rose-600 text-white"
                      : "text-rose-700 bg-rose-100 hover:bg-rose-200"
                  }`}
                >
                  {capitalizeFirstLetter(items)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center mt-20">
        {data && data.length > 0 ? (
          data.map((items) => {
            return <BlogsCard key={items._id} data={items} />;
          })
        ) : (
          <div className="col-span-3 flex justify-center items-center">
            <h1 className="text-rose-700 font-medium">Cannot find any blog.</h1>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
