const Company = require('../models/companyModel')
const Category = require('../models/categoryModel')
const fs = require('fs')




// create a company
const createCompany = async (req,res)=>{

    // if image is sent, its path is added to the body
    if(typeof(req.file)!=='undefined'){
        req.body.image = req.file.path
        console.log(req.body)
    }
 
    let category_id = req.body.category_id

    try{

        // Checking if the category exist in the category collection, if not throw error
        if(typeof(category_id)==="number"){
            const category = await Category.findOne({id: category_id}).exec()
            if(category === null){
                throw new Error("No such category")
            }
        }

        const companyData = await Company.create(req.body)

        res.json({
            message: "Successful"
        })
    }
    catch(err){
        res.json({
        message: "Unsuccessful",
        error: err.message
        })
    }

}

// update company data
const updateCompany = async (req,res) => {

    if(typeof(req.file)!=='undefined'){
        // if image is added, its path will be added
        req.body.image = req.file.path
    }

    try{

        // verifying the category
        let category_id = req.body.category_id
        if(typeof(category_id)==="number"){
            const category = await Category.findOne({id: category_id}).exec()
            if(category === null){
                throw new Error("No such category")
            }
        }

        const companyData = await Company.findOneAndUpdate({id:req.params.id}, req.body)
        if(companyData){
            res.json({message:"Data Updated"})
        }
        else{
            res.json({
                message: "No such data available"
            })
        }
        
    
    }
    catch(err){
        res.json({
            message: 'Data Update failed',
            err: err.message
        })
    }

}

// get company details of company with pagination of 10
const getCompany = async (req,res) => {
  
    try{
    const {page=1} = req.query
    let companyData  = await Company.find().populate('category').limit(10).skip((page-1)*10)

    res.json({
        message: "Successful",
        data: companyData
    })
    }
    catch(err){
        res.json({
            message: "Data Extraction Failure",
            error: err.message
        })
    }

}

// get details of a single company
const getCompanyById = async (req,res) => {
   
   
    try{
        let companyData  = await Company.find({id:req.params.id}).populate('category')
        if(companyData.length===0){
            res.json({
                message: "No such data available"
            })
        }
        else{
            res.json({
                data: companyData
            })
        }

    }
    catch(err){
        res.json({
            message: 'Data extraction failure',
            err: err.message
        })
    }
}

// delete company
const deleteCompany = async (req,res) => {

    try{
        const companyData = await Company.findOneAndRemove({id:req.params.id})
        if(companyData===null)
            {
                res.json({message:"No such data available"})
            }
        else{
            if(companyData.image){
                // if company image exists, delete it from filesystem
                fs.unlink(companyData.image,err=> {
                   if(err){
                       console.log(err)
                   }
                   else{
                       console.log("image deleted")
                   }
                })
            }
            res.json({message:"Data Deleted",companyData})
        }
       
 
    }
    catch(err){
        res.json({
            message: 'Data Deletion failed',
            err: err.message
        })
    }

}


exports.createCompany = createCompany
exports.updateCompany = updateCompany
exports.getCompany = getCompany
exports.getCompanyById = getCompanyById
exports.deleteCompany = deleteCompany