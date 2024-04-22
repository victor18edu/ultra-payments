import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { createDeposit } from '../../../services/transactions/depositFunctions';

function CreateDepositModal({ show, onHide, onUpdateDeposits }) {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateDeposit = async () => {
        setLoading(true);
        setError(null);

        try {
            if (!amount) {
                throw new Error('O valor do depósito é obrigatório.');
            }
            await createDeposit({ amount });

            setLoading(false);
            onUpdateDeposits(); // Chama a função de atualização após criar o depósito
            onHide();
        } catch (error) {
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
