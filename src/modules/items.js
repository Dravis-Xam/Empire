//src/modules/items.jsx
 
// Function to fetch products from the backend
const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
};
  
  // Function to update the items list and cache it
const updateItemsList = async () => {
    const lastFetchTime = localStorage.getItem('lastFetchTime');
    const cachedProducts = localStorage.getItem('products');
  
    // Check if cached data exists and is less than 3 days old
    if (cachedProducts && lastFetchTime && (new Date().getTime() - lastFetchTime < 3 * 24 * 60 * 60 * 1000)) {
      return JSON.parse(cachedProducts); // Use cached data
    } else {
      const products = await fetchProducts(); // Fetch new data
      localStorage.setItem('products', JSON.stringify(products)); // Cache the data
      localStorage.setItem('lastFetchTime', new Date().getTime()); // Store the last fetch time
      return products;
    }
};
  

  let items = [
    {
        name: "ZTE Nubic Red Magic Pro",
        price: 60000,
        itemId: 7001,
        details: {
            ram: '16Gb + 16Gb',
            i_storage: "1Tb",
            p_speed: "92MHrtz",
            i_resolution: "64MP",
            b_life: "48Hrs",
            b_capacity: "7700mAh",
            look: "Silvery",
            image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/screen-guard/screen-guard/m/q/9/po1-dva-zte-nubia-red-magic-9-pro-dvtech-original-imagwhg6rgegh9mg.jpeg?q=20&crop=false"
        },
        quantity: 200,
        brand: "Red Magic",
    }, {
        name: "Infinix NOTE 40 I",
        price: 24000,
        itemId: 7002,
        details: {
            ram: '16Gb + 16Gb',
            i_storage: "1Tb",
            p_speed: "92MHrtz",
            i_resolution: "64MP",
            b_life: "48Hrs",
            b_capacity: "7700mAh",
            look: "Silvery",
            image: "https://api.priceinkenya.com/media/135685/conversions/Infinix-Note-40-Pro-a-original.webp"
        },
        quantity: 200,
        brand: "infinite",
    }, {
        name: "Samsung S24",
        price: 96000,
        itemId: 7003,
        details: {
            ram: '16Gb + 16Gb',
            i_storage: "1Tb",
            p_speed: "92MHrtz",
            i_resolution: "64MP",
            b_life: "48Hrs",
            b_capacity: "7700mAh",
            look: "Silvery",
            image: "https://www.mobilehub.co.ke/storage/2024/10/Samsung-S24-Ultra-Price-in-Kenya-001-Mobilehub-Kenya.jpg"
        },
        quantity: 200,
        brand: "samsung",
    }, {
        name: "Ipad",
        price: 42000,
        itemId: 7004,
        details: {
            ram: '16Gb + 16Gb',
            i_storage: "1Tb",
            p_speed: "92MHrtz",
            i_resolution: "64MP",
            b_life: "48Hrs",
            b_capacity: "7700mAh",
            look: "Silvery",
            image: "https://shop.ncsu.edu/Product%20Images/iPadAirM2_media-01.jpg?resizeid=2&resizeh=600&resizew=600"
        },
        quantity: 200,
        brand: "ipad",
    }, {
        name: "OPPO Reno 7",
        price: 60000,
        itemId: 7005,
        details: {
            ram: '16Gb + 16Gb',
            i_storage: "1Tb",
            p_speed: "92MHrtz",
            i_resolution: "64MP",
            b_life: "48Hrs",
            b_capacity: "7700mAh",
            look: "Silvery",
            image: "https://pricezonekenya.com/wp-content/uploads/2023/01/Oppo-Reno-8-5G-Sak.jpg"
        },
        quantity: 200,
        brand: "oppo",
    }
];

 
  
  // Fetch and update the items list
  updateItemsList()
    .then((data) => {
      items = data; // Update the items list with the fetched data
    })
    .catch((error) => {
      console.error('Error updating items list:', error);
    });
  
  // Export the items list
  export default items;



