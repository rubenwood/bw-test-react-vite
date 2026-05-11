import { useEffect, useMemo, useState } from 'react'
import type { Space } from '../../shared/spaces';

type SpaceSectionProps = { space: Space } 
function SpaceSection({ space }: SpaceSectionProps){ 
  return ( 
    <section className='card'>
      <p>{space.name}</p>
      <p>{space.building.name}</p>
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

function App() {
  const [spaces, setSpaces] = useState<Space[] | null>(null)
  const [selectedBuilding, setSelectedBuilding] = useState('all')

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

    if (selectedBuilding === 'all') {
      return spaces
    }

    return spaces.filter(
      (space) => space.building.id === selectedBuilding
    )
  }, [spaces, selectedBuilding])

  

  useEffect(() => {
    getSpaces();
  }, [])

  return (
    <div className='container-page'>
      <h1>Community Hub</h1>
      {
        spaces != null ? 
        <>
          <BuildingDropDown 
            buildings={buildings}
            selectedBuilding={selectedBuilding}
            onChange={setSelectedBuilding}/>
          <br/>
          <SpacesList spaces={filteredSpaces} />
        </>: <p>Loading spaces...</p>        
      }
    </div>
  )
}

export default App