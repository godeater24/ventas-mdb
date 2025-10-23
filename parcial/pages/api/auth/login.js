import { connectDB } from '../../../lib/db'
import Usuario from '../../../models/Usuario'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev'

export default async function handler(req, res){
  await connectDB()
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  const u = await Usuario.findOne({ email })
  if (!u) return res.status(401).json({ error: 'Credenciales inválidas' })
  const ok = await bcrypt.compare(password, u.password)
  if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' })
  const token = jwt.sign({ userId: u._id, email: u.email, role: u.role }, JWT_SECRET, { expiresIn: '7d' })
  res.status(200).json({ token })
}
