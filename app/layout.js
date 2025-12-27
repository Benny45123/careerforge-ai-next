import "./globals.css";
import {AppProvider}  from "./context/AppContext";
export const metadata = {
  title: "careerforge-ai-next",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
