const express = require('express')

const productsRouter = require ('./routes/products.router')
const cartRouter = require ('./routes/cart.router')
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use('/api/products', productsRouter)

app.use('/api/carts', cartRouter)


app.listen(PORT, ()=>{
    console.log(`I'm Listening......`)
})