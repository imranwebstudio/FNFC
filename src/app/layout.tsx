import "~/styles/globals.css";

import { type Metadata } from "next";
import { Outfit, Syne } from "next/font/google";

import { GradientBlobs } from "~/components/gradient-blobs";
import { APP_NAME } from "~/lib/constants";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Office lunch catering — one-click daily meals",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-grain font-sans antialiased" suppressHydrationWarning>
        <GradientBlobs />
        <div className="app-shell">
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </div>
      </body>
    </html>
  );
}
