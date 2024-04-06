import express from 'express'
import { getManagers, getManager, addManager} from './database.js'

const app = express()

app.use(express.json())


app.get('/Properties', async (req, res) => {
    const Properties = await getProperties()
    res.send(Properties)
})

app.get('/Properties/:id', async (req, res) => {
    const id = req.params.id
    const note = await getProperty(id)
    res.send(note)
})

app.post('/addProperty', async (req, res) => {
    const { name, mumberUnits, managerID } = req.body
    const Property  = await addProperty(name, mumberUnits, managerID)
    res.status(201).send(Property)
})

app.get('/Residents', async (req, res) => {
    const Residents = await getResidents()
    res.send(Residents)
})

app.get('/Residents/:id', async (req, res) => {
    const id = req.params.id
    const note = await getResident(id)
    res.send(note)
})

app.post('/addResident', async (req, res) => {
    const { wallet, propertyID } = req.body
    const Resident  = await addResident(wallet, propertyID)
    res.status(201).send(Resident)
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
    const { wallet } = req.body
    const manager  = await addManager(wallet)
    res.status(201).send(manager)
})



app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("Something broke!")
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})