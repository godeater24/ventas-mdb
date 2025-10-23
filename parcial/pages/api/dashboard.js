import { connectDB } from '../../lib/db'
import Producto from '../../models/Producto'
import Venta from '../../models/Venta'

export default async function handler(req, res){
  await connectDB()
  const totalProductos = await Producto.countDocuments()
  const ventas = await Venta.find()
  const totalVentas = ventas.length
  const totalIngresos = ventas.reduce((s,v)=> s + (v.total||0), 0)

  const map = {}
  ventas.forEach(v=>{
    const d = new Date(v.fecha).toISOString().slice(0,10)
    map[d] = (map[d]||0) + (v.total||0)
  })
  const ventasPorDia = Object.keys(map).sort().map(k=> ({ fecha: k, total: map[k] }))

  res.status(200).json({ totalProductos, totalVentas, totalIngresos, ventasPorDia })
}
