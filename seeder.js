const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load env vars
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding...');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const products = [
    {
        name: "Classic White Tee",
        description: "A timeless, comfortable classic white t-shirt made from organic cotton.",
        price: 35.00,
        category: "men",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        countInStock: 20
    },
    {
        name: "Vintage Denim Jacket",
        description: "Durable and stylish denim jacket perfect for any casual look.",
        price: 120.00,
        category: "men",
        imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
        countInStock: 15
    },
    {
        name: "Tailored Wool Coat",
        description: "Premium tailored wool coat for elegant winter dressing.",
        price: 250.00,
        category: "women",
        imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
        countInStock: 8
    },
    {
        name: "Pleated Trousers",
        description: "Relaxed fit pleated trousers for a modern silhouette.",
        price: 85.00,
        category: "women",
        imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
        countInStock: 12
    },
    {
        name: "Black Graphic Hoodie",
        description: "Cozy graphic hoodie with minimalist chest detailing.",
        price: 65.00,
        category: "men",
        imageUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop",
        countInStock: 25
    },
    {
        name: "Minimalist Leather Sneakers",
        description: "Clean, white leather sneakers to pair with any outfit.",
        price: 140.00,
        category: "accessories",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
        countInStock: 30
    }
];

const importData = async () => {
    try {
        await connectDB();
        await Product.deleteMany(); // Clear existing
        await Product.insertMany(products);
        console.log('Dummy product data successfully seeded!');
        process.exit();
    } catch (error) {
        console.error(`Error with import: ${error.message}`);
        process.exit(1);
    }
};

importData();
