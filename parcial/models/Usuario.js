import mongoose from 'mongoose'

const UsuarioSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' }
}, { timestamps: true })

export default mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema)
