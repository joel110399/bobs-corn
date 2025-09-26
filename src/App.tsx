import { useMemo, useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import CornBackground from "./components/FuturaBackground";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#F7BF29" },
    secondary: { main: "#2E7D32" },
    background: { default: "#FFF8E8" },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: [
      "Inter",
      "SF Pro Text",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

export default function App() {
  const [tab, setTab] = useState<"home" | "buy">("home");
  const [successCount, setSuccessCount] = useState(0);

  const page = useMemo(() => {
    if (tab === "home")
      return <Home onGoBuy={() => setTab("buy")} successCount={successCount} />;
    if (tab === "buy")
      return (
        <Buy
          onSuccess={() => setSuccessCount((c) => c + 1)}
          onBack={() => setTab("home")}
        />
      );
  }, [tab, successCount]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Fondo y maíces animados */}
      <CornBackground />

      {/* Páginas */}
      {page}

      {/* Bottom Navigation */}
      <BottomNav
        value={tab}
        onChange={(val) => setTab(val as "home" | "buy")}
      />
    </ThemeProvider>
  );
}
