import axios from "axios";
import { useState } from "react";

const AddProductModal = ({ url, setData, changeAddModalState }) => {
  const [newProduct, setNewProduct] = useState({
    imageUrl: "",
    name: "",
    count: "",
    size: { width: "", height: "" },
    weight: "",
    comments: [
      {
        productId: "",
        description: "",
        date: "",
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("size")) {
      const sizeName = name.split(".")[1];
      setNewProduct((prev) => ({
        ...prev,
        size: { ...prev.size, [sizeName]: value },
      }));
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const addProduct = async () => {
    try {
      const response = await axios.post(url, newProduct);
      setData((prev) => [...prev, response.data]);
    } catch (err) {
      console.error(err);
    }

    changeAddModalState();
  };

  const isFormValid =
    Object.values(newProduct).every((value) => value !== "") &&
    Object.values(newProduct.size).every((value) => value !== "");

  return (
    <div className="overlay">
      <div className="modal">
        <div className="input-group">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Enter name"
          />
          <input
            type="text"
            name="imageUrl"
            value={newProduct.imageUrl}
            onChange={handleInputChange}
            placeholder="Enter image url"
          />
          <input
            type="number"
            name="count"
            value={newProduct.count}
            onChange={handleInputChange}
            placeholder="Enter count"
          />
          <input
            type="number"
            name="size.width"
            value={newProduct.size.width}
            onChange={handleInputChange}
            placeholder="Enter width"
          />
          <input
            type="number"
            name="size.height"
            value={newProduct.size.height}
            onChange={handleInputChange}
            placeholder="Enter height"
          />
          <input
            type="text"
            name="weight"
            value={newProduct.weight}
            onChange={handleInputChange}
            placeholder="Enter weight"
          />
        </div>

        <button onClick={changeAddModalState}>Cancel</button>
        <button onClick={addProduct} disabled={!isFormValid}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProductModal;