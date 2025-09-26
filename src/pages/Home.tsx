import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import ArrowForwardIosRounded from "@mui/icons-material/ArrowForwardIosRounded";
import EmojiEventsRounded from "@mui/icons-material/EmojiEventsRounded";
import LocalMallRounded from "@mui/icons-material/LocalMallRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import GrainRounded from "@mui/icons-material/GrainRounded";
import NeonStatCard from "../components/NeonStatCard";
import { motion } from "framer-motion";
import FuturaBackground from "../components/FuturaBackground";

type Props = {
  onGoBuy: () => void;
  successCount: number;
};

export default function Home({ onGoBuy, successCount }: Props) {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100dvh",
        bgcolor: "#0B0F17",
        color: "white",
      }}
    >
      <FuturaBackground />

      <Container
        maxWidth="md"
        sx={{ py: { xs: 3, md: 6 }, position: "relative", zIndex: 1 }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            mb: 3,
            borderRadius: 3,
            p: 2,
            background:
              "linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
            border: "1px solid rgba(255,255,255,.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              component={motion.div}
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              sx={{
                width: 46,
                height: 46,
                borderRadius: "12px",
                display: "grid",
                placeItems: "center",
                background:
                  "radial-gradient(circle at 35% 25%, rgba(98,255,218,.35), transparent 60%), radial-gradient(circle at 70% 70%, rgba(247,191,41,.35), transparent 60%)",
                boxShadow:
                  "0 0 24px rgba(98,255,218,.25), inset 0 0 12px rgba(255,255,255,.08)",
                fontSize: 24,
              }}
            >
              🌽
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  background:
                    "linear-gradient(90deg, #A7F3D0 0%, #F7BF29 50%, #9DBDFF 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  letterSpacing: 0.4,
                }}
              >
                Bob’s Corn // Nexus
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                color="rgba(255,255,255,.65)"
              >
                <InfoOutlined fontSize="inherit" sx={{ fontSize: 16 }} />
                <Typography variant="caption">
                  Comercio justo — 1 🌽 / minuto
                </Typography>
              </Stack>
            </Box>
            <Box flex={1} />
            <Button
              size="small"
              variant="outlined"
              sx={{
                borderColor: "rgba(98,255,218,.45)",
                color: "rgba(98,255,218,.95)",
                textTransform: "none",
                "&:hover": {
                  borderColor: "rgba(98,255,218,.8)",
                  background: "rgba(98,255,218,.06)",
                },
              }}
              startIcon={<GrainRounded />}
            >
              Inventario: 0
            </Button>
          </Stack>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            borderRadius: 3,
            mb: 3,
            p: 3,
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, rgba(98,255,218,.12), rgba(247,191,41,.10) 55%, rgba(120,169,255,.10))",
            border: "1px solid rgba(255,255,255,.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(600px 220px at 20% -10%, rgba(98,255,218,.18), transparent 60%), radial-gradient(600px 220px at 90% 120%, rgba(247,191,41,.18), transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, mb: 0.5, letterSpacing: 0.3 }}
          >
            Bienvenido a la granja de Bob
          </Typography>
          <Typography color="rgba(255,255,255,.75)">
            Compra maíz fresco nunca fue tan facil
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={3}>
          <NeonStatCard
            title="Comprar Maíz"
            subtitle="Máximo 1 maíz por minuto — comercio justo"
            icon={<LocalMallRounded sx={{ color: "#8BF4D5" }} />}
            right={
              <IconButton
                onClick={onGoBuy}
                size="small"
                sx={{ color: "rgba(255,255,255,.85)" }}
              >
                <ArrowForwardIosRounded fontSize="small" />
              </IconButton>
            }
          />
          <NeonStatCard
            title="Logros Recientes"
            subtitle={
              successCount
                ? "Compra tu primer 🌽 para desbloquear el **Starter Badge**."
                : "🎉 ¡Primer compra completada! “Starter Badge” desbloqueado."
            }
            icon={<EmojiEventsRounded sx={{ color: "#FFD166" }} />}
          />
        </Stack>
      </Container>
    </Box>
  );
}
