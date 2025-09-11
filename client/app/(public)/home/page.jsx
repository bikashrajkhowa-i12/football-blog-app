"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { motion } from "framer-motion";
import callApi from "@/lib/callApi";
import Loader from "@/components/Loader";

// ---------------- Hero Carousel ----------------
const HeroCarousel = ({ items }) => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    start();
    return () => clear();
  }, [items]);

  const start = () => {
    clear();
    if (!items.length) return;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 6000);
  };

  const clear = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % items.length);
    start();
  };
  const prev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
    start();
  };

  return (
    <div className="relative w-full h-[400px] md:h-[600px] rounded-md overflow-hidden shadow-lg bg-white mb-10">
      <Image
        src={items[index]?.image_url || "/images/placeholder.jpg"}
        alt={items[index]?.title}
        fill
        className="object-cover object-top"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Animated Slide Content */}
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-20 left-10 max-w-2xl text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
          {items[index]?.title}
        </h2>
        <p className="text-sm md:text-base drop-shadow-md line-clamp-3">
          {items[index]?.preview || items[index]?.content?.summary || ""}
        </p>
        <Link href={`/blog/${items[index]?.slug || "#"}`}>
          <Button className="mt-5 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold">
            Explore Post
          </Button>
        </Link>
      </motion.div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/60 hover:bg-white/90 text-indigo-600 p-2 rounded-full shadow"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/60 hover:bg-white/90 text-indigo-600 p-2 rounded-full shadow"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

// ---------------- Blog Grid ----------------
const BlogGrid = ({ title, blogs, initialCount = 6, step = 3 }) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + step, blogs.length));
  };

  return (
    <section className="max-w-6xl mx-auto w-full py-6">
      <h2 className="text-3xl text-gray-800 font-bold mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
        {blogs.slice(0, visibleCount).map((blog, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
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

      {/* Load More Button */}
      {visibleCount < blogs.length && (
        <div className="flex justify-center mt-10">
          <Button
            variant="secondary"
            className="rounded-full"
            onClick={loadMore}
          >
            Load More
          </Button>
        </div>
      )}
    </section>
  );
};

// ---------------- Categories ----------------
const Categories = () => {
  const categories = [
    "Match Reports",
    "Transfers",
    "Tactical Analysis",
    "Injuries",
    "Previews",
  ];
  return (
    <section className="max-w-4xl mx-auto w-full">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Browse by Category
      </h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant="secondary"
            className="rounded-full opacity-80 cursor-pointer hover:bg-indigo-700 hover:text-white px-3 py-1"
          >
            {cat}
          </Badge>
        ))}
      </div>
    </section>
  );
};

// ---------------- Home Page ----------------
const Home = () => {
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const featuredBlogs = blogs.filter((b) => b.published).slice(0, 6);
  const latestBlogs = blogs
    .filter((b) => !featuredBlogs.includes(b))
    .slice(0, 12); // keep more for "Load More"

  return (
    <div className="flex flex-col items-center gap-16 pt-2 pb-10 px-4 min-h-screen">
      <Loader loading={loading} />
      <div className="max-w-7xl">
        {featuredBlogs.length > 0 && <HeroCarousel items={featuredBlogs} />}
        {featuredBlogs.length > 0 && (
          <BlogGrid title="Featured Posts" blogs={featuredBlogs} />
        )}
        {latestBlogs.length > 0 && (
          <BlogGrid title="Latest Posts" blogs={latestBlogs} />
        )}
        {blogs.length > 0 && <Categories />}
      </div>
      {blogs.length > 0 && <ScrollToTopButton />}
    </div>
  );
};

export default Home;
