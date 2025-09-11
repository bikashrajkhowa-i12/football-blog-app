// app/blogs/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import callApi from "@/lib/callApi";
import Loader from "@/components/Loader";

const LatestBlogsPage = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const response = await callApi({
          method: "GET",
          url: "/blogs",
        });

        const { blogs: list = [] } = response?.data || {};
        setBlogs(list);
      } catch (error) {
        //TODO: setError
        console.log(error?.message || "Failed to fetch blogs!");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 3);

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <div className="flex flex-col items-center gap-10 py-10 px-4">
      <Loader loading={loading} />
      <div className="max-w-7xl w-full">
        {/* Page Header */}
        <section className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Latest Football Blogs
          </h1>
          <p className="text-gray-600 text-md md:text-lg">
            Explore in-depth analyses, match reports, transfer news, and
            tactical breakdowns from around the football world.
          </p>
        </section>

        {/* Blogs Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.slice(0, visibleCount).map((blog, idx) => {
            const { title, slug, image_url } = blog;
            return (
              <motion.div
                key={slug}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <Link href={`/blog/${slug}`} className="group">
                  <Card className="relative h-full flex flex-col overflow-hidden">
                    <div className="relative w-full h-54 overflow-hidden">
                      <Image
                        src={image_url || "/images/placeholder.jpg"}
                        alt={title}
                        fill
                        className="object-cover object-top transform transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="mt-1">
                      <h3 className="text-md font-bold text-gray-800 group-hover:text-indigo-700 group-hover:underline line-clamp-2">
                        {title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </section>

        {/* Load More */}
        {visibleCount < blogs.length && (
          <div className="flex justify-center mt-10">
            <Button
              variant="secondary"
              onClick={handleLoadMore}
              className="rounded-full px-6 py-2"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestBlogsPage;
