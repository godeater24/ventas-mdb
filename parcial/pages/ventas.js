import useSWR from 'swr'
import { useState } from 'react'
function getToken(){ if (typeof window==='undefined') return null; return localStorage.getItem('token') }
const fetcher = (url)=> fetch(url).then(r=>r.json())

export default function Ventas(){
  const { data: productos } = useSWR('/api/productos', fetcher)
  const [carrito, setCarrito] = useState([])

  const add = (p)=>{
    const ex = carrito.find(i=>i._id===p._id)
    if (ex) setCarrito(carrito.map(i=> i._id===p._id?{...i, cantidad: i.cantidad+1}:i))
    else setCarrito([...carrito, {...p, cantidad:1}])
  }

  const total = carrito.reduce((s,i)=>s + i.precio*i.cantidad, 0)

  const sell = async ()=>{
    await fetch('/api/ventas', { method:'POST', headers:{ 'Content-Type':'application/json', Authorization:'Bearer '+getToken() }, body: JSON.stringify({ items: carrito, total }) })
    alert('Venta registrada')
    setCarrito([])
  }

  return (
    <div className='container'>
      <h1 className='text-2xl font-bold mb-4'>Registrar Venta</h1>
      <div className='grid grid-cols-2 gap-6'>
        <div>
          <h2 className='font-semibold mb-2'>Productos</h2>
          <ul className='space-y-2'>
            {productos && productos.map(p=> (
              <li key={p._id} className='border p-2 rounded flex justify-between'>
                <div>{p.nombre} — ${p.precio}</div>
                <button onClick={()=>add(p)} className='px-3 py-1 bg-indigo-600 text-white rounded'>Agregar</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className='font-semibold mb-2'>Carrito</h2>
          <ul className='space-y-2'>
            {carrito.map(i=> <li key={i._id}>{i.nombre} x {i.cantidad} — ${i.precio*i.cantidad}</li>)}
          </ul>
          <div className='mt-4 font-bold'>Total: ${total}</div>
          <button onClick={sell} disabled={carrito.length===0} className='mt-2 bg-green-600 text-white px-4 py-2 rounded'>Finalizar</button>
        </div>
      </div>
    </div>
  )
}
