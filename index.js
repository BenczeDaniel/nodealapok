console.log("Csak az Audi !!")

const szam= Math.round(Math.random()*100)
console.log(`${szam} Ennyi a véletlen szám összege!`)

if(szam>=50)
   console.log("gratula! átmentél")

else
    console.log("sajnos megbuktál!")

//rövidebben

szam=>50 ? console.log("Gratulálok!!!") : console.log("Öszintén sajnálom!")

import { diakok } from "./adatok.js"

console.log(`a diakok létszáma: ${diakok}.length`)