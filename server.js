// Este servidor sirve la interfaz estática de la clínica veterinaria.
// Se usa Express para exponer la app en local y dejar listo el proyecto para abrirlo en el navegador.
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.join(projectRoot, 'src');
const port = process.env.PORT || 4173;

// Primero cargamos los archivos de la carpeta src, y luego la raíz del proyecto.
// Así funcionan los estilos, scripts y recursos como el favicon sin problemas.
app.use(express.static(srcPath));
app.use(express.static(projectRoot));

// Ruta principal: devuelve la página inicial.
app.get('/', (req, res) => {
	res.sendFile(path.join(projectRoot, 'index.html'));
});

// Fallback para que cualquier ruta que no sea API recargue la página principal.
// Esto ayuda cuando se navega por la app y no hay rutas dinámicas reales.
app.get(/^(?!\/api).*/, (req, res) => {
	res.sendFile(path.join(projectRoot, 'index.html'));
});

// Arrancamos el servidor en el puerto configurado.
app.listen(port, () => {
	console.log(`Citas Vet disponible en http://localhost:${port}`);
});