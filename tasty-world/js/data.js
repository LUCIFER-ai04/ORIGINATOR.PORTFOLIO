// TasteWorld — Complete Recipe Database
// All images use picsum.photos (reliable) or direct Unsplash photo IDs (stable links)

const recipes = [
  // ========== SOUTH INDIAN ==========
  {
    id: "r1", name: "Chicken Biryani", name_ta: "சிக்கன் பிரியாணி",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.9, prepTime: "60 min", difficulty: "Hard",
    diet: "non-veg", mealType: "lunch", climate: "winter",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
    youtubeId: "F524z0jG614",
    ingredients: [
      { item: "Chicken", qty: 500, unit: "g" },
      { item: "Yogurt", qty: 1, unit: "cup" },
      { item: "Ginger-Garlic Paste", qty: 1.5, unit: "tbsp" },
      { item: "Turmeric Powder", qty: 0.5, unit: "tsp" },
      { item: "Red Chili Powder", qty: 1, unit: "tbsp" },
      { item: "Biryani Masala", qty: 1, unit: "tbsp" },
      { item: "Lemon", qty: 0.5, unit: "pc" },
      { item: "Basmati Rice", qty: 2, unit: "cups" },
      { item: "Onions", qty: 3, unit: "large" },
      { item: "Tomatoes", qty: 2, unit: "medium" },
      { item: "Green Chillies", qty: 2, unit: "pcs" },
      { item: "Ghee", qty: 2, unit: "tbsp" },
      { item: "Oil", qty: 2, unit: "tbsp" },
      { item: "Mint & Coriander", qty: 1, unit: "bunch" },
      { item: "Whole Spices (Cloves, Cinnamon, Cardamom, Bay Leaf)", qty: 1, unit: "set" }
    ],
    steps: [
      {
        step: 1, title: "Marinate Chicken",
        voice: "Let's start by marinating the chicken.",
        instruction: "Add chicken, curd, spices, salt, and lemon juice into a bowl and mix well.",
        ar_overlay: { type: "highlight", target: "bowl", instruction: "Place chicken inside the bowl" },
        timer: 1800, next_trigger: "timer_complete"
      },
      {
        step: 2, title: "Boil Rice",
        voice: "Now let's cook the rice until it is seventy percent done.",
        instruction: "Boil water, add salt and whole spices, then cook soaked basmati rice.",
        ar_overlay: { type: "highlight", target: "stove", instruction: "Boil water in a pot" },
        next_trigger: "user_confirmation"
      },
      {
        step: 3, title: "Fry Onions",
        voice: "Heat oil and fry sliced onions until golden brown.",
        instruction: "Add oil and ghee, then fry onions till golden.",
        ar_overlay: { type: "animation", target: "pan", instruction: "Stir onions continuously" },
        next_trigger: "color_detected"
      },
      {
        step: 4, title: "Prepare Masala",
        voice: "Add spices, green chilies, ginger garlic paste, and tomatoes.",
        instruction: "Cook until tomatoes become soft.",
        ar_overlay: { type: "arrow", target: "pan", instruction: "Add ingredients into pan" },
        next_trigger: "texture_detected"
      },
      {
        step: 5, title: "Cook Chicken",
        voice: "Now add the marinated chicken and cook it.",
        instruction: "Mix well and cook until chicken is almost done.",
        ar_overlay: { type: "highlight", target: "chicken", instruction: "Place marinated chicken into pan" },
        next_trigger: "doneness_detected"
      },
      {
        step: 6, title: "Layering",
        voice: "Let's layer the biryani.",
        instruction: "Spread rice over chicken and add mint, coriander, and ghee.",
        ar_overlay: { type: "layer", target: "pot", instruction: "Add rice as top layer" },
        next_trigger: "user_confirmation"
      },
      {
        step: 7, title: "Dum Cooking",
        voice: "Now cook on low flame for dum.",
        instruction: "Close lid tightly and cook on low heat for 15 to 20 minutes.",
        ar_overlay: { type: "highlight", target: "lid", instruction: "Seal the pot" },
        timer: 1200, next_trigger: "timer_complete"
      },
      {
        step: 8, title: "Rest and Serve",
        voice: "Let it rest before serving.",
        instruction: "Turn off heat, wait 10 minutes, then gently mix and serve.",
        ar_overlay: { type: "text", target: "pot", instruction: "Do not mix immediately" },
        timer: 600, next_trigger: "timer_complete"
      }
    ],
    nutrition: { calories: 550, protein: 35, iron: 4, calcium: 50 }
  },
  {
    id: "r2", name: "Mutton Biryani", name_ta: "மட்டன் பிரியாணி",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.8, prepTime: "90 min", difficulty: "Hard",
    diet: "non-veg", mealType: "lunch", climate: "winter",
    image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=600&q=80",
    youtubeId: "nI0rZf0i-eY",
    ingredients: [
      { item: "Mutton", qty: 500, unit: "g" },
      { item: "Basmati Rice", qty: 2.5, unit: "cups" },
      { item: "Onions", qty: 2, unit: "medium" },
      { item: "Tomatoes", qty: 2, unit: "medium" },
      { item: "Green Chillies", qty: 3, unit: "pcs" },
      { item: "Mint & Coriander", qty: 1, unit: "bunch" },
      { item: "Ginger-Garlic Paste", qty: 2, unit: "tbsp" },
      { item: "Yogurt", qty: 0.5, unit: "cup" },
      { item: "Red Chili Powder", qty: 1, unit: "tsp" },
      { item: "Coriander Powder", qty: 1, unit: "tsp" },
      { item: "Turmeric Powder", qty: 0.5, unit: "tsp" },
      { item: "Whole Spices (Cloves, Cinnamon, Cardamom, Bay Leaf)", qty: 1, unit: "set" },
      { item: "Oil", qty: 2, unit: "tbsp" },
      { item: "Ghee", qty: 2, unit: "tbsp" },
      { item: "Lemon", qty: 0.5, unit: "pc" }
    ],
    steps: [
      "Marinate mutton with yogurt, red chilli powder, turmeric, and half the ginger-garlic paste. Rest for 30 minutes.",
      "Heat oil and ghee in a heavy pot. Add whole spices, then fry onions until deep golden brown.",
      "Add remaining ginger-garlic paste, tomatoes, and green chillies. Cook until oil separates from masala.",
      "Add marinated mutton, cook on high heat 10 min, then simmer until 70% cooked.",
      "Parboil soaked basmati rice with whole spices and salt until 70% done. Drain well.",
      "Layer mutton gravy and parboiled rice. Top with mint, coriander, and a squeeze of lemon.",
      "Drizzle ghee, seal the pot with dough or foil, and dum cook on lowest flame for 30–35 minutes."
    ],
    nutrition: { calories: 620, protein: 40, iron: 6, calcium: 55 },
    suitableFor: ["low-blood"]
  },
  {
    id: "r3", name: "Pongal", name_ta: "பொங்கல்",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.7, prepTime: "30 min", difficulty: "Easy",
    diet: "veg", mealType: "breakfast", isGlutenFree: true, climate: "summer",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&q=80",
    youtubeId: "t8tF5zS_w0U",
    ingredients: [
      { item: "Rice", qty: 1, unit: "cup" },
      { item: "Moong Dal", qty: 0.5, unit: "cup" },
      { item: "Black Pepper", qty: 1, unit: "tsp" },
      { item: "Cumin", qty: 1, unit: "tsp" },
      { item: "Ghee", qty: 3, unit: "tbsp" },
      { item: "Cashews", qty: 10, unit: "pcs" }
    ],
    steps: [
      "Dry roast moong dal until golden and aromatic.",
      "Pressure cook rice and dal together with water (1:4 ratio) until soft and mushy.",
      "Temper ghee with black pepper, cumin, curry leaves, ginger, and cashews.",
      "Pour tempering over the cooked rice-dal mixture. Mix well and serve hot."
    ],
    nutrition: { calories: 380, protein: 12, iron: 3, calcium: 40 },
    suitableFor: ["fever", "cold"]
  },
  {
    id: "r4", name: "Sambar", name_ta: "சாம்பார்",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.6, prepTime: "40 min", difficulty: "Medium",
    diet: "veg", mealType: "lunch", climate: "summer",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&q=80",
    youtubeId: "aJm7G1b3G5M",
    ingredients: [
      { item: "Toor Dal", qty: 1, unit: "cup" },
      { item: "Mixed Vegetables", qty: 2, unit: "cups" },
      { item: "Sambar Powder", qty: 2, unit: "tbsp" },
      { item: "Tamarind", qty: 1, unit: "lemon-sized ball" },
      { item: "Mustard Seeds", qty: 1, unit: "tsp" }
    ],
    steps: [
      "Cook toor dal until soft.",
      "Boil chopped vegetables (drumstick, carrot, brinjal, onion) until tender.",
      "Extract tamarind juice and add to vegetables with sambar powder.",
      "Add cooked dal, simmer 10 min, temper with mustard seeds, curry leaves, and dried chillies."
    ],
    nutrition: { calories: 180, protein: 10, iron: 3, calcium: 55 },
    isWeightLoss: true, climate: "summer", suitableFor: ["low-blood"]
  },
  {
    id: "r5", name: "Dosa", name_ta: "தோசை",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.8, prepTime: "30 min", difficulty: "Medium",
    diet: "veg", mealType: "breakfast", isVegan: true, isGlutenFree: true, climate: "summer",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&q=80",
    youtubeId: "686YJ7Y_V0U",
    ingredients: [
      { item: "Dosa Batter", qty: 2, unit: "cups" },
      { item: "Oil", qty: 2, unit: "tbsp" },
      { item: "Salt", qty: 1, unit: "tsp" }
    ],
    steps: [
      "Heat a flat tawa on medium-high heat.",
      "Pour a ladleful of batter and spread in circular motion.",
      "Drizzle oil around edges, cook until golden and crispy.",
      "Serve with coconut chutney and sambar."
    ],
    nutrition: { calories: 130, protein: 4, iron: 1, calcium: 20 }
  },
  {
    id: "r6", name: "Idli", name_ta: "இட்லி",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.5, prepTime: "20 min", difficulty: "Easy",
    diet: "veg", mealType: "breakfast", isVegan: true, isGlutenFree: true, climate: "summer",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80",
    youtubeId: "lQE88Cqr9m0",
    ingredients: [
      { item: "Idli Batter", qty: 2, unit: "cups" },
      { item: "Salt", qty: 0.5, unit: "tsp" }
    ],
    steps: [
      "Grease idli moulds with oil.",
      "Pour batter into each mould.",
      "Steam for 10-12 minutes until firm.",
      "Serve hot with chutney and sambar."
    ],
    nutrition: { calories: 80, protein: 3, iron: 1, calcium: 15 },
    isWeightLoss: true, climate: "summer", suitableFor: ["fever", "bp"]
  },
  {
    id: "r7", name: "Vada", name_ta: "வடை",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.6, prepTime: "35 min", difficulty: "Medium",
    diet: "veg", mealType: "breakfast",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&q=80",
    youtubeId: "W7fLqTxyhQ4",
    ingredients: [
      { item: "Urad Dal", qty: 1, unit: "cup" },
      { item: "Green Chillies", qty: 3, unit: "pcs" },
      { item: "Curry Leaves", qty: 1, unit: "sprig" },
      { item: "Oil (for frying)", qty: 500, unit: "ml" }
    ],
    steps: [
      "Soak urad dal for 4 hours, then grind into a thick, fluffy batter.",
      "Add chopped green chillies, curry leaves, ginger, and salt.",
      "Shape into donuts with a hole in the center.",
      "Deep fry in hot oil until golden brown and crispy."
    ],
    nutrition: { calories: 170, protein: 6, iron: 2, calcium: 20 }
  },
  {
    id: "r8", name: "Rasam", name_ta: "ரசம்",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.5, prepTime: "20 min", difficulty: "Easy",
    diet: "veg", mealType: "lunch", isVegan: true, isGlutenFree: true, climate: "monsoon",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80",
    youtubeId: "g_S11f3_d8g",
    ingredients: [
      { item: "Tomatoes", qty: 3, unit: "medium" },
      { item: "Tamarind", qty: 1, unit: "small ball" },
      { item: "Rasam Powder", qty: 1.5, unit: "tbsp" },
      { item: "Pepper", qty: 1, unit: "tsp" }
    ],
    steps: [
      "Boil crushed tomatoes with tamarind water.",
      "Add rasam powder, pepper, and salt.",
      "Simmer until frothy.",
      "Temper with mustard seeds and curry leaves."
    ],
    nutrition: { calories: 60, protein: 2, iron: 1, calcium: 15 },
    isWeightLoss: true, climate: "monsoon", suitableFor: ["fever", "cold"]
  },
  {
    id: "r9", name: "Curd Rice", name_ta: "தயிர் சாதம்",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.4, prepTime: "15 min", difficulty: "Easy",
    diet: "veg", mealType: "lunch",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80",
    youtubeId: "p2eKYH3jTBE",
    ingredients: [
      { item: "Cooked Rice", qty: 2, unit: "cups" },
      { item: "Yogurt", qty: 1.5, unit: "cups" },
      { item: "Mustard Seeds", qty: 0.5, unit: "tsp" },
      { item: "Green Chilli", qty: 1, unit: "pc" }
    ],
    steps: [
      "Mash cooked rice while warm.",
      "Mix in fresh yogurt and salt.",
      "Temper with mustard seeds, urad dal, curry leaves, and green chilli.",
      "Mix and serve chilled or at room temperature."
    ],
    nutrition: { calories: 220, protein: 7, iron: 1, calcium: 120 }
  },
  // ========== NORTH INDIAN ==========
  {
    id: "r10", name: "Paneer Butter Masala", name_ta: "பன்னீர் பட்டர் மசாலா",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.8, prepTime: "40 min", difficulty: "Medium",
    diet: "veg", mealType: "dinner",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?w=600&q=80",
    youtubeId: "F8K8G-s2C3s",
    ingredients: [
      { item: "Paneer", qty: 400, unit: "g" },
      { item: "Tomato Puree", qty: 1, unit: "cup" },
      { item: "Butter", qty: 3, unit: "tbsp" },
      { item: "Fresh Cream", qty: 4, unit: "tbsp" },
      { item: "Kashmiri Chilli", qty: 1, unit: "tsp" },
      { item: "Cashew Paste", qty: 2, unit: "tbsp" }
    ],
    steps: [
      "Sauté tomatoes, cashews, and aromatics. Blend into a smooth paste.",
      "Heat butter, add the paste, kashmiri chilli, and spices. Simmer 10 min.",
      "Add cubed paneer and cook for 5 minutes.",
      "Finish with fresh cream, garnish with coriander. Serve with paratha."
    ],
    nutrition: { calories: 420, protein: 18, iron: 2, calcium: 300 }
  },
  {
    id: "r11", name: "Chapati", name_ta: "சப்பாத்தி",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.3, prepTime: "25 min", difficulty: "Easy",
    diet: "veg", mealType: "dinner", climate: "winter",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
    youtubeId: "8h2bpLbFbCU",
    ingredients: [
      { item: "Whole Wheat Flour", qty: 2, unit: "cups" },
      { item: "Water", qty: 0.75, unit: "cup" },
      { item: "Salt", qty: 0.5, unit: "tsp" },
      { item: "Ghee", qty: 1, unit: "tbsp" }
    ],
    steps: [
      "Mix flour, salt, and water to form a soft dough. Rest 15 min.",
      "Divide into balls and roll into thin circles.",
      "Cook on hot tawa until bubbles appear, flip and press to puff.",
      "Brush with ghee and serve."
    ],
    nutrition: { calories: 120, protein: 4, iron: 2, calcium: 15 }
  },
  {
    id: "r13", name: "Aloo Paratha", name_ta: "உருளைக்கிழங்கு பரோட்டா",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.7, prepTime: "35 min", difficulty: "Medium",
    diet: "veg", mealType: "breakfast", climate: "monsoon",
    image: "https://images.unsplash.com/photo-1604882355311-20aaafac2e6a?w=600&q=80",
    youtubeId: "oVhqFBZVFXM",
    ingredients: [
      { item: "Whole Wheat Flour", qty: 2, unit: "cups" },
      { item: "Potatoes (boiled)", qty: 3, unit: "medium" },
      { item: "Green Chillies", qty: 2, unit: "pcs" },
      { item: "Ghee", qty: 3, unit: "tbsp" }
    ],
    steps: [
      "Mash boiled potatoes with green chillies, coriander, and spices.",
      "Make dough from flour and water. Divide into balls.",
      "Stuff each dough ball with potato filling, roll out gently.",
      "Cook on tawa with ghee until golden on both sides."
    ],
    nutrition: { calories: 310, protein: 8, iron: 3, calcium: 25 }
  },
  {
    id: "r14", name: "Chole Bhature", name_ta: "சோலே பட்டூரே",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.8, prepTime: "50 min", difficulty: "Hard",
    diet: "veg", mealType: "lunch", climate: "monsoon",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&q=80",
    youtubeId: "m_5F-nQ4wB8",
    ingredients: [
      { item: "Chickpeas (soaked)", qty: 2, unit: "cups" },
      { item: "All Purpose Flour", qty: 2, unit: "cups" },
      { item: "Onions", qty: 2, unit: "medium" },
      { item: "Chole Masala", qty: 2, unit: "tbsp" }
    ],
    steps: [
      "Pressure cook chickpeas until tender.",
      "Sauté onions, tomatoes, ginger-garlic. Add chole masala and chickpeas.",
      "Simmer until gravy thickens.",
      "Make soft bhature dough, roll and deep fry until puffed."
    ],
    nutrition: { calories: 480, protein: 18, iron: 5, calcium: 60 }
  },
  {
    id: "r15", name: "Parotta", name_ta: "பரோட்டா",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.6, prepTime: "50 min", difficulty: "Hard",
    diet: "veg", mealType: "dinner", climate: "winter",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=80",
    youtubeId: "EHxCMlkXpSE",
    ingredients: [
      { item: "All Purpose Flour", qty: 3, unit: "cups" },
      { item: "Egg", qty: 1, unit: "pc" },
      { item: "Oil", qty: 4, unit: "tbsp" },
      { item: "Sugar", qty: 1, unit: "tsp" }
    ],
    steps: [
      "Knead dough with flour, egg, oil, sugar, and water until elastic.",
      "Rest the dough for 1 hour.",
      "Divide into balls, stretch thin like a rope, coil into spiral.",
      "Flatten gently, cook on hot tawa with oil until layered and golden."
    ],
    nutrition: { calories: 340, protein: 8, iron: 2, calcium: 20 }
  },
  {
    id: "r16", name: "Chicken Gravy", name_ta: "சிக்கன் கிரேவி",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.7, prepTime: "45 min", difficulty: "Medium",
    diet: "non-veg", mealType: "dinner", climate: "monsoon",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80",
    youtubeId: "MXV7ckoMJuY",
    ingredients: [
      { item: "Chicken", qty: 500, unit: "g" },
      { item: "Onions", qty: 3, unit: "medium" },
      { item: "Tomatoes", qty: 2, unit: "medium" },
      { item: "Ginger-Garlic Paste", qty: 1.5, unit: "tbsp" },
      { item: "Red Chilli Powder", qty: 1.5, unit: "tsp" }
    ],
    steps: [
      "Fry sliced onions until brown.",
      "Add ginger-garlic paste, tomatoes, and cook until oil separates.",
      "Add chicken pieces and all spices, mix well.",
      "Add water, cover and cook on medium heat for 25 minutes.",
      "Garnish with coriander leaves."
    ],
    nutrition: { calories: 380, protein: 32, iron: 3, calcium: 35 }
  },
  {
    id: "r17", name: "Chicken Grill", name_ta: "சிக்கன் கிரில்",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.8, prepTime: "60 min", difficulty: "Medium",
    diet: "non-veg", mealType: "dinner", climate: "winter",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80",
    youtubeId: "V4fHROoN3kA",
    ingredients: [
      { item: "Whole Chicken", qty: 1, unit: "kg" },
      { item: "Yogurt", qty: 1, unit: "cup" },
      { item: "Tandoori Masala", qty: 2, unit: "tbsp" },
      { item: "Lemon Juice", qty: 2, unit: "tbsp" }
    ],
    steps: [
      "Marinate chicken with yogurt, tandoori masala, lemon juice, salt for 2 hours.",
      "Preheat oven to 200°C.",
      "Place chicken on grill rack and bake for 40 minutes, basting occasionally.",
      "Serve with mint chutney and onion rings."
    ],
    nutrition: { calories: 320, protein: 42, iron: 3, calcium: 40 }
  },
  {
    id: "r18", name: "Mutton Gravy", name_ta: "மட்டன் கிரேவி",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.9, prepTime: "75 min", difficulty: "Hard",
    diet: "non-veg", mealType: "dinner", climate: "winter",
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80",
    youtubeId: "TrBnWGgVTd0",
    ingredients: [
      { item: "Mutton", qty: 500, unit: "g" },
      { item: "Onions", qty: 3, unit: "large" },
      { item: "Tomatoes", qty: 2, unit: "medium" },
      { item: "Fennel Seeds", qty: 1, unit: "tsp" },
      { item: "Coconut Milk", qty: 0.5, unit: "cup" }
    ],
    steps: [
      "Pressure cook mutton with turmeric and salt for 4 whistles.",
      "Sauté onions, ginger-garlic paste until golden.",
      "Add tomatoes, all spices, and cook until oil separates.",
      "Add mutton with stock, simmer 20 min. Finish with coconut milk."
    ],
    nutrition: { calories: 450, protein: 38, iron: 6, calcium: 45 }
  },
  {
    id: "r19", name: "Egg Gravy", name_ta: "முட்டை கிரேவி",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.5, prepTime: "25 min", difficulty: "Easy",
    diet: "non-veg", mealType: "lunch", climate: "monsoon",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=80",
    youtubeId: "GQPCXhNb1i0",
    ingredients: [
      { item: "Eggs (boiled)", qty: 6, unit: "pcs" },
      { item: "Onions", qty: 2, unit: "medium" },
      { item: "Tomatoes", qty: 2, unit: "medium" },
      { item: "Red Chilli Powder", qty: 1, unit: "tsp" }
    ],
    steps: [
      "Boil eggs, peel, and slit them.",
      "Sauté onions and tomatoes with spices until thick gravy forms.",
      "Add boiled eggs to the gravy, simmer 5 min.",
      "Garnish with curry leaves and serve with rice."
    ],
    nutrition: { calories: 220, protein: 16, iron: 2, calcium: 60 }
  },
  {
    id: "r20", name: "Egg Rice", name_ta: "முட்டை சாதம்",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.4, prepTime: "20 min", difficulty: "Easy",
    diet: "non-veg", mealType: "lunch", climate: "summer",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
    youtubeId: "Jlx5RmAiDks",
    ingredients: [
      { item: "Cooked Rice", qty: 3, unit: "cups" },
      { item: "Eggs", qty: 3, unit: "pcs" },
      { item: "Onion", qty: 1, unit: "medium" },
      { item: "Soy Sauce", qty: 1, unit: "tbsp" }
    ],
    steps: [
      "Scramble eggs in hot oil with salt.",
      "Sauté onions and green chillies.",
      "Add cooked rice, soy sauce, and toss well on high heat.",
      "Mix in scrambled eggs and serve."
    ],
    nutrition: { calories: 350, protein: 14, iron: 2, calcium: 40 }
  },
  // ========== CHINESE ==========
  {
    id: "r21", name: "Chicken Fried Rice", name_ta: "சிக்கன் பிரைட் ரைஸ்",
    cuisine: "Chinese", flag: "🇨🇳", rating: 4.6, prepTime: "20 min", difficulty: "Easy",
    diet: "non-veg", mealType: "dinner",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80",
    youtubeId: "o0N6mP3g6_U",
    ingredients: [
      { item: "Cooked Rice (Cold)", qty: 2, unit: "cups" },
      { item: "Chicken Breast", qty: 200, unit: "g" },
      { item: "Eggs", qty: 2, unit: "large" },
      { item: "Soy Sauce", qty: 2, unit: "tbsp" },
      { item: "Spring Onion", qty: 3, unit: "stalks" }
    ],
    steps: [
      "Scramble eggs in a hot wok and set aside.",
      "Stir-fry diced chicken until cooked through.",
      "Add minced garlic, vegetables, cold rice, and soy sauce. Toss on high heat.",
      "Mix eggs back in, garnish with spring onions."
    ],
    nutrition: { calories: 450, protein: 28, iron: 2, calcium: 40 }
  },
  {
    id: "r22", name: "Veg Noodles", name_ta: "வெஜ் நூடுல்ஸ்",
    cuisine: "Chinese", flag: "🇨🇳", rating: 4.5, prepTime: "20 min", difficulty: "Easy",
    diet: "veg", mealType: "dinner",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
    youtubeId: "3xoFKHvQUMg",
    ingredients: [
      { item: "Noodles", qty: 200, unit: "g" },
      { item: "Bell Peppers", qty: 1, unit: "cup" },
      { item: "Carrots", qty: 1, unit: "medium" },
      { item: "Soy Sauce", qty: 2, unit: "tbsp" }
    ],
    steps: [
      "Boil noodles until al dente, drain and toss with oil.",
      "Stir-fry julienned vegetables on high heat.",
      "Add noodles, soy sauce, vinegar, and chilli sauce.",
      "Toss well and serve hot."
    ],
    nutrition: { calories: 320, protein: 10, iron: 2, calcium: 30 }
  },
  {
    id: "r23", name: "Gobi Manchurian", name_ta: "கோபி மஞ்சூரியன்",
    cuisine: "Chinese", flag: "🇨🇳", rating: 4.6, prepTime: "35 min", difficulty: "Medium",
    diet: "veg", mealType: "snack",
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=600&q=80",
    youtubeId: "T6vFgfnCF6s",
    ingredients: [
      { item: "Cauliflower", qty: 1, unit: "medium head" },
      { item: "Corn Flour", qty: 3, unit: "tbsp" },
      { item: "Soy Sauce", qty: 2, unit: "tbsp" },
      { item: "Garlic", qty: 6, unit: "cloves" }
    ],
    steps: [
      "Cut cauliflower into florets, dip in batter (corn flour, flour, salt, water).",
      "Deep fry until golden and crispy.",
      "Sauté garlic, chilli, spring onion. Add sauces.",
      "Toss fried cauliflower in the sauce. Serve as dry or gravy."
    ],
    nutrition: { calories: 250, protein: 6, iron: 2, calcium: 35 }
  },
  {
    id: "r24", name: "Spring Rolls", name_ta: "ஸ்பிரிங் ரோல்ஸ்",
    cuisine: "Chinese", flag: "🇨🇳", rating: 4.5, prepTime: "40 min", difficulty: "Medium",
    diet: "veg", mealType: "snack",
    image: "https://images.unsplash.com/photo-1548340748-6d2b7d7da280?w=600&q=80",
    youtubeId: "_PtQDcO7_NI",
    ingredients: [
      { item: "Spring Roll Sheets", qty: 10, unit: "pcs" },
      { item: "Cabbage (shredded)", qty: 1, unit: "cup" },
      { item: "Carrots (julienned)", qty: 1, unit: "cup" },
      { item: "Soy Sauce", qty: 1, unit: "tbsp" }
    ],
    steps: [
      "Stir-fry shredded cabbage, carrots, and beans with soy sauce.",
      "Place filling on spring roll sheet, fold and seal with flour paste.",
      "Deep fry until golden and crispy.",
      "Serve with sweet chilli sauce."
    ],
    nutrition: { calories: 180, protein: 4, iron: 1, calcium: 20 }
  },
  // ========== KOREAN ==========
  {
    id: "r25", name: "Bibimbap", name_ta: "பிபிம்பாப்",
    cuisine: "Korean", flag: "🇰🇷", rating: 4.7, prepTime: "40 min", difficulty: "Medium",
    diet: "non-veg", mealType: "lunch",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=600&q=80",
    youtubeId: "eTucCw1w6Ak", // Kimchi process related
    ingredients: [
      { item: "Rice", qty: 2, unit: "cups" },
      { item: "Ground Beef", qty: 150, unit: "g" },
      { item: "Spinach", qty: 1, unit: "cup" },
      { item: "Gochujang", qty: 2, unit: "tbsp" },
      { item: "Egg", qty: 1, unit: "pc" },
      { item: "Sesame Oil", qty: 1, unit: "tbsp" }
    ],
    steps: [
      "Cook rice. Prepare each vegetable topping separately (spinach, carrots, bean sprouts).",
      "Cook seasoned ground beef.",
      "Arrange rice in bowl, place toppings and beef around.",
      "Top with a fried egg and gochujang. Mix before eating."
    ],
    nutrition: { calories: 480, protein: 22, iron: 4, calcium: 60 }
  },
  {
    id: "r26", name: "Tteokbokki", name_ta: "டோக்போக்கி",
    cuisine: "Korean", flag: "🇰🇷", rating: 4.7, prepTime: "25 min", difficulty: "Easy",
    diet: "veg", mealType: "snack",
    image: "https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=600&q=80",
    youtubeId: "LpAiP3oxnQI",
    ingredients: [
      { item: "Rice Cakes", qty: 300, unit: "g" },
      { item: "Gochujang", qty: 2, unit: "tbsp" },
      { item: "Sugar", qty: 1, unit: "tbsp" },
      { item: "Green Onion", qty: 2, unit: "stalks" }
    ],
    steps: [
      "Separate rice cakes if stuck together.",
      "Boil 2 cups of water or anchovy broth.",
      "Add gochujang, sugar, soy sauce, and gochugaru. Stir well.",
      "Add rice cakes and simmer until sauce thickens and cakes are chewy."
    ],
    nutrition: { calories: 350, protein: 8, iron: 1, calcium: 40 }
  },
  {
    id: "r27", name: "Korean Ramen", name_ta: "கொரியன் ராமென்",
    cuisine: "Korean", flag: "🇰🇷", rating: 4.6, prepTime: "15 min", difficulty: "Easy",
    diet: "non-veg", mealType: "dinner",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
    youtubeId: "qCRf3R6X4VE",
    ingredients: [
      { item: "Ramen Noodles", qty: 1, unit: "packet" },
      { item: "Egg", qty: 1, unit: "pc" },
      { item: "Spring Onion", qty: 2, unit: "stalks" },
      { item: "Kimchi", qty: 0.5, unit: "cup" }
    ],
    steps: [
      "Boil water and add ramen with seasoning packet.",
      "Cook for 3 minutes.",
      "Crack an egg into the boiling broth.",
      "Top with sliced spring onion and kimchi."
    ],
    nutrition: { calories: 400, protein: 12, iron: 3, calcium: 30 }
  },
  // ========== ITALIAN ==========
  {
    id: "r28", name: "Margherita Pizza", name_ta: "மார்கரிட்டா பிஸ்ஸா",
    cuisine: "Italian", flag: "🇮🇹", rating: 4.8, prepTime: "90 min", difficulty: "Medium",
    diet: "veg", mealType: "dinner",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
    youtubeId: "xKDnD8sJsuY",
    ingredients: [
      { item: "Pizza Dough", qty: 1, unit: "ball" },
      { item: "San Marzano Tomatoes", qty: 1, unit: "can" },
      { item: "Fresh Mozzarella", qty: 150, unit: "g" },
      { item: "Fresh Basil", qty: 1, unit: "handful" },
      { item: "Olive Oil", qty: 1, unit: "tbsp" }
    ],
    steps: [
      "Stretch pizza dough on floured surface into a circle.",
      "Crush tomatoes by hand and spread on dough.",
      "Tear mozzarella and place evenly. Drizzle olive oil.",
      "Bake at 250°C (or highest temp) for 8-10 min. Top with fresh basil."
    ],
    nutrition: { calories: 800, protein: 30, iron: 3, calcium: 350 }
  },
  {
    id: "r29", name: "Pasta Carbonara", name_ta: "பாஸ்தா கார்போனாரா",
    cuisine: "Italian", flag: "🇮🇹", rating: 4.7, prepTime: "25 min", difficulty: "Medium",
    diet: "non-veg", mealType: "dinner",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80",
    youtubeId: "3AAdqT1_v6Q",
    ingredients: [
      { item: "Spaghetti", qty: 200, unit: "g" },
      { item: "Pancetta", qty: 150, unit: "g" },
      { item: "Eggs", qty: 3, unit: "pcs" },
      { item: "Parmesan", qty: 0.5, unit: "cup" },
      { item: "Black Pepper", qty: 1, unit: "tsp" }
    ],
    steps: [
      "Cook spaghetti in salted boiling water until al dente.",
      "Fry pancetta until crispy.",
      "Whisk eggs with parmesan and pepper.",
      "Toss hot pasta with pancetta, remove from heat, add egg mixture. Stir quickly."
    ],
    nutrition: { calories: 520, protein: 24, iron: 3, calcium: 200 }
  },
  {
    id: "r30", name: "Risotto", name_ta: "ரிசோட்டோ",
    cuisine: "Italian", flag: "🇮🇹", rating: 4.6, prepTime: "45 min", difficulty: "Hard",
    diet: "veg", mealType: "dinner",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80",
    youtubeId: "VkIw9mQaHxU",
    ingredients: [
      { item: "Arborio Rice", qty: 1.5, unit: "cups" },
      { item: "Vegetable Broth", qty: 4, unit: "cups" },
      { item: "Parmesan", qty: 0.5, unit: "cup" },
      { item: "Butter", qty: 2, unit: "tbsp" },
      { item: "White Wine", qty: 0.5, unit: "cup" }
    ],
    steps: [
      "Sauté onion in butter until translucent.",
      "Add rice and toast for 2 min. Pour in wine.",
      "Add warm broth one ladle at a time, stirring constantly.",
      "When creamy and al dente, stir in parmesan and butter."
    ],
    nutrition: { calories: 420, protein: 12, iron: 2, calcium: 180 }
  },
  // ========== DESSERTS ==========
  {
    id: "r31", name: "Gulab Jamun", name_ta: "குலாப் ஜாமுன்",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.9, prepTime: "40 min", difficulty: "Medium",
    diet: "veg", mealType: "snack",
    image: "https://images.unsplash.com/photo-1666190050695-a4e8872f8147?w=600&q=80",
    youtubeId: "NH1yqSEpJLY",
    ingredients: [
      { item: "Milk Powder", qty: 1, unit: "cup" },
      { item: "All Purpose Flour", qty: 2, unit: "tbsp" },
      { item: "Ghee", qty: 1, unit: "tbsp" },
      { item: "Sugar", qty: 1.5, unit: "cups" },
      { item: "Cardamom", qty: 3, unit: "pcs" }
    ],
    steps: [
      "Mix milk powder, flour, and ghee. Add milk little by little to form soft dough.",
      "Shape into smooth balls without cracks.",
      "Deep fry on low heat until dark golden brown.",
      "Soak in warm sugar syrup flavored with cardamom for 30 min."
    ],
    nutrition: { calories: 300, protein: 5, iron: 1, calcium: 80 }
  },
  {
    id: "r32", name: "Payasam", name_ta: "பாயசம்",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.7, prepTime: "35 min", difficulty: "Easy",
    diet: "veg", mealType: "snack",
    image: "https://images.unsplash.com/photo-1571006273096-7f26b7d5dd80?w=600&q=80",
    youtubeId: "JcKB8_vKNKc",
    ingredients: [
      { item: "Vermicelli", qty: 0.5, unit: "cup" },
      { item: "Full Fat Milk", qty: 1, unit: "litre" },
      { item: "Sugar", qty: 0.5, unit: "cup" },
      { item: "Cashews", qty: 10, unit: "pcs" },
      { item: "Cardamom", qty: 2, unit: "pcs" }
    ],
    steps: [
      "Fry vermicelli in ghee until golden.",
      "Boil milk and add fried vermicelli.",
      "Simmer until vermicelli is cooked and milk thickens.",
      "Add sugar, cardamom, and fried cashews. Serve warm or chilled."
    ],
    nutrition: { calories: 280, protein: 8, iron: 1, calcium: 200 }
  },
  {
    id: "r33", name: "Halwa", name_ta: "அல்வா",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.6, prepTime: "30 min", difficulty: "Easy",
    diet: "veg", mealType: "snack",
    image: "https://images.unsplash.com/photo-1605197161470-5f3e2e12c1d5?w=600&q=80",
    youtubeId: "S2NLfhPSbEs",
    ingredients: [
      { item: "Semolina", qty: 1, unit: "cup" },
      { item: "Sugar", qty: 0.75, unit: "cup" },
      { item: "Ghee", qty: 0.25, unit: "cup" },
      { item: "Water", qty: 2, unit: "cups" }
    ],
    steps: [
      "Roast semolina in ghee until golden and fragrant.",
      "Boil water with sugar to make syrup.",
      "Carefully add sugar syrup to roasted rava. Stir vigorously.",
      "Cook until mixture leaves sides of pan. Garnish with nuts."
    ],
    nutrition: { calories: 320, protein: 4, iron: 1, calcium: 25 }
  },
  // ========== BEVERAGES ==========
  {
    id: "r34", name: "Masala Chai", name_ta: "மசாலா தேநீர்",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.8, prepTime: "10 min", difficulty: "Easy",
    diet: "veg", mealType: "drink", climate: "winter",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80",
    youtubeId: "tQ75jY8nJ-Y",
    ingredients: [
      { item: "Tea Leaves", qty: 2, unit: "tsp" },
      { item: "Milk", qty: 1, unit: "cup" },
      { item: "Ginger", qty: 1, unit: "small piece" },
      { item: "Cardamom", qty: 2, unit: "pcs" },
      { item: "Sugar", qty: 2, unit: "tsp" }
    ],
    steps: [
      "Boil water with crushed ginger and cardamom.",
      "Add tea leaves and simmer 2 minutes.",
      "Pour in milk and bring to a rolling boil.",
      "Strain, add sugar, serve piping hot."
    ],
    nutrition: { calories: 80, protein: 3, iron: 1, calcium: 100 },
    suitableFor: ["cold"]
  },
  {
    id: "r35", name: "Mango Lassi", name_ta: "மாம்பழ லஸ்ஸி",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.7, prepTime: "5 min", difficulty: "Easy",
    diet: "veg", mealType: "drink", climate: "summer",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&q=80",
    youtubeId: "8l1u0r0pL_o",
    ingredients: [
      { item: "Mango Pulp", qty: 1, unit: "cup" },
      { item: "Yogurt", qty: 1, unit: "cup" },
      { item: "Sugar", qty: 2, unit: "tbsp" },
      { item: "Ice", qty: 4, unit: "cubes" }
    ],
    steps: [
      "Blend mango pulp, yogurt, sugar, and ice until smooth.",
      "Pour into a tall glass.",
      "Garnish with a pinch of cardamom.",
      "Serve immediately chilled."
    ],
    nutrition: { calories: 180, protein: 5, iron: 0, calcium: 150 }
  },
  {
    id: "r36", name: "Filter Coffee", name_ta: "ஃபில்டர் காபி",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.9, prepTime: "10 min", difficulty: "Easy",
    diet: "veg", mealType: "drink", climate: "summer",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600&q=80",
    youtubeId: "xwNVjleLFqQ",
    ingredients: [
      { item: "Filter Coffee Powder", qty: 2, unit: "tbsp" },
      { item: "Boiling Water", qty: 0.5, unit: "cup" },
      { item: "Milk (hot)", qty: 0.75, unit: "cup" },
      { item: "Sugar", qty: 2, unit: "tsp" }
    ],
    steps: [
      "Put coffee powder in filter, press with plunger.",
      "Pour boiling water and wait 10-15 min for decoction to drip.",
      "Take 2 tbsp of strong decoction in a tumbler.",
      "Add hot frothed milk and sugar. Pour between tumbler and davara to froth."
    ],
    nutrition: { calories: 50, protein: 2, iron: 0, calcium: 80 }
  },
  {
    id: "r37", name: "Virgin Mojito", name_ta: "வெர்ஜின் மொஹிடோ",
    cuisine: "Continental", flag: "🌍", rating: 4.5, prepTime: "5 min", difficulty: "Easy",
    diet: "veg", mealType: "drink", climate: "summer",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80",
    youtubeId: "QBtnFi8-oKs",
    ingredients: [
      { item: "Limes", qty: 2, unit: "pcs" },
      { item: "Mint Leaves", qty: 10, unit: "leaves" },
      { item: "Sugar", qty: 2, unit: "tsp" },
      { item: "Soda Water", qty: 1, unit: "cup" },
      { item: "Ice", qty: 6, unit: "cubes" }
    ],
    steps: [
      "Muddle lime wedges, mint leaves, and sugar in a glass.",
      "Fill with ice cubes.",
      "Top with soda water, stir gently.",
      "Garnish with a sprig of mint."
    ],
    nutrition: { calories: 40, protein: 0, iron: 0, calcium: 10 }
  },
  // ========== CONTINENTAL ==========
  {
    id: "r38", name: "Caesar Salad", name_ta: "சீசர் சாலட்",
    cuisine: "Continental", flag: "🌍", rating: 4.4, prepTime: "15 min", difficulty: "Easy",
    diet: "non-veg", mealType: "lunch",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=80",
    youtubeId: "bJUiWdM__Qw",
    ingredients: [
      { item: "Romaine Lettuce", qty: 1, unit: "head" },
      { item: "Croutons", qty: 1, unit: "cup" },
      { item: "Parmesan", qty: 0.25, unit: "cup" },
      { item: "Caesar Dressing", qty: 3, unit: "tbsp" }
    ],
    steps: [
      "Wash and chop romaine lettuce.",
      "Toss with caesar dressing.",
      "Add croutons and shaved parmesan.",
      "Serve immediately."
    ],
    nutrition: { calories: 220, protein: 8, iron: 2, calcium: 120 },
    isWeightLoss: true, suitableFor: ["bp"]
  },
  {
    id: "r39", name: "Grilled Sandwich", name_ta: "கிரில்ட் சாண்ட்விச்",
    cuisine: "Continental", flag: "🌍", rating: 4.5, prepTime: "15 min", difficulty: "Easy",
    diet: "veg", mealType: "breakfast",
    image: "https://images.unsplash.com/photo-1573088034025-50fa9bc7370f?w=600&q=80",
    youtubeId: "0S78G34-r2g",
    ingredients: [
      { item: "Bread Slices", qty: 4, unit: "pcs" },
      { item: "Cheese", qty: 2, unit: "slices" },
      { item: "Tomato", qty: 1, unit: "medium" },
      { item: "Butter", qty: 2, unit: "tbsp" }
    ],
    steps: [
      "Butter bread slices on one side.",
      "Layer cheese, tomato, and onion between slices.",
      "Grill on sandwich maker or tawa until golden and cheese melts.",
      "Cut diagonally and serve with ketchup."
    ],
    nutrition: { calories: 350, protein: 12, iron: 2, calcium: 150 }
  },
  {
    id: "r40", name: "Ice Cream Sundae", name_ta: "ஐஸ் க்ரீம் சண்டே",
    cuisine: "Continental", flag: "🌍", rating: 4.6, prepTime: "10 min", difficulty: "Easy",
    diet: "veg", mealType: "snack",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80",
    youtubeId: "1JMsJvGGBio",
    ingredients: [
      { item: "Vanilla Ice Cream", qty: 3, unit: "scoops" },
      { item: "Chocolate Sauce", qty: 2, unit: "tbsp" },
      { item: "Whipped Cream", qty: 2, unit: "tbsp" },
      { item: "Cherry", qty: 1, unit: "pc" }
    ],
    steps: [
      "Place ice cream scoops in a sundae glass.",
      "Drizzle chocolate sauce generously.",
      "Top with whipped cream.",
      "Place a cherry on top and serve immediately."
    ],
    nutrition: { calories: 400, protein: 6, iron: 1, calcium: 150 }
  },
  // ========== More Indian ==========
  {
    id: "r41", name: "Roti", name_ta: "ரொட்டி",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.3, prepTime: "20 min", difficulty: "Easy",
    diet: "veg", mealType: "dinner",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
    youtubeId: "8h2bpLbFbCU",
    ingredients: [
      { item: "Whole Wheat Flour", qty: 2, unit: "cups" },
      { item: "Water", qty: 0.75, unit: "cup" },
      { item: "Salt", qty: 0.5, unit: "tsp" }
    ],
    steps: [
      "Knead flour, water, and salt into soft dough.",
      "Divide into equal portions and roll thin.",
      "Cook on hot tawa until light brown spots appear on both sides.",
      "Serve warm with dal or sabzi."
    ],
    nutrition: { calories: 110, protein: 4, iron: 2, calcium: 15 }
  },
  {
    id: "r42", name: "Paneer Masala", name_ta: "பன்னீர் மசாலா",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.7, prepTime: "35 min", difficulty: "Medium",
    diet: "veg", mealType: "dinner",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?w=600&q=80",
    youtubeId: "W3HuKxGgbsw",
    ingredients: [
      { item: "Paneer", qty: 300, unit: "g" },
      { item: "Tomatoes", qty: 3, unit: "medium" },
      { item: "Onions", qty: 2, unit: "medium" },
      { item: "Garam Masala", qty: 1, unit: "tsp" }
    ],
    steps: [
      "Sauté onions until translucent, add tomato puree.",
      "Cook until oil separates, add all spices.",
      "Add cubed paneer and simmer for 10 minutes.",
      "Garnish with coriander and serve."
    ],
    nutrition: { calories: 380, protein: 20, iron: 2, calcium: 350 }
  },
  // ========== More diverse ==========
  {
    id: "r43", name: "Butter Chicken", name_ta: "பட்டர் சிக்கன்",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.9, prepTime: "50 min", difficulty: "Medium",
    diet: "non-veg", mealType: "dinner",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80",
    youtubeId: "RKNogWbAivY",
    ingredients: [
      { item: "Chicken", qty: 500, unit: "g" },
      { item: "Tomato Puree", qty: 1.5, unit: "cups" },
      { item: "Butter", qty: 4, unit: "tbsp" },
      { item: "Cream", qty: 0.5, unit: "cup" },
      { item: "Kasuri Methi", qty: 1, unit: "tbsp" }
    ],
    steps: [
      "Marinate chicken in yogurt and spices, grill or pan-fry.",
      "Make gravy: cook tomato puree with butter, cashew paste, and spices.",
      "Add grilled chicken to the gravy, simmer 15 min.",
      "Finish with cream and kasuri methi."
    ],
    nutrition: { calories: 480, protein: 35, iron: 3, calcium: 60 }
  },
  {
    id: "r44", name: "Fish Curry", name_ta: "மீன் குழம்பு",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.6, prepTime: "35 min", difficulty: "Medium",
    diet: "non-veg", mealType: "lunch",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
    youtubeId: "ySyNBXCPmaY",
    ingredients: [
      { item: "Fish Pieces", qty: 500, unit: "g" },
      { item: "Coconut Milk", qty: 1, unit: "cup" },
      { item: "Tamarind", qty: 1, unit: "small ball" },
      { item: "Red Chilli Powder", qty: 1.5, unit: "tsp" }
    ],
    steps: [
      "Marinate fish with turmeric, chili powder, and salt.",
      "Sauté onions, curry leaves, and spices.",
      "Add tamarind water and bring to boil.",
      "Gently add fish, pour coconut milk, and simmer on low."
    ],
    nutrition: { calories: 300, protein: 30, iron: 2, calcium: 50 }
  },
  {
    id: "r45", name: "Mushroom Pepper Fry", name_ta: "காளான் மிளகு வறுவல்",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.5, prepTime: "20 min", difficulty: "Easy",
    diet: "veg", mealType: "dinner",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80",
    youtubeId: "0S78G34-r2g",
    ingredients: [
      { item: "Mushrooms", qty: 250, unit: "g" },
      { item: "Black Pepper (crushed)", qty: 1, unit: "tbsp" },
      { item: "Onion", qty: 1, unit: "medium" },
      { item: "Curry Leaves", qty: 1, unit: "sprig" }
    ],
    steps: [
      "Clean and halve mushrooms.",
      "Sauté onions, curry leaves, and green chilli.",
      "Add mushrooms and toss on high heat.",
      "Season with crushed pepper, salt, and serve hot."
    ],
    nutrition: { calories: 120, protein: 6, iron: 2, calcium: 10 }
  },
  {
    id: "r46", name: "Chicken 65", name_ta: "சிக்கன் 65",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.8, prepTime: "30 min", difficulty: "Medium",
    diet: "non-veg", mealType: "snack",
    image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=600&q=80",
    youtubeId: "KR8OvBCeysg",
    ingredients: [
      { item: "Chicken (boneless)", qty: 500, unit: "g" },
      { item: "Corn Flour", qty: 2, unit: "tbsp" },
      { item: "Red Chilli Powder", qty: 2, unit: "tsp" },
      { item: "Yogurt", qty: 2, unit: "tbsp" },
      { item: "Curry Leaves", qty: 2, unit: "sprigs" }
    ],
    steps: [
      "Marinate chicken with yogurt, corn flour, chilli powder, ginger-garlic paste for 30 min.",
      "Deep fry in batches until crispy and deep red.",
      "In a pan, temper curry leaves and green chillies.",
      "Toss fried chicken in the tempering, serve immediately."
    ],
    nutrition: { calories: 350, protein: 30, iron: 2, calcium: 30 }
  },
  {
    id: "r47", name: "Lemon Rice", name_ta: "எலுமிச்சை சாதம்",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.4, prepTime: "15 min", difficulty: "Easy",
    diet: "veg", mealType: "lunch",
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=600&q=80",
    youtubeId: "yzCfLZVpnwY",
    ingredients: [
      { item: "Cooked Rice", qty: 3, unit: "cups" },
      { item: "Lemon Juice", qty: 3, unit: "tbsp" },
      { item: "Turmeric", qty: 0.5, unit: "tsp" },
      { item: "Peanuts", qty: 2, unit: "tbsp" },
      { item: "Mustard Seeds", qty: 1, unit: "tsp" }
    ],
    steps: [
      "Temper mustard seeds, urad dal, peanuts, curry leaves in oil.",
      "Add turmeric and stir.",
      "Add cooked rice and lemon juice, toss well.",
      "Mix gently and serve."
    ],
    nutrition: { calories: 280, protein: 6, iron: 1, calcium: 20 }
  },
  {
    id: "r48", name: "Tacos", name_ta: "டாகோஸ்",
    cuisine: "Continental", flag: "🌍", rating: 4.5, prepTime: "25 min", difficulty: "Easy",
    diet: "non-veg", mealType: "dinner",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80",
    youtubeId: "-EWG56CyKls",
    ingredients: [
      { item: "Taco Shells", qty: 6, unit: "pcs" },
      { item: "Ground Beef", qty: 250, unit: "g" },
      { item: "Lettuce", qty: 1, unit: "cup" },
      { item: "Cheese", qty: 0.5, unit: "cup" },
      { item: "Salsa", qty: 0.5, unit: "cup" }
    ],
    steps: [
      "Cook ground beef with taco seasoning.",
      "Warm taco shells in oven.",
      "Fill with seasoned beef, lettuce, cheese, and salsa.",
      "Serve with sour cream."
    ],
    nutrition: { calories: 400, protein: 22, iron: 3, calcium: 120 }
  },
  {
    id: "r49", name: "Chocolate Brownie", name_ta: "சாக்லேட் பிரவுனி",
    cuisine: "Continental", flag: "🌍", rating: 4.8, prepTime: "45 min", difficulty: "Medium",
    diet: "veg", mealType: "snack",
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80",
    youtubeId: "R3nzHC3VT1I",
    ingredients: [
      { item: "Dark Chocolate", qty: 200, unit: "g" },
      { item: "Butter", qty: 100, unit: "g" },
      { item: "Sugar", qty: 0.75, unit: "cup" },
      { item: "Eggs", qty: 2, unit: "pcs" },
      { item: "Flour", qty: 0.5, unit: "cup" }
    ],
    steps: [
      "Melt chocolate and butter together.",
      "Whisk eggs and sugar until fluffy.",
      "Fold in chocolate mixture and flour.",
      "Pour into greased pan. Bake at 180°C for 25 min."
    ],
    nutrition: { calories: 350, protein: 5, iron: 3, calcium: 30 }
  },
  {
    id: "r50", name: "Pancakes", name_ta: "பான்கேக்ஸ்",
    cuisine: "Continental", flag: "🌍", rating: 4.5, prepTime: "20 min", difficulty: "Easy",
    diet: "veg", mealType: "breakfast",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
    youtubeId: "qSPw5C1OGzA",
    ingredients: [
      { item: "Flour", qty: 1, unit: "cup" },
      { item: "Milk", qty: 1, unit: "cup" },
      { item: "Egg", qty: 1, unit: "pc" },
      { item: "Butter", qty: 1, unit: "tbsp" },
      { item: "Maple Syrup", qty: 3, unit: "tbsp" }
    ],
    steps: [
      "Mix flour, milk, egg, and a pinch of salt into smooth batter.",
      "Heat buttered pan on medium heat.",
      "Pour small ladle of batter, cook until bubbles form, flip.",
      "Stack and serve with maple syrup and berries."
    ],
    nutrition: { calories: 280, protein: 8, iron: 2, calcium: 100 },
    climate: "summer"
  },
  // ========== CLIMATE SPECIALS: DRINKS ==========
  {
    id: "r51", name: "Iced Tea", name_ta: "ஐஸ் டீ",
    cuisine: "Continental", flag: "🌍", rating: 4.7, prepTime: "10 min", difficulty: "Easy",
    diet: "veg", mealType: "drink", climate: "summer",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80",
    youtubeId: "6R8ff2XBZLM",
    ingredients: [
      { item: "Tea Bag", qty: 2, unit: "pcs" },
      { item: "Lemon", qty: 1, unit: "pc" },
      { item: "Sugar", qty: 2, unit: "tbsp" },
      { item: "Ice", qty: 6, unit: "cubes" }
    ],
    steps: [
      "Brew tea and let it cool.",
      "Add lemon juice and sugar.",
      "Fill glass with ice and pour tea.",
      "Garnish with mint leaves."
    ],
    nutrition: { calories: 60, protein: 0, iron: 0, calcium: 10 }
  },
  {
    id: "r52", name: "Hot Chocolate", name_ta: "ஹாட் சாக்லேட்",
    cuisine: "Continental", flag: "🌍", rating: 4.9, prepTime: "10 min", difficulty: "Easy",
    diet: "veg", mealType: "drink", climate: "winter",
    image: "https://images.unsplash.com/photo-1544787210-282aaec88729?w=600&q=80",
    youtubeId: "FHkqDHKD4b8",
    ingredients: [
      { item: "Milk", qty: 1, unit: "cup" },
      { item: "Cocoa Powder", qty: 2, unit: "tbsp" },
      { item: "Sugar", qty: 1, unit: "tbsp" },
      { item: "Chocolate Chips", qty: 1, unit: "tbsp" }
    ],
    steps: [
      "Heat milk in a saucepan.",
      "Whisk in cocoa powder and sugar.",
      "Add chocolate chips and stir until melted.",
      "Serve hot with marshmallows."
    ],
    nutrition: { calories: 250, protein: 8, iron: 4, calcium: 200 }
  },
  {
    id: "r53", name: "Ginger Tea", name_ta: "இஞ்சி டீ",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.8, prepTime: "10 min", difficulty: "Easy",
    diet: "veg", mealType: "drink", climate: "monsoon",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80",
    youtubeId: "FPuM2_bBkrU",
    ingredients: [
      { item: "Ginger", qty: 1, unit: "large piece" },
      { item: "Tea Powder", qty: 1, unit: "tbsp" },
      { item: "Milk", qty: 0.5, unit: "cup" },
      { item: "Sugar", qty: 2, unit: "tsp" }
    ],
    steps: [
      "Boil water with crushed ginger.",
      "Add tea powder and simmer.",
      "Add milk and sugar, bring to boil.",
      "Strain and serve hot."
    ],
    nutrition: { calories: 90, protein: 3, iron: 1, calcium: 100 }
  },
  {
    id: "r54", name: "Cold Coffee", name_ta: "கோல்ட் காபி",
    cuisine: "Continental", flag: "🌍", rating: 4.7, prepTime: "5 min", difficulty: "Easy",
    diet: "veg", mealType: "drink", climate: "summer",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80",
    youtubeId: "d8WZvBFpnDM",
    ingredients: [
      { item: "Milk", qty: 1, unit: "cup" },
      { item: "Coffee Powder", qty: 1, unit: "tsp" },
      { item: "Sugar", qty: 2, unit: "tbsp" },
      { item: "Ice Cubes", qty: 4, unit: "pcs" }
    ],
    steps: [
      "Blend milk, coffee, sugar, and ice until frothy.",
      "Pour into a chilled glass.",
      "Top with chocolate syrup if desired."
    ],
    nutrition: { calories: 180, protein: 6, iron: 0, calcium: 150 }
  },
  {
    id: "r55", name: "Tomato Soup", name_ta: "தக்காளி சூப்",
    cuisine: "Continental", flag: "🌍", rating: 4.6, prepTime: "25 min", difficulty: "Medium",
    diet: "veg", mealType: "drink", climate: "winter",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    youtubeId: "YKKaEpG4EQY",
    ingredients: [
      { item: "Tomatoes", qty: 4, unit: "large" },
      { item: "Butter", qty: 1, unit: "tbsp" },
      { item: "Garlic", qty: 2, unit: "cloves" },
      { item: "Cream", qty: 1, unit: "tbsp" }
    ],
    steps: [
      "Sauté garlic in butter, add chopped tomatoes.",
      "Cook until soft, then blend and strain.",
      "Simmer with seasonings and finish with cream."
    ],
    nutrition: { calories: 120, protein: 2, iron: 1, calcium: 40 },
    isWeightLoss: true, climate: "winter", suitableFor: ["fever", "cold"]
  },
  // ========== MEDICINAL MODE SPECIALS ==========
  {
    id: "r56", name: "Garlic Pepper Soup", name_ta: "பூண்டு மிளகு சூப்",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.8, prepTime: "15 min", difficulty: "Easy",
    diet: "veg", mealType: "drink", climate: "winter", suitableFor: ["cold", "fever"],
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    youtubeId: "NxQgEQQMK4Y",
    ingredients: [
      { item: "Garlic", qty: 10, unit: "cloves" },
      { item: "Black Pepper", qty: 2, unit: "tsp" },
      { item: "Cumin", qty: 1, unit: "tsp" },
      { item: "Water", qty: 3, unit: "cups" }
    ],
    steps: [
      "Crush garlic, pepper, and cumin together.",
      "Boil water and add the crushed mixture.",
      "Simmer for 10 minutes until reduced.",
      "Serve hot to relieve cold and cough."
    ],
    nutrition: { calories: 40, protein: 1, iron: 1, calcium: 20 }
  },
  {
    id: "r57", name: "Palak Dal", name_ta: "பாலக் பருப்பு",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.7, prepTime: "30 min", difficulty: "Easy",
    diet: "veg", mealType: "lunch", suitableFor: ["low-blood"],
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600&q=80",
    youtubeId: "NjXCkrRHsxk",
    ingredients: [
      { item: "Spinach (Palak)", qty: 2, unit: "cups" },
      { item: "Toor Dal", qty: 1, unit: "cup" },
      { item: "Garlic", qty: 4, unit: "cloves" }
    ],
    steps: [
      "Pressure cook dal with spinach and turmeric.",
      "Temper with garlic, cumin, and dry red chillies.",
      "Rich in iron, perfect for anemia (Low blood)."
    ],
    nutrition: { calories: 220, protein: 14, iron: 6, calcium: 120 }
  },
  {
    id: "r58", name: "Roasted Beet Salad", name_ta: "பீட்ரூட் சாலட்",
    cuisine: "Continental", flag: "🌍", rating: 4.6, prepTime: "20 min", difficulty: "Easy",
    diet: "veg", mealType: "snack", suitableFor: ["low-blood", "bp"],
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&q=80",
    youtubeId: "hCqn0_00Jrw",
    ingredients: [
      { item: "Beetroot", qty: 2, unit: "medium" },
      { item: "Lemon", qty: 1, unit: "pc" },
      { item: "Walnuts", qty: 5, unit: "pcs" }
    ],
    steps: [
      "Steam or roast beetroots until tender.",
      "Slice and dress with lemon juice, salt, and pepper.",
      "Beets are great for blood flow and pressure management."
    ],
    nutrition: { calories: 150, protein: 3, iron: 2, calcium: 45 }
  },
  {
    id: "r59", name: "Moringa Soup", name_ta: "முருங்கைக்கீரை சூப்",
    cuisine: "Indian", flag: "🇮🇳", rating: 4.9, prepTime: "20 min", difficulty: "Medium",
    diet: "veg", mealType: "drink", suitableFor: ["low-blood", "bp"],
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80",
    youtubeId: "Gp_LMZ5BPPM",
    ingredients: [
      { item: "Moringa Leaves", qty: 1, unit: "cup" },
      { item: "Small Onions", qty: 5, unit: "pcs" },
      { item: "Pepper", qty: 1, unit: "tsp" }
    ],
    steps: [
      "Boil moringa leaves with onions and crushed pepper.",
      "Strain and drink the clear soup.",
      "Extremely rich in iron and minerals for blood health."
    ],
    nutrition: { calories: 45, protein: 4, iron: 8, calcium: 150 }
  },
  {
    id: "r60", name: "Egg Noodles", name_ta: "முட்டை நூடுல்ஸ்",
    cuisine: "Chinese", flag: "🇨🇳", rating: 4.6, prepTime: "25 min", difficulty: "Easy",
    diet: "non-veg", mealType: "dinner",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&q=80",
    youtubeId: "hIY_aNIQWNE",
    ingredients: [
      { item: "Noodles", qty: 200, unit: "g" },
      { item: "Eggs", qty: 3, unit: "pcs" },
      { item: "Soy Sauce", qty: 2, unit: "tbsp" },
      { item: "Veggies", qty: 1, unit: "cup" }
    ],
    steps: [
      "Boil noodles and drain.",
      "Scramble eggs in a pan with salt and pepper.",
      "Sauté veggies and add cooked noodles.",
      "Toss with soy sauce and scrambled eggs. Serve hot."
    ],
    nutrition: { calories: 420, protein: 18, iron: 2, calcium: 40 }
  },
  {
    id: "r61", name: "Chicken Rice", name_ta: "சிக்கன் ரைஸ்",
    cuisine: "Chinese", flag: "🇨🇳", rating: 4.7, prepTime: "25 min", difficulty: "Easy",
    diet: "non-veg", mealType: "lunch",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80",
    youtubeId: "o0N6mP3g6_U",
    ingredients: [
      { item: "Cooked Rice", qty: 3, unit: "cups" },
      { item: "Chicken", qty: 200, unit: "g" },
      { item: "Soy Sauce", qty: 2, unit: "tbsp" }
    ],
    steps: [
      "Stir-fry chicken strips until cooked.",
      "Add veggies and cold rice.",
      "Season with soy sauce, pepper, and salt. Serve hot."
    ],
    nutrition: { calories: 450, protein: 25, iron: 2, calcium: 30 }
  }
];

