const express = require('express')
const app = express()
let port = '8000'

app.set('view engine' , 'ejs')
app.set('views' , 'view')

app.get('/' , (req , res)=>{
    res.render('form' , {value:'<script>consloe.log("x")</script>'})
})

app.listen(port , ()=>{
    console.log(`PORT ${port}`)
});