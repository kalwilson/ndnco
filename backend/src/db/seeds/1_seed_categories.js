import db from "../dbConnection.js";
import { v4 as uuid } from "uuid";

export async function seed() {
  if (process.env.NODE_ENV === "production") {
    console.log("In production cannot seed from seed_categories.");
    return;
  }

  try {
    await db("subcategories").del();
    await db("categories").del();

    const categoryNames = {
      artsCrafts: "Arts & Crafts",
      foodBeverage: "Food & Beverage",
      tourismExperience: "Tourism & Experiences",
      retailEcommerce: "Retail & E-commerce",
      professionalServices: "Professional Services",
      healthWellness: "Health & Wellness",
      educationTraining: "Education & Training",
      constructionTrades: "Construction & Trades",
      technologyInnovation: "Technology & Innovation",
      nonprofitCommunity: "Non-Profit & Community Organizations",
      agricultureLandbased: "Agriculture & Land-Based Businesses",
      entertainmentMedia: "Entertainment & Media",
      transportationLogistics: "Transportation & Logistics",
      realestateProperty: "Real Estate & Property Management",
      manufacturingProduction: "Manufacturing & Production",
      other: "Other",
    };

    const categories = await db("categories")
      .insert([
        {
          id: uuid(),
          name: categoryNames.artsCrafts,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        },
        {
          id: uuid(),
          name: categoryNames.foodBeverage,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        },
        {
          id: uuid(),
          name: categoryNames.tourismExperience,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        },
        {
          id: uuid(),
          name: categoryNames.retailEcommerce,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        },
        {
          id: uuid(),
          name: categoryNames.professionalServices,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        },
        {
          id: uuid(),
          name: categoryNames.healthWellness,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        },
        {
          id: uuid(),
          name: categoryNames.educationTraining,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        },
        {
          id: uuid(),
          name: categoryNames.constructionTrades,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        },
        {
          id: uuid(),
          name: categoryNames.technologyInnovation,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        },
        {
          id: uuid(),
          name: categoryNames.nonprofitCommunity,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        },
        {
          id: uuid(),
          name: categoryNames.agricultureLandbased,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        },
        {
          id: uuid(),
          name: categoryNames.entertainmentMedia,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        },
        {
          id: uuid(),
          name: categoryNames.transportationLogistics,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        },
        {
          id: uuid(),
          name: categoryNames.realestateProperty,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        },
        {
          id: uuid(),
          name: categoryNames.manufacturingProduction,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        },
        {
          id: uuid(),
          name: categoryNames.other,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        },
      ])
      .returning("*");

    const categoryid = Object.keys(categoryNames).reduce((object, key) => {
      const category = categories.find(
        (singlecategory) => singlecategory.name === categoryNames[key]
      );
      if (category) {
        object[key] = category.id;
      }
      return object;
    }, {});

    const subcategories = [
      // Arts & Crafts:
      { name: "Traditional Art", category_id: categoryid.artsCrafts },
      { name: "Digital Art", category_id: categoryid.artsCrafts },
      { name: "Jewelry & Accessories", category_id: categoryid.artsCrafts },
      { name: "Pottery & Ceramics", category_id: categoryid.artsCrafts },
      { name: "Textiles & Weaving", category_id: categoryid.artsCrafts },
      { name: "Handmade Goods", category_id: categoryid.artsCrafts },
      { name: "Art Galleries", category_id: categoryid.artsCrafts },

      // Food & Beverage:
      { name: "Restaurants & Cafes", category_id: categoryid.foodBeverage },
      { name: "Bakeries", category_id: categoryid.foodBeverage },
      { name: "Food Trucks", category_id: categoryid.foodBeverage },
      { name: "Catering Services", category_id: categoryid.foodBeverage },
      { name: "Traditional Foods", category_id: categoryid.foodBeverage },
      { name: "Farmers Markets", category_id: categoryid.foodBeverage },
      { name: "Breweries/Wineries", category_id: categoryid.foodBeverage },
      { name: "Food Products", category_id: categoryid.foodBeverage },

      // Toursim & Experiences:
      {
        name: "Cultural Tours & Experiences",
        category_id: categoryid.tourismExperience,
      },
      {
        name: "Eco-Tourism & Outdoor Adventures",
        category_id: categoryid.tourismExperience,
      },
      {
        name: "Lodges & Accommodations",
        category_id: categoryid.tourismExperience,
      },
      {
        name: "Guided Nature Walks & Wildlife Tours",
        category_id: categoryid.tourismExperience,
      },
      {
        name: "Cultural Workshops & Events",
        category_id: categoryid.tourismExperience,
      },

      // Retail & E-commerce:
      {
        name: "Boutiques & Gift Shops",
        category_id: categoryid.retailEcommerce,
      },
      { name: "Books & Media", category_id: categoryid.retailEcommerce },
      {
        name: "Health & Wellness Products",
        category_id: categoryid.retailEcommerce,
      },
      {
        name: "Indigenous E-commerce Platforms",
        category_id: categoryid.retailEcommerce,
      },
      { name: "General Stores", category_id: categoryid.retailEcommerce },

      // Professional Services:
      { name: "Legal Services", category_id: categoryid.professionalServices },
      {
        name: "Financial Services",
        category_id: categoryid.professionalServices,
      },
      {
        name: "Consulting & Coaching",
        category_id: categoryid.professionalServices,
      },
      {
        name: "Marketing & Branding Services",
        category_id: categoryid.professionalServices,
      },
      {
        name: "Translation & Language Services",
        category_id: categoryid.professionalServices,
      },
      { name: "Consultants", category_id: categoryid.professionalServices },

      // Health & Wellness:
      {
        name: "Traditional Healing & Medicine",
        category_id: categoryid.healthWellness,
      },
      {
        name: "Fitness & Yoga Teachers/Studios",
        category_id: categoryid.healthWellness,
      },
      {
        name: "Mental Health Services",
        category_id: categoryid.healthWellness,
      },
      {
        name: "Holistic Wellness Centers",
        category_id: categoryid.healthWellness,
      },
      { name: "Spas & Salons", category_id: categoryid.healthWellness },
      { name: "Beauty Specialist", category_id: categoryid.healthWellness },

      // Education & Training:
      {
        name: "Language & Cultural Education",
        category_id: categoryid.educationTraining,
      },
      {
        name: "Workshops & Skill Development",
        category_id: categoryid.educationTraining,
      },
      {
        name: "Schools & Training Centers",
        category_id: categoryid.educationTraining,
      },
      {
        name: "Online Courses & Webinars",
        category_id: categoryid.educationTraining,
      },
      {
        name: "Professional Educators & Tutors",
        category_id: categoryid.educationTraining,
      },

      // Construction & Trades:
      {
        name: "Construction Companies",
        category_id: categoryid.constructionTrades,
      },
      {
        name: "Landscaping & Environmental Services",
        category_id: categoryid.constructionTrades,
      },
      {
        name: "Plumbing, Electrical, & HVAC Services",
        category_id: categoryid.constructionTrades,
      },
      {
        name: "Carpentry & Woodworking",
        category_id: categoryid.constructionTrades,
      },
      {
        name: "Trades Professional",
        category_id: categoryid.constructionTrades,
      },

      // Technology & Innovation:
      { name: "Tech Startups", category_id: categoryid.technologyInnovation },
      {
        name: "Software Development & IT Services",
        category_id: categoryid.technologyInnovation,
      },
      {
        name: "Renewable Energy Solutions",
        category_id: categoryid.technologyInnovation,
      },
      {
        name: "Tech Consultants",
        category_id: categoryid.technologyInnovation,
      },

      // Non-Profit & Community Organizations:
      {
        name: "Cultural Preservation Groups",
        category_id: categoryid.nonprofitCommunity,
      },
      {
        name: "Advocacy & Support Organizations",
        category_id: categoryid.nonprofitCommunity,
      },
      {
        name: "Youth & Elder Programs",
        category_id: categoryid.nonprofitCommunity,
      },
      {
        name: "Environmental & Conservation Groups",
        category_id: categoryid.nonprofitCommunity,
      },

      // Agriculture & Land-Based Businesses:
      { name: "Farms & Ranches", category_id: categoryid.agricultureLandbased },
      {
        name: "Sustainable Agriculture",
        category_id: categoryid.agricultureLandbased,
      },
      {
        name: "Wild Harvesting & Foraging",
        category_id: categoryid.agricultureLandbased,
      },
      {
        name: "Landscaping & Nursery Services",
        category_id: categoryid.agricultureLandbased,
      },

      // Entertainment & Media:
      { name: "Musicians & Bands", category_id: categoryid.entertainmentMedia },
      {
        name: "Film & Video Production",
        category_id: categoryid.entertainmentMedia,
      },
      {
        name: "Photography & Videography",
        category_id: categoryid.entertainmentMedia,
      },
      {
        name: "Podcasts & Radio Shows",
        category_id: categoryid.entertainmentMedia,
      },
      {
        name: "Event Planning & Entertainment Services",
        category_id: categoryid.entertainmentMedia,
      },
      {
        name: "Storytelling & Journalism",
        category_id: categoryid.entertainmentMedia,
      },
      {
        name: "Artists & Performers",
        category_id: categoryid.entertainmentMedia,
      },
      { name: "Media Companies", category_id: categoryid.entertainmentMedia },
      {
        name: "Digital Media & Content Creation",
        category_id: categoryid.entertainmentMedia,
      },

      // Transportation & Logistics:
      {
        name: "Delivery Services",
        category_id: categoryid.transportationLogistics,
      },
      {
        name: "Trucking Companies",
        category_id: categoryid.transportationLogistics,
      },
      {
        name: "Tourism Transportation",
        category_id: categoryid.transportationLogistics,
      },

      // Real Estate & Property Management:
      {
        name: "Real Estate Agents & Agencies",
        category_id: categoryid.realestateProperty,
      },
      {
        name: "Property Development",
        category_id: categoryid.realestateProperty,
      },
      {
        name: "Rental & Leasing Services",
        category_id: categoryid.realestateProperty,
      },

      // Manufacturing & Production:
      {
        name: "Manufacturing Companies",
        category_id: categoryid.manufacturingProduction,
      },
      {
        name: "Custom Fabrication",
        category_id: categoryid.manufacturingProduction,
      },
      {
        name: "Product Design & Development",
        category_id: categoryid.manufacturingProduction,
      },

      // Other:
      { name: "Unique Businesses", category_id: categoryid.other },
      { name: "Unique Services", category_id: categoryid.other },
    ];

    await db("subcategories").insert(subcategories);
    console.log("Success seeding categories and subcategories");
  } catch (err) {
    console.error("Error:", err);
  }
}
