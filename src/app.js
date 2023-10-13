import express from "express"; //importación de express
import { engine } from "express-handlebars"; /*importación de módulo express-handlebars, osea la biblio para usar motores de plantillas handlebars con express */
import * as path from "path" /*importación del módulo path de node.js, entrega utilidades para trabajar con rutas de archivos y directorios */
import __dirname from "./utils.js"; /*importación de la variable __dirname desde el archivo utils.js*/
import mongoose from "mongoose";

import cartRouter from "./router/cart.routes.js";
import productRouter from "./router/product.routes.js";
import messagesRoutes from "./router/messages.router.js"

import  multer  from "multer";
//import path from "path";





//servidor 
const app = express();
const PORT = 8080; 
//servidor 
app.listen(PORT, ()=>{
    console.log(`Servidor en el puerto ${PORT}`);
}) 

//middleware
//analizarán solicitudes HTTP entrantes y los convertirán en formato json o url
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//mongoose
const ecommerce = async () => {
    try {
        await mongoose.connect("mongodb+srv://proyectointegrador:q9sHiS6YE5R6NJ0Q@coderhouse.y9dsp4s.mongodb.net/?retryWrites=true&w=majority");
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}

ecommerce();


//estos middlewars son toda la extructura de handlebars
app.engine("handlebars", engine());  /*acá le digo al servidor que usaremos M.P.handlebars para el uso de express y que será a
través de engine()*/
app.set("view engine", "hbs"); /*acá le digo al server que los archivos de view terminaran con la extensión .hbs se establece la vista
como handlebars, eso significa que express usará handlebars para renderizar las vistas*/
app.set("views", path.resolve(__dirname + "/views")); /*y además obvio debo decirle donde encontrar esos archivos, estableciendo la ubicación de las vistas
es una ruta absoluta al directorio de vistas que utiliza __dirname que he importado desde utils.js, así que express buscará en ese directorio*/


//middleware para archivos estáticos
app.use("/", express.static(__dirname + "/public")) /*con __dirname le índico que en puclic estarán los archivos estáticos como el 
style.css y realtimeproduct.js dentro de public*/

//multer


/*escribir diferentes configuraciones de multer para guardar los archivos en una carpeta, multer requiere que se haga una carpeta para guardar 
sus archivos esta se debe llamar uploads*/

const storage = multer.diskStorage({ //storage invoca a multer y tiene un método nativo que es disjStorage
    //recibe el destino de los archivos que va a encontrar
    destination:(req, file, cb ) =>{ //tres parámetros 
        cb(null, __dirname + "/public/uploads") //cb es = a calback, el calback tiene dos parámetros null y uploads
    },
    
    filename: (req, file, cb) => { //tres parámetros
        const timestamp = Date.now() //obtiene la hora actual en milisegundos, de esta forma nos garantiza que el archivo sea único y no pise otro archivo
        const originalname = file.originalname//almacena nombre original del archivo para mantener una parte de este 
        const ext = path.extname(originalname) /*rutas ext por externo, path.extname, lo usamos para obtener la extension del archivo original ya que necesito
        saber si es zip, pdf, lo que sea*/
        cb(null, `${timestamp}-${originalname}`) //null o lo que tenemos almacenado en timestamp o en originalname
        }
    })
    
    const upload = multer({storage})
    //servir del archivo.html de la carpeta public
    app.use(express.static(path.join(__dirname, 'public')))

    
    //ruta para manejar la subida del archivo
    app.post("/app", upload.single("archivo"), (req, res) => {//uploads.single("archivo") tb es un meddlewars
        res.json({message: "Archivo subido exitosamente"})
    }) 



app.get("/chat", async(req, res) => {
    res.render("chat", { 
        title: "chat",
    })
})

 app.get("/app", async (req, res) => {
     res.render("app", {         title: "upload",
     })
 })

app.use("/api/carts", cartRouter)
app.use((req, res, next) => {
    console.log("Nueva solicitud recibida:", req.method, req.originalUrl);
    next();
});
app.use("/api/messages", messagesRoutes)
app.use("/api/products", productRouter) 





