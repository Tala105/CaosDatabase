import express from 'express'
import { getManagers, getManager, addManager} from './database.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors({origin: '*'}))

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("Something broke!")
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
})

app.get('/Managers', async (req, res) => {
    const Managers = await getManagers()
    res.send(Managers)
})

app.get('/Managers/:id', async (req, res) => {
    const id = req.params.id
    const note = await getManager(id)
    res.send(note)
})

app.post('/addManager', async (req, res) => {
    const { manager, building } = req.body
    const property = await addManager(manager, building)
    res.status(201).send(property)
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})