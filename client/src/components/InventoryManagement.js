import { useState, useEffect } from 'react';
import api from '../api/api';

const InventoryManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    Item_Name: '',
    Unit_Price: '',
    Calories: '',
    Protein: '',
    Sugar: '',
    Total_Carbs: '',
    Total_Fat: ''
  });

  // Fetch all items
  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('api/shop/all-flavors', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error loading items');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add new item
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post('api/shop/all-flavors', newItem, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchItems();
      setNewItem({
        Item_Name: '',
        Unit_Price: '',
        Calories: '',
        Protein: '',
        Sugar: '',
        Total_Carbs: '',
        Total_Fat: ''
      });
    } catch (err) {
      setError('Error adding item');
    }
  };

  // Update item
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.put(`api/shop/all-flavors/${editingItem.Item_ID}`, editingItem, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchItems();
      setEditingItem(null);
    } catch (err) {
      setError('Error updating item');
    }
  };

  // Delete item
  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`api/shop/all-flavors/${itemId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchItems();
      } catch (err) {
        setError('Error deleting item');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Inventory Management</h1>

      {/* Add New Item Form */}
      <div>
        <h2>Add New Item</h2>
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.Item_Name}
            onChange={(e) => setNewItem({...newItem, Item_Name: e.target.value})}
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.Unit_Price}
            onChange={(e) => setNewItem({...newItem, Unit_Price: e.target.value})}
          />
          <input
            type="number"
            placeholder="Calories"
            value={newItem.Calories}
            onChange={(e) => setNewItem({...newItem, Calories: e.target.value})}
          />
          {/* Add other fields as needed */}
          <button type="submit">Add Item</button>
        </form>
      </div>

      {/* Items List */}
      <div>
        <h2>Current Inventory</h2>
        {items.map(item => (
          <div key={item.Item_ID}>
            {editingItem?.Item_ID === item.Item_ID ? (
              <form onSubmit={handleUpdateItem}>
                <input
                  type="text"
                  value={editingItem.Item_Name}
                  onChange={(e) => setEditingItem({...editingItem, Item_Name: e.target.value})}
                />
                <input
                  type="number"
                  value={editingItem.Unit_Price}
                  onChange={(e) => setEditingItem({...editingItem, Unit_Price: e.target.value})}
                />
                <button type="submit">Save</button>
                <button onClick={() => setEditingItem(null)}>Cancel</button>
              </form>
            ) : (
              <div>
                <h3>{item.Item_Name}</h3>
                <p>Price: ${item.Unit_Price}</p>
                <button onClick={() => setEditingItem(item)}>Edit</button>
                <button onClick={() => handleDeleteItem(item.Item_ID)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryManagement;