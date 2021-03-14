const { response } = require('express');
const Usuario = require('../models/usuario.model');
const Paciente = require('../models/paciente.model');

const getTodo = async(req, res = response) => {
    
    const busqueda = req.params.busqueda;
    const regEx = new RegExp( busqueda , 'i' );
    
    try {
        
        const [usuarios, pacientes] = await Promise.all([
            Usuario.find({ userNombres:regEx, userApellidos:regEx, userEmail: regEx }),
            Paciente.find({ pacienteNombres:regEx, pacienteNumID:regEx, pacienteCiudad:regEx})
        ])


        res.json({
            ok:true,
            usuarios,
            pacientes,
            resultados: busqueda
        })

        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado en el servidor'
        })

    }
}

const getBuscaCollention = async (req, res = response) => {
    
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regEx = new RegExp( busqueda , 'i' );
    let data; 
    try {
        
        switch (tabla) {

            case 'usuarios':
                data = await Usuario.find({ userEmail: regEx });
                break;

            case 'pacientes':
                data = await Paciente.find({ pacienteNumID:regEx })
                    break;
            default:
                res.status(400).json({
                    ok:false,
                    msg:'la tabla no existe'
                })
                break;
        }

        res.json({
            ok:true,
            resultados: data
        })

        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado en el servidor'
        })

    }
}

module.exports = {
    getTodo,
    getBuscaCollention
}