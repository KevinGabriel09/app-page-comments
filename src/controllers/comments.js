import { useState } from "react";
import { initialState, getNewComment } from "../models/comments";

const useCommentController = () => {
  const [comments, setComments] = useState(initialState);
  const [rootComment, setRootComment] = useState("");

  const addComment = (parentId, newCommentText) => {
    let newComment = null;
    if (parentId) {
      newComment = getNewComment(newCommentText, false, parentId);
      setComments((comments) => ({
        ...comments,
        [parentId]: {
          ...comments[parentId],
          childComments: [...comments[parentId].childComments, newComment.id,
          ],
        },
      }));
    } else {
      newComment = getNewComment(newCommentText, true, null);
    }
    setComments((comments) => ({ ...comments, [newComment.id]: newComment }));
  };
  const commentMapper = (comment) => {
    return {
      ...comment,
      childComments: comment.childComments
        .map((id) => comments[id])
        .map((comment) => commentMapper(comment)),
    };
  };
  const enhancedComments = Object.values(comments)
    .filter((comment) => {
      return !comment.parentNodeId;
    })
    .map(commentMapper);
  const onAdd = () => {
    addComment(null, rootComment);
    setRootComment("");
  };

  return {
    comments,
    rootComment,
    enhancedComments,
    setRootComment,
    onAdd,
    addComment,
    
  };
};

export default useCommentController;

