import React, { useState } from 'react';
import baseApi from '../../baseApi'; // Importe a instância Axios
import Layout from '../Layout';

const TransferPage = () => {
  // Defina os estados para os campos do formulário
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [authorizationCode, setAuthorizationCode] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Envia uma solicitação POST para a API com os dados do formulário
      const response = await baseApi.post('/transfer', {
        amount,
        recipient,
      });

      // Atualiza o estado com o código de autorização retornado pela API
      setAuthorizationCode(response.data.authorizationCode);
    } catch (error) {
      console.error('Erro ao transferir dinheiro:', error);
    }
  };

  return (
    <div>
    <Layout>
      <h2>Transferência de Dinheiro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Valor:</label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="recipient">Destinatário:</label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        <button type="submit">Transferir</button>
      </form>
      {authorizationCode && (
        <div>
          <h3>Código de Autorização:</h3>
          <p>{authorizationCode}</p>
        </div>
      )}

      </Layout>
    </div>
  );
};

export default TransferPage;
