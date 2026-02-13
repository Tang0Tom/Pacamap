import StoryContainer from "@/components/story/StoryContainer";
import SectionIntro from "@/components/story/SectionIntro";
import SectionOverview from "@/components/story/SectionOverview";
import SectionHistory from "@/components/story/SectionHistory";
import SectionDeclining from "@/components/story/SectionDeclining";
import SectionEmerging from "@/components/story/SectionEmerging";
import SectionDisparities from "@/components/story/SectionDisparities";
import SectionExplore from "@/components/story/SectionExplore";
import Link from "next/link";

export default function Home() {
  return (
    <StoryContainer>
      <SectionIntro />
      <SectionOverview />
      <SectionHistory />
      <SectionDeclining />
      <SectionEmerging />
      <SectionDisparities />
      <SectionExplore />

      <footer className="section-dark py-12 text-center">
        <p className="text-nav-muted text-sm">
          MapStory PACA — Données ouvertes |{" "}
          <Link
            href="/sources"
            className="text-accent-primary hover:underline"
          >
            Sources
          </Link>
        </p>
      </footer>
    </StoryContainer>
  );
}
