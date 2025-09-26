import { CardContent, Stack, Typography, Box } from "@mui/material";
import * as React from "react";

type Props = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
};

export default function NeonStatCard({ title, subtitle, icon, right }: Props) {
  const Inner = (
    <CardContent sx={{ p: 2.25 }}>
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            background:
              "linear-gradient(135deg, rgba(98,255,218,.18), rgba(255,224,70,.18))",
            boxShadow: "0 0 12px rgba(98,255,218,.25)",
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={800}
            color="rgba(255,255,255,.92)"
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="rgba(255,255,255,.6)">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box sx={{ flex: 1 }} />
        {right}
      </Stack>
    </CardContent>
  );

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 3,
        p: 0.5,
        background:
          "linear-gradient(135deg, rgba(98,255,218,.6), rgba(247,191,41,.6) 60%, rgba(120,169,255,.55))",
        boxShadow: "0 0 24px rgba(98,255,218,.18)",
        "&:hover": { boxShadow: "0 0 36px rgba(98,255,218,.28)" },
      }}
    >
      {Inner}
    </Box>
  );
}
