import useSWR from 'swr'
import { useState } from 'react'
function getToken(){ if (typeof window==='undefined') return null; return localStorage.getItem('token') }
const fetcher = (url)=> fetch(url).then(r=>r.json())

export default function Productos(){
  const { data: productos, mutate } = useSWR('/api/productos', fetcher)
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState(0)

  const crear = async (e)=>{
    e.preventDefault()
    await fetch('/api/productos', { method:'POST', headers:{'Content-Type':'application/json', Authorization:'Bearer '+getToken()}, body: JSON.stringify({ nombre, precio: parseFloat(precio), stock: parseInt(stock) }) })
    setNombre(''); setPrecio(''); setStock(0); mutate()
  }

  return (
    <div className='container'>
      <h1 className='text-2xl font-bold mb-4'>Productos</h1>
      <form onSubmit={crear} className='space-y-2 mb-4'>
        <input className='border p-2 w-full' placeholder='Nombre' value={nombre} onChange={e=>setNombre(e.target.value)} />
        <input className='border p-2 w-full' placeholder='Precio' value={precio} onChange={e=>setPrecio(e.target.value)} />
        <input className='border p-2 w-full' placeholder='Stock' value={stock} onChange={e=>setStock(e.target.value)} />
        <button className='bg-blue-600 text-white px-4 py-2 rounded'>Crear</button>
      </form>

      <ul className='space-y-2'>
        {productos && productos.map(p=> (
          <li key={p._id} className='border p-2 rounded flex justify-between'>
            <div>{p.nombre} — ${p.precio} — stock: {p.stock}</div>
            <div>
              <button onClick={async ()=>{ await fetch('/api/productos/'+p._id,{ method:'DELETE', headers:{ Authorization:'Bearer '+getToken() } }); mutate() }} className='px-3 py-1 bg-red-500 text-white rounded'>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
