import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Snackbar,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";
import SpeedRounded from "@mui/icons-material/SpeedRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import ArrowBackIosNewRounded from "@mui/icons-material/ArrowBackIosNewRounded";
import { motion, AnimatePresence } from "framer-motion";
import { buyCorn } from "../api";

// ---------- helpers ----------
function getOrCreateClientId(): string {
  const KEY = "bobs-corn-client-id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

function useCountdown() {
  const [seconds, setSeconds] = useState(0);
  const [total, setTotal] = useState(60);
  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [seconds]);
  return { seconds, setSeconds, total, setTotal };
}

// ---------- component ----------
type Props = {
  onSuccess: () => void;
  onBack?: () => void;
};

export default function Buy({ onSuccess, onBack }: Props) {
  const clientId = useMemo(() => getOrCreateClientId(), []);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState<{
    type: "success" | "error" | "info";
    msg: string;
  } | null>(null);

  const { seconds, setSeconds, total, setTotal } = useCountdown();
  const lastTxnRef = useRef<{ at: number } | null>(null);

  const disabled = loading || seconds > 0;

  const handleBuy = async () => {
    setLoading(true);
    try {
      const { status, data, retryAfter } = await buyCorn(clientId);
      if (status === 200 && "ok" in data && data.ok) {
        lastTxnRef.current = { at: data.boughtAt };
        setSnack({ type: "success", msg: "¡Compra exitosa! 🌽" });
        onSuccess?.();
      } else {
        const s =
          retryAfter ??
          (("retryAfterSeconds" in data && data.retryAfterSeconds) || 60);
        setTotal(s);
        setSeconds(s);
        setSnack({
          type: "error",
          msg: "Límite activo: solo 1 maíz por minuto. Espera a que termine la cuenta regresiva.",
        });
      }
    } catch {
      setSnack({
        type: "error",
        msg: "No se pudo contactar al servidor. Intenta nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const progressValue =
    seconds > 0
      ? Math.min(100, Math.max(0, ((total - seconds) / total) * 100))
      : 0;

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100dvh",
        bgcolor: "#0B0F17",
        color: "white",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(900px 400px at 20% -10%, rgba(98,255,218,.12), transparent 60%), radial-gradient(900px 400px at 90% 120%, rgba(247,191,41,.12), transparent 60%)",
        }}
      />

      <Container
        maxWidth="sm"
        sx={{ py: { xs: 3, md: 6 }, position: "relative", zIndex: 1 }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
          <IconButton
            onClick={() => onBack?.()}
            sx={{
              color: "rgba(255,255,255,.85)",
              border: "1px solid rgba(255,255,255,.12)",
              "&:hover": { background: "rgba(255,255,255,.06)" },
            }}
            size="small"
          >
            <ArrowBackIosNewRounded fontSize="small" />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: 0.3 }}>
            Comprar
          </Typography>
          <Box flex={1} />
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            color="rgba(255,255,255,.65)"
          >
            <InfoOutlined sx={{ fontSize: 18 }} />
            <Typography variant="caption">1 compra por minuto</Typography>
          </Stack>
        </Stack>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            borderRadius: 3,
            p: 0.75,
            background:
              "linear-gradient(135deg, rgba(98,255,218,.55), rgba(247,191,41,.55) 60%, rgba(120,169,255,.5))",
            boxShadow: "0 0 30px rgba(98,255,218,.18)",
          }}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 2.5,
              bgcolor: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.08)",
              backdropFilter: "blur(10px)",
              overflow: "hidden",
              position: "relative",
              minHeight: 260,
            }}
          >
            {loading && <LinearProgress color="inherit" />}

            <AnimatePresence>
              {seconds > 0 && (
                <motion.div
                  key="hud-ring"
                  initial={{ opacity: 0, scale: 0.9, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -8 }}
                  style={{ position: "absolute", top: 14, right: 14 }}
                >
                  <Tooltip title="Tiempo restante para nueva compra">
                    <Box sx={{ position: "relative", width: 64, height: 64 }}>
                      <CircularProgress
                        variant="determinate"
                        value={progressValue}
                        size={64}
                        thickness={3}
                        sx={{
                          color: "rgba(98,255,218,.9)",
                          filter: "drop-shadow(0 0 6px rgba(98,255,218,.45))",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          display: "grid",
                          placeItems: "center",
                          fontSize: 13,
                          fontWeight: 800,
                          color: "rgba(255,255,255,.9)",
                        }}
                      >
                        {seconds}s
                      </Box>
                    </Box>
                  </Tooltip>
                </motion.div>
              )}
            </AnimatePresence>

            <CardContent sx={{ p: 3 }}>
              <Stack spacing={2.5} alignItems="center">
                <Box
                  sx={{
                    p: 0.6,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, rgba(98,255,218,.8), rgba(247,191,41,.8) 60%, rgba(120,169,255,.8))",
                    boxShadow: "0 0 26px rgba(98,255,218,.35)",
                  }}
                >
                  <Button
                    onClick={handleBuy}
                    disabled={disabled}
                    startIcon={<ShoppingCartRounded />}
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.6,
                      borderRadius: 2.2,
                      fontWeight: 900,
                      textTransform: "none",
                      fontSize: 18,
                      color: "#0B0F17",
                      background:
                        "linear-gradient(135deg, #A7F3D0 0%, #F7DF67 45%, #9DBDFF 100%)",
                      "&:hover": {
                        boxShadow: "0 16px 48px rgba(167,243,208,.35)",
                        transform: "translateY(-1px)",
                        background:
                          "linear-gradient(135deg, #B8F7DA 0%, #FFE680 45%, #AAC8FF 100%)",
                      },
                      transition: "all .2s ease",
                    }}
                  >
                    {seconds > 0 ? `Espera ${seconds}s` : "Comprar 1 🌽"}
                  </Button>
                </Box>

                <AnimatePresence initial={false}>
                  {seconds > 0 ? (
                    <Stack
                      key="cooldown"
                      component={motion.div}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        p: 1.2,
                        px: 1.6,
                        borderRadius: 2,
                        bgcolor: "rgba(247,191,41,.08)",
                        border: "1px dashed rgba(247,191,41,.35)",
                      }}
                    >
                      <SpeedRounded sx={{ color: "#FFD166" }} />
                      <Typography color="rgba(255,255,255,.82)">
                        Límite activo. Podrás volver a comprar cuando el anillo
                        llegue a 100%.
                      </Typography>
                    </Stack>
                  ) : lastTxnRef.current ? (
                    <Stack
                      key="success"
                      component={motion.div}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        p: 1.2,
                        px: 1.6,
                        borderRadius: 2,
                        bgcolor: "rgba(98,255,218,.08)",
                        border: "1px solid rgba(98,255,218,.35)",
                      }}
                    >
                      <CheckCircleRounded sx={{ color: "#8BF4D5" }} />
                      <Typography color="rgba(255,255,255,.9)">
                        Compra registrada{" "}
                        {new Date(lastTxnRef.current.at).toLocaleTimeString()}.
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack
                      key="hint"
                      component={motion.div}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ opacity: 0.85 }}
                    >
                      <InfoOutlined sx={{ color: "rgba(255,255,255,.7)" }} />
                      <Typography color="rgba(255,255,255,.7)">
                        Tu ID cliente: <code>{clientId.slice(0, 8)}</code>… (se
                        usa para el rate limit).
                      </Typography>
                    </Stack>
                  )}
                </AnimatePresence>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>

      <Snackbar
        open={!!snack}
        autoHideDuration={2800}
        onClose={() => setSnack(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack(null)}
          iconMapping={{
            success: <CheckCircleRounded fontSize="inherit" />,
            error: <ErrorOutlineRounded fontSize="inherit" />,
            info: <InfoOutlined fontSize="inherit" />,
          }}
          severity={snack?.type ?? "info"}
          sx={{ width: "100%" }}
        >
          {snack?.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
