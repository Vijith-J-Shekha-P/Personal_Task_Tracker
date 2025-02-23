"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerURL } from "@/lib/constants";

export function RegisterForm({ className, ...props }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const register = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    setLoading(true);
    try {
      const response = await axios.post(registerURL, register);
      console.log(response);
      console.log("res", response.status);
      if (response.status === 200) {
        router.push("/login");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {!loading ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter your details below to register your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Alredy have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}
