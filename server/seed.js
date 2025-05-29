const mongoose = require("mongoose");
const Blog = require("./models/blogModel");
require("dotenv").config();

const seedBlogs = [
  {
    title: "Çfarë pritet nga teknologjia në 2025",
    description: "Një parashikim për AI, Web3 dhe më shumë.",
    category: "Tech",
    image: "https://via.placeholder.com/600x400",
    author: "techwizard",
  },
  {
    title: "Stili i ri veror 2025",
    description: "Çfarë po vishet në Milano dhe Paris?",
    category: "Fashion",
    image: "https://via.placeholder.com/600x400",
    author: "styleguru",
  },
  {
    title: "Udhëtimi perfekt në Alpe",
    description: "Natyrë, qetësi dhe aventura.",
    category: "Travel",
    image: "https://via.placeholder.com/600x400",
    author: "wanderlust",
  },
  {
    title: "5 mënyra për të përmirësuar fokusin",
    description: "Ushtrime, meditim dhe zakone të shëndetshme.",
    category: "Lifestyle",
    image: "https://via.placeholder.com/600x400",
    author: "lifecoach",
  },
  {
    title: "A ia vlen të investosh në 2025?",
    description: "Pasqyrë mbi tregjet dhe financat personale.",
    category: "Finance",
    image: "https://via.placeholder.com/600x400",
    author: "finadvisor",
  },
  {
    title: "Top 3 filma që na bënë për të qeshur e qarë",
    description: "Komedira dramatike dhe emocionet e mëdha.",
    category: "Entertainment",
    image: "https://via.placeholder.com/600x400",
    author: "cinefan",
  },
  {
    title: "Si të fillosh me punimet me dorë",
    description: "Crafts për fillestarë me materiale të thjeshta.",
    category: "Crafts",
    image: "https://via.placeholder.com/600x400",
    author: "creativehands",
  },
  {
    title: "Muzika që po dominon TikTok",
    description: "Trendet e 2025 dhe artistët më të dëgjuar.",
    category: "Music",
    image: "https://via.placeholder.com/600x400",
    author: "musicvibes",
  },
  {
    title: "Recetat më virale të muajit",
    description: "Shije të reja për çdo ditë.",
    category: "Food",
    image: "https://via.placeholder.com/600x400",
    author: "chefme",
  },
  {
    title: "Fotografia urbane: truket për fillestarë",
    description: "Kompozimi, drita dhe perspektiva.",
    category: "Photography",
    image: "https://via.placeholder.com/600x400",
    author: "snapmaster",
  },
  {
    title: "Marketing digjital për fillestarë",
    description: "SEO, reklama dhe ndërtimi i brand-it.",
    category: "Marketing",
    image: "https://via.placeholder.com/600x400",
    author: "marketme",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Blog.deleteMany(); // Fshin të vjetrat (opsionale)
    await Blog.insertMany(seedBlogs);
    console.log("✅ Blogjet u futën me sukses!");
    process.exit();
  } catch (err) {
    console.error("❌ Error në futje:", err.message);
    process.exit(1);
  }
};

seedDB();
