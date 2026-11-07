import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NetFiles Privacy Policy | Automuk",
  description:
    "Privacy Policy and data security details for the NetFiles desktop file manager application, including PKCE cloud authentication, local OneDrive integration, SSH security, and P2P seeding disclosures.",
  alternates: {
    canonical: "https://autom.uk/netfiles/privacy",
  },
};

export default function NetFilesPrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
