import { connectDB } from '../../../lib/db'
import Usuario from '../../../models/Usuario'
import bcrypt from 'bcryptjs'

export default async function handler(req, res){
  await connectDB()
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Faltan campos' })
  const exist = await Usuario.findOne({ email })
  if (exist) return res.status(400).json({ error: 'Usuario ya existe' })
  const hash = await bcrypt.hash(password, 10)
  const u = await Usuario.create({ email, password: hash })
  res.status(201).json({ id: u._id, email: u.email })
}
