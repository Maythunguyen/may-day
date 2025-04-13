import { HoverEffect } from "./ui/HoverEffect";
import { aboutMayDaysItems } from "@/data";



export function Features() {
  return (
    <section className="max-w-5xl mx-auto" id="features">
      <div className="max-w-7xl relative mx-auto py-10 md:py-20 px-4 w-full  left-0 top-0">
        <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
          Features
        </h1>
        
      </div>
      <HoverEffect items={aboutMayDaysItems} />
    </section>
  );
}
