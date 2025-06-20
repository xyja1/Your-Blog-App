/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BlogsCard = ({ data }) => {
  const date = data.createdAt;
  const redirect = useNavigate();

  return (
    <motion.div
      className="w-4/5 md:w-[25rem] flex flex-col rounded-xl bg-black"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring" }}
    >
      <img
src={data.url || "https://via.placeholder.com/600x400?text=No+Image"}
        alt="thumbnail"
        className="aspect-video rounded-md cursor-pointer"
        onClick={() => redirect(`/blogs/${data._id}`)}
      />
      <div className="flex flex-col gap-2 py-6 px-5">
        <span className="py-1 px-4 bg-zinc-800 w-[fit-content] rounded-full text-white text-sm">
          {data.category?.toUpperCase() || "UNCATEGORIZED"}
        </span>
        <h1
          className="text-2xl hover:underline cursor-pointer line-clamp-2"
          onClick={() => redirect(`/blogs/${data._id}`)}
        >
          {data.title || "Untitled"}
        </h1>
        <Link
          className="text-gray-600 hover:underline"
          to={`/users/${data.author || "unknown"}`}
        >
          @{data.author || "unknown"}
        </Link>
        <span className="text-gray-600">
          {date ? date.substring(0, 10) : "No Date"}
        </span>
      </div>
    </motion.div>
  );
};

export default BlogsCard;
