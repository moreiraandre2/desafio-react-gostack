import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
    
  },[]);

  async function handleAddRepository() {
    const repository = {
      url: "https://github.com/moreiraandre2",
      title: `Repositorio ${Date.now()}`,
      techs: ["React", "Node.js"],
    }

    const response = await api.post('/repositories', repository);
    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
          {repositories.map(repository => (
            <li key={repository.id}>
              <div>
              <p>Titulo: <span>{repository.title}</span></p>
              <p>URL: <span>{repository.url}</span></p>
              <p>Techs: <span>{repository.techs}</span></p>
              </div>
              
              <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
            </li>
          ))}

          
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
