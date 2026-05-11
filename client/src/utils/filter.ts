import type { Space } from '../../../shared/spaces'

// this isnt the greatest, this function would need to expand as we add more filters,
// perhaps we need a more sophisticated filter object?
export function filterSpaces( spaces: Space[], selectedBuilding: string, selectedAvailability: string): Space[] {
  return spaces.filter((space) => {
    // building filter (building id)
    const matchesBuilding =
      selectedBuilding === 'all' ||
      space.building.id === selectedBuilding
    // availability filter
    const matchesAvailability =
      selectedAvailability === 'all' ||
      (selectedAvailability === 'available' && space.available) ||
      (selectedAvailability === 'unavailable' && !space.available)

    return matchesBuilding && matchesAvailability
  })
}