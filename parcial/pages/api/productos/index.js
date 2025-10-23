import { connectDB } from '../../../../lib/db'
import Producto from '../../../../models/Producto'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev'

function getUser(req){
  const h = req.headers.authorization || ''
  if (!h.startsWith('Bearer ')) return null
  try { return jwt.verify(h.split(' ')[1], JWT_SECRET) } catch { return null }
}

export default async function handler(req, res){
  await connectDB()
  if (req.method === 'GET'){
    const p = await Producto.find()
    return res.status(200).json(p)
  } else if (req.method === 'POST'){
    const user = getUser(req)
    if (!user) return res.status(401).json({ error: 'No autorizado' })
    const { nombre, precio, stock } = req.body
    const prod = await Producto.create({ nombre, precio, stock })
    return res.status(201).json(prod)
  }
  res.setHeader('Allow', ['GET','POST']); res.status(405).end()
}
