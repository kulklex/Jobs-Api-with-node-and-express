const Upload = require('../models/fileupload')


const uploadFile =  (req, res) => {
    res.render('index')
}

const uploadFilePost = (req, res) => {
    if(req.file == undefined){
        res.render('index', {
            msg: `Error : No files Selected`
        })
    }
    console.log(req.file)
        const newImage = new Upload({
            name: req.file.filename,
            image: req.file.path,
            size: req.file.size,
            mimetype: req.file.mimetype,
            destination: req.file.destination,
            originalname: req.file.originalname
        })
    
        
        newImage.save((err)=>{
            err ? console.log(err) : res.render('index', {
                                msg: `File Uploaded`,
                               file: `uploads/${req.file.filename} >`
                            }) 
        })
}

const uploadedFile = (req, res) => {

}


module.exports = {uploadFile, uploadFilePost, uploadedFile}