const express = require('express')
const fs = require('fs')
const app = express()
let port = '8000'

app.set('view engine' , 'ejs')
app.set('views' , 'view')
app.use(express.static('assets'))

app.get('/' , (req , res)=>{
    res.render('form' , {value:''})
})

// app.get('/assets/RMUTT.png' , (req , res)=>{
//     fs.readFileSync('assets/RMUTT.png')
// })

app.listen(port , ()=>{
    console.log(`PORT ${port}`)
});