import "~/styles/globals.css";

import { type Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";

import { APP_NAME } from "~/lib/constants";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Office lunch catering — one-click daily meals",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-grain font-sans antialiased">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
