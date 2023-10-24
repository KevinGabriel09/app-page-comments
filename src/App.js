
import React, { useState } from 'react';
import './App.css';
import useCommentController from "./controllers/comments";
import Comment from "./components/comments";

function App() {

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const {
    comments,
    rootComment,
    enhancedComments,
    setRootComment,
    onAdd,
    addComment,

  } = useCommentController();



  function guardar() {

    const comment = Object.values(comments)[0];
    const dataForo = {
      id: comment.id,
      commentText: comment.commentText,
      childComments: comment.childComments,
      isRootNode: comment.isRootNode,
      parentNodeId: comment.parentNodeId,
    };

    console.log(dataForo)
    fetch('http://localhost:8086/foro/guardar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataForo),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta del servidor:', data);
        setShowSuccessMessage(true);
        console.log(comments)

      })
      .catch(error => {
        console.error('Error al enviar la solicitud:', error);
      });
  }

  return (
    <div className="App">
      <header style={{ marginBottom: '2rem', fontSize: '2rem' }}>Foro Test</header>
      <div className="comments-container">
        <input
          type="text"
          value={rootComment}
          onChange={(e) => setRootComment(e.target.value)}
          placeholder="Ingresa un tema"
          style={{ width: "100%", marginRight: "6rem", borderRadius: "5px" }}
        />
        <button onClick={onAdd}style={{
          backgroundColor: '#14BB5E',
          color: 'white',
          fontSize: '1rem',
          borderRadius: '5px',
          padding: '10px 20px',
          cursor: 'pointer',
          marginBottom: '12px' 
        }}>Agregar</button>
      </div>
      <div
        style={{
          border: "1px solid blue",
          width: "60%",
          margin: "auto",
          overflowX: "auto",
          padding: "2rem",
          marginBottom: '10px', 
          borderRadius: '5px'
        }}
      >
        {enhancedComments.map((comment, key) => {
          return (
            <Comment key={key} comment={comment} addComment={addComment} />
          );
        })}
      </div>
      <div>
      <button onClick={guardar}
        style={{
          backgroundColor: '#1490BB',
          color: 'white',
          fontSize: '1rem',
          borderRadius: '5px',
          padding: '10px 20px',
          cursor: 'pointer',
          marginBottom: '10px' 
        }}>Guardar</button>
      </div>
      
      {showSuccessMessage && (
        <div className="success-message">Guardado con éxito</div>
      )}
    </div>
  );
}




export default App;
