const express = require('express')
const companyController = require('../controllers/companyController')
const router = express.Router()

router.get('/',companyController.getCompany)
router.post('/',companyController.createCompany)

router.get('/:id', companyController.getCompanyById)
router.put('/:id',companyController.updateCompany)
router.delete('/:id',companyController.deleteCompany)

module.exports = router