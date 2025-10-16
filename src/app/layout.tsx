import "../styles/global.css";
import Navbar from "@/components/layout/Navbar";
import SubNavbar from "@/components/layout/SubNavbar";
import StyledComponentsRegistry from "../lib/registry";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      
      <body className="bg-gray-50 text-gray-900">
      {/* <StyledComponentsRegistry> */}

        <Navbar />
        <SubNavbar />
   <main className="min-h-screen">{children}</main>
        {/* </StyledComponentsRegistry> */}

     
      </body>
    </html>
  );
}
