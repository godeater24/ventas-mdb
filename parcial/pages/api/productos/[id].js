import { connectDB } from '../../../../lib/db'
import Producto from '../../../../models/Producto'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev'
function getUser(req){ const h = req.headers.authorization || ''; if (!h.startsWith('Bearer ')) return null; try { return jwt.verify(h.split(' ')[1], JWT_SECRET) } catch { return null } }

export default async function handler(req, res){
  await connectDB()
  const { id } = req.query
  if (req.method === 'DELETE'){
    const user = getUser(req)
    if (!user) return res.status(401).json({ error: 'No autorizado' })
    await Producto.findByIdAndDelete(id)
    return res.status(200).json({ ok: true })
  }
  res.setHeader('Allow', ['DELETE']); res.status(405).end()
}
