import mongoose from 'mongoose'
import colors from 'colors'
import {exit} from 'node:process'

export const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(process.env.Data_Base)
        const url=`${connection.connection.host}: ${connection.connection.port}`
        console.log(colors.bgGreen.bold(`MongoDb conectado en: ${url} `))
    } catch (error) {
        console.log(colors.bgRed.bold('error al conectar a la Base de datos'))
        exit(1)
    }
}