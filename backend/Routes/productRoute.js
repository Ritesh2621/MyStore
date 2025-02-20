import express from "express";
import { ProductModel } from "../Model/productModel.js";
import { UserModel } from "../Model/userModel.js";

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const Product = await ProductModel.find();
        res.json(Product);
    } catch (error) {
        console.error("Error fetching Product:", error.message);
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id",async(req,res)=>{
    try{
        const result = await ProductModel.findById(req.params.id);
        res.status(200).json(result);
    }catch(err){
         res.status(500).json(err);
    }
})

router.post('/product', async (req, res) => {
    try {
        const { title, description, category,subcategory, price, discountPercentage, rating, brand, images,sellername,quantity,warrantyInformation,shippingInformation } = req.body;

        // Create a new instance of ProductModel with the updated schema
        const newProduct = new ProductModel({
            title,
            description,
            category,
            subcategory,
            price,
            discountPercentage,
            rating,
            brand,
            images,
            reviews,
            sellername,
            quantity,
              warrantyInformation,
              shippingInformation,
        });

        // Save the instance to the database
        await newProduct.save();

        // Send a success response
        res.status(201).json({
            message: 'New product document created successfully',
            data: newProduct
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
});


router.put("/", async (req, res) => {
    const product = await ProductModel.findById(req.body.productID);
    const user = await UserModel.findById(req.body.userID);
    try {
      user.wishlist.push(product);
      await user.save();
      res.status(201).json({ wishlist: user.wishlist });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Get id of saved recipes
  router.get("/wishlist/ids/:userId", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userId);
      res.status(201).json({ wishlist: user?.wishlist });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // Get wishlist
  router.get("/wishlist/:userId", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userId);
      const wishlist = await ProductModel.find({
        _id: { $in: user.wishlist },
      });
  
      console.log(wishlist);
      res.status(201).json({ wishlist });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// Add product to wishlist
router.post("/wishlist/:userId", async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await UserModel.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if product is already in wishlist to avoid duplicates
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    res.status(200).json({ message: "Product added to wishlist" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/wishlist/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Find the user and remove the productId from their wishlist
    const user = await UserModel.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the product from the wishlist array
    user.wishlist = user.wishlist.filter(item => item.toString() !== productId);
    await user.save();

    res.status(200).json({ message: 'Product removed from wishlist'});
  } catch (error) {
    console.error('Error removing product from wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const categories = await ProductModel.aggregate([
      { $group: { _id: "$category" } },  
      { $project: { category: "$_id", _id: 0 } } 
    ]);

  
    const categoryNames = categories.map(category => category.category);

    
    res.json(categoryNames);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ message: error.message });
  }
});







export { router as ProductRouter };