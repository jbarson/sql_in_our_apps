require('dotenv').config()

const express = require('express')
const morgan = require('morgan')

const client = require('./connection')

const app = express()
const port = 3333

app.get('/pets', (req, res) => {
    client.query('SELECT * FROM pets;')
            .then(data => {
                res.json(data.rows)
            });
})

app.get('/pets/:id', (req, res) => {
    client.query('SELECT * FROM pets WHERE id = $1 ', [req.params.id])
        .then(data => {
            res.json(data.rows)
        })
})


app.use(morgan('dev'))

app.listen(port, () => `app running on port ${port}`)