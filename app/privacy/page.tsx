"use client";

import PageContainer from "@/components/PageContainer";
import { motion } from "framer-motion";

export default function PrivacyPage() {
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
                        Privacy <span className="text-[#3168FA]">Policy</span>
                    </h1>

                    <div className="space-y-8 text-[#94A3B8] text-lg font-heading leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                            <p>
                                At Automuk, we take your privacy seriously. This Policy explains how we collect, use, and protect your information when you use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Information Collection</h2>
                            <p>
                                We collect information you provide directly to us, such as when you book a consultation or contact us. This may include your name, email address, and project details.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">How We Use Information</h2>
                            <p>
                                We use the information we collect to provide, maintain, and improve our services, and to communicate with you about your projects.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                            <p>
                                We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
                            <p>
                                We use functional cookies to enhance your experience on our website. You can manage your cookie preferences through your browser settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at hello@autom.uk.
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
