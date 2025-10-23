import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/auth/login', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    })
    if (res.ok) {
      const { token } = await res.json()
      localStorage.setItem('token', token)
      router.push('/dashboard')
    } else {
      alert('Credenciales inválidas')
    }
  }

  return (
    <div className='container'>
      <h1 className='text-2xl font-bold mb-4'>Iniciar sesión</h1>
      <form onSubmit={handleLogin} className='space-y-3'>
        <input className='border p-2 w-full' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
        <input className='border p-2 w-full' placeholder='Contraseña' type='password' value={password} onChange={e=>setPassword(e.target.value)} />
        <div className='flex gap-2'>
          <button className='bg-blue-600 text-white px-4 py-2 rounded'>Entrar</button>
          <a className='px-4 py-2' href='/register'>Registrarse</a>
        </div>
      </form>
    </div>
  )
}
