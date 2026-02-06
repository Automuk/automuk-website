"use client";

import PageContainer from "@/components/PageContainer";
import { motion } from "framer-motion";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#00020C] pt-40 pb-20 px-4">
            <PageContainer>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto prose prose-invert prose-blue"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter font-heading">
                        Terms of <span className="text-[#3168FA]">Service</span>
                    </h1>

                    <div className="space-y-8 text-[#94A3B8] text-lg font-heading leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using the Automuk website and services, you agree to be bound by these Terms of Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
                            <p>
                                Automuk provides AI automation, custom software development, and consulting services. We reserve the right to modify or discontinue any aspect of our services at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
                            <p>
                                All content, trademarks, and data on this website are the property of Automuk unless otherwise stated. Unauthorized use is prohibited.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. User Obligations</h2>
                            <p>
                                Users agree to use the website and services for lawful purposes only and in a manner that does not infringe upon the rights of others.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
                            <p>
                                Automuk shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Governing Law</h2>
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Automuk operates.
                            </p>
                        </section>

                        <p className="text-sm pt-12 border-t border-white/10">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </motion.div>
            </PageContainer>
        </div>
    );
}
