import "./globals.css";


export const metadata = {
  title: "CSE Newsletter",
  description: "CSE Newsletter where you can find all the news of the club",
  icons:{
    icon: "/darklogo.svg",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
