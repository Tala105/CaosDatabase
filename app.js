import express from 'express'
import { getManagers, getManager, addManager} from './database.js'


const app = express()

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
    const { }
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("Something broke!")
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})