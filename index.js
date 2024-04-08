import express from 'express'
import * as db from './database.js'
import cors from 'cors'

const app = express()

const corsOptions = {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}

app.use(express.json())
app.use(cors(corsOptions))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
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
    const { propertyName, Rent, Bills, Maintenance, Events, ERC, managerID } = req.body
    const Property  = await db.addProperty(propertyName, Rent, Bills, Maintenance, Events, ERC, managerID)
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
    const { wallet } = req.body
    const Resident  = await db.addResident(wallet)
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

app.get('/ResidentsTransactions', async (req, res) => {
    const ResidentsTransactions = await db.getResidentsTransactions()
    res.send(ResidentsTransactions)
})

app.get('/ResidentsTransactions/:id', async (req, res) => {
    const id = req.params.id
    const note = await db.getResidentTransaction(id)
    res.send(note)
})

app.post('/addResidentTransaction', async (req, res) => {
    const { value, type, residentID } = req.body
    const ResidentTransaction  = await db.addResidentTransaction(value, type, residentID)
    res.status(201).send(ResidentTransaction)
})

app.get('/PropertiesTransactions', async (req, res) => {
    const PropertiesTransactions = await db.getPropertiesTransactions()
    res.send(PropertiesTransactions)
})

app.get('/PropertiesTransactions/:id', async (req, res) => {
    const id = req.params.id
    const note = await db.getPropertyTransaction(id)
    res.send(note)
})

app.post('/addPropertyTransaction', async (req, res) => {
    const { value, type, PropertyID } = req.body
    const PropertyTransaction  = await db.addPropertyTransaction(value, type, PropertyID)
    res.status(201).send(PropertyTransaction)
})



app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("Something broke!")
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})