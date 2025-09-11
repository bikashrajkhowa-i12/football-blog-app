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
import callApi from "@/lib/callApi";
import Loader from "@/components/Loader";

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const response = await callApi({
          url: "/admin/users",
          method: "GET",
          params: {
            page: 1,
            limit: 10,
          },
        });

        const users = response?.data?.users || [];
        setUsers(users);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  // ✅ Search + filter logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      user?.role?.toLowerCase().includes(search.toLowerCase()) ||
      user?.provider?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
        ? user.status === "active"
        : filter === "inactive"
        ? user.status === "inactive"
        : filter === "admin"
        ? user.role === "admin"
        : filter === "user"
        ? user.role === "user"
        : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-2 md:p-6 space-y-6 mt-6 md:mt-0 w-full">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        {/* Search */}
        <div className="relative w-full md:w-2/6">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            <DropdownMenuItem onClick={() => setFilter("active")}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("inactive")}>
              Inactive
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("admin")}>
              Admins
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("user")}>
              Users
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-x-auto relative min-h-50">
        <Table>
          <TableHeader>
            <TableRow className={"bg-slate-900 hover:bg-slate-900"}>
              <TableHead className="max-w-[100px] text-gray-100">Id</TableHead>
              <TableHead className="min-w-[160px] text-gray-100">
                Name
              </TableHead>
              <TableHead className="min-w-[180px] text-gray-100">
                Email
              </TableHead>
              <TableHead className="min-w-[140px] text-gray-100">
                Provider
              </TableHead>
              <TableHead className="min-w-[100px] text-gray-100">
                Status
              </TableHead>
              <TableHead className="min-w-[100px] text-gray-100">
                Role
              </TableHead>
              <TableHead className="min-w-[140px] text-gray-100">
                Created
              </TableHead>
              <TableHead className="min-w-[140px] text-gray-100">
                Updated
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user, idx) => (
              <TableRow
                key={idx}
                className="cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => router.push(`/admin/users/${user._id}`)}
              >
                <TableCell className="max-w-[100px]">{user.id}</TableCell>
                <TableCell className="font-medium truncate max-w-[180px]">
                  {user.name || "No_name"}
                </TableCell>
                <TableCell className="truncate max-w-[180px]">
                  {user.email}
                </TableCell>
                <TableCell className="truncate max-w-[160px]">
                  <a
                    href={user.provider_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                    onClick={(e) => e.stopPropagation()} // prevent row click
                  >
                    {user.provider}
                  </a>
                </TableCell>
                <TableCell>
                  {user.status === "active" ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactive</span>
                  )}
                </TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>{user.created_at}</TableCell>
                <TableCell>{user.updated_at}</TableCell>
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
                          router.push(`/admin/users/${user._id}/edit`)
                        }
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                      <DropdownMenuItem>
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

            {!loading && filteredUsers.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center text-gray-500 py-6"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Loader loading={loading} prompt="Fetching users..." />
      </div>
    </div>
  );
};

export default Users;
