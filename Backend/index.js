const express = require('express')
const connectToMongo = require('./config/db')
const cors = require("cors");

connectToMongo()

const app = express()
app.use(express.json())
app.use(cors());

const PORT = 5000


// Available Routes
app.use('/api', require('./routes/admin'))
app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/admin/datapoints', require('./routes/admin/datapoints'))
app.use('/api/v1/admin/datatemplate', require('./routes/admin/datatemplate'))
app.use('/api/v1/admin/usergroups', require('./routes/admin/usergroups'));
app.use('/api/v1/admin/roles', require('./routes/admin/adminRoles'));


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})