const express = require('express')
const multer = require('multer')



const companyController = require('../controllers/companyController')
const router = express.Router()

// configuration for storing the image
const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null ,'./images')
    },
    filename : function(req,file,cb){
        cb(null ,Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage
    })

router.get('/',companyController.getCompany)
router.post('/',upload.single('image'),companyController.createCompany)

router.get('/:id', companyController.getCompanyById)
router.put('/:id',upload.single('image'),companyController.updateCompany)
router.delete('/:id',companyController.deleteCompany)

module.exports = router