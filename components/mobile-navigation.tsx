"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Film, Tv, TrendingUp, User } from "lucide-react";

export function MobileNavigation() {
  const pathname = usePathname();
  const shouldRender = useMemo(() => pathname !== "/", [pathname]);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsVisible(currentScrollY <= lastScrollY || currentScrollY < 50);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!shouldRender) return null;

  return (
    <nav
      className={`md:hidden  fixed bottom-0 left-0 right-0 mx-auto w-[90%] bg-gray-900/90 backdrop-blur-lg border-t border-gray-800 rounded-2xl p-2 shadow-md transition-transform duration-200 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-around items-center gap-3 h-14">
        {[
          { href: "/home", icon: <Home className="h-5 w-5" />, label: "Home" },
          { href: "/movies", icon: <Film className="h-5 w-5" />, label: "Movies" },
          { href: "/shows", icon: <Tv className="h-5 w-5" />, label: "TV" },
          { href: "/trending", icon: <TrendingUp className="h-5 w-5" />, label: "Trending" },
          { href: "/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
        ].map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center text-[11px] p-1 ${
              pathname.includes(href) ? "text-blue-400" : "text-gray-400"
            }`}
          >
            <div className="mb-1">{icon}</div>
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}