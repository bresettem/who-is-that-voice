import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/app/components/FixedNavbar";
import DarkModeScript from "@/app/components/DarkModeScript";
import DarkModeButton from "@/app/components/DarkModeButton";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="text-center mt-4 col-md-6 mx-auto">
        <h1 className="text-danger">Hello</h1>
      </div>
      <DarkModeScript />
      <DarkModeButton />
    </main>
  );
}
