import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { works, getWorkBySlug } from "@/lib/works-data";
import CTASection from "@/components/CTASection";

export function generateStaticParams() {
    return works.map((work) => ({ slug: work.slug }));
}

type ProjectPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const work = getWorkBySlug(slug);
    if (!work) return {};

    return {
        title: work.name,
        description: work.description,
        keywords: [work.name],
        alternates: {
            canonical: `https://autom.uk/projects/${work.slug}`,
        },
        openGraph: {
            title: `${work.name} | Automuk Projects`,
            description: work.description,
            images: [{ url: work.imageUrl, alt: work.name }],
        },
    };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const work = getWorkBySlug(slug);

    if (!work) notFound();

    return (
        <div className="min-h-screen pt-32 pb-0 px-4 md:px-8">
            <div className="max-w-5xl mx-auto animate-fade-in-up">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white transition-colors mb-10"
                >
                    <ArrowLeft size={16} /> Back to Projects
                </Link>

                <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[0.95]">
                    {work.name}
                </h1>

                <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mb-8">
                    {work.description}
                </p>

                <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 mb-16 w-fit"
                >
                    <span className="text-lg font-black tracking-wide" style={{ color: work.accent }}>
                        {work.domain}
                    </span>
                    <span
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: `${work.accent}22`, color: work.accent }}
                    >
                        <ArrowUpRight size={18} />
                    </span>
                </a>

                <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                    <img
                        src={work.imageUrl}
                        alt={work.name}
                        className="w-full h-auto object-cover object-top"
                    />
                </div>
            </div>

            <div className="mt-24">
                <CTASection
                    title="Want results like this?"
                    subtitle="Let's build the next case study — a platform that fits your brand and drives real growth."
                />
            </div>
        </div>
    );
}
