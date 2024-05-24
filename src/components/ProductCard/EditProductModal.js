import axios from "axios";
import { useState, useEffect } from "react";

const EditProductModal = ({ url, product, setData, changeEditModalState }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("size")) {
      const sizeName = name.split(".")[1];
      setUpdatedProduct((prev) => ({
        ...prev,
        size: { ...prev.size, [sizeName]: value },
      }));
    } else {
      setUpdatedProduct({ ...updatedProduct, [name]: value });
    }
  };

  const updateProduct = async () => {
    try {
      const response = await axios.put(`${url}/${product.id}`, updatedProduct);
      setData((prev) =>
        prev.map((p) => (p.id === product.id ? response.data : p))
      );
    } catch (err) {
      console.error(err);
    }
    changeEditModalState();
  };

  const isFormValid =
    Object.values(updatedProduct).every((value) => value !== "") &&
    Object.values(updatedProduct.size).every((value) => value !== "");

  return (
    <div className="overlay">
      <div className="modal">
        <div className="input-group">
          <input
            type="text"
            name="name"
            value={updatedProduct.name}
            onChange={handleInputChange}
            placeholder="Enter name"
          />
          <input
            type="text"
            name="imageUrl"
            value={updatedProduct.imageUrl}
            onChange={handleInputChange}
            placeholder="Enter image url"
          />
          <input
            type="number"
            name="count"
            value={updatedProduct.count}
            onChange={handleInputChange}
            placeholder="Enter count"
          />
          <input
            type="number"
            name="size.width"
            value={updatedProduct.size.width}
            onChange={handleInputChange}
            placeholder="Enter width"
          />
          <input
            type="number"
            name="size.height"
            value={updatedProduct.size.height}
            onChange={handleInputChange}
            placeholder="Enter height"
          />
          <input
            type="text"
            name="weight"
            value={updatedProduct.weight}
            onChange={handleInputChange}
            placeholder="Enter weight"
          />
        </div>
        <button onClick={changeEditModalState}>Cancel</button>
        <button onClick={updateProduct} disabled={!isFormValid}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProductModal;