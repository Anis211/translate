/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <div className="h-auto bg-[#1E1E1E] overflow-x-hidden">
      <Navbar />
      {children}
      <div
        className="px-3 py-3 bg-white rounded-full flex justify-center items-center lg:hidden fixed left-[75%] top-[87%] z-40"
        onClick={() => router.push("https://wa.me/+77054229293")}
      >
        <img src="/whatsapp1.png" alt="whatsapp" className="w-14 h-14" />
      </div>
      <div
        className="px-3 py-3 bg-[#2CAE80] rounded-full flex justify-center items-center lg:hidden fixed left-[5%] top-[88%] z-40"
        onClick={() => router.push("tel:+77054229293")}
      >
        <img src="/call.png" alt="call" className="w-12 h-12" />
      </div>
      <Footer />
    </div>
  );
}
