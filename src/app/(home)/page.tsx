import { ProjectForm } from "@/modules/home/project-form";
import { ProjectsList } from "@/modules/home/projects-list";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[10vh] 2xl:py-30">
        <div className="flex flex-col items-center">
          {/* <Image
            src="/logo.svg"
            alt="Logo"
            width={50}
            height={50}
            className="hidden md:block"
          /> */}
        </div>
        <h1 className="text-2xl md:text-5xl font-bold text-center">
          Build something amazing
        </h1>
        <p className="text-lg md:text-xl opacity-70 text-center">
          From Idea to Website, Luma&apos;s AI Agents Do the Work.
        </p>
        <div className="max-w-3xl mx-auto w-full">
          <ProjectForm />
        </div>
      </section>
      <ProjectsList />
    </div>
  );
}
