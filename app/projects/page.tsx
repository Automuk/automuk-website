import { works } from "@/lib/works-data";
import ProjectAccordion from "@/components/ProjectAccordion";

export default function ProjectsPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 px-4 md:px-8">
            <div className="max-w-[1600px] mx-auto">
                <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 animate-fade-in-up">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-7xl font-medium tracking-tight text-white">
                            Selected Work.
                        </h1>
                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
                            Digital products we&apos;ve designed and engineered for founders, studios, and growing businesses. Hover to explore, click to open the case study.
                        </p>
                    </div>
                    <span className="text-sm font-bold text-white/30 tabular-nums shrink-0">
                        {String(works.length).padStart(2, "0")} projects
                    </span>
                </div>

                <ProjectAccordion works={works} />
            </div>
        </div>
    );
}
