// app/blog/[slug]/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { startCase } from "lodash";

import { blogs } from "@/demo/data";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useAuthModal } from "@/contexts/auth/AuthModalContext";
import callApi from "@/lib/callApi";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import BackButton from "@/components/BackButton";

const BlogPost = () => {
  const { user = {}, isAuthenticated = false } = useAuth() || {};
  const { slug } = useParams();
  const commentsRef = useRef();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState(null);
  const { openModal } = useAuthModal() || {};
  const [error, setError] = useState(null);

  useEffect(() => {
    const matchedBlog = blogs.find((b) => b.slug === slug);
    setBlog(matchedBlog || null);

    if (window.location.hash === "#comments" && commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [slug]);

  const handleComment = (e) => {
    e.preventDefault();
    setError(null);
    setComment(e.target.value);
  };

  const addComment = async () => {
    setError(null);
    if (!comment) return;

    if (!isAuthenticated) {
      openModal("login");
      return;
    }

    try {
      await callApi({
        method: "POST",
        url: "/blog/comment",
        data: {
          comment,
          user,
          blog,
        },
      });
      //todo: add toast for success message banner
    } catch (error) {
      setError(error);
    }
  };

  const displaySources = (sources) => {
    if (sources.length === 0) return null;
    return (
      <div className="mt-6 text-xs">
        <span className="italic">Sources:</span>{" "}
        {sources.map(({ name, url }, idx) => (
          <span key={idx} className="italic">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {name}
            </a>
            {idx < sources.length - 1 && " | "}
          </span>
        ))}
      </div>
    );
  };

  const displayContent = () => {
    if (!blog)
      return <p className="text-center text-gray-500 mt-10">Blog not found.</p>;

    const {
      title = "",
      published_date = "",
      sources = [],
      content = {},
      author = "Bkaz",
      tags = [],
      quote = "",
      quote_by = "",
      comments = [],
    } = blog;

    return (
      <article className="w-full flex flex-col">
        {/* Title + Meta */}
        <div className="mb-4">
          <div className="border-l-8 border-red-700 pl-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-1">
              {title}
            </h1>
            <div className="text-gray-600 text-sm mb-3">
              {published_date} • By {author} • 4 min read
            </div>
          </div>

          <div className="rounded-xs overflow-hidden">
            <img
              src={blog.image_url || ""}
              alt={title}
              className="object-content w-full h-full"
            />
          </div>

          {tags?.length > 0 && (
            <div className="text-sm text-gray-500 mt-1 italic">
              {tags.map((tag) => startCase(tag)).join(" • ")}
            </div>
          )}
        </div>

        {/* Social Share */}
        <div className="flex gap-3 text-sm">
          <button className="px-3 py-1 rounded bg-blue-500 text-white">
            Share on Twitter
          </button>
          <button className="px-3 py-1 rounded bg-blue-700 text-white">
            Share on Facebook
          </button>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {Object.entries(content).map(([section, paragraph], idx) => (
            <section key={idx}>
              <h2 className="text-lg font-semibold mb-2">
                {startCase(section)}
              </h2>
              <p className="text-gray-800 leading-relaxed">{paragraph}</p>
            </section>
          ))}
        </div>

        {/* Highlighted Quote */}
        {quote && (
          <blockquote className="border-l-4 border-green-600 pl-4 italic text-gray-700">
            “{quote}”
            <footer className="mt-1 text-sm text-gray-500">- {quote_by}</footer>
          </blockquote>
        )}

        {displaySources(sources)}

        {/* Comments */}

        <div ref={commentsRef} className="space-y-4 mt-20">
          <h3 className="text-lg font-semibold mb-4">
            Comments ({comments.length})
          </h3>
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {comments.map((c, idx) => (
                <li key={idx} className="border-b pb-2">
                  <p className="text-sm text-gray-800">{c.text}</p>
                  <span className="text-xs text-gray-500">- {c.user}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-col gap-4 max-w-md">
            <textarea
              name="post_a_comment"
              placeholder="Comment here..."
              onChange={handleComment}
              className="border-0.5 border-gray-400 px-6 py-2 rounded-md"
            />
            <span className="flex justify-end">
              <Button onClick={addComment}>Comment</Button>
            </span>
          </div>
        </div>

        {/* Related posts */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
          <ul className="list-disc pl-5 text-sm text-blue-600">
            {blogs
              .filter((b) => b.slug !== slug)
              .slice(0, 3)
              .map((related) => (
                <li key={related.slug}>
                  <Link href={`/blog/${related.slug}`}>{related.title}</Link>
                </li>
              ))}
          </ul>
        </div>
      </article>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-1 md:px-6 flex flex-col">
      <BackButton />
      <div className="max-w-4xl mx-auto w-full">{displayContent()}</div>
      <ScrollToTopButton />
    </div>
  );
};

export default BlogPost;
