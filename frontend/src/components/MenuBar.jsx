import React, { useState } from "react";

const categories = [
    {
      name: "Clothes",
      subcategories: [
        {
          title: "Men",
          items: [
            "Cotton Shirt",
            "Formal Shirts",
            "Casual T-Shirts",
            "Jeans",
            "Trousers",
            "Blazers",
            "Jackets",
            "Ethnic Wear",
          ],
        },
        {
          title: "Women",
          items: [
            "All Sarees",
            "Silk Sarees",
            "Banarasi Silk Sarees",
            "Cotton Sarees",
            "Georgette Sarees",
            "Chiffon Sarees",
            "Salwar Kameez",
            "Lehengas",
          ],
        },
      ],
    },
  
    {
      name: "Home Furnishing",
      subcategories: [
        {
          title: "Bed Sheets & Pillow Covers",
          items: [
            "Cotton Bed Sheets",
            "Silk Bed Sheets",
            "Satin Pillow Covers",
            "Printed Bedsheets",
            "Embroidered Bed Covers",
            "Duvet Covers",
            "Quilts",
          ],
        },
        {
          title: "Curtains & Rugs",
          items: [
            "Window Curtains",
            "Door Curtains",
            "Cotton Rugs",
            "Woolen Carpets",
            "Doormats",
          ],
        },
      ],
    },
  
    {
      name: "Jewellery",
      subcategories: [
        {
          title: "Bracelets",
          items: [
            "Gold Bracelets",
            "Silver Bracelets",
            "Diamond Bracelets",
            "Charm Bracelets",
            "Beaded Bracelets",
          ],
        },
        {
          title: "Earrings",
          items: [
            "Stud Earrings",
            "Hoop Earrings",
            "Drop Earrings",
            "Jhumkas",
            "Chandbalis",
          ],
        },
        {
          title: "Watches",
          items: [
            "Analog Watches",
            "Digital Watches",
            "Smartwatches",
            "Luxury Watches",
            "Casual Watches",
          ],
        },
      ],
    },
  ];
  

const MenuBar = () => {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center space-x-6 px-6 py-4 text-center ">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => setOpenCategory(category.name)}
            onMouseLeave={() => setOpenCategory(null)}
          >
            <button className="text-gray-800 font-semibold hover:text-[#3b82f6]">{category.name}</button>
            {category.subcategories && openCategory === category.name && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg p-4 w-80 grid grid-cols-3 gap-6">
                {category.subcategories.map((sub, subIndex) => (
                  <div key={subIndex}>
                    <h3 className="text-[#3b82f6] font-semibold">{sub.title}</h3>
                    <ul className="text-gray-600 text-sm">
                      {sub.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="hover:text-[#3b82f6] cursor-pointer">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default MenuBar;
