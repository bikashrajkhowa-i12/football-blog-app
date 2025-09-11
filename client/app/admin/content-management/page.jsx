"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/Loader";
import callApi from "@/lib/callApi";

const ContentManagement = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const perPage = 10; // 👈 show 5 blogs per page
  const router = useRouter();

  React.useEffect(() => {
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
        console.log(error?.message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  // ✅ Filter + search logic
  const filteredBlogs =
    (blogs?.length &&
      blogs.filter((blog) => {
        const matchesSearch =
          blog.title.toLowerCase().includes(search.toLowerCase()) ||
          blog.author.toLowerCase().includes(search.toLowerCase()) ||
          blog.category.toLowerCase().includes(search.toLowerCase()) ||
          blog.teams.join(" ").toLowerCase().includes(search.toLowerCase()) ||
          blog.tags.join(" ").toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
          filter === "all"
            ? true
            : filter === "published"
            ? blog.published
            : filter === "unpublished"
            ? !blog.published
            : blog.category === filter;

        return matchesSearch && matchesFilter;
      })) ||
    [];

  // ✅ Pagination
  const totalPages = Math.ceil(filteredBlogs.length / perPage);
  const paginatedBlogs = filteredBlogs.slice(
    (page - 1) * perPage,
    page * perPage
  );

  React.useEffect(() => {
    if (page > totalPages) setPage(1); // reset if filter reduces data
  }, [totalPages, page]);

  return (
    <div className="p-2 md:p-6 space-y-6 mt-6 md:mt-0 w-full">
      {/* Top Bar: Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        {/* Search */}
        <div className="relative w-full md:w-2/6">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset to first page
            }}
            className="pl-8 border-1 border-gray-400"
          />
        </div>

        {/* Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="base" className="w-full md:w-auto">
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilter("all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("published")}>
              Published
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("unpublished")}>
              Unpublished
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("transfer-news")}>
              Transfer News
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("match-report")}>
              Match Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table Wrapper */}
      <div className="rounded-md border overflow-x-auto relative min-h-50">
        <Table>
          <TableHeader>
            <TableRow className={"bg-slate-900 hover:bg-slate-900"}>
              <TableHead className={"text-white text-center"}>Sl.no</TableHead>
              <TableHead className="min-w-[160px] text-white text-center">
                Title
              </TableHead>
              <TableHead className="min-w-[100px] text-white text-center">
                Author
              </TableHead>
              <TableHead className="min-w-[100px] text-white text-center">
                Category
              </TableHead>
              <TableHead className="min-w-[160px] text-white text-center">
                Teams
              </TableHead>
              <TableHead className="min-w-[100px] text-white text-center">
                Status
              </TableHead>
              <TableHead className="min-w-[140px] text-white text-center">
                Published Date
              </TableHead>
              <TableHead className="w-[50px] text-white"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBlogs.map((blog, idx) => (
              <TableRow
                key={idx}
                className="cursor-pointer hover:bg-gray-100 transition-colors group"
                onClick={() =>
                  router.push(`/admin/content-management/${blog.slug}`)
                }
              >
                <TableCell className={"text-center"}>
                  {(page - 1) * perPage + idx + 1}
                </TableCell>
                <TableCell className="font-medium truncate max-w-[180px] text-center group-hover:underline group-hover:text-indigo-600">
                  {blog.title}
                </TableCell>
                <TableCell className={"text-center"}>{blog.author}</TableCell>
                <TableCell className={"text-center"}>{blog.category}</TableCell>
                <TableCell className="truncate max-w-[150px] text-center">
                  {blog.teams.join(", ") || "-"}
                </TableCell>
                <TableCell className={"text-center"}>
                  {blog.published ? (
                    <Badge variant={"success"}>Published</Badge>
                  ) : (
                    <Badge variant={"warning"}>Draft</Badge>
                  )}
                </TableCell>
                <TableCell className={"text-center"}>
                  {blog.published_date}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(
                            `/admin/content-management/${blog.slug}/edit`
                          )
                        }
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                      <DropdownMenuItem>
                        {blog.published ? "Unpublish" : "Publish"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

            {!loading && paginatedBlogs.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-gray-500 py-6"
                >
                  No blogs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Loader loading={loading} prompt="Fetching blogs..." />
      </div>

      {/* ✅ Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-2">
          <p className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
