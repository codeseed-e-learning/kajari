import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

const Home = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // To show a loading state
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const productData = {
      name,
      price: parseFloat(price),
      description,
    };

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      axios.post('http://localhost/INENTORY/server/add-product.php', productData, {
        headers: {
          'Content-Type': 'application/json', // Match the allowed content type
        },
      });

      console.log('Success:', response.data);
      setSuccessMessage('Product added successfully!');
      setName('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Add New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Product Price</label>
            <input
              type="number"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Product Description</label>
            <textarea
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-bold rounded ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
        {successMessage && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
