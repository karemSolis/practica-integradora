import express from "express"; //importación de express
import { engine } from "express-handlebars"; /*importación de módulo express-handlebars, osea la biblio para usar motores de plantillas handlebars con express */
import * as path from "path" /*importación del módulo path de node.js, entrega utilidades para trabajar con rutas de archivos y directorios */
import __dirname from "./utils.js"; /*importación de la variable __dirname desde el archivo utils.js*/
import mongoose from "mongoose";


import CartRouter from "./router/cart.routes.js";
import productRouter from "./router/product.routes.js";
import messagesRoutes from "./router/messages.router.js"


//servidor 
const app = express();
const PORT = 8080; 

//mongoose
const ecommerce = async () => {
    mongoose.connect("mongodb+srv://proyectointegrador:q9sHiS6YE5R6NJ0Q@coderhouse.y9dsp4s.mongodb.net/?retryWrites=true&w=majority")
    console.log("Conectado a la base de datos")
}

ecommerce();


//middleware
//analizarán solicitudes HTTP entrantes y los convertirán en formato json o url
app.use(express.json());
app.use(express.urlencoded({extended:true}));


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

//ruta a la página principal
app.get("/", async(req, res) =>{
    let products = await product.getProducts()/*gracias a la constante product copiada y pegada desde product.router puedo reutilizar funciones de rutas hechas ahí */
    res.render("home", { /*este render nos renderizará el archivo handlebars en main, pero a través de lo que hagamos en home */
        title: "handlebars y websockets",
        products: products,
    })
})

app.use("/api/carts", CartRouter)
app.use("/api/messages", messagesRoutes)
app.use("/api/products", productRouter) 

app.use("/realtimeproducts", productRouter)
app.use("/products", productRouter)

//servidor 
app.listen(PORT, ()=>{
    console.log(`Servidor en el puerto 8080 ${PORT}`);
}) 



