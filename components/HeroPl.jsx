"use client";
import React from "react";
import { HeroParallax } from "./ui/HeroParallax";
import { products } from "@/data";


export function HeroParallaxDemo() {
    return <HeroParallax products={products} id="about-mayday"/>;
}
