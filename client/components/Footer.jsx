"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState("");
  useEffect(() => {
    const year = new Date().getFullYear();
    setCurrentYear(year);
  }, [currentYear]);

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            About FootScribe90
          </h3>
          <p className="text-sm leading-relaxed">
            FootScribe90 is your ultimate destination for football news,
            in-depth analysis, and live updates counting every thrilling moment
            in the world of football.
          </p>
          <p className="mt-6 text-xs text-gray-500">
            © {currentYear} FootScribe90. All rights reserved.
          </p>
        </div>

        {/* Navigation */}
        <nav>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { title: "Home", path: "/" },
              { title: "Feeds", path: "/feeds" },
              { title: "Latest", path: "/latest" },
              { title: "Leagues", path: "/leagues" },
              { title: "Teams", path: "/teams" },
              { title: "Contact", path: "/contact" },
              { title: "About", path: "/about" },
            ].map((link) => (
              <li key={link.title}>
                <Link
                  href={link.path}
                  className="hover:text-green-500 transition-colors"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "FAQ", href: "/faq" },
              { name: "Privacy Policy", href: "/privacy" },
              { name: "Terms of Service", href: "/terms" },
              { name: "Help Center", href: "/help" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-green-500 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Subscribe to Our Newsletter
          </h3>
          <p className="mb-4 text-sm text-gray-400">
            Stay updated with the latest football news and insights.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              aria-label="Email address"
              className="rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-100 placeholder-gray-500 focus:border-green-500 focus:outline-none sm:flex-1"
              required
            />
            <Button
              type="submit"
              size="sm"
              variant="success"
              className="sm:min-w-[120px]"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
