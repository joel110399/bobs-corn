import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Box,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function BottomNav({ value, onChange }: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "fixed",
        left: 12,
        right: 12,
        bottom: 12,
        zIndex: 1000,
        borderRadius: 3,
        bgcolor: "rgba(255,255,255,.04)",
        border: "1px solid rgba(255,255,255,.08)",
        backdropFilter: "blur(12px) saturate(140%)",
        boxShadow: "0 20px 60px rgba(0,0,0,.45)",
        overflow: "hidden",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: 12,
          padding: "2px",
          background:
            "linear-gradient(135deg, rgba(98,255,218,.6), rgba(247,191,41,.6) 60%, rgba(120,169,255,.55))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
          boxShadow: "0 0 24px rgba(98,255,218,.18)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 2,
          background:
            "linear-gradient(90deg, rgba(98,255,218,.6), rgba(247,191,41,.6) 60%, rgba(120,169,255,.6))",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />

      <BottomNavigation
        showLabels
        value={value}
        onChange={(_e, newVal) => onChange(newVal)}
        sx={{
          bgcolor: "transparent",
          "& .MuiBottomNavigationAction-root": {
            color: "rgba(255,255,255,.65)",
            px: 2,
            minWidth: "auto",
            position: "relative",
            "& .MuiSvgIcon-root": { fontSize: 22 },
            "&.Mui-selected": {
              color: "rgba(255,255,255,.95)",
              "& .MuiSvgIcon-root": {
                color: "#8BF4D5",
                filter: "drop-shadow(0 0 8px rgba(98,255,218,.45))",
              },
            },

            "&.Mui-selected::after": {
              content: '""',
              position: "absolute",
              bottom: 6,
              left: "50%",
              transform: "translateX(-50%)",
              width: 36,
              height: 22,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, rgba(98,255,218,.25), rgba(247,191,41,.25) 60%, rgba(120,169,255,.25))",
              boxShadow: "0 0 14px rgba(98,255,218,.32)",
              zIndex: -1,
            },
          },
        }}
      >
        <BottomNavigationAction
          label="Inicio"
          value="home"
          icon={<HomeRoundedIcon />}
        />
        <BottomNavigationAction
          label="Comprar"
          value="buy"
          icon={<ShoppingCartRounded />}
        />
      </BottomNavigation>
    </Paper>
  );
}
