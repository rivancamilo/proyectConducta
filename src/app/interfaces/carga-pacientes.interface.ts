import { Paciente } from "../models/paciente.model";

export interface CargarPacientes {
    total: number;
    paciente: Paciente[];
}