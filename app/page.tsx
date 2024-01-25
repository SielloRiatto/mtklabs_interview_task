import {
  Box,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material"
import AirportsSelectionGrid from "@/ui/AirportsSelectionGrid"

export default function Home() {
  return (
    <>
    <CssBaseline />
    <Container maxWidth="md">
      <Box style={{ paddingTop: "3rem" }}>
        <Typography variant="h3" gutterBottom>
          US airports distance calculator
        </Typography>
      </Box>
      <AirportsSelectionGrid />
    </Container>
    </>
  );
}
