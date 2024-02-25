import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/app/components/FixedNavbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="text-center mt-4 col-md-6 mx-auto">
        <h1 className="text-danger">Hello</h1>
      </div>
    </main>
  );
}
