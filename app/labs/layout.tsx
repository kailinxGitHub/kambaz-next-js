import { ReactNode } from "react";
import TOC from "./TOC";

export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="p-2">
      <div className="d-flex">
        <div className="me-4">
          <TOC />
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
