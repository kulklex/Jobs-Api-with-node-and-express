const express = require('express')
const router = express.Router()
const  {uploadFile, uploadFilePost, uploadedFile} = require('../controllers/uploadFile')

const multer = require('multer');
const path = require('path');


//set storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb){
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
    }
  })
  
  // Initiate upload
  const  upload = multer({
    storage: storage,
    limits: {fileSize: 200000000},
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
  })


  //Check File Type
function checkFileType(file, cb){
    const  filetypes = /jpeg|jp|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true)
    } else{
        cb('Error: Must be an Image')
    }
}


router.get('/', uploadFile)
router.post('/', upload.single('myImage'), uploadFilePost)


router.get('/:filename', uploadedFile)



module.exports = router