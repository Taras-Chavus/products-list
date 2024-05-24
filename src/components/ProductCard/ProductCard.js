import { useState } from "react";
import RemoveProductModal from "./RemoveProductModal";
import EditProductModal from "./EditProductModal";
import ProductComments from "./ProductComments/ProductComments";

const ProductCard = ({
  url,
  setData,
  id,
  imageUrl,
  name,
  amount,
  size,
  weight,
  comments
}) => {
  const [isOpenRemove, setIsOpenRemove] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const changeRemoveModalState = () => {
    setIsOpenRemove((prev) => !prev);
  };

  const changeEditModalState = () => {
    setIsOpenEdit((prev) => !prev);
  };

  return (
    <div className="card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>Product width: {size?.width}</p>
      <p>Product height: {size?.height}</p>
      <p>Product weight: {weight}</p>
      <span>In stock: {amount}</span>
      <button onClick={changeEditModalState}>Edit</button>
      <button onClick={changeRemoveModalState}>Remove</button>

      <ProductComments url={url} setData={setData} comments={comments} id={id} />

      {isOpenEdit && (
        <EditProductModal
          url={url}
          setData={setData}
          product={{ id, imageUrl, name, count: amount, size, weight }}
          changeEditModalState={changeEditModalState}
        />
      )}

      {isOpenRemove && (
        <RemoveProductModal
          url={url}
          setData={setData}
          id={id}
          changeRemoveModalState={changeRemoveModalState}
        />
      )}
    </div>
  );
};

export default ProductCard;