var express = require('express');
var router = express.Router();

const materiascontroller = require('../controllers/materiascontroller');
// ------<<<<<<|||>>>>>>------DOCENTE------<<<<<<|||>>>>>>------
/* GET page. */
router.get('/', materiascontroller.index);
router.get('/crear', materiascontroller.crear);
router.get('/eliminar/:codigo', materiascontroller.eliminar);
router.get('/editar/:codigo', materiascontroller.editar);
router.get('/lista-estudiante/:codigo', materiascontroller.listaestudiante);
// POST page.
router.post('/crear', materiascontroller.guardar);
router.post('/editar/:codigo', materiascontroller.modificar);
// ------<<<<<<|||>>>>>>------ESTUDIANTE------<<<<<<|||>>>>>>------
/*GET Page */
router.get('/lista', materiascontroller.lista);
router.get('/add', materiascontroller.add);
//POST Page
router.post('/add',materiascontroller.agg);

module.exports = router;