"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

export default function TopLoader() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.configure({
      showSpinner: false, // spinner hide
      speed: 400,
      minimum: 0.2,
    });

    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
