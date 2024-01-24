"use client"

import { fetchUSAirportsNames } from "@/data/fetchUSAirportsNames"
import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import { useEffect, useState } from "react"

export default function AutocompleteAirports() {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState<readonly string[]>([])
    const loading = open && options.length === 0

    useEffect(() => {
        let active = true;
    
        if (!loading) {
          return undefined;
        }
    
        (async () => {
            if (active) {
                const airports = await fetchUSAirportsNames()
                setOptions([...airports])
            }
        })()

        return () => {
            active = false
        }
    }, [loading])

    useEffect(() => {
        if (!open) {
          setOptions([])
        }
    }, [open])

    return (
        <Autocomplete
            id="autocomplete-apiports"
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={(option) => option}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Airport"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    )
}