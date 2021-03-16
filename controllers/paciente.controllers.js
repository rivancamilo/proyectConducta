const { response } = require('express');
const Paciente = require('../models/paciente.model');
const Entrenamiento = require('../models/entrenamiento.model')


const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getPacientes = async (req, res) => {

    const desde = Number(req.query.desde) || 0;
    //ejecutamos ambas consultas al mismo tiempo
    const [paciente, total] = await Promise.all([
        Paciente
            .find({})
            .sort({ _id: 'desc' })
            .skip(desde)
            .limit(5),

        Paciente.countDocuments()

    ])

    res.json({
        ok: true,
        paciente,
        total,
        id: req.idUserToken // id del usuario que hizo la peticion
    })

}

const getPaciente = async (req, res = response) => {

    const id = req.params.id;

    const paciente = await Paciente.findById(id);
    if (!paciente) {
        return res.status(500).json({
            ok: false,
            paciente: "Error no existe",
        });
    }

    res.json({
        ok: true,
        paciente,
    })
}

const crearPacientes = async (req, res = response) => {

    const { pacienteNombres,
        pacienteApellidos,
        pacienteTipoID,
        pacienteNumID,
        pacienteDateNaci,
        pacienteEPS,
        pacienteCiudad,
        pacienteDireccion,
        pacienteEdad,
        pacienteFoto,
        usuario } = req.body;



    try {

        /**************************************************************************
        validamos que el usuario no este ya registrado con el mismo numero de ID
        **************************************************************************/
        const existePaciente = await Paciente.findOne({ pacienteNumID });
        if (existePaciente) {
            return res.status(400).json({
                ok: false,
                msg: 'El paciente ya esta registrado'
            })
        }
        console.log(existePaciente)

        const paciente = new Paciente(req.body)

        /**************************************************************************
        guardamos el usuario
        **************************************************************************/
        await paciente.save();

        res.json({
            ok: true,
            paciente
        })

    } catch (error) {


        res.status(500).json({
            ok: false,
            msg: 'error inesperado, revisar los logs'
        })

    }


}


const updatePacientes = async (req, res = response) => {

    const idPaciente = req.params.id;
    try {

        //buscamos si existe el paciente
        const pacienteDB = await Paciente.findById(idPaciente)
        if (!pacienteDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El paciente no esta registrado'
            })
        }

        //realizamos la actualizaciones de los datos menos el numID
        const { pacienteNumID, ...campos } = req.body;
        //delete campos.userEmail;// eliminamos el campo de email ya que no se podra actualizar
        const pacienteUpdate = await Paciente.findByIdAndUpdate(idPaciente, campos, { new: true , useFindAndModify:false })

        res.json({
            ok: true,
            paciente: pacienteUpdate
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en el servidor'
        })
    }
}


const deletePacientes = async (req, res = response) => {

    const idPaciente = req.params.id;
    try {
        /*********************************************************************
        buscamos el paciente a eliminar
        *********************************************************************/
        const pacienteDB = await Paciente.findById({_id:idPaciente})
        if (!pacienteDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El paciente no esta registrado'
            })
        }

        const entrenamiento = await Entrenamiento.find({paciente:idPaciente})
        //eliminamos los entrenamiento que tenga el paciente
        if(entrenamiento){
            for(let i=1; i<=entrenamiento.length;i++){
                await Entrenamiento.findOneAndDelete({paciente:idPaciente})
            }
        }
        //eliminamos el paciente
        const pacienteDelete = await Paciente.findOneAndDelete({_id:idPaciente}) 

        res.json({
            ok: true,
            msg: 'Paciente eliminado'
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en el servidor'
        })

    }
}


module.exports = {
    getPacientes,
    getPaciente,
    crearPacientes,
    updatePacientes,
    deletePacientes
}