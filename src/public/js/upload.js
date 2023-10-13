import  multer  from "multer";
import path from "path";

import express from 'express';
const app = express();

/*escribir diferentes configuraciones de multer para guardar los archivos en una carpeta, multer requiere que se haga una carpeta para guardar 
sus archivos esta se debe llamar uploads*/

const storage = multer.diskStorage({ //storage invoca a multer y tiene un método nativo que es disjStorage
    //recibe el destino de los archivos que va a encontrar
    destination:(req, file, cb ) =>{ //tres parámetros 
        cb(null, __dirname+"/src/uploads") //cb es = a calback, el calback tiene dos parámetros null y uploads
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
    app.post("/upload", upload.single("archivo"), (req, res) => {//uploads.single("archivo") tb es un meddlewars
        res.json({message: "Archivo subido exitosamente"})
    }) 

