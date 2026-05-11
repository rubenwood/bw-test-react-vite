import express from 'express'
import { Request, Response } from 'express'
import cors from 'cors'
import path from "path"

import { spaces } from "../../shared/spaces";

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())



app.get('/api/test', (req: Request, res: Response) => {
    console.log("test");
    res.json({message:"test"});
})

app.get('/api/spaces', (req: Request, res: Response) => {
    console.log("getting spaces");
    res.json(spaces);
})


app.use(express.static(path.join(__dirname, "../../client/dist")))

app.use((req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})