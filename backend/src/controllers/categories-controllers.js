import db from "../db/dbConnection.js";

const getCategories = async (_req, res) => {
  try {
    const categories = await db("categories").select("*");
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).send(`Error at getCategories: ${err}`);
  }
};

const getSubcategories = async (req, res) => {
  const { categoryid } = req.params;
  try {
    const subcategories = await db("subcategories")
      .select("*")
      .where("category_id", categoryid);

    if (subcategories === 0) {
      return res.status(404).json({ message: "No subcategories found." });
    }

    res.status(200).json(subcategories);
  } catch (err) {
    console.error("Error at getSubcategories:", err);
    res.status(400).send(`Fetching subcategories failed.`);
  }
};

const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await db("subcategories").select("*");
    res.status(200).json(subcategories);
  } catch (err) {
    console.error("Error at getAllSubcategories:", err);
    res.status(400).send(`Getting all subcategories failed`);
  }
};

export default {
  getCategories,
  getSubcategories,
  getAllSubcategories,
};