// Make accessible globally
window.RECIPES_DB = recipes;

// Budget Feature: Price Map (Estimate costs per unit in ₹)
window.INGREDIENT_PRICES = {
  // Proteins (Price per gram/unit)
  "Chicken": 0.25, "Chicken Breast": 0.35, "Mutton": 0.8, "Fish Pieces": 0.6, "Eggs": 7, "Ground Beef": 0.45, "Paneer": 0.4,
  // Grains/Flour (Price per gram or per cup)
  "Basmati Rice": 20, "Rice": 25, "Wheat Flour": 20, "Maida": 0.04, "All Purpose Flour": 20, "Whole Wheat Flour": 20, "Dosa Batter": 40, "Idli Batter": 40, "Noodles": 0.15, "Pasta": 0.2, "Spaghetti": 0.2,
  // Veggies (Price per unit or per cup)
  "Onions": 8, "Tomatoes": 10, "Garlic": 1, "Ginger": 5, "Potatoes": 5, "Carrots": 5, "Cabbage": 15, "Bell Peppers": 12, "Spinach": 15, "Cauliflower": 20, "Palak": 15, "Beetroot": 8, "Moringa Leaves": 10, "Green Chillies": 2, "Lemon": 5,
  // Dairy/Fats (Price per ml/gram/tbsp/cup)
  "Milk": 20, "Yogurt": 15, "Butter": 15, "Ghee": 15, "Cheese": 15, "Fresh Cream": 15, "Mozzarella": 0.8, "Parmesan": 30,
  // Spices/Other
  "Sugar": 5, "Oil": 5, "Cashews": 4, "Biryani Masala": 10, "Sambar Powder": 10, "Rasam Powder": 10, "Soy Sauce": 10, "Gochujang": 0.5, "Moong Dal": 30, "Toor Dal": 40, "Black Pepper": 5, "Cumin": 5, "Tamarind": 10, "Pepper": 5,
  "Ginger-Garlic Paste": 15, "Turmeric Powder": 5, "Red Chili Powder": 5, "Coriander Powder": 5, "Mint & Coriander": 10, "Whole Spices (Cloves, Cinnamon, Cardamom, Bay Leaf)": 20, "Star Anise": 5
};

// Helper to get total cost of a recipe
window.getRecipeCost = function(recipe) {
  if (!recipe || !recipe.ingredients) return 0;
  return recipe.ingredients.reduce((total, ing) => {
    const unitPrice = window.INGREDIENT_PRICES[ing.item] || 0.1; // Fallback price
    return total + (unitPrice * ing.qty);
  }, 0).toFixed(2);
};
