import { useEffect, useState } from 'react'
import type { Space } from '../../shared/spaces';



type SpaceSectionProps = { space: Space } 
function SpaceSection({ space }: SpaceSectionProps){ 
  return ( 
    <section className='card'>
      <p>{space.name}</p>
      <p>{space.building}</p>
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

function BuildingDropDown({ spaces }: SpaceListProps){
  return (
    <select>
      {spaces.map((space) => <option key={`option-space-${space.id}`}>{space.building}</option>)}
    </select>
  )
}


function App() {
  const [spaces, setSpaces] = useState<Space[] | null>(null)

  const getSpaces = async () => {
    console.log("Getting spaces")
    const resp = await (await fetch('/api/spaces')).json();
    console.log(resp);

    setSpaces(resp);
  }

  useEffect(() => {
    getSpaces();
  }, [])

  return (
    <div>
      <h1>Community Hub</h1>
      

      {
        spaces != null ? 
        <>
          <BuildingDropDown spaces={spaces}/>
          <br/>
          <SpacesList spaces={spaces} />
        </>: <p>Loading spaces...</p>        
      }
    </div>
  )
}

export default App