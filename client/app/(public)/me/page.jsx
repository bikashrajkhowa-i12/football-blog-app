"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/auth/AuthContext";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { IconPaperclip } from "@tabler/icons-react";

const ProfilePage = () => {
  const { user = {}, isAuthenticated = false } = useAuth() || {};
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [personalForm, setPersonalForm] = useState({
    name: "",
    username: "",
    bio: "",
    avatar_url: "",
  });

  const [accountForm, setAccountForm] = useState({
    email: "",
    language: "",
    timezone: "",
  });

  useEffect(() => {
    if (user && isAuthenticated) {
      setIsAuthorized(true);
      setPersonalForm({
        name: user?.name || "",
        username: user?.username || "",
        bio: user?.bio || "",
        avatar_url: user?.avatar_url || "",
      });

      setAccountForm({
        email: user?.email || "",
        language: "en",
        timezone: "GMT+5:30",
      });
    } else {
      setIsAuthorized(false);
    }
  }, [user, isAuthenticated, isAuthorized]);

  const initials = personalForm?.name
    ? personalForm?.name
        ?.trim()
        .split(" ")
        .map((n) => n[0]?.toUpperCase())
        .join("")
    : "?";

  const handlePersonalChange = (field, value) =>
    setPersonalForm((prev) => ({ ...prev, [field]: value }));

  const handleAccountChange = (field, value) =>
    setAccountForm((prev) => ({ ...prev, [field]: value }));

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handlePersonalChange("avatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const savePersonal = () => {
    console.log("✅ Personal saved:", personalForm);
  };

  const saveAccount = () => {
    console.log("✅ Account saved:", accountForm);
  };

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col gap-6 pt-2 pb-12 px-1">
      {/* Avatar */}
      <Card className="text-center py-8 shadow-sm border">
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <Avatar className="w-20 h-20 text-3xl ring-2 ring-green-500 ring-offset-2 shadow">
              <AvatarImage
                src={personalForm.avatar || undefined}
                alt={personalForm.name || "User"}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            {personalForm.avatar && (
              <Button
                variant="outline"
                size="icon"
                className="absolute top-0 right-0 rounded-full shadow border border-white bg-white hover:bg-gray-200"
                aria-label="Remove"
                onClick={() => handlePersonalChange("avatar", "")}
              >
                &times;
              </Button>
            )}
          </div>
          <label className="block mt-2 text-sm font-medium text-gray-500 cursor-pointer hover:underline">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
            <span className="flex items-center gap-1">
              Upload a JPG or PNG image <IconPaperclip size={16} />
            </span>
          </label>
        </div>
      </Card>

      {/* Accordion */}
      <Accordion
        type="multiple"
        defaultValue={["personal", "account"]}
        className="max-w-3xl mx-auto w-full"
      >
        {/* Personal Info */}
        <AccordionItem value="personal" className="border rounded-lg bg-white">
          <AccordionTrigger className="px-4">
            <span className="text-base font-semibold">Personal info</span>
          </AccordionTrigger>
          <AccordionContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                savePersonal();
              }}
            >
              <Card className="border-0 shadow-none">
                <CardContent className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={personalForm?.name || ""}
                      onChange={(e) =>
                        handlePersonalChange("name", e.target.value)
                      }
                      placeholder="Enter your name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={personalForm?.username || ""}
                      onChange={(e) =>
                        handlePersonalChange("username", e.target.value)
                      }
                      placeholder="Enter username"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <Label htmlFor="about">Bio</Label>
                      <span className="text-xs text-gray-400">
                        {personalForm?.bio?.length || 0}/1000
                      </span>
                    </div>
                    <Textarea
                      id="bio"
                      value={personalForm?.bio || ""}
                      onChange={(e) =>
                        handlePersonalChange("bio", e.target.value)
                      }
                      placeholder="Write a short description..."
                      maxLength={1000}
                      className="mt-1 h-24"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" size="lg">
                    SAVE CHANGES
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </AccordionContent>
        </AccordionItem>

        {/* Account & Settings */}
        <AccordionItem value="account" className="border rounded-lg bg-white">
          <AccordionTrigger className="px-4">
            <span className="text-base font-semibold">
              Account &amp; settings
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveAccount();
              }}
              className="px-4 pb-4"
            >
              <Card className="border-0 shadow-none">
                <CardHeader className="px-0">
                  <CardTitle>Account</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <Label>Email</Label>
                  <Input
                    value={accountForm?.email || ""}
                    readOnly
                    className="mt-1 bg-gray-50 border-none"
                  />
                </CardContent>

                <Separator className="my-4" />

                <CardHeader className="px-0">
                  <CardTitle className="text-base">Settings</CardTitle>
                </CardHeader>
                <CardContent className="px-0 flex flex-col gap-4">
                  <div>
                    <Label>Language</Label>
                    <Select
                      value={accountForm?.language || ""}
                      onValueChange={(val) =>
                        handleAccountChange("language", val)
                      }
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Timezone</Label>
                    <Select
                      value={accountForm.timezone || ""}
                      onValueChange={(val) =>
                        handleAccountChange("timezone", val)
                      }
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GMT+5:30">
                          27/08/2025, 23:43, GMT+5:30
                        </SelectItem>
                        <SelectItem value="GMT+0">
                          27/08/2025, 18:13, GMT+0
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" size="lg">
                    SAVE CHANGES
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProfilePage;
