import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/auth/register', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
    if (res.ok) {
      alert('Usuario creado. Inicia sesión.')
      router.push('/')
    } else {
      const d = await res.json(); alert(d.error || 'Error')
    }
  }

  return (
    <div className='container'>
      <h1 className='text-2xl font-bold mb-4'>Registro</h1>
      <form onSubmit={handleRegister} className='space-y-3'>
        <input className='border p-2 w-full' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
        <input className='border p-2 w-full' placeholder='Contraseña' type='password' value={password} onChange={e=>setPassword(e.target.value)} />
        <button className='bg-green-600 text-white px-4 py-2 rounded'>Crear cuenta</button>
      </form>
    </div>
  )
}
