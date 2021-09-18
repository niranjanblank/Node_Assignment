const Company = require('../models/companyModel')
const Category = require('../models/categoryModel')





const createCompany = async (req,res)=>{
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


const updateCompany = async (req,res) => {
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


const getCompany = async (req,res) => {
    try{
    const companyData  = await Company.find()

    res.json({
        message: "Data Extraction Successful",
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


const getCompanyById = async (req,res) => {
   
   
    try{
        const companyData = await Company.find({id:req.params.id})
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

const deleteCompany = async (req,res) => {

    try{
        const companyData = await Company.deleteOne({id:req.params.id})
      
        if(companyData['deletedCount']===0){
            res.json({
                message: "No such data found"
            })
        }
        else{
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