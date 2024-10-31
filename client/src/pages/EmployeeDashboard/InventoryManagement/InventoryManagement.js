import { useState, useEffect } from 'react';
import { shopService } from '../../../api';

function InventoryManagement() {
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
      const data = await shopService.getAllFlavors();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error loading items');
    } finally {
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
      await shopService.createFlavor(newItem);
      await fetchItems();
      setNewItem({
        Item_Name: '',
        Unit_Price: '',
        Calories: '',
        Protein: '',
        Sugar: '',
        Total_Carbs: '',
        Total_Fat: ''
      });
      setError(null);
    } catch (err) {
      setError(err.message || 'Error adding item');
    }
  };

  // Update item
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      await shopService.updateFlavor(editingItem.Item_ID, editingItem);
      await fetchItems();
      setEditingItem(null);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error updating item');
    }
  };

  // Delete item
  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await shopService.deleteFlavor(itemId);
        await fetchItems();
        setError(null);
      } catch (err) {
        setError(err.message || 'Error deleting item');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Inventory Management</h1>
      
      {error && <div role="alert">{error}</div>}

      {/* Add New Item Form */}
      <div>
        <h2>Add New Item</h2>
        <form onSubmit={handleAddItem}>
          <div>
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
            <input
              type="number"
              placeholder="Protein (g)"
              value={newItem.Protein}
              onChange={(e) => setNewItem({...newItem, Protein: e.target.value})}
            />
            <input
              type="number"
              placeholder="Sugar (g)"
              value={newItem.Sugar}
              onChange={(e) => setNewItem({...newItem, Sugar: e.target.value})}
            />
            <input
              type="number"
              placeholder="Total Carbs (g)"
              value={newItem.Total_Carbs}
              onChange={(e) => setNewItem({...newItem, Total_Carbs: e.target.value})}
            />
            <input
              type="number"
              placeholder="Total Fat (g)"
              value={newItem.Total_Fat}
              onChange={(e) => setNewItem({...newItem, Total_Fat: e.target.value})}
            />
          </div>
          <button type="submit">Add Item</button>
        </form>
      </div>

      {/* Items List */}
      <div>
        <h2>Current Inventory</h2>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Sugar</th>
              <th>Total Carbs</th>
              <th>Total Fat</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.Item_ID}>
                {editingItem?.Item_ID === item.Item_ID ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editingItem.Item_Name}
                        onChange={(e) => setEditingItem({...editingItem, Item_Name: e.target.value})}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editingItem.Unit_Price}
                        onChange={(e) => setEditingItem({...editingItem, Unit_Price: e.target.value})}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editingItem.Calories}
                        onChange={(e) => setEditingItem({...editingItem, Calories: e.target.value})}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editingItem.Protein}
                        onChange={(e) => setEditingItem({...editingItem, Protein: e.target.value})}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editingItem.Sugar}
                        onChange={(e) => setEditingItem({...editingItem, Sugar: e.target.value})}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editingItem.Total_Carbs}
                        onChange={(e) => setEditingItem({...editingItem, Total_Carbs: e.target.value})}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editingItem.Total_Fat}
                        onChange={(e) => setEditingItem({...editingItem, Total_Fat: e.target.value})}
                      />
                    </td>
                    <td>
                      <button onClick={handleUpdateItem}>Save</button>
                      <button onClick={() => setEditingItem(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.Item_Name}</td>
                    <td>${item.Unit_Price}</td>
                    <td>{item.Calories}</td>
                    <td>{item.Protein}g</td>
                    <td>{item.Sugar}g</td>
                    <td>{item.Total_Carbs}g</td>
                    <td>{item.Total_Fat}g</td>
                    <td>
                      <button onClick={() => setEditingItem(item)}>Edit</button>
                      <button onClick={() => handleDeleteItem(item.Item_ID)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryManagement;