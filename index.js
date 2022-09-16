import { config } from "./dbconfig.js";
import express, { request } from "express";
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


app.get('/szerzo/:author',(request, response) => {
    const {author} = request.params

    db.query('SELECT title FROM books WHERE author=? ORDER BY title',[author],(err,result)=>{
        if(err)
            console.log(err)
        else
            response.send(result)
    
    })

})

app.get('/categ/:category/year/:year',(request, response) => {
    const {category,year} = request.params

    db.query('SELECT author,title,year FROM books WHERE year>=? AND category=?',[year,category],(err,result)=>{
        if(err)
            console.log(err)
        else
            response.send(result)
    
    })

})

app.get('/id/:id',(request, response) => {
    const {id} = request.params

    db.query('SELECT author,title,year,category FROM books WHERE id=? ORDER BY title',[id],(err,result)=>{
        if(err)
            console.log(err)
        else
            response.send(result)
    
    })

})

app.put('/:id/:year',(request, response)=>{
    const {id,year} = request.params
    db.query('UPDATE books SET year=? WHERE id=? ',[year,id],(err,result)=>{

        if(err)
            console.log(err)
        if(result.affectedRows==1)
        response.send({message:"Sikeres adatmódosítás!"})
        else
        response.send({message:"Nem sikeres adatmódosítás!"})

    })

})


app.put('/',(request, response)=>{
    const {id,category,year} = request.params
    db.query('UPDATE books SET category=? , year=? WHERE id=? ',[category,year,id],(err,result)=>{

        if(err)
            console.log(err)
        if(result.affectedRows==1)
        response.send({message:`Sikeres adatmódosítás! id:${result.insertId},`})
        else
        response.send({message:"Nem sikeres adatmódosítás!"})

    })

})


app.post('/',(request, response)=>{
    const {category,year,title,author} = request.params
    db.query('Insert into books values(null,?,?,?,?)',[author,title,year,category],(err,result)=>{

        if(err)
            console.log(err)
        if(result.insertId)
        response.send({message:"Sikeres adatmódosítás!"})
        else
        response.send({message:"Nem sikeres adatmódosítás!"})

    })

})



app.delete('/:id',(request, response)=>{
    const {id} = request.params
    db.query('delete from books where id=?',[id],(err,result)=>{

        if(err)
            console.log(err)
        if(result.insertId)
        response.send({message:"Sikeres adatmódosítás!"})
        else
        response.send({message:"Nem sikeres adat törlés"})

    })

})

//a felhasználó látni szeretné hogy a kiválasztott kategoriában milyen könyvek vannak(szerző,cím)







app.listen(5000,() => console.log('server listening on port 5000....'))

