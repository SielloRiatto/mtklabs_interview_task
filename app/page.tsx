'use client'

import { useState, useEffect } from "react"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import {
  AutocompleteRenderInputParams,
  Autocomplete,
  Box,
  Container,
  CssBaseline,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material"

interface AirportData {
  name: string,
  country_code: string,
  iata_code: string,
  icao_code: string,
  lat: number,
  lng: number,
  population?: number,
  continent?: string,
  currency?: string,
  names?: {
    [key: string]: string
  }[]
}

function AutocompleteTextInput(params:AutocompleteRenderInputParams) {
  return <TextField {...params} label="Airport" />
}

function CentralizedProgress() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  )
}

export default function Home() {
  const [airports, setAirports] = useState([])

  useEffect(() => {
    const url = 'https://airlabs.co/api/v9/airports'
    const params = {
      api_key: 'daae47ca-1693-4405-ae4c-a9029e84b0dc',
      country_code: 'US',
      _fields: 'name'
    }

    const queryString = new URLSearchParams(params).toString()

    fetch(`${url}?${queryString}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }

      throw new Error(`Request failed with ${response.status} - ${response.statusText}`)
    })
    .then((json) => {
      const airportsNames = json.response.map((data: AirportData) => data.name)
      setAirports(airportsNames)
    })
    .catch((err) => {
      console.log(`Can't fetch an airports list: `, err.message)      
    })
  }, [])

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
            {airports.length ? (
              <Autocomplete
                options={airports}
                renderInput={AutocompleteTextInput}
              />
            ) : <CentralizedProgress />}
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
