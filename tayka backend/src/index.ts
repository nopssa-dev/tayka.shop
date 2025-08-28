import server from "./server"
import colors from "colors"


const port = process.env.PORT || 4000

server.listen(port, ()=>{
    console.log(colors.bgGreen.bold(`REST API funcionando en el puerto ${port}`))
} )