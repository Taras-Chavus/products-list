import { useState } from "react";
import CommentModalAdd from "./CommentModalAdd";

const ProductComments = ({ url, setData, comments, id }) => {
  const [isOpenAddComment, setIsOpenAddComment] = useState(false);

  const changeCommentModalState = () => {
    setIsOpenAddComment((prev) => !prev);
  };

  return (
    <div className="comments">
      <span>Comments:</span>

      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment) => (
          <p key={comment.id}>{comment.description}</p>
        ))
      ) : (
        <p>No comments available</p>
      )}
      
      <button onClick={changeCommentModalState}>Add Comment</button>

      {isOpenAddComment && (
        <CommentModalAdd
          url={url}
          setData={setData}
          comments={comments}
          id={id}
          changeCommentModalState={changeCommentModalState}
        />
      )}
    </div>
  );
};

export default ProductComments;