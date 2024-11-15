import { useState, useEffect } from 'react';
import { shopService } from '../../api';
import Basket from '../../components/Basket/Basket';

const Shop = ({ basketItems, addToBasket, updateBasketQuantity, removeFromBasket }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await shopService.getAllFlavors(); 
        setItems(items || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError(err.message || 'Error loading items');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Fetch food item details when an item is selected
  const handleItemClick = async (item) => {
    if (selectedItem?.Item_ID === item.Item_ID) {
      setSelectedItem(null);
      setItemDetails(null);
      return;
    }

    try {
      const details = await shopService.getFlavorById(item.Item_ID);
      setItemDetails(details);
      setSelectedItem(item);
    } catch (err) {
      setError(err.message || 'Error loading item details');
    }
  };

  const handleAddToBasket = (item) => {
    addToBasket(item);
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    updateBasketQuantity(itemId, quantity);
  };

  const handleRemoveFromBasket = (itemId) => {
    removeFromBasket(itemId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!Array.isArray(items)) {
    console.error('Items is not an array:', items);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">No items available</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Menu Items */}
      <h1 className="text-2xl font-bold text-center mb-6">Our Menu</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Items Grid */}
        <div className="col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item.Item_ID} className="border rounded-lg overflow-hidden">
                <div 
                  onClick={() => handleItemClick(item)}
                  className="cursor-pointer"
                >
                  <img 
                    src={`/api/placeholder/250/200`}
                    alt={item.Item_Name}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{item.Item_Name}</h3>
                    <p className="text-gray-600">${item.Unit_Price}</p>
                  </div>

                  {selectedItem?.Item_ID === item.Item_ID && itemDetails && (
                    <div className="p-4 bg-gray-50 border-t">
                      <h4 className="font-semibold mb-2">Nutrition Facts</h4>
                      <p>Calories: {itemDetails.Calories}</p>
                      <p>Protein: {itemDetails.Protein}g</p>
                      <p>Sugar: {itemDetails.Sugar}g</p>
                      <p>Total Carbs: {itemDetails.Total_Carbs}g</p>
                      <p>Total Fat: {itemDetails.Total_Fat}g</p>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t">
                  <button 
                    onClick={() => handleAddToBasket(item)}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                  >
                    Add to Basket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Basket */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Your Basket</h2>
          <Basket
            items={basketItems}
            updateQuantity={handleUpdateQuantity}
            removeItem={handleRemoveFromBasket}
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;