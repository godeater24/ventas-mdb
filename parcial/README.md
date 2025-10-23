    # ventas-cloud-app (Next.js 13 - MongoDB + JWT)

Proyecto de ejemplo con:
- Next.js 13 (Pages Router)
- MongoDB Atlas (Mongoose)
- Autenticación con JWT (correo + contraseña)
- CRUD de Productos y Ventas
- Dashboard en español (gráfica de barras con Recharts)
- Tailwind CSS (tema claro)

## Pasos para ejecutar localmente
1. Copia `.env.example` a `.env` y completa `MONGODB_URI` y `JWT_SECRET`.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Ejecuta la app:
   ```bash
   npm run dev
   ```
4. Sembrar datos de ejemplo:
   ```bash
   curl http://localhost:3000/api/seed
   ```

## Usuario administrador (seed)
Email: admin@demo.com
Password: 123456
Rol: admin

## Despliegue en Vercel
1. Subir repositorio a GitHub.
2. En Vercel, importar el proyecto.
3. Configurar variables de entorno en Vercel (`MONGODB_URI`, `JWT_SECRET`).
4. Deploy.

