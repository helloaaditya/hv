const mongoose = require('mongoose');
require('dotenv').config();

const Service = require('./models/Service');
const HomepageContent = require('./models/HomepageContent');
const ContactDetails = require('./models/ContactDetails');
const ProjectPhoto = require('./models/ProjectPhoto');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

async function initializeData() {
  try {
    // Initialize default services
    const defaultServices = [
      {
        title: "Basement Waterproofing",
        description: "Complete basement protection with interior and exterior waterproofing solutions.",
        features: ["Interior Drainage", "Exterior Sealing", "Sump Pump Installation"],
        category: "waterproofing",
        image: "https://plus.unsplash.com/premium_photo-1751728435152-2017b8349c96?q=80&w=1656&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isActive: true,
        order: 1
      },
      {
        title: "PU Coating",
        description: "High-performance polyurethane coating for industrial and commercial flooring.",
        features: ["Chemical Resistance", "High Durability", "Easy Maintenance"],
        category: "flooring",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop&auto=format",
        isActive: true,
        order: 2
      },
      {
        title: "Epoxy Flooring",
        description: "Premium epoxy flooring solutions for residential and commercial spaces.",
        features: ["Seamless Finish", "Stain Resistance", "Long-lasting"],
        category: "flooring",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format",
        isActive: true,
        order: 3
      }
    ];

    // Initialize default homepage content
    const defaultHomepageContent = [
      {
        section: "hero",
        title: "Professional Waterproofing Solutions, Bangalore",
        subtitle: "Protect Your Property with Advanced Technology",
        description: "Expert waterproofing services for residential and commercial properties. 5+ years of experience with guaranteed results.",
        image: "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&w=1600&q=80",
        isActive: true
      },
      {
        section: "services",
        title: "Our Services",
        subtitle: "Comprehensive waterproofing solutions tailored to protect your property",
        description: "Comprehensive waterproofing solutions tailored to protect your property from water damage with cutting-edge technology and expert craftsmanship",
        isActive: true
      }
    ];

    // Initialize default contact details
    const defaultContactDetails = [
      {
        type: "phone",
        label: "Phone",
        value: "+91 9731535216",
        isActive: true
      },
      {
        type: "email",
        label: "Email",
        value: "Highlightventures0317@gmail.com",
        isActive: true
      },
      {
        type: "instagram",
        label: "Instagram",
        value: "@highlight_ventures_0317",
        isActive: true
      },
      {
        type: "address",
        label: "Address",
        value: "No. 786/1, 3rd main, 2nd cross, beside Muneshwara Temple, Telecom Layout, Srirampura, Jakkur, Bengaluru, Karnataka 560064",
        isActive: true
      }
    ];

    // Initialize default project photos
    const defaultProjectPhotos = [
      {
        title: "Luxury Residential Basement",
        description: "Complete basement waterproofing with premium drainage system and moisture control.",
        category: "Residential",
        location: "Bengaluru, Karnataka",
        completedDate: "March 2024",
        features: ["Interior Drainage", "Vapor Barrier", "Dehumidification System"],
        image: "https://i.postimg.cc/5YhLdnSh/115.jpg",
        isActive: true,
        order: 1
      },
      {
        title: "Commercial Warehouse Complex",
        description: "Large-scale waterproofing for 50,000 sq ft warehouse facility with advanced membrane system.",
        category: "Commercial",
        location: "Mumbai, Maharashtra",
        completedDate: "February 2024",
        features: ["Membrane Waterproofing", "Structural Reinforcement", "Drainage Solutions"],
        image: "https://i.postimg.cc/tZKWQ2zp/111.jpg",
        isActive: true,
        order: 2
      }
    ];

    // Clear existing data and insert defaults
    await Service.deleteMany({});
    await HomepageContent.deleteMany({});
    await ContactDetails.deleteMany({});
    await ProjectPhoto.deleteMany({});

    await Service.insertMany(defaultServices);
    await HomepageContent.insertMany(defaultHomepageContent);
    await ContactDetails.insertMany(defaultContactDetails);
    await ProjectPhoto.insertMany(defaultProjectPhotos);

    console.log('Default data initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing data:', error);
    process.exit(1);
  }
}

initializeData();
