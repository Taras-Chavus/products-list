import axios from "axios";

const RemoveProductModal = ({ url, setData, id, changeRemoveModalState }) => {
  const removeProduct = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      setData((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h4>Are you sure?</h4>
        <button onClick={changeRemoveModalState}>No</button>
        <button onClick={() => removeProduct(id)}>Yes</button>
      </div>
    </div>
  );
};

export default RemoveProductModal;