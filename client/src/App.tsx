import { useEffect, useState } from 'react'
import type { Space } from '../../shared/spaces';


function BuildingDropDown(){

}

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
      <select>
        <option></option>
      </select>

      {
        spaces != null ? <SpacesList spaces={spaces} /> : <p>Loading spaces...</p>        
      }
    </div>
  )
}

export default App