import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import {
  Box,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material"
import AutocompleteAirports from "@/ui/AutocompleteAirports"

export default function Home() {
  return (
    <>
    <CssBaseline />
    <Container maxWidth="md">
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <Box style={{ paddingTop: "120px" }}>
            <Typography variant="h3" gutterBottom>
              US airports distance calculator
            </Typography>
          </Box>
        </Grid2>
        <Grid2 xs={12} sm={6} >
          <AutocompleteAirports />
        </Grid2>
        <Grid2 xs={12} sm={6} >
          <AutocompleteAirports />
        </Grid2>
      </Grid2>
    </Container>
    </>
  );
}
