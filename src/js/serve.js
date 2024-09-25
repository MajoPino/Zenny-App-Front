const http= require('http')
const app=require('./app')
const { hostname } = require('os')

const port= process.env.PORT || 1000
const server= http.createServer(app)
server.listen(port,hostname,()=>{console.log(`${port}`)
})