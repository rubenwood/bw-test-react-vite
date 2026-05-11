import { useEffect, useMemo, useState } from 'react'
import type { Space } from '../../shared/spaces';
import { filterSpaces } from './utils/filter';

type SpaceSectionProps = { space: Space } 
function SpaceSection({ space }: SpaceSectionProps){ 
  return ( 
    <section className='card'>
      <p>Name: {space.name}</p>
      <p>Building: {space.building.name}</p>
      <p>{space.available ? `Available` : `Unavailable`}</p>
    </section>) }

type SpaceListProps = { spaces: Space[] }
function SpacesList({ spaces }: SpaceListProps){
  return(
    <>
      {spaces.map((space) => <SpaceSection key={`space-${space.id}`} space={space} />)}
    </>
  )
}

type BuildingDropDownProps = {
  buildings: {id:string, name:string}[],
  selectedBuilding: string,
  onChange: (building: string) => void
}

function BuildingDropDown({buildings, selectedBuilding, onChange,}: BuildingDropDownProps) {
  return (
    <select
      value={selectedBuilding}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value='all'>All Buildings</option>

      {buildings.map((building) => (
        <option key={`option-${building.id}`} value={building.id}>
          {building.name}
        </option>
      ))}
    </select>
  )
}

type AvailabilityDropDownProps = {
  selectedAvailability: string
  onChange: (value: string) => void
}

function AvailabilityDropDown({selectedAvailability, onChange,}: AvailabilityDropDownProps) {
  return (
    <select
      value={selectedAvailability}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value='all'>All</option>
      <option value='available'>Available</option>
      <option value='unavailable'>Unavailable</option>
    </select>
  )
}


function App() {
  const [spaces, setSpaces] = useState<Space[] | null>(null)
  const [selectedBuilding, setSelectedBuilding] = useState('all')
  const [selectedAvailability, setSelectedAvailability] = useState('all')

  // this gets the spaces
  const getSpaces = async () => {
    console.log("Getting spaces")
    const resp = await (await fetch('/api/spaces')).json();
    console.log(resp);

    setSpaces(resp);
  }

  // this stores a list of buildings
  const buildings = useMemo(() => {
    if (!spaces) return []

    const uniqueBuildings = new Map()

    spaces.forEach((space) => {
      uniqueBuildings.set(space.building.id, {
        id: space.building.id,
        name: space.building.name,
      })
    })

    return Array.from(uniqueBuildings.values())
  }, [spaces])

  // this will be a list of spaces filtered by building
  const filteredSpaces = useMemo(() => {
    if (!spaces) return []

     return filterSpaces(
      spaces,
      selectedBuilding,
      selectedAvailability
    )
  }, [spaces, selectedBuilding, selectedAvailability])

  

  useEffect(() => {
    getSpaces();
  }, [])

  return (
    <div className='container-page'>
      <h1>Community Hub</h1>
      {
        spaces != null ? 
        <>
          <div className='flex gap-2'>
            <p>Building:</p>
            <BuildingDropDown 
              buildings={buildings}
              selectedBuilding={selectedBuilding}
              onChange={setSelectedBuilding}/>
          </div>
          <br/>
          <div className='flex gap-2'>
            <p>Availability:</p>
            <AvailabilityDropDown
              selectedAvailability={selectedAvailability}
              onChange={setSelectedAvailability}
            />
          </div>
          <br/>
          <SpacesList spaces={filteredSpaces} />
        </>: <p>Loading spaces...</p>        
      }
    </div>
  )
}

export default App