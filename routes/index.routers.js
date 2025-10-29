import ejemplo from "./ejemplo.routers.js";
import libro from "./libro.routers.js";  // NUEVO ejemplo libro
import { Router } from "express";

const indexRoutes = Router();

indexRoutes.use('/ejemplo', ejemplo);
indexRoutes.use('/libro', libro); // Nuevo ejemplo libro

export default indexRoutes;