// app/page.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

export default function Home() {
  const featuredArticles = [
    {
      id: 1,
      title: "Barcelona Thrash Real Madrid 4-0",
      summary:
        "An unforgettable El Clasico with stunning goals from young stars.",
      image: "/images/barcelona-vs-madrid.jpg",
      author: "John Doe",
      category: "La Liga",
    },
    {
      id: 2,
      title: "Premier League: Manchester United Back on Top",
      summary:
        "After a tough season, Manchester United rises with a thrilling win.",
      image: "/images/manu-vs-chelsea.jpg",
      author: "Jane Smith",
      category: "Premier League",
    },
    {
      id: 3,
      title: "Bundesliga Highlights: Bayern Dominates",
      summary:
        "Bayern Munich showcases their attacking prowess in a 5-1 victory.",
      image: "/images/bayern-vs-dortmund.jpg",
      author: "Alex Müller",
      category: "Bundesliga",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-[450px] md:h-[600px] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/images/hero-football.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
        <div className="relative space-y-4 max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            Footscribe90 – Live Football Updates
          </h1>
          <p className="text-lg md:text-xl drop-shadow-md">
            Scores, highlights, and expert analysis from the biggest leagues
            around the world.
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 font-semibold">
            Explore Latest
          </Button>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="px-4 md:px-16 py-12 grid gap-8 md:grid-cols-3">
        {featuredArticles.map((article) => (
          <Card
            key={article.id}
            className="group hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden rounded-2xl"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <CardContent className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <span className="text-xs font-bold uppercase bg-indigo-600 px-2 py-1 rounded">
                {article.category}
              </span>
              <CardTitle className="mt-2 text-lg font-bold">
                {article.title}
              </CardTitle>
              <p className="text-sm mt-1">{article.summary}</p>
              <div className="flex items-center gap-2 mt-3">
                <Avatar>
                  <img
                    src={`/avatars/${article.author
                      .replace(" ", "-")
                      .toLowerCase()}.jpg`}
                    alt={article.author}
                  />
                </Avatar>
                <span className="text-xs">{article.author}</span>
              </div>
              <Button className="mt-3 bg-indigo-600 hover:bg-indigo-700 w-full text-white">
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-indigo-600 text-white rounded-2xl p-10 mx-4 md:mx-16 text-center space-y-6 relative overflow-hidden">
        <h2 className="text-2xl md:text-3xl font-bold">
          Stay Updated with Footscribe90
        </h2>
        <p>
          Get latest news, match analysis, and highlights straight to your
          inbox.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-lg text-gray-900 flex-1 min-w-[250px]"
          />
          <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3">
            Subscribe
          </Button>
        </div>
      </section>
    </main>
  );
}
