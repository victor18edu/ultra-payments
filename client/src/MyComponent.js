import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:80/api/test');
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>Dados: {JSON.stringify(data)}</div>
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  );
};

export default MyComponent;
