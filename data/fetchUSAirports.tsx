"use server"

export interface AirportBasicData {
    name: string;
    lat: number;
    lng: number;
    iata_code: string | null;
    icao_code: string | null;
    country_code: string;
}

export interface AirportData extends AirportBasicData {
    population?: number,
    continent?: string,
    currency?: string,
    names?: {
        [key: string]: string
    }[]
}


export async function fetchUSAirports(): Promise<AirportBasicData[]> {    
    const url: string = 'https://airlabs.co/api/v9/airports'
    const params: { [key: string]: string} = {
      api_key: 'daae47ca-1693-4405-ae4c-a9029e84b0dc',
      country_code: 'US',
      _fields: 'name'
    }

    const queryString: string = new URLSearchParams(params).toString()

    try {
        const response = await fetch(`${url}?${queryString}`)

        if (response.ok) {
            try {
                const json: { response: AirportData[] } = await response.json()
                return json.response
            } catch (err) {
                throw new Error(`Failed 'json' the response`)
            }
        }
        
        throw new Error(`Request failed with ${response.status} - ${response.statusText}`)
    } catch (err) {
        console.log(`Can't fetch an airports list: `, err)
    }

    return []
}