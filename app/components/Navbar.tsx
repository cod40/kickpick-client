"use client";
import { useRouter, usePathname } from "next/navigation";
import Card from "./ui/Card";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (page: string) => {
    router.push(`/${page.toLowerCase()}`);
  };

  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/profile/edit"
  ) {
    return;
  }

  return (
    <Card className="fixed bottom-2 shadow-md max-w-[448px] w-[93%] h-12 border border-gray-300">
      <nav className="flex justify-between items-center h-full px-4 sm:px-6 text-black">
        {["Home", "Ranking", "Profile"].map((page) => (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={`
              cursor-pointer
              flex items-center justify-center
              transition-colors duration-200
              ${
                pathname === `/${page.toLowerCase()}`
                  ? "text-green-400 border border-green-400"
                  : "hover:text-green-300"
              } 
              h-8 px-3 sm:px-4 md:px-6 rounded-lg
              text-sm sm:text-base
            `}
          >
            {page}
          </button>
        ))}
      </nav>
    </Card>
  );
}
