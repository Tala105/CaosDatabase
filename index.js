import express from 'express'
import * as db from './database.js'
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

app.get('/Properties', async (req, res) => {
    const Properties = await db.getProperties()
    res.send(Properties)
})

app.get('/Properties/:id', async (req, res) => {
    const id = req.params.id
    const note = await db.getProperty(id)
    res.send(note)
})

app.post('/addProperty', async (req, res) => {
    const { name, mumberUnits, managerID } = req.body
    const Property  = await db.addProperty(name, mumberUnits, managerID)
    res.status(201).send(Property)
})

app.get('/Residents', async (req, res) => {
    const Residents = await db.getResidents()
    res.send(Residents)
})

app.get('/Residents/:id', async (req, res) => {
    const id = req.params.id
    const note = await db.getResident(id)
    res.send(note)
})

app.post('/addResident', async (req, res) => {
    const { wallet, propertyID } = req.body
    const Resident  = await db.addResident(wallet, propertyID)
    res.status(201).send(Resident)
})

app.get('/Managers', async (req, res) => {
    const Managers = await db.getManagers()
    res.send(Managers)
})

app.get('/Managers/:id', async (req, res) => {
    const id = req.params.id
    const note = await db.getManager(id)
    res.send(note)
})

app.post('/addManager', async (req, res) => {
    const { wallet } = req.body
    const manager  = await db.addManager(wallet)
    res.status(201).send(manager)
})



app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("Something broke!")
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})