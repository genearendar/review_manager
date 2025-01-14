import Link from "next/link";
import HeaderAuth from "@/components/header-auth";

export default function Header() {
  return (
    <header>
      <nav className="flex justify-center border-b border-b-foreground/10 h-16">
        <div className="container w-full flex justify-between items-center text-sm">
          <div className="flex gap-5 items-center font-bold text-primary text-lg">
            <Link href={"/"}>RaveBoard</Link>
            <div className="flex items-center gap-2"></div>
          </div>
          <HeaderAuth />
        </div>
      </nav>
    </header>
  );
}
