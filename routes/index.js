var express = require('express');
var router = express.Router();

const userController = require("../controller/userController");

const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// save data
router.post('/addUser',userController.addUser);

// Get Data
router.get('/getUser',userController.getUser);

// Edit Data
router.post('/editUser/:id',userController.editUser);

// Delete Data
router.get('/deleteUser/:id',userController.deleteUser);


module.exports = router;
