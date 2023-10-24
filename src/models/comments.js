import { v4 as uuidv4 } from "uuid";

const getNewComment = (commentValue, isRootNode = false, parentNodeId) => {
  return {
    id: uuidv4(),
    commentText: commentValue,
    childComments: [],
    isRootNode,
    parentNodeId,
  };
};

const initialState = {};

export { initialState, getNewComment };