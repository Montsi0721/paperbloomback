import 'dotenv/config';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

await mongoose.connect(process.env.MONGO_URI);

const products = [
    {
        name: 'Paper Rose Bouquet',
        description: 'Handcrafted red paper roses wrapped in premium paper.',
        price: 250,
        stock: 20,
        category: 'Bouquet',
        image: 'https://paperbloomback.onrender.com/images/red_rose_bouquet.jpeg'
    },
    {
        name: 'Paper Sunflower',
        description: 'Bright handmade sunflower made from recycled paper.',
        price: 120,
        stock: 30,
        category: 'Single Flower',
        image: 'https://paperbloomback.onrender.com/images/single_sunflower.jpeg'
    },
    {
        name: 'Paper Lily Arrangement',
        description: 'Elegant white paper lilies for special occasions.',
        price: 300,
        stock: 15,
        category: 'Arrangements',
        image: 'https://paperbloomback.onrender.com/images/pink_rose_bouquet.jpeg'
    },
    {
        name: 'Custom Name Flower Box',
        description: 'Personalized flower box with custom name.',
        price: 450,
        stock: 10,
        category: 'Set',
        image: 'https://paperbloomback.onrender.com/images/flower_box2.jpeg'
    },
    {
        name: 'Mini Paper Tulip Set',
        description: 'Set of 5 colorful paper tulips in a small vase.',
        price: 180,
        stock: 25,
        category: 'Set',
        image: 'https://paperbloomback.onrender.com/images/paper_tulips.jpeg'
    },
    {
        name: 'Paper Orchid Plant',
        description: 'Lifelike paper orchid in a decorative ceramic pot.',
        price: 350,
        stock: 12,
        category: 'Arrangements',
        image: 'https://paperbloomback.onrender.com/images/paper_orchid.jpeg'
    },
    {
        name: 'Birthday Paper Flower Basket',
        description: 'Mixed paper flowers basket perfect for birthday celebrations.',
        price: 280,
        stock: 18,
        category: 'Bouquet',
        image: 'https://paperbloomback.onrender.com/images/birthday_basket.jpeg'
    },
    {
        name: 'Paper Daisy Garland',
        description: '3-meter garland of white and yellow paper daisies.',
        price: 220,
        stock: 22,
        category: 'Decorations',
        image: 'https://paperbloomback.onrender.com/images/daisy_garland.jpeg'
    },
    {
        name: 'Paper Peony Collection',
        description: 'Large paper peonies in various pastel colors.',
        price: 320,
        stock: 14,
        category: 'Single Flower',
        image: 'https://paperbloomback.onrender.com/images/paper_peony.jpeg'
    },
    {
        name: 'Wedding Paper Flower Arch Kit',
        description: 'Complete kit to create a beautiful paper flower wedding arch.',
        price: 850,
        stock: 8,
        category: 'Set',
        image: 'https://paperbloomback.onrender.com/images/wedding_arch_kit.jpeg'
    }
];

try {
    await Product.deleteMany();
    const result = await Product.insertMany(products);
    
    console.log('Products seeded successfully!');
    console.log(`Seeded ${result.length} products:`);
    
    result.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - M${product.price} (${product.category})`);
        console.log(`   Image: ${product.image}`);
    });

    console.log('\n=== Product IDs ===');
    result.forEach(p => {
        console.log(`${p.name}: ${p._id}`);
    });
    
    process.exit(0);
} catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
}