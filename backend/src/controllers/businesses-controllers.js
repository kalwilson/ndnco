import db from "../db/dbConnection.js";

const approvedBusinesses = async (_req, res) => {
  try {
    const { page = 1, limit = 10 } = _req.query;
    const offset = (page - 1) * limit;

    const businesses = await db("businesses")
      .where({ approved: true })
      .limit(limit)
      .offset(offset);

    const totalCount = await db("businesses").where({ approved: true }).count();
    const totalPages = Math.ceil(totalCount[0].count / limit);

    res.status(200).json({
      businesses,
      totalCount: totalCount[0].count,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(400).send(`Error at approvedBusinesses: ${err}`);
  }
};

const findBusiness = async (req, res) => {
  try {
    const foundBusiness = await db("businesses").where({
      id: req.params.id,
      approved: true,
    });

    if (foundBusiness.length === 0) {
      return res.status(404).json({
        message: `Business with ID ${req.params.id} not found or not approved.`,
      });
    }

    const business = foundBusiness[0];
    res.json(business);
  } catch (err) {
    res.status(500).json({
      message: `Unable to retrieve business data with ID ${req.params.id}`,
    });
  }
};

const searchBusinesses = async (req, res) => {
  const {
    category_id,
    subcategory_id,
    reserve,
    city,
    region,
    limit = 10,
    offset = 0,
  } = req.query;

  try {
    let query = db("businesses").select("*");
    let count = db("businesses").count("* as total");

    if (category_id) {
      query = query.where("category_id", category_id);
      count = count.where("category_id", category_id);
    }

    if (subcategory_id) {
      query = query.where("subcategory_id", subcategory_id);
      count = count.where("subcategory_id", subcategory_id);
    }

    if (reserve !== undefined) {
      query = query.where("reserve", reserve);
      count = count.where("reserve", reserve);
    }

    if (city) {
      query = query.where("city", "ilike", `%${city}%`);
      count = count.where("city", "ilike", `%${city}%`);
    }

    if (region) {
      query = query.where("region", region);
      count = count.where("region", region);
    }

    query = query.where("approved", true);
    count = query.where("approved", true);

    query = query.limit(limit).offset(offset);

    const businesses = await query;
    const totalCountResult = await count;
    const totalCount = totalCountResult[0].total;

    if (businesses.length === 0) {
      return res.status(404).json({ message: `No approved businesses found` });
    }

    res.json({
      businesses,
      totalCount,
      currentPage: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (err) {
    console.error(`Error searching businesses: ${err}`);
    res.status(500).json({ message: `Error searching businesses` });
  }
};

const registerBusiness = async (req, res) => {
  const reqInput = [
    "business_name",
    "city",
    "region",
    "reserve",
    "country",
    "contact_name",
    "contact_position",
    "contact_email",
    "category_id",
    "subcategory_id",
    "business_type",
    "business_description",
    "products_or_services",
  ];

  const missingInput = reqInput.filter(
    (input) => req.body[input] === undefined
  );
  if (missingInput.length > 0) {
    return res
      .status(400)
      .json({ message: `Missing required input: ${missingInput.join(", ")}` });
  }

  try {
    const newBusiness = await db("businesses")
      .insert({
        ...req.body,
        approved: false,
      })
      .returning("*");
    res.status(201).json(newBusiness);
  } catch (err) {
    console.error(`Error registering business: ${err}`);
    res.status(400).send("Error registering business.");
  }
};

const pendingBusinesses = async (req, res) => {
  try {
    const businesses = await db("businesses").where({ approved: false });
    res.status(200).json(businesses);
  } catch (err) {
    res.status(400).send(`Error at pendingBusinesses: ${err}`);
  }
};

const updateApproval = async (req, res) => {
  const { id } = req.params;
  const { approved } = req.body;

  if (typeof approved !== "boolean") {
    return res.status(400).json({ message: `Invalid approval status.` });
  }

  try {
    const updateBusiness = await db("businesses")
      .where({ id })
      .update({ approved })
      .returning("*");

    if (updateBusiness.length === 0) {
      return res
        .status(404)
        .json({ message: `Business with ID ${id} not found` });
    }

    res.status(200).json(updateBusiness[0]);
  } catch (err) {
    console.error(`Error updating approval: ${err}`);
    res.status(400).send(`Error updating approval.`);
  }
};

const editBusiness = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const reqInput = [
    "business_name",
    "city",
    "region",
    "country",
    "contact_name",
    "contact_position",
    "contact_email",
    "category_id",
    "subcategory_id",
    "business_type",
    "business_description",
    "products_or_services",
  ];

  const missingInput = reqInput.filter((input) => !req.body[input]);
  if (missingInput.length > 0) {
    return res
      .status(400)
      .json({ message: `Missing required input: ${missingInput.join(", ")}` });
  }

  try {
    const business = await db("businesses").where({ id }).first();
    if (!business) {
      return res
        .status(404)
        .json({ message: `Business with ID ${id} not found.` });
    }

    const rowsUpdated = await db("businesses").where({ id }).update(data);
    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Business with ID ${id} not updated, rows not found.`,
      });
    }

    const updatedBusiness = await db("businesses").where({ id }).first();
    res.status(200).json(updatedBusiness);
  } catch (err) {
    console.error(`Error editing business: ${err}`);
    res.status(500).json({ message: `Error editing business with ID ${id}` });
  }
};

const deleteBusiness = async (req, res) => {
  const { id } = req.params;

  try {
    const delBusiness = await db("businesses")
      .where({ id })
      .del()
      .returning("*");

    if (delBusiness.length === 0) {
      return res
        .status(404)
        .json({ message: `Business with ID ${id} not found.` });
    }

    res
      .status(200)
      .json({ message: `Business with ID ${id} deleted successfully.` });
  } catch (err) {
    console.error(`Error deleting business: ${err}`);
    res.status(500).json({ message: `Error deleting business with id ${id}` });
  }
};

export default {
  approvedBusinesses,
  findBusiness,
  searchBusinesses,
  registerBusiness,
  pendingBusinesses,
  editBusiness,
  updateApproval,
  deleteBusiness,
};
