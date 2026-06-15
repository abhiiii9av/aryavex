import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

export const metadata = {
  title: "Aryavex Technologies Pvt Ltd",
  description: "Vibrant fintech website starter for Aryavex Technologies Pvt Ltd"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
