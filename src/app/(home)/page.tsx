import { ProjectForm } from "@/modules/home/project-form";
import { ProjectsList } from "@/modules/home/projects-list";

export default function Home() {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-28">
        <div className="flex flex-col items-center">
          {/* <Image
            src="/logo.svg"
            alt="Logo"
            width={50}
            height={50}
            className="hidden md:block"
          /> */}
        </div>
        <h1 className="text-2xl md:text-5xl pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-blue-300 to-blue-600/80 bg-clip-text text-center font-semibold leading-none text-transparent dark:from-blue-500 dark:to-blue-600">
          Build something amazing
        </h1>
        {/* <p className="text-base md:text-xl opacity-70 text-center">
          From Idea to Website, Luma&apos;s AI Agents Do the Work.
        </p> */}
        <div className="max-w-3xl mx-auto w-full">
          <ProjectForm /> 
        </div>
      </section>
      <ProjectsList />
    </div>
  );
}
