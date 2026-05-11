import { useState } from 'react'

function App() {
  const [msg, setMsg] = useState<any | null>(null)

  const TestAPI = async () => {
    const resp = await (await fetch('/api/test')).json();
    console.log(resp);

    setMsg(resp);
  }

  return (
    <div>
      <h1>Hi</h1>
      <button onClick={()=>TestAPI()}>Click Me!</button>
      {msg != null ? <p>{JSON.stringify(msg)}</p> : null }
    </div>
  )
}

export default App