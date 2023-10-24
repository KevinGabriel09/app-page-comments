import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
const Comment = ({ comment, addComment }) => {

  const { commentText, childComments, id } = comment;
  const [childComment, setChildComment] = useState("");
  const [show, setShow] = useState(true);
  const [showAddComponet, setShowAddComponet] = useState(false);
  const onAdd = () => {

    addComment(id, childComment);
    setChildComment("");
    setShowAddComponet(false);
  };
  return (
    <div className="Comment">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ textAlign: "left" }}>{commentText}</div>
        &nbsp;
        {Array.isArray(childComments) && childComments.length > 0 && (
          <button onClick={() => setShow((show) => !show)}>
            {show ? "Ocultar" : "Mostrar"}
          </button>

        )}
      </div>
      <div>
        <div>
          {showAddComponet ? (
            <>
              <input
                type="text"
                value={childComment}
                onChange={(e) => setChildComment(e.target.value)}
                placeholder="add comment"
              />{" "}
              <button onClick={onAdd}>enviar</button>
            </>
          ) : (
            <a
              href="#"
              style={{ cursor: "pointer", fontSize: "0.7rem", color: "blue" }}
              onClick={() => setShowAddComponet(true)}
            >
              <FontAwesomeIcon icon={faReply} style={{ marginRight: '0.3rem' }} />
              Responder
            </a>
          )}
        </div>
      </div>
      {show &&
        Array.isArray(childComments) &&
        childComments.map((childCommentEl, key) => {
          return (
            <Comment
              key={key}
              comment={childCommentEl}
              addComment={addComment}
            />
          );
        })}
    </div>
  );
}

export default Comment;