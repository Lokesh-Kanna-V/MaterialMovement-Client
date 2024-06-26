// "use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <ThemeProvider theme={darkTheme}>
        <CssBaseline /> */}
      <body className={inter.className}>{children}</body>
      {/* </ThemeProvider> */}
    </html>
  );
}
