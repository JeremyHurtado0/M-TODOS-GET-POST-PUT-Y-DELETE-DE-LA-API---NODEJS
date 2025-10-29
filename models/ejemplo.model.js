import mongoose from "mongoose";
//import ejemplo from "../routes/ejemplo.routers.js";

const ejemploSchema = new mongoose.Schema({

 nombre:{

    type: String,
    required: true
},
 apellido:{
   type: String,
    required: true

},
edad:{

 type: Number,
 required: false

},

contacto:{

 type: [String],
 required: false

}



});


const Ejemplo = mongoose.model('Ejemplo',ejemploSchema);

export default Ejemplo;