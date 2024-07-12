import React, { useState, useEffect } from 'react'

function EditProductForm(props) {
  const [product, setProduct] = useState(props.currentProduct)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setProduct({ ...product, [name]: value })
  }

  useEffect(() => {setProduct(props.currentProduct)}, [props])

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        props.updateProduct(product.id, product)
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
      <button>Update product</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  )
}

export default EditProductForm