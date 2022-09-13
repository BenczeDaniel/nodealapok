import { config } from "./dbconfig.js";
import express from "express";
import mysql from 'mysql';

const app = express();
app.use(express.json())
const db=mysql.createConnection(config)

app.get('/',(request, response) => {
    db.query('SELECT id,author FROM books GROUP BY author ORDER BY author',(err,result)=>{
        if(err)
            console.log(err)
        else
            response.send(result)
    
    })

})


app.listen(5000,() => console.log('server listening on port 5000....'))

