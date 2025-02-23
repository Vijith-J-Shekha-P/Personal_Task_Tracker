"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginURL } from "@/lib/constants";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const publicRoutes = ["/login", "/register"]; // Allow unauthenticated access

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    } else if (
      !publicRoutes.includes(window.location.pathname) &&
      ((!user && !token) || !storedToken || !storedUser)
    ) {
      router.push("/login"); // Redirect only if not on public routes
    }

    setLoading(false);
  }, [router]);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch(loginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email, password),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ id: data.userId, name: data.username })
        );
        setToken(data.token);
        setUser({ id: data.userId, name: data.username });
        router.push("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
