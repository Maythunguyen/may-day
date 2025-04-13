"use client";
import { Features } from "@/components/Features";
import { HeroParallaxDemo } from "@/components/HeroPl";
import {  NavbarSection } from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <NavbarSection />
      <HeroParallaxDemo />
      <Features />
    </main>
    
  );
}
