import Navbar from "@/components/Navbar";
import AuthPanel from "@/components/auth/AuthPanel";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";

const Home = () => {
  const featuredArticles = [
    {
      id: 1,
      title: "Top 10 Football Moments of 2025",
      description:
        "Relive the most unforgettable football highlights from this year’s tournaments.",
      date: "Aug 25, 2025",
      category: "Highlights",
    },
    {
      id: 2,
      title: "Tactical Analysis: Why Team X Dominates",
      description:
        "Get deep insights into the strategy behind Team X’s success on the field.",
      date: "Aug 20, 2025",
      category: "Analysis",
    },
    {
      id: 3,
      title: "Upcoming Football Fixtures & Predictions",
      description:
        "Stay ahead with expert predictions for the upcoming matches across leagues.",
      date: "Aug 15, 2025",
      category: "Previews",
    },
  ];
  return (
    <>
      <section className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
          Welcome to <span className="text-green-900">FootScribe90</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          Your ultimate source for football news, in-depth analysis, and live
          updates — all tailored for passionate fans.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" variant="dark">
            Read Latest Articles
          </Button>
          <Button size="lg" variant="outline">
            Subscribe Now
          </Button>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 border-b pb-2 border-gray-200">
          Featured Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map(
            ({ id, title, description, date, category }) => (
              <Card key={id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="secondary" className="mb-2">
                    {category}
                  </Badge>
                  <CardTitle className="text-xl">{title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{description}</p>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-5xl mx-auto text-center mt-20">
        <h2 className="text-3xl font-semibold mb-4">
          Join Thousands of Football Fans
        </h2>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Subscribe to our newsletter for exclusive insights and stay updated
          with every kick on the pitch.
        </p>
      </section>
    </>
  );
};

export default Home;
