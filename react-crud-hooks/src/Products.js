import React, { useState, useEffect } from 'react'
import AddProductForm from './forms/AddProductForm';
import ProductTable from "./tables/ProductTable";
import EditProductForm from './forms/EditProductForm'

function Products() {

  //const baseUrl = "http://localhost:8080/products/";

  const baseUrl = "http://18.209.19.166:8081/products";
  

  const [products, setProducts] = useState([]);

  const [editing, setEditing] = useState(false);

  const initialFormState = { id: null, name: '', price: 0.0 };

  const [currentProduct, setCurrentProduct] = useState(initialFormState);

  useEffect(() => {
		getProductsService();
	}, []);

  function addProduct(product) {
    addProductService(product);
  }

  function deleteProduct(id) {
    removeProductService(id);
  }

  function editRow(product) {
    setEditing(true)
    setCurrentProduct({ id: product.id, name: product.name, price: product.price })
  }

  function updateProduct(id, product) {
    setEditing(false)
    product.id = id;
    updateProductService(product);
  }

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit product</h2>
              <EditProductForm
                setEditing={setEditing}
                currentProduct={currentProduct}
                updateProduct={updateProduct}
              />
            </div>
          ) : (
            <div>
              <h2>Add product</h2>
              <AddProductForm addProduct={addProduct} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View products</h2>
          <ProductTable products={products} deleteProduct={deleteProduct} editRow={editRow} />
        </div>
      </div>
    </div>
  )

  async function addProductService(product) {
    fetch(baseUrl, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json' 
			},
			method: "POST",
			body: JSON.stringify(product)
		})
		.then(response => {
			getProductsService();
		})
  }

  async function getProductsService() {
    fetch(baseUrl)
    .then(response => response.json())
    .then(data => {
        setProducts(data);
    });
  }

  async function removeProductService(id) {
    fetch(baseUrl+id, {
      method: "DELETE"
    })
    .then(response => {
      getProductsService();
    })
  }

  async function updateProductService(product){
    fetch(baseUrl+product.id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(product)
    })
    .then(response => {
      setCurrentProduct(product);
      getProductsService()
    })
  }
}

export default Products;
