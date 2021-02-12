import { Usuario } from "../models/usuario.model";

export interface CargarUsuarios {
    total: number;
    usuario: Usuario[];
}