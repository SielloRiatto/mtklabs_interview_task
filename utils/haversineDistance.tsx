// Function to convert degrees to radians
function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
}
  
// Function for calculating the distance between two points using the Gaversine formula
export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 3440.065 // Radius of the Earth in nautical miles

    const dLat = toRadians(lat2 - lat1)
    const dLon = toRadians(lon2 - lon1)

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const distance = R * c

    return distance
}