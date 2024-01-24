"use server"

export interface AirportData {
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

export async function fetchUSAirportsNames(): Promise<string[]> {    
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
                const names = json.response.map((data: AirportData) => data.name)
                
                return names
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