"use client";

import ScrollProgress from "./ScrollProgress";
import StickyNav from "@/components/ui/StickyNav";
import NavigationBar from "@/components/ui/NavigationBar";

interface StoryContainerProps {
  children: React.ReactNode;
}

export default function StoryContainer({ children }: StoryContainerProps) {
  return (
    <>
      <NavigationBar />
      <ScrollProgress />
      <StickyNav />
      <main>{children}</main>
    </>
  );
}
