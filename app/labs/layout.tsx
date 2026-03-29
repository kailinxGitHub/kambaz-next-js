"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import TOC from "./TOC";

export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const shouldShowSidebarToc = pathname !== "/labs";

  return (
    <div className="p-2">
      <div className="d-flex">
        {shouldShowSidebarToc && (
          <div className="me-4">
            <TOC />
          </div>
        )}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
