const Category = require('../models/categoryModel')
const Company = require('../models/companyModel')

   // create category type
const createCategory = async (req,res) => {
 
    console.log("Inside createCategory")
    let id = req.body.id
    let title = req.body.title
    
    try{
        const categoryData = await Category.create({id,title})
        res.json({
            message: 'Category Creation: Successful'
        })
    }
    catch(err){
        res.json({
            message: 'Category Creation: Failed',
            err: err.message
        })
    }
}

// get all category with pagination of 10 
const getCategory = async (req,res) => {
    
    try{
        // page number to show data for pagination
        const {page=1} = req.query
        const categoryData = await Category.find().limit(10).skip((page-1)*10)
        res.json(categoryData)
    }
    catch(err){
        res.json({
            message: 'Data extraction failure',
            err: err.message
        })
    }
}


// get one category whose id matches
const getCategoryById = async (req,res) => {
   
   
    try{
        const categoryData = await Category.find({id:req.params.id})
        if(categoryData.length===0){

           
            res.json({
                message: "No such data available"
            })
        }
        else{
            res.json({
                data: categoryData
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

// updating category
const updateCategory = async (req,res) => {
   
    try{
        const categoryData = await Category.findOneAndUpdate({id:req.params.id}, req.body)
        if(categoryData){
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

// deleting category 
const deleteCategory = async (req,res) => {

    try{
        const categoryData = await Category.findOneAndRemove({id:req.params.id})
        if(categoryData===null){
            res.json({message:"No such data available"})
        }
        else{
            // changes the category_id of matched company to null if category deleted
            const companyUpdated = await Company.updateMany({category_id:req.params.id},{category_id:null}) 
            //
            res.json({message:"Data Deleted",categoryData})
        }
 
    }
    catch(err){
        res.json({
            message: 'Data Deletion failed',
            err: err.message
        })
    }
}


exports.createCategory = createCategory
exports.getCategory = getCategory
exports.getCategoryById = getCategoryById
exports.updateCategory = updateCategory
exports.deleteCategory = deleteCategory