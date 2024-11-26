import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [productsDetails, setProductsDetails] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [productData, setProductData] = useState({
    product_id: '',
    name: '',
    description: '',
    category: '',
    brand: '',
    supplier_id: '',
    barcode: '',
    product_image: '',
    price: '',
    created_at: '',
    updated_at: ''
  });

  const [isUpdate, setIsUpdate] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost/Inventory/server/products.php?function_name=read');
      setProductsDetails(response.data.data);
      console.log(`data : ${response.data}`);
      
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleAddOrUpdateProduct = async () => {
    try {
      if (isUpdate) {
        // API endpoint for updating a product
        const updateUrl = `http://localhost/Inventory/server/products.php?function_name=update&id=${productData.product_id}`;
        console.log(updateUrl);        
        await axios.post(updateUrl, productData);
      } else {
        // API endpoint for adding a new product
        const createUrl = `http://localhost/Inventory/server/products.php?function_name=create`;
        await axios.post(createUrl, productData);
      }

      fetchProducts(); // Refresh the products list
      setShowPopup(false);
      setProductData({
        product_id: '',
        name: '',
        description: '',
        category: '',
        brand: '',
        supplier_id: '',
        barcode: '',
        product_image: '',
        price: '',
        created_at: '',
        updated_at: ''
      });
    } catch (error) {
      console.error('Error submitting product data:', error);
    }
  };

  const handleEdit = (product) => {
    setProductData(product);
    setIsUpdate(true);
    setShowPopup(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products-container max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Products List</h1>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 mb-6"
        onClick={() => {
          setShowPopup(true);
          setIsUpdate(false);
        }}
      >
        Add Product
      </button>
      {productsDetails.length > 0 ? (
        <ul className="space-y-4">
          {productsDetails.map((item) => (
            <li key={item.product_id} className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-lg transition duration-200">
              <strong className="text-lg">{item.name}</strong> <br />
              <span className="text-gray-600">{item.description}</span> <br />
              <strong>Category:</strong> {item.category} <br />
              <strong>Brand:</strong> {item.brand} <br />
              <strong>Price:</strong> ${item.price} <br />
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-green-700 transition duration-200"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}

      {showPopup && (
        <div className="popup bg-gray-900 bg-opacity-50 fixed inset-0 flex justify-center items-center">
          <div className="popup-content bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">{isUpdate ? 'Update' : 'Add'} Product</h2>
            <form className="grid grid-cols-1 gap-4">
              {['name', 'description', 'category', 'brand', 'supplier_id', 'barcode', 'product_image', 'price'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    name={field}
                    value={productData[field]}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </form>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                onClick={handleAddOrUpdateProduct}
              >
                {isUpdate ? 'Update' : 'Add'} Product
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-200"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
