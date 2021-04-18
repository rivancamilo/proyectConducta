const { response } = require('express');
const Emocion  = require('../models/emociones.model');
const Entrenamiento = require('../models/entrenamiento.model')
const Paciente = require('../models/paciente.model');

const getEmociones = async (req,res = response) => {
    
    const desde = Number(req.query.desde) || 0 ;
    //ejecutamos ambas consultas al mismo tiempo

    const emocion = await Emocion
                .find({})
                .sort({_id:'desc'})
                .skip(desde)
                .limit(5)

    
   
    res.json({
        ok:true,
        emocion
    })

}


const getEntrenamientos = async (req,res = response) => {
    
    const desde = Number(req.query.desde) || 0 ;
    //ejecutamos ambas consultas al mismo tiempo


    const [entrenamiento, total ] = await Promise.all([
        Entrenamiento
                .find({})
                .populate('paciente','pacienteNombres pacienteApellidos pacienteEdad pacienteFoto')
                .sort({_id:'desc'})
                .skip(desde)
                .limit(50),

        Entrenamiento.countDocuments()

    ])

    res.json({
        ok:true,
        total:total,
        entrenamientos:entrenamiento
    })



}

const getEntrenamientoPaciente = async (req,res = response) => {
    
    const idPaciente = req.params.id;
    //ejecutamos ambas consultas al mismo tiempo
    const pacienteDB = await Paciente.findById({_id:idPaciente})
    if (!pacienteDB) {
        return res.status(404).json({
            ok: false,
            msg: 'El paciente no esta registrado'
        })
    }

    const entrenamiento = await Entrenamiento.find({paciente:idPaciente})
    //http://localhost:3800/api/entrenamiento/paciente/6046f17909d8634f843d294b
   
    res.json({
        ok:true,
        entrenamientos:entrenamiento
    })

}

const crearEntrenamiento = async (req,res = response ) =>{

    try {


        const entrenamiento = new Entrenamiento(req.body)

        /**************************************************************************
        guardamos el usuario
        **************************************************************************/
        await entrenamiento.save();

        res.json({
            ok:true,
            entrenamiento,
        })

    } catch (error) {

        
        res.status(500).json({
            ok:false,
            msg:'error inesperado, revisar los logs'
        })

    }
}


const deleteEntrenamiento = async (req, res = response ) =>{
    
    const idPrueba = req.params.id;

    try {
        /*********************************************************************
        buscamos el entrenamiento a eliminar
        *********************************************************************/
        const pruebaDB = await Entrenamiento.findById(idPrueba)
        if( !pruebaDB ){
            return res.status(404).json({
                ok:false,
                msg:'Error, la prueba no existe'
            })
        }

       
            
        const usuarioDelete = await Entrenamiento.findOneAndDelete({ _id:idPrueba })
        

        res.json({
            ok:true,
            msg:'Prueba eliminada'
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado en el servidor'
        })

    }
}


module.exports= {
    getEmociones,
    crearEntrenamiento,
    getEntrenamientos,
    getEntrenamientoPaciente,
    deleteEntrenamiento
}














