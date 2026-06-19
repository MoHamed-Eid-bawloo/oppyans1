import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/components/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FirstMarkets — A Creative Marketing Studio" },
      { name: "description", content: "FirstMarkets is a creative studio engineering brand systems, immersive websites and growth engines for the companies building what comes next." },
      { property: "og:title", content: "FirstMarkets — A Creative Marketing Studio" },
      { property: "og:description", content: "Brand, web, motion and growth — delivered by one senior team. Studios in Cairo & Riyadh." },
    ],
  }),
  component: Landing,
});
