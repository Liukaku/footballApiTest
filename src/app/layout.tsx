import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Football Fixtures and Odds",
  description: "Look at football fixtures and odds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="viewport"></meta>
      <body className={inter.className}>
        <div className="">{children}</div>
      </body>
    </html>
  );
}
