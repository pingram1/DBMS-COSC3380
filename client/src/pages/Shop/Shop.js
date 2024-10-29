import { useState, useEffect } from 'react';
import { shopService } from '../../api';

const Shop = () => {
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
        setItems(items || []); // Make sure data is an array
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Ensure items is an array before rendering
  if (!Array.isArray(items)) {
    console.error('Items is not an array:', items);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">No items available</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>Our Menu</h1>
      
      {/* Grid of items */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        padding: '20px'
      }}>
        {items.map((item) => (
          <div key={item.Item_ID}>
            {/* Item Card */}
            <div 
              onClick={() => handleItemClick(item)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: selectedItem?.Item_ID === item.Item_ID ? '#f0f0f0' : 'white'
              }}
            >
              {/* Item Image */}
              <img 
                src={`/api/placeholder/250/200`}
                alt={item.Item_Name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              
              {/* Item Info */}
              <div style={{ padding: '15px' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '18px' }}>{item.Item_Name}</h3>
                <p style={{ color: '#666' }}>${item.Unit_Price || 'N/A'}</p>
              </div>

              {/* Item Details (shows when selected) */}
              {selectedItem?.Item_ID === item.Item_ID && itemDetails && (
                <div style={{ 
                  padding: '15px',
                  borderTop: '1px solid #ddd',
                  backgroundColor: '#f8f8f8'
                }}>
                  <h4 style={{ marginBottom: '10px', fontSize: '16px' }}>Nutrition Facts</h4>
                  <p>Calories: {itemDetails.Calories}</p>
                  <p>Protein: {itemDetails.Protein}g</p>
                  <p>Sugar: {itemDetails.Sugar}g</p>
                  <p>Total Carbs: {itemDetails.Total_Carbs}g</p>
                  <p>Total Fat: {itemDetails.Total_Fat}g</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;