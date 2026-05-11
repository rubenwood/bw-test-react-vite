import { useEffect, useState } from 'react'
import type { Space } from '../../shared/spaces';

function App() {
  const [msg, setMsg] = useState<any | null>(null)
  const [spaces, setSpaces] = useState<Space[] | null>(null)

  const TestAPI = async () => {
    const resp = await (await fetch('/api/test')).json();
    console.log(resp);

    setMsg(resp);
  }

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
      {msg != null ? <p>{JSON.stringify(msg)}</p> : null }

      {
        spaces != null ? <p>{JSON.stringify(spaces)}</p> : <p>Loading spaces...</p>        
      }
    </div>
  )
}

export default App