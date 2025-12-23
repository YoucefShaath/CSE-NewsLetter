import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import { GoogleAuthWrapper } from "../context/GoogleAuthWrapper";

export const metadata = {
  title: "CSE Newsletter",
  description: "CSE Newsletter where you can find all the news of the club",
  icons: {
    icon: "/darklogo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleAuthWrapper>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
        </GoogleAuthWrapper>
      </body>
    </html>
  );
}
