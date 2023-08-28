"use client"
import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Contact from "../components/Contact";
import SplashPage from "./Splash/page"; 

export default function Home() {
  const [shouldRenderSplash, setShouldRenderSplash] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");

    if (!userLoggedIn) {
      setShouldRenderSplash(true);
    }
  }, []);

  if (shouldRenderSplash) {
    return <SplashPage />;
  }

  return (
    <div>
      <Hero />
      <About />
      <Contact />
    </div>
  );
}
