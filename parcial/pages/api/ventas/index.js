import { connectDB } from '../../../../lib/db'
import Venta from '../../../../models/Venta'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev'
function getUser(req){ const h = req.headers.authorization || ''; if (!h.startsWith('Bearer ')) return null; try { return jwt.verify(h.split(' ')[1], JWT_SECRET) } catch { return null } }

export default async function handler(req, res){
  await connectDB()
  if (req.method === 'POST'){
    const user = getUser(req)
    if (!user) return res.status(401).json({ error: 'No autorizado' })
    const { items, total } = req.body
    const v = await Venta.create({ items, total, usuarioId: user.userId })
    return res.status(201).json(v)
  } else if (req.method === 'GET'){
    const ventas = await Venta.find().sort({ fecha: -1 })
    return res.status(200).json(ventas)
  }
  res.setHeader('Allow', ['GET','POST']); res.status(405).end()
}
