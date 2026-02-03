import { ReactNode } from "react";
import TOC from "./labs/TOC";
// import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <table>
          <tbody>
            <tr>
              <td valign="top" width="100px">
                <TOC />
              </td>
              <td valign="top">{children}</td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
