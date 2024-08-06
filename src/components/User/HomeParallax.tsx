"use client";
import { HeroParallax } from "../ui/hero-parallax";
import { products } from "@/utils/productsData";
const HomeParallax = () => {
  return <HeroParallax products={products} />;
};
export default HomeParallax;
