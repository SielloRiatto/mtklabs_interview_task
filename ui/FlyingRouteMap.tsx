'use client'

import { AirportBasicData } from "@/app/api/airports/route"
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Line,
  Marker
} from "react-simple-maps"

export default FlyingRouteMap

function FlyingRouteMap({
    airportFrom,
    airportTo
}: {
    airportFrom: AirportBasicData,
    airportTo: AirportBasicData
}){    
    return (
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 800,
          center: [-90, 37]
        }}
        height={450}
      >
        <Graticule stroke="#DDD" />
        <Geographies
          geography={'./countries-110m.json'}
          fill="#D6D6DA"
          stroke="#FFFFFF"
          strokeWidth={0.5}
        >
            {({ geographies }) => (
                geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} />
                ))
            )}
        </Geographies>   
        <Line
            from={[airportFrom.lng, airportFrom.lat]}
            to={[airportTo.lng, airportTo.lat]}
            stroke="#BBB"
            strokeWidth={4}
            strokeLinecap="round"
        />
        <Marker coordinates={[airportFrom.lng, airportFrom.lat]} fill="#777">
            <circle r={8} fill="#507df5" />
            <text textAnchor="middle" x="0" y="-15" fill="#000000">
                {airportFrom.name}
            </text>
        </Marker>
        <Marker coordinates={[airportTo.lng, airportTo.lat]} fill="#777">
            <circle r={8} fill="#507df5" />
            <text textAnchor="middle" x="0" y="-15" fill="#000000">
                {airportTo.name}
            </text>
        </Marker>
      </ComposableMap>
    )
}