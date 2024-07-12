import React, { useState } from 'react'

function AddProductForm(props) {

  const initialFormState = { id: null, name: '', price: 0.0 }
  const [product, setProduct] = useState(initialFormState)

  function handleInputChange(event) {
    const { name, value } = event.target
    setProduct({ ...product, [name]: value })
  }

  return (
    <form 
      onSubmit={event => {
        event.preventDefault()
        if (!product.name || !product.price) return
    
        props.addProduct(product)
        setProduct(initialFormState)
      }}
    >
      <label>Name</label>
      <input 
        type="text" 
        name="name" 
        value={product.name} 
        onChange={handleInputChange}
        />
      <label>Price</label>
      <input 
        type="number" 
        name="price" 
        value={product.price} 
        onChange={handleInputChange}
        />
      <button>Add new product</button>
    </form>
  )
}

export default AddProductForm