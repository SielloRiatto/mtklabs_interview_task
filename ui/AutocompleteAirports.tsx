"use client"

import {
    SyntheticEvent,
    useEffect,
    useState,
    useCallback
} from "react"

import {
    Autocomplete,
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    CircularProgress,
    TextField
} from "@mui/material"

import { AirportBasicData, fetchUSAirports } from "@/data/fetchUSAirports"

interface AutocompleteAirportsProps {
    id: string,
    from?: boolean,
    onChange: (
        event: SyntheticEvent<Element, Event>,
        value: AirportBasicData | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<AirportBasicData> | undefined
    ) => void,
}

export default function AutocompleteAirports({
    id,
    from = false,
    onChange,
}: AutocompleteAirportsProps) {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState<readonly AirportBasicData[]>([])
    
    const loading = open && options.length === 0

    const getOptionLabel = useCallback((option: AirportBasicData): string => (
        option.name + (
            option.iata_code ? ', IATA: ' + option.iata_code : ''
        ) + (
            option.icao_code ? ', ICAO: ' + option.icao_code : ''
        )
    ), [])

    useEffect(() => {
        let active = true;
    
        if (!loading) {
          return undefined;
        }
    
        if (active) {
            fetchUSAirports()
            .then((airports) => {
                setOptions([...airports])
            })
            .catch((err) => console.log(err.message))
        }

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
            id={id}
            open={open}
            options={options}
            loading={loading}

            onOpen={() => { setOpen(true) }}
            onClose={() => { setOpen(false) }}
            onChange={onChange}

            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={`${from ? 'From' : 'To'} airport`}
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