"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import callApi from "@/lib/callApi";
import Loader from "@/components/Loader";

// ---------------- Blog Grid (reusable) ----------------
const BlogGrid = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
      {blogs.map((blog, idx) => (
        <motion.div
          key={blog._id || idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
        >
          <Link href={`/blog/${blog.slug}`} className="group">
            <Card className="relative h-full flex flex-col overflow-hidden">
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={blog.image_url || "/images/placeholder.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="mt-1">
                <h3 className="text-md font-bold text-gray-800 group-hover:text-indigo-700 group-hover:underline line-clamp-2">
                  {blog.title}
                </h3>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

// ---------------- Search Page ----------------
const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSearchResults() {
      if (!query) return;
      try {
        setLoading(true);
        const response = await callApi({
          method: "GET",
          url: `/blogs?search=${encodeURIComponent(query)}`,
        });

        const { blogs: list = [] } = response?.data || {};
        setBlogs(list);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto w-full py-10 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 mt-2">
          {loading ? "Searching..." : `${blogs.length} results found`}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader loading={true} />
        </div>
      ) : blogs.length > 0 ? (
        <BlogGrid blogs={blogs} />
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No matching blogs found.</p>
          <p className="text-gray-400 mt-2">Try different keywords or check your spelling.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
