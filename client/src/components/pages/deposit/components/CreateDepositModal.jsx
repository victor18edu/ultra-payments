import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { createDeposit } from '../../../services/transactions/depositFunctions';

function CreateDepositModal({ show, onHide }) {
	const [amount, setAmount] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleCreateDeposit = async () => {
		setLoading(true);
		setError(null);

		try {
			// Aqui você pode adicionar qualquer validação necessária para o valor do depósito
			if (!amount) {
				throw new Error('O valor do depósito é obrigatório.');
			}

			// Chama a função para criar o depósito na API
			await createDeposit({ amount });

			// Atualiza o estado e fecha o modal
			setLoading(false);
			onHide();
		} catch (error) {
			// Em caso de erro, exibe a mensagem de erro
			setError(error.message);
			setLoading(false);
		}
	};

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Criar Depósito</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{error && <p className="text-danger">{error}</p>}
				<Form.Group controlId="amount">
					<Form.Label>Valor do Depósito</Form.Label>
					<Form.Control
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onHide}>
					Cancelar
				</Button>
				<Button variant="primary" onClick={handleCreateDeposit} disabled={loading}>
					{loading ? 'Criando Depósito...' : 'Criar Depósito'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateDepositModal;
