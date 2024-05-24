import axios from "axios";
import { useState } from "react";

const CommentModalAdd = ({
  url,
  setData,
  id,
  changeCommentModalState,
}) => {
  const [commentText, setCommentText] = useState("");

  const handleTextareaChange = (e) => {
    setCommentText(e.target.value);
  };

  const addComment = async () => {
    try {
      const response = await axios.post(`${url}/${id}/comments`, {
        productId: id,
        description: commentText,
        date: new Date().toLocaleString()
      });
      setData((prevData) =>
        prevData.map((prevProduct) =>
          prevProduct.id === id ? response.data : prevProduct
        )
      );
    } catch (err) {
      console.error(err);
    }

    changeCommentModalState();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <textarea onChange={handleTextareaChange}></textarea>
        <button onClick={changeCommentModalState}>Cancel</button>
        <button onClick={addComment}>Add</button>
      </div>
    </div>
  );
};

export default CommentModalAdd;