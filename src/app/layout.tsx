import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SubNavbar from "@/components/layout/SubNavbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <SubNavbar />
        {/* <main className="min-h-screen">{children}</main> */}
      </body>
    </html>
  );
}
