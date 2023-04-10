const fs = require('fs')

class ProductManager {
    
    constructor(){
        this.productos = []
        this.path = './productos.json'
    }

    readFile = async () =>{
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            
            return JSON.parse(data)
        }catch (error){
            return []
        }
    }

    getProducts = async() => {
        try{
            return await this.readFile()
        }
        catch (error){
            return new Error(error)
        }
    }
    
    getProductById = async (id) => {
        try {
            this.productos = await this.readFile()
            console.table(this.product)
            return this.productos.find(prod => prod.id === id)
        }catch (error){
            return new Error(error) 
        }
    }

    addProduct  = async (newProduct) => {      
        try{
            this.productos = await this.getProducts()
            if (!newProduct.title ||
                !newProduct.description ||
                !newProduct.price ||
                !newProduct.stock ||
                !newProduct.code) return 'Completar todos los campos'
            let codProd = this.productos.find(prod => prod.code === newProduct.code)
            if (codProd) return 'Codigo inválido'
            if (this.productos.length === 0 ) {
                newProduct.id = 1
                this.productos.push(newProduct) 
            } else {
                this.productos = [...this.productos, {id: this.productos[this.productos.length - 1].id + 1, ...newProduct , status: true} ]
            }
            await fs.promises.writeFile(this.path, JSON.stringify(this.productos,'utf-8','\t'))
            return 'Producto ingresado'
        }catch (error){
            return new Error(error)
        }
	}	

    updateProduct = async (id, updProd) => {
        try{
            this.productos = await this.readFile()
            let producto = this.productos.find(prod => prod.id === id)
            if (!producto) return 'Producto no encontrado'
            producto.title = updProd.title
            producto.description = updProd.description
            producto.price = updProd.price
            producto.thumbnails = updProd.thumbnails
            producto.stock = updProd.stock
            producto.code= updProd.code
            producto.status= updProd.status
            await fs.promises.writeFile(this.path, JSON.stringify(this.productos,'utf-8','\t'))
            return 'Información actualizada'
            }
        catch (error){
            return new Error(error)
        }
    }

    deleteProduct  = async (idDelete) => {
        try{
            this.productos = await this.readFile()
            const remove = this.productos.filter(prod => prod.id !== idDelete)
            if (this.productos.length === remove.length){ 
                return 'Id no encontrado'
            } else {
                await fs.promises.writeFile(this.path, JSON.stringify(remove,'utf-8','\t'))
                return 'Producto eliminado'
            }
        }
        catch (error){
            return new Error(error)
        }
    }
}

module.exports = { ProductManager };