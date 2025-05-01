const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const studentModel = require('./Students')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/College')
    .then(() => console.log('DB connected'))

app.post('/savestudent', async (req, res) => {
    console.log(req.body)
    await studentModel.create(req.body)
    res.json({ message: 'Student Added Successfully' })
})

app.get('/getstudents', async (req, res) => {
    const students = await studentModel.find()
    res.json(students)
})

const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
