import useSWR from 'swr'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const fetcher = (url)=> fetch(url).then(r=>r.json())

export default function Dashboard() {
  const { data: stats } = useSWR('/api/dashboard', fetcher)

  if (!stats) return <div className='container'>Cargando...</div>

  return (
    <div className='container'>
      <h1 className='text-2xl font-bold mb-4'>Panel de administración</h1>
      <div className='grid grid-cols-3 gap-4 mb-6'>
        <div className='border p-4 rounded'>
          <div className='text-sm text-gray-500'>Productos registrados</div>
          <div className='text-xl font-bold'>{stats.totalProductos}</div>
        </div>
        <div className='border p-4 rounded'>
          <div className='text-sm text-gray-500'>Ventas realizadas</div>
          <div className='text-xl font-bold'>{stats.totalVentas}</div>
        </div>
        <div className='border p-4 rounded'>
          <div className='text-sm text-gray-500'>Ingresos totales</div>
          <div className='text-xl font-bold'>${stats.totalIngresos}</div>
        </div>
      </div>

      <h2 className='text-lg font-semibold mb-2'>Ventas por día</h2>
      <div style={{width:'100%', height:300}}>
        <ResponsiveContainer>
          <BarChart data={stats.ventasPorDia}>
            <XAxis dataKey='fecha' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='total' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
