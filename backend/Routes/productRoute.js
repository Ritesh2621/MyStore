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
  
  // Get saved recipes
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


export { router as ProductRouter };