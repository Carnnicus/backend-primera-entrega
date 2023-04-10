const {Router}= require ('express')
const router = Router()
const { ProductManager }  = require('../manager/productManager')
const producto = new ProductManager()

router.get('/', async(req, res) => {
    const prod =  await producto.getProducts()
    const limit = req.query.limit
    if(!limit) return res.send(prod)
    res.send(prod.slice(0,limit))
})

router.get('/:pid', async(req, res) => {
    const id = parseInt(req.params.pid)
    const prod =  await producto.getProductById(id)
    if(!prod) return res.send({error: 'Producto no encontrado'})
    res.send(prod)
})


router.post('/', async(req, res) => {
    let prod = req.body
    if(!prod.title || !prod.description) {
        return res.status(400).send({status: 'error', messaje: 'Completar todos los campos'})
    }
    res.send({status: "Sucess", messaje: await producto.addProduct(prod)})
    //res.status(200).send({prod})
})


router.put('/:pid', async(req, res) =>{
    const pid = parseInt(req.params.pid)
    const prod = req.body
    await producto.updateProduct(pid, prod)
    res.send(producto)
})


router.delete('/:pid', async(req, res) =>{
    const pid = parseInt(req.params.pid)
    res.send({status: "Success", message: await producto.deleteProduct(pid)})
})

module.exports = router