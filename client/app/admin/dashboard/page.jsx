"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, FileText, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import callApi from "@/lib/callApi";

export default function Dashboard() {
  const [usersCount, setUsersCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);
  const [viewsCount, setViewsCount] = useState(0);

  useEffect(() => {
    async function fetchUsersCount() {
      try {
        const response = await callApi({
          url: "/admin/dashboard",
          method: "GET",
          params: {
            page: 1,
            limit: 10,
          },
        });

        const {
          totalUsers = 0,
          totalBlogs = 0,
          totalViews = 0,
        } = response?.data || {};
        setUsersCount(totalUsers);
        setBlogsCount(totalBlogs);
        setViewsCount(totalViews);
      } catch (err) {
        console.error("Failed to get total users count:", err);
      }
    }
    fetchUsersCount();
  }, []);

  const stats = [
    {
      id: "users",
      label: "Total Users",
      value: usersCount,
      icon: <Users className="w-6 h-6 text-blue-700" />,
      link: "/admin/users",
      gradient: "from-blue-300 to-blue-100",
    },
    {
      id: "blogs",
      label: "Total Blogs",
      value: blogsCount,
      icon: <FileText className="w-6 h-6 text-green-700" />,
      link: "/admin/content-management",
      gradient: "from-green-300 to-green-100",
    },
    {
      id: "views",
      label: "Site Views",
      value: viewsCount,
      icon: <BarChart3 className="w-6 h-6 text-purple-700" />,
      link: "/admin/analytics",
      gradient: "from-purple-300 to-purple-100",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "blog",
      text: "New blog posted: 'La Liga Roundup'",
      date: "2025-08-14",
    },
    {
      id: 2,
      type: "user",
      text: "User 'Jane Doe' signed up",
      date: "2025-08-13",
    },
    {
      id: 3,
      type: "blog",
      text: "Blog 'Bundesliga Highlights' updated",
      date: "2025-08-12",
    },
  ];

  return (
    <div className="p-2 md:p-6 space-y-6 mt-6 md:mt-0 w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link href={stat.link} key={stat.id}>
            <Card
              className={`flex flex-col justify-center p-5 rounded-xl cursor-pointer 
              bg-gradient-to-br ${stat.gradient} shadow-md hover:shadow-lg hover:scale-[1.02] transition w-full h-30`}
            >
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </p>
                <span className="flex gap-2 items-center">
                  <p className="text-xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                  {stat.icon}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity - Full width row */}
      <div className="bg-white shadow-md rounded-xl p-4 md:p-6 w-full">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Recent Activity
        </h2>
        <ul className="divide-y divide-gray-200">
          {recentActivity.map((item) => (
            <li
              key={item.id}
              className="py-3 flex justify-between items-center text-sm"
            >
              <span className="text-gray-700">{item.text}</span>
              <span className="text-xs text-gray-400">{item.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
