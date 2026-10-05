// import models 
import { json } from "express";
import { createCategoryModel, checkExistCategory, viewExistingCategories, viewSingleExistCategory, updateSingleCategory, deleteCategory } from "../models/category.model.js";

const viewAllCategory =async (req, res) => {
	// handle create new category logic here
	try {
		const allCategoris = await viewExistingCategories();
		return res.status(200).json({
			success: true,
			count: allCategoris.length,
			data: allCategoris
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "failed to retrive categories",
			error: error.message
		})
	}
};
const viewSingleCategory = async (req, res) => {
	const { id } = req.params;
	if(!id){
		return res.status(404).json({
			success: false,
			message: "this categories id does not exist"
		})
	}
	try {
		const resultCategory = await viewSingleExistCategory(id);
		return res.status(200).json({
			success: true,
			message: "succesfully retrived the product",
			data: resultCategory
		})
	} catch (error) {
		return res.status(500), json({
			success: false,
			message: " there is unexpected error "
		})
	}
};

const createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name || !description) {
			return res.status(403).json({
				success: false,
				message: "you are not provide all information",
			});
		}
		// check the category exist
		const checkExistence = await checkExistCategory(name);
		if(checkExistence){
			return res.status(409).json({
				success:false,
				message: "The product already exist"
			})
		}
    const addCategory = await createCategoryModel(name, description);

		return res.status(201).json({
			success: true,
			message:"Succesfully Create new category",
			category: addCategory
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Unexpected Internal Error"
		})
	}
};

const updateCtegory = async (req, res) => {
	try{
	const { id } = req.params ; // to get the id of want to update
	const updateFields = req.body ; // to get the user want to updated fields
	if (!updateFields || Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update.",
      });
    }
		const result = await updateSingleCategory(id, updateFields);
		if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }
		return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
    });
	}catch(error){
		return res.status(500).json({
      success: false,
      message: "Failed to update product.",
      error: error.message,
    });
	}
};
const removeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    const result = await deleteCategory(id);

    // affectedRows === 0 ከሆነ ID-ው የለም ወይም ከዚህ በፊት is_deleted = 1 ሆኗል
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found or already deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
};

export {
	viewAllCategory,
	viewSingleCategory,
	createCategory,
	updateCtegory,
	removeCategory,
};
