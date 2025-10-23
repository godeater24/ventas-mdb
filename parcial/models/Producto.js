import mongoose from 'mongoose'

const ProductoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  stock: Number
}, { timestamps: true })

export default mongoose.models.Producto || mongoose.model('Producto', ProductoSchema)
