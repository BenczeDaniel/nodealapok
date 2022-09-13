import express, { request } from 'express';
import { diakok } from './adatok.js';

const app = express();
app.use(express.json())

app.get('/',(request,response) => {
   // response.send('Saját szerverünk küldi ezt az üzenetet')
   response.send(diakok)
})


app.get('/:id',(request,response) => {
    const {id} = request.params//a u url-ben érkező paraméterek elérése
    const filteredArr= diakok.filter(obj=>obj.id==id)
    response.send(filteredArr)})


    app.post('/',(request,response) => {
        const {id,nev,osz}=request.body
        diakok.push({id:id,nev:nev,osz:osz})
        response.send(diakok)
    })
    app.get('*',(request,response) => {
        response.status(404).send('<h1>Az oldal nem létezik....</h1>')})

app.listen(5000,() => console.log('Fut a szerver az 5000-res porton!!'))