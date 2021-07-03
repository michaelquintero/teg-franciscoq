
var bd = require('../config/conexion');
const { v4: uuidv4 } = require('uuid');

module.exports={
// -----<<<>>>---- docente ----<<<>>>----
    crear:(req,res)=>{
    res.render('materias/crear.ejs');
    },

    guardar:async (req,res)=>{
        function codigofinal() {
            const pre = uuidv4 ( );
            return pre ;
            };
        const codigo = codigofinal();
        const {titulo, descripcion,academico}=req.body;
        const newmateria={
    
            titulo,
            academico,
            descripcion,
            codigo,
            id_docente: req.user.id_docente,
        };
        
        await bd.query('INSERT INTO materia set ?', [newmateria]);
        req.flash('success','agregado correctamente')
        res.redirect('/materias');
    },

    index:async(req,res)=>{
        const conexion = await bd.query('SELECT * FROM materia WHERE id_docente = ?',[req.user.id_docente]);  
        res.render('materias/index.ejs', {materia:conexion});
    },

    eliminar: async(req,res)=>{
        const {codigo}= req.params;
        await bd.query('DELETE FROM materia WHERE codigo = ?',[codigo]);  
        req.flash('success','eliminado correctamente')

        res.redirect('/materias');
    },

    editar: async (req, res)=>{
        const {codigo}= req.params;
        const materia = await bd.query('SELECT * FROM materia WHERE codigo= ?', [codigo]);
        res.render('materias/editar',{ materia :materia [0] })
    },

    modificar:async (req, res) => {
        const {codigo} = req.params;
        const {titulo,academico,descripcion}=req.body;
        const newmateria={
            titulo,
            academico,
            descripcion
            
        }
        await bd.query('UPDATE materia SET ? WHERE codigo =? ', [newmateria, codigo]);
        req.flash('success','actualizado correctamente')
        res.redirect('/materias');
    } ,
    listaestudiante: async(req,res)=>{
        const {codigo}= req.params;
        const materia = await bd.query('SELECT * FROM matricula WHERE codigo= ?', [codigo]);
        if(materia){
            const conexion = await bd.query('SELECT materia.codigo, materia.titulo,  alumno.nombre, alumno.apellido FROM matricula INNER JOIN materia ON matricula.codigo = materia.codigo INNER JOIN alumno  ON matricula.id_alumno = alumno.id_alumno'); 
            res.render('materias/lista-estudiante',{ materia :conexion})
        }else{
            res.send('error');
        }
    },
// ----<<<>>>----- estuiante----<<<>>>>----
    add:(req,res)=>{
        res.render('materias/add.ejs');
    },
    agg: async (req,res)=>{
            const {codigo}=req.body;
            const newmateria={ 
                codigo,
                id_alumno: req.user.id_alumno,

            };
                console.log(newmateria);
                await bd.query('INSERT INTO matricula set ?', [newmateria] );
                res.redirect('/materias/lista');

    },
    lista:async(req,res)=>{
        
        const conexion = await bd.query('SELECT matricula.id_matricula, materia.codigo, materia.titulo FROM matricula INNER JOIN materia ON matricula.codigo = materia.codigo');  
        res.render('materias/lista.ejs', {materia:conexion});
    }

}