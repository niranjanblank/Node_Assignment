const Category = require('../models/categoryModel')

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

const getCategory = async (req,res) => {
    
    const categoryData = await Category.find()

    try{
        res.json(categoryData)
    }
    catch(err){
        res.json({
            message: 'Data extraction failure',
            err: err.message
        })
    }
}

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

const deleteCategory = async (req,res) => {

    try{
        const categoryData = await Category.deleteOne({id:req.params.id})
      
        if(categoryData['deletedCount']===0){
            res.json({
                message: "No such data found"
            })
        }
        else{
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