import "./globals.css"; 
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "May Day",
  description: "Built with Aspiration, Passion, and Love",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
    >
      <html lang="en">
        <body className="font-sans antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
