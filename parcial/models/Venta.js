import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  nombre: String,
  cantidad: Number,
  precio: Number
}, { _id: false })

const VentaSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  total: Number,
  items: [ItemSchema],
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
}, { timestamps: true })

export default mongoose.models.Venta || mongoose.model('Venta', VentaSchema)
