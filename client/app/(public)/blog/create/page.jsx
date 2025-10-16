"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { TbTagsFilled } from "react-icons/tb";
import { IoMdPeople } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { FaTrophy } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { MdDescription } from "react-icons/md";
import { RiFileSearchFill } from "react-icons/ri";
import { FaLink } from "react-icons/fa6";
import { LuRefreshCw } from "react-icons/lu";
import { MdSaveAs } from "react-icons/md";
import { HiMiniRocketLaunch } from "react-icons/hi2";
import { RiDraftLine } from "react-icons/ri";
import { IoCreate } from "react-icons/io5";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import TextEditor from "@/components/TextEditor";
import { toast } from "sonner";
import { BookType, ImagePlus, Loader2Icon, MoreHorizontal } from "lucide-react";
import { useAuth } from "@/contexts/auth/AuthContext";
import UnauthorizedPage from "@/app/unauthorized/page";
import callApi from "@/lib/callApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Badge } from "@/components/ui/badge";

function CreateBlog() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth() || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [category, setCategory] = useState("");
  const [teams, setTeams] = useState([]);
  const [teamInput, setTeamInput] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [leagueInput, setLeagueInput] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [sources, setSources] = useState([]);
  const [sourceName, setSourceName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");

  const [content, setContent] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  //drafts
  const [drafts, setDrafts] = useState([]);
  const [deleteDraft, setDeleteDraft] = useState(false);

  const textColor = "text-gray-800";

  useEffect(() => {
    const draftBlogs = async () => {
      const response = await callApi({
        method: "GET",
        url: "/blogs/drafts",
      });

      const { drafts = [] } = response?.data || {};
      setDrafts(drafts?.length > 0 ? drafts : []);
    };

    draftBlogs();
  }, []);

  const addItem = (input, setInput, arr, setArr) => {
    if (input && !arr.includes(input)) {
      setArr([...arr, input]);
      setInput("");
    }
  };
  const removeItem = (item, arr, setArr) =>
    setArr(arr.filter((t) => t !== item));

  const addSource = () => {
    if (sourceName && sourceUrl) {
      setSources([...sources, { name: sourceName, url: sourceUrl }]);
      setSourceName("");
      setSourceUrl("");
    }
  };
  const removeSource = (name) =>
    setSources(sources.filter((s) => s.name !== name));

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setImageFile(file);
    else setImageFile(null);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    document.getElementById("image_upload").value = "";
  };

  const handleSubmit = async (status) => {
    try {
      setLoading(true);
      const title = document.getElementById("headline").value.trim();
      const preview = document.getElementById("preview").value.trim();
      const author = document.getElementById("author").value.trim();

      if (!title || !preview || !content || !author || !category) {
        toast.warning("Please fill all required fields!");
        return;
      }

      const formData = new FormData();

      formData.append("title", title);
      formData.append("preview", preview);
      formData.append("content", content);
      formData.append("author_details", { author_name: author });
      formData.append("category", category);
      formData.append("teams", JSON.stringify(teams));
      formData.append("leagues", JSON.stringify(leagues));
      formData.append("tags", JSON.stringify(tags));
      formData.append("sources", JSON.stringify(sources));
      formData.append("status", status);
      formData.append("image_url", imageUrl || "");

      if (imageFile) {
        formData.append("image_file", imageFile);
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      await callApi({
        method: "POST",
        url: "/blog/create",
        data: formData,
      });

      const message =
        status === "draft" ? "Draft saved!" : "Blog published successfully.";
      toast.success(message);
      resetForm();
    } catch (error) {
      const errmsg = error?.message || "Something went wrong!";
      setError(errmsg);
      toast.error(errmsg);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCategory(null);
    setTeams([]);
    setTeamInput("");
    setLeagues([]);
    setLeagueInput("");
    setTags([]);
    setTagInput("");
    setSources([]);
    setSourceName("");
    setSourceUrl("");
    setContent(null);
    setImageFile(null);
    setPreviewUrl("");
    document.getElementById("blog-form").reset();
  };

  const handleDeleteDraft = () => {};

  return isAuthenticated && user?.role === "admin" ? (
    <div className="mx-auto flex max-w-6xl flex-col px-1 md:px-6">
      <BackButton />

      <div className="relative mx-auto w-full max-w-4xl">
        <Tabs defaultValue="create" className={"space-y-6"}>
          <TabsList className="bg-gray-300">
            <TabsTrigger value="create" className="text-gray-800">
              Create <IoCreate />
            </TabsTrigger>
            <TabsTrigger value="drafts" className="text-gray-800">
              Drafts <RiDraftLine />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="space-y-10">
            <h1
              className={`pb-4 px-2 md:px-4 text-4xl md:text-7xl font-extrabold tracking-tight ${textColor}`}
            >
              Create New Blog :)
            </h1>

            <div className="rounded-md  px-4 py-6">
              <form id="blog-form" className="space-y-8">
                {/* Title */}
                <div className="space-y-2">
                  <Label
                    htmlFor="headline"
                    className={`${textColor} font-medium px-1`}
                  >
                    <BookType strokeWidth={2.25} size={16} className="mt-0.5" />
                    Title
                  </Label>
                  <Input
                    id="headline"
                    name="headline"
                    className="border border-gray-300"
                    placeholder="Enter blog headline"
                  />
                </div>

                {/* Preview */}
                <div className="space-y-2">
                  <Label
                    htmlFor="preview"
                    className={`${textColor} font-medium px-1`}
                  >
                    <RiFileSearchFill size={16} className="mt-0.5" />
                    Preview
                  </Label>
                  <Input
                    id="preview"
                    name="preview"
                    className="border border-gray-300"
                    placeholder="Enter blog preview"
                  />
                </div>

                {/* Image TODO: Integrate with AWS S3 */}
                <div className="space-y-2">
                  <Label
                    htmlFor="image_upload"
                    className={`${textColor} font-medium px-1`}
                  >
                    <ImagePlus strokeWidth={1.25} size={16} /> Upload image
                  </Label>
                  <div>
                    <Input
                      type="file"
                      id="image_upload"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="border border-gray-300 w-4/6"
                    />
                    <span
                      onClick={handleRemoveImage}
                      className="ml-1 text-xs text-black/50 hover:text-red-700 cursor-pointer"
                    >
                      Remove image
                    </span>
                  </div>
                </div>
                <div className="text-gray-800 flex justify-center items-center">
                  Or
                </div>
                {/* Image src*/}
                <div className="space-y-2">
                  <Label
                    htmlFor="image_url"
                    className={`${textColor} font-medium px-1`}
                  >
                    <ImagePlus strokeWidth={1.25} size={16} /> Image Url
                  </Label>
                  <div>
                    <Input
                      type="text"
                      id="image_url"
                      value={imageUrl || ""}
                      name="image_url"
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="border border-gray-300 w-full"
                      placeholder="Enter image url..."
                    />
                    <span
                      onClick={() => setImageUrl(null)}
                      className="ml-1 text-xs text-black/50 hover:text-red-700 cursor-pointer"
                    >
                      Remove url
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label
                    htmlFor="content"
                    className={`${textColor} font-medium px-1`}
                  >
                    <MdDescription size={16} className="mt-0.5" />
                    Content
                  </Label>
                  <TextEditor
                    setContent={(c) => setContent(c)}
                    initialData={content || ""}
                  />
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <Label
                    htmlFor="author"
                    className={`${textColor} font-medium px-1`}
                  >
                    <FaUser size={12} className="mt-0.5" />
                    Author
                  </Label>
                  <Input
                    id="author"
                    name="author"
                    className="border border-gray-300"
                    placeholder="Enter author name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="category"
                      className={`${textColor} font-medium px-1`}
                    >
                      <BiSolidCategory size={15} className="mt-0.5" />
                      Category
                    </Label>
                    <Select
                      name="category"
                      value={category}
                      onValueChange={(value) => setCategory(value)}
                    >
                      <SelectTrigger
                        id="category"
                        className="border border-gray-300 w-full"
                      >
                        <SelectValue placeholder="Select a category..." />
                      </SelectTrigger>
                      <SelectContent className="border border-gray-300">
                        <SelectGroup>
                          <SelectItem value="team_news">Team News</SelectItem>
                          <SelectItem value="injury_updates">
                            Injury Updates
                          </SelectItem>
                          <SelectItem value="transfer_news">
                            Transfer News
                          </SelectItem>
                          <SelectItem value="leagues">Leagues</SelectItem>
                          <SelectItem value="prediction">Prediction</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Teams */}
                  <div className="space-y-2">
                    <Label htmlFor="teams" className={`${textColor} px-2`}>
                      <IoMdPeople size={18} /> Teams
                    </Label>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter team.."
                          className="border border-gray-300"
                          value={teamInput}
                          onChange={(e) => setTeamInput(e.target.value)}
                        />
                        <IoAddCircle
                          size={32}
                          color="#1F2937"
                          onClick={() =>
                            addItem(teamInput, setTeamInput, teams, setTeams)
                          }
                        />
                      </div>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {teams.map((team) => (
                          <span
                            key={team}
                            className="px-2 py-1 rounded-md bg-zinc-800 text-xs text-white flex items-center gap-1"
                          >
                            {team}
                            <button
                              onClick={() => removeItem(team, teams, setTeams)}
                              className="ml-1 text-gray-300 hover:text-white"
                              type="button"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Leagues */}
                  <div className="space-y-2">
                    <Label htmlFor="leagues" className={`${textColor} px-2`}>
                      <FaTrophy size={14} className="mt-1" />
                      Leagues
                    </Label>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter league.."
                          className="border border-gray-300"
                          value={leagueInput}
                          onChange={(e) => setLeagueInput(e.target.value)}
                        />
                        <IoAddCircle
                          size={32}
                          color="#1F2937"
                          onClick={() =>
                            addItem(
                              leagueInput,
                              setLeagueInput,
                              leagues,
                              setLeagues
                            )
                          }
                        />
                      </div>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {leagues.map((league) => (
                          <span
                            key={league}
                            className="px-2 py-1 rounded-md bg-zinc-800 text-xs text-white flex items-center gap-1"
                          >
                            {league}
                            <button
                              onClick={() =>
                                removeItem(league, leagues, setLeagues)
                              }
                              className="ml-1 text-gray-300 hover:text-white"
                              type="button"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags" className={`${textColor} px-2`}>
                      <TbTagsFilled size={16} /> Tags
                    </Label>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter tag.."
                          className="border border-gray-300"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                        />
                        <IoAddCircle
                          size={32}
                          color="#1F2937"
                          onClick={() =>
                            addItem(tagInput, setTagInput, tags, setTags)
                          }
                        />
                      </div>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-md bg-zinc-800 text-xs text-white flex items-center gap-1"
                          >
                            {tag}
                            <button
                              onClick={() => removeItem(tag, tags, setTags)}
                              className="ml-1 text-gray-300 hover:text-white"
                              type="button"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sources */}
                <div className="space-y-4">
                  <Label className={`${textColor} font-medium px-1`}>
                    <FaLink size={14} />
                    Sources
                  </Label>
                  <div className="grid md:grid-cols-2 gap-2 md:gap-6 py-2 px-4 rounded-md">
                    <div className="flex gap-2">
                      <Label className={`${textColor} w-1/4 md:w-auto`}>
                        Name
                      </Label>
                      <Input
                        placeholder="Source name"
                        className="border border-gray-300"
                        value={sourceName}
                        onChange={(e) => setSourceName(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Label className={`${textColor} w-1/4 md:w-auto`}>
                        URL
                      </Label>
                      <Input
                        placeholder="Source url"
                        className="border border-gray-300"
                        value={sourceUrl}
                        onChange={(e) => setSourceUrl(e.target.value)}
                      />
                    </div>
                    <span
                      onClick={addSource}
                      className={
                        "mr-auto py-2 px-4 bg-gray-800 text-white rounded-lg font-bold text-sm cursor-pointer hover:bg-gray-800/95"
                      }
                    >
                      Add source
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {sources.map((src) => (
                      <span
                        key={src.name}
                        className="px-2 py-1 rounded-md bg-zinc-800 text-xs text-white flex items-center gap-1"
                      >
                        {src.name}
                        <button
                          onClick={() => removeSource(src.name)}
                          className="ml-1 text-gray-300 hover:text-white"
                          type="button"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-4 justify-end pt-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={resetForm}
                    className={"font-bold "}
                  >
                    <LuRefreshCw />
                    Reset
                  </Button>
                  <Button
                    variant="info"
                    type="button"
                    onClick={() => handleSubmit("draft")}
                    className={"font-bold tracking-tight"}
                  >
                    <MdSaveAs />
                    Save Draft
                  </Button>
                  {loading ? (
                    <Button
                      variant="dark"
                      type="button"
                      disabled={loading}
                      className={"font-bold"}
                    >
                      <Loader2Icon className="animate-spin" />
                      Publishing...
                    </Button>
                  ) : (
                    <Button
                      variant="dark"
                      type="button"
                      onClick={() => handleSubmit("published")}
                      className={"font-bold"}
                    >
                      <HiMiniRocketLaunch />
                      Publish
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="drafts" className="space-y-10">
            <div className="rounded-md border overflow-x-hidden">
              <Table>
                <TableHeader>
                  <TableRow className={"bg-slate-900 hover:bg-slate-900"}>
                    <TableHead className={"text-gray-200 text-center"}>
                      Sl no.
                    </TableHead>
                    <TableHead className={"text-gray-200 text-center"}>
                      Title
                    </TableHead>
                    <TableHead className={"text-gray-200 text-center"}>
                      Status
                    </TableHead>
                    <TableHead className={"text-gray-200 text-center"}>
                      Created At
                    </TableHead>
                    <TableHead className={"text-gray-200 text-center"}>
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drafts?.length > 0 ? (
                    drafts.map((draft, idx) => (
                      <TableRow key={idx}>
                        <TableCell className={"text-center"}>
                          {idx + 1}
                        </TableCell>
                        <TableCell className={"text-center"}>
                          {draft?.title || "-"}
                        </TableCell>
                        <TableCell className={"text-center"}>
                          {draft?.status === "draft" ? (
                            <Badge variant={"warning"} className={"rounded-md"}>
                              draft
                            </Badge>
                          ) : (
                            <Badge
                              variant={"secondary"}
                              className={"rounded-md"}
                            >
                              {draft?.status || "-"}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className={"text-center"}>
                          {draft?.createdAt || "-"}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className={"bg-gray-300"}
                            >
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(
                                    `/admin/content-management/${draft.slug}/edit`
                                  )
                                }
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setDeleteDraft(true);
                                  handleDeleteDraft();
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
                              <DropdownMenuItem>Publish</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <div className="text-center"> No draft-blogs</div>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ) : (
    <UnauthorizedPage />
  );
}

export default CreateBlog;
