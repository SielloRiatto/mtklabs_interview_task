'use client'

import { SyntheticEvent, useCallback, useEffect, useState } from "react"

import { AutocompleteChangeDetails, AutocompleteChangeReason, Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"

import { AirportBasicData } from "@/data/fetchUSAirports"
import { haversineDistance } from "@/utils/haversineDistance"
import AutocompleteAirports from "./AutocompleteAirports"


export default function AirportsSelectionGrid() {
    const [airportFrom, setAirportFrom] = useState<AirportBasicData | null>(null)
    const [airportTo, setAirportTo] = useState<AirportBasicData | null>(null)
    const [distance, setDistance] = useState<number>(0)

    const changeAirport = useCallback((
        event: SyntheticEvent<Element, Event>,
        value: AirportBasicData | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<AirportBasicData> | undefined
    ): void => {
        if (event.currentTarget.id.search('airport-from') !== -1 && details) {
            setAirportFrom(details.option)
            return
        }

        if (event.currentTarget.id.search('airport-to') !== -1 && details) {
            setAirportTo(details.option)
            return
        }

        return
    }, [])

    useEffect(() => {
        if (airportFrom && airportTo) {
            setDistance(
                haversineDistance(
                    airportFrom?.lat,
                    airportFrom?.lng,
                    airportTo?.lat,
                    airportTo?.lng
                ) | 0
            )
        }
    }, [airportFrom, airportTo])

    return (
        <Grid2 container spacing={2}>
            <Grid2 xs={12} sm={6} >
                <AutocompleteAirports
                    from
                    id={'airport-from'}
                    onChange={changeAirport}
                />
            </Grid2>
            <Grid2 xs={12} sm={6} >
                <AutocompleteAirports
                    id={'airport-to'}
                    onChange={changeAirport}
                />
            </Grid2>
            <Grid2 xs={12}>
                <Typography variant="caption" display="block" gutterBottom>
                    { distance ? (
                        `The distance between the airports: ${distance} nautical miles.`
                    ) : (
                        `To see the distance between two different airports, pick them above.`
                    )}
                </Typography>
            </Grid2>
        </Grid2>
    )
}