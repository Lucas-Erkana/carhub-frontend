import "./globals.css";
import { Inter } from "next/font/google";
import ReduxProvider from "../redux/provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Carhub",
  description: "Car rental service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
