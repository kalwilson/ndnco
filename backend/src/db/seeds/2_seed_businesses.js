import db from "../dbConnection.js";
import { v4 as uuid } from "uuid";

export async function seed() {
  if (process.env.NODE_ENV === "production") {
    console.log("In production cannot seed from seed_businesses.");
    return;
  }

  const businessesData = [
    {
      business_name: "Urban Bloom Cafe",
      category_name: "Food & Beverage",
      subcategory_name: "Restaurants & Cafes",
    },
    {
      business_name: "Vivid Horizons Photography",
      category_name: "Entertainment & Media",
      subcategory_name: "Photography & Videography",
    },
    {
      business_name: "Cozy Corner Bookstore",
      category_name: "Retail & E-commerce",
      subcategory_name: "Books & Media",
    },
    {
      business_name: "LuxePet Grooming & Spa",
      category_name: "Other",
      subcategory_name: "Unique Businesses",
    },
    {
      business_name: "Echo Sound Studios",
      category_name: "Entertainment & Media",
      subcategory_name: "Media Companies",
    },
    {
      business_name: "Wildflower Boutique",
      category_name: "Retail & E-commerce",
      subcategory_name: "Boutiques & Gift Shops",
    },
    {
      business_name: "TechNook Innovations",
      category_name: "Technology & Innovation",
      subcategory_name: "Software Development & IT Services",
    },
    {
      business_name: "The Green Thumb Landscaping",
      category_name: "Construction & Trades",
      subcategory_name: "Landscaping & Environmental Services",
    },
    {
      business_name: "Sapphire Nails & Beauty",
      category_name: "Health & Wellness",
      subcategory_name: "Beauty Specialist",
    },
  ];

  const businessTemplate = [
    {
      approved: true,
      city: "Toronto",
      reserve: true,
      country: "Canada",
      region: "Ontario",
      contact_name: "Liam Thompson",
      contact_position: "Owner & Head Barista",
      contact_phone: "+1 (416) 555-2345",
      contact_email: "liam@urbanbloomcafe.com",
      business_type: "Partnership",
      website: "https://www.urbanbloomcafe.com",
      facebook: "https://facebook.com/urbanbloomcafe",
      instagram: "https://instagram.com/urbanbloomcafe",
      twitter: "https://twitter.com/urbanbloomcafe",
      linkedin: "https://linkedin.com/company/urbanbloomcafe",
      youtube: "https://youtube.com/urbanbloomcafe",
      tiktok: "https://tiktok.com/@urbanbloomcafe",
      pinterest: "https://pinterest.com/urbanbloomcafe",
      snapchat: "https://snapchat.com/add/urbanbloomcafe",
      business_description:
        "Urban Bloom Café is a modern café that combines specialty coffee with an inviting atmosphere, perfect for relaxation, work, and community gatherings.",
      products_or_services: "Coffee, tea, pastries, sandwiches, vegan options",
    },
    {
      approved: true,
      city: "Vancouver",
      reserve: true,
      country: "Canada",
      region: "British Columbia",
      contact_name: "Sarah Walker",
      contact_position: "Lead Photographer & Owner",
      contact_phone: "+1 (604) 555-9876",
      contact_email: "sarah@vividhorizonsphoto.com",
      business_type: "Sole Proprietorship",
      website: "https://www.vividhorizonsphoto.com",
      facebook: "https://facebook.com/vividhorizonsphoto",
      instagram: "https://instagram.com/vividhorizonsphoto",
      twitter: "https://twitter.com/vividhorizonsphoto",
      linkedin: "https://linkedin.com/company/vividhorizonsphoto",
      youtube: "https://youtube.com/vividhorizonsphoto",
      tiktok: "https://tiktok.com/@vividhorizonsphoto",
      pinterest: "https://pinterest.com/vividhorizonsphoto",
      snapchat: "https://snapchat.com/add/vividhorizonsphoto",
      business_description:
        "Vivid Horizons Photography specializes in capturing the beauty of landscapes, cityscapes, and personal portraits. We bring each moment to life with vibrant colors and stunning detail.",
      products_or_services:
        "Portrait photography, landscape photography, event photography, prints",
    },
    {
      approved: true,
      city: "Montreal",
      reserve: false,
      country: "Canada",
      region: "Quebec",
      contact_name: "Emma Harper",
      contact_position: "Owner",
      contact_phone: "+1 (514) 555-1122",
      contact_email: "emma@cozycornerbooks.com",
      business_type: "Sole Proprietorship",
      website: "https://www.cozycornerbooks.com",
      facebook: "https://facebook.com/cozycornerbooks",
      instagram: "https://instagram.com/cozycornerbooks",
      twitter: "https://twitter.com/cozycornerbooks",
      linkedin: "https://linkedin.com/company/cozycornerbooks",
      youtube: "https://youtube.com/cozycornerbooks",
      tiktok: "https://tiktok.com/@cozycornerbooks",
      pinterest: "https://pinterest.com/cozycornerbooks",
      snapchat: "https://snapchat.com/add/cozycornerbooks",
      business_description:
        "Cozy Corner Bookstore is a haven for book lovers, offering a wide variety of genres, from fiction to non-fiction, with cozy reading spaces and a welcoming atmosphere.",
      products_or_services: "Books, eBooks, book clubs, author events",
    },
    {
      approved: false,
      city: "Calgary",
      reserve: true,
      country: "Canada",
      region: "Alberta",
      contact_name: "Olivia Zhang",
      contact_position: "Owner & Lead Groomer",
      contact_phone: "+1 (403) 555-5689",
      contact_email: "olivia@luxepetgrooming.com",
      business_type: "Partnership",
      website: "https://www.luxepetgrooming.com",
      facebook: "https://facebook.com/luxepetgrooming",
      instagram: "https://instagram.com/luxepetgrooming",
      twitter: "https://twitter.com/luxepetgrooming",
      linkedin: "https://linkedin.com/company/luxepetgrooming",
      youtube: "https://youtube.com/luxepetgrooming",
      tiktok: "https://tiktok.com/@luxepetgrooming",
      pinterest: "https://pinterest.com/luxepetgrooming",
      snapchat: "https://snapchat.com/add/luxepetgrooming",
      business_description:
        "LuxePet Grooming & Spa offers a luxury experience for your pets, providing top-quality grooming, spa treatments, and wellness services for dogs and cats.",
      products_or_services:
        "Pet grooming, spa treatments, pet care products, mobile grooming",
    },
    {
      approved: false,
      city: "Ottawa",
      reserve: false,
      country: "Canada",
      region: "Ontario",
      contact_name: "Marcus Blackwell",
      contact_position: "Studio Owner & Producer",
      contact_phone: "+1 (613) 555-7744",
      contact_email: "marcus@echosoundstudios.com",
      business_type: "Sole Proprietorship",
      website: "https://www.echosoundstudios.com",
      facebook: "https://facebook.com/echosoundstudios",
      instagram: "https://instagram.com/echosoundstudios",
      twitter: "https://twitter.com/echosoundstudios",
      linkedin: "https://linkedin.com/company/echosoundstudios",
      youtube: "https://youtube.com/echosoundstudios",
      tiktok: "https://tiktok.com/@echosoundstudios",
      pinterest: "https://pinterest.com/echosoundstudios",
      snapchat: "https://snapchat.com/add/echosoundstudios",
      business_description:
        "Echo Sound Studios offers professional audio recording, mixing, and mastering services for musicians and content creators looking to elevate their sound.",
      products_or_services:
        "Music production, audio engineering, recording, mixing, mastering",
    },
    {
      approved: true,
      city: "Victoria",
      reserve: false,
      country: "Canada",
      region: "British Columbia",
      contact_name: "Sophia Parker",
      contact_position: "Owner & Curator",
      contact_phone: "+1 (250) 555-3145",
      contact_email: "sophia@wildflowerboutique.com",
      business_type: "Sole Proprietorship",
      website: "https://www.wildflowerboutique.com",
      facebook: "https://facebook.com/wildflowerboutique",
      instagram: "https://instagram.com/wildflowerboutique",
      twitter: "https://twitter.com/wildflowerboutique",
      linkedin: "https://linkedin.com/company/wildflowerboutique",
      youtube: "https://youtube.com/wildflowerboutique",
      tiktok: "https://tiktok.com/@wildflowerboutique",
      pinterest: "https://pinterest.com/wildflowerboutique",
      snapchat: "https://snapchat.com/add/wildflowerboutique",
      business_description:
        "Wildflower Boutique offers a curated selection of clothing, accessories, and home decor with a focus on eco-friendly and locally sourced products.",
      products_or_services:
        "Clothing, accessories, home decor, sustainable fashion",
    },
    {
      approved: false,
      city: "Edmonton",
      reserve: true,
      country: "Canada",
      region: "Alberta",
      contact_name: "James Lawson",
      contact_position: "CEO & Founder",
      contact_phone: "+1 (780) 555-6742",
      contact_email: "james@technookinnovations.com",
      business_type: "Corporation",
      website: "https://www.technookinnovations.com",
      facebook: "https://facebook.com/technookinnovations",
      instagram: "https://instagram.com/technookinnovations",
      twitter: "https://twitter.com/technookinnovations",
      linkedin: "https://linkedin.com/company/technookinnovations",
      youtube: "https://youtube.com/technookinnovations",
      tiktok: "https://tiktok.com/@technookinnovations",
      pinterest: "https://pinterest.com/technookinnovations",
      snapchat: "https://snapchat.com/add/technookinnovations",
      business_description:
        "TechNook Innovations focuses on developing cutting-edge software solutions and smart home technologies designed to simplify everyday life and improve business efficiency.",
      products_or_services:
        "Custom software development, smart home devices, IT consulting",
    },
    {
      approved: true,
      city: "Ottawa",
      reserve: true,
      country: "Canada",
      region: "Ontario",
      contact_name: "Ben Richardson",
      contact_position: "Owner & Landscape Architect",
      contact_phone: "+1 (613) 555-2398",
      contact_email: "ben@greenthumblandscaping.com",
      business_type: "Sole Proprietorship",
      website: "https://www.greenthumblandscaping.com",
      facebook: "https://facebook.com/greenthumblandscaping",
      instagram: "https://instagram.com/greenthumblandscaping",
      twitter: "https://twitter.com/greenthumblandscaping",
      linkedin: "https://linkedin.com/company/greenthumblandscaping",
      youtube: "https://youtube.com/greenthumblandscaping",
      tiktok: "https://tiktok.com/@greenthumblandscaping",
      pinterest: "https://pinterest.com/greenthumblandscaping",
      snapchat: "https://snapchat.com/add/greenthumblandscaping",
      business_description:
        "The Green Thumb Landscaping provides professional landscaping design and maintenance services, specializing in creating beautiful, sustainable outdoor spaces for homes and businesses.",
      products_or_services:
        "Landscape design, garden maintenance, lawn care, irrigation systems",
    },
    {
      approved: true,
      city: "Toronto",
      reserve: true,
      country: "Canada",
      region: "Ontario",
      contact_name: "Isabelle Nguyen",
      contact_position: "Owner & Head Nail Technician",
      contact_phone: "+1 (416) 555-4821",
      contact_email: "isabelle@sapphirenails.com",
      business_type: "Sole Proprietorship",
      website: "https://www.sapphirenails.com",
      facebook: "https://facebook.com/sapphirenails",
      instagram: "https://instagram.com/sapphirenails",
      twitter: "https://twitter.com/sapphirenails",
      linkedin: "https://linkedin.com/company/sapphirenails",
      youtube: "https://youtube.com/sapphirenails",
      tiktok: "https://tiktok.com/@sapphirenails",
      pinterest: "https://pinterest.com/sapphirenails",
      snapchat: "https://snapchat.com/add/sapphirenails",
      business_description:
        "Sapphire Nails & Beauty offers luxurious nail care and beauty services, from custom manicures and pedicures to full beauty treatments designed to help you feel pampered and refreshed.",
      products_or_services:
        "Manicures, pedicures, gel nails, nail art, waxing, facials",
    },
  ];

  const businessesAdd = [];

  await db("businesses").del();

  for (let i = 0; i < businessesData.length; i++) {
    const business = businessesData[i];
    const template = businessTemplate[i];

    const category = await db("categories")
      .where("name", business.category_name)
      .first();

    const subcategory = await db("subcategories")
      .where("name", business.subcategory_name)
      .first();

    if (!category || !subcategory) {
      console.error(
        `Category or subcategory not found for business: ${business.business_name}`
      );
      continue;
    }
    console.log(`Adding business: ${business.business_name} `);

    businessesAdd.push({
      id: uuid(),
      business_name: business.business_name,
      ...template,
      category_id: category.id,
      subcategory_id: subcategory.id,
    });
  }

  for (const business of businessesAdd) {
    try {
      await db("businesses").insert(business);
    } catch (err) {
      console.error(`Error inserting business: ${business.business_name}`);
    }
  }
  console.log("Success at seed_business");
}
