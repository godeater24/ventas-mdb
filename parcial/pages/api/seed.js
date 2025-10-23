import { connectDB } from '../../lib/db'
import Usuario from '../../models/Usuario'
import Producto from '../../models/Producto'
import Venta from '../../models/Venta'
import bcrypt from 'bcryptjs'

export default async function handler(req, res){
  if (process.env.NODE_ENV === 'production') return res.status(403).end('No en producción')
  await connectDB()
  await Usuario.deleteMany({})
  await Producto.deleteMany({})
  await Venta.deleteMany({})

  const hash = await bcrypt.hash('123456', 10)
  const admin = await Usuario.create({ email: 'admin@demo.com', password: hash, role: 'admin' })

  const prods = await Producto.create([
    { nombre: 'Camisa', precio: 25, stock: 100 },
    { nombre: 'Pantalón', precio: 40, stock: 80 },
    { nombre: 'Gorra', precio: 12, stock: 200 },
    { nombre: 'Zapatos', precio: 60, stock: 50 },
    { nombre: 'Calcetines', precio: 5, stock: 300 }
  ])

  await Venta.create([
    { items: [{ productId: prods[0]._id, nombre: prods[0].nombre, cantidad: 2, precio: prods[0].precio }], total: prods[0].precio*2, usuarioId: admin._id },
    { items: [{ productId: prods[1]._id, nombre: prods[1].nombre, cantidad: 1, precio: prods[1].precio }], total: prods[1].precio, usuarioId: admin._id }
  ])

  res.status(200).json({ ok: true })
}
