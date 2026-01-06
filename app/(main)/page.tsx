import { getProjects } from "@/sanity/lib/fetch";
import HomeContent from "./HomeContent";

export default async function Home() {
  const projects = await getProjects();

  return <HomeContent projects={projects} />;
}
