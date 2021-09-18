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
    
    try{
        // page no to show data for pagination
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
        const categoryData = await Category.findOneAndRemove({id:req.params.id})
      
        if(categoryData===null){
            res.json({message:"No such data available"})
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