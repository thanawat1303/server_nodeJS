const express = require('express')
const fs = require('fs')
const app = express()
let port = '8000'
  

app.use(express.json())
app.set('view engine' , 'ejs')
app.set('views' , 'view')
app.use(express.static('assets'))
app.use(express.static('view'))

app.get('/' , (req , res)=>{
    res.render('form' , {value:''} , (err , html)=>{
        res.send(html)
    })
})

app.post('/profile' , (req , res)=>{
    res.status(200).render('profile' , {value:''})
})

// app.get('/assets/RMUTT.png' , (req , res)=>{
//     fs.readFileSync('assets/RMUTT.png')
// })

app.listen(port , ()=>{
    console.log(`PORT ${port}`)
});