import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { createTransfer } from '../../../services/transactions/transferFunctions';

function CreateTransferModal({ show, onHide, onUpdateTransfers }) {
    const [amount, setAmount] = useState('');
    const [recipientCpf, setRecipientCpf] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateTransfer = async () => {
        setLoading(true);
        setError(null);

        try {
            if (!amount || !recipientCpf) {
                throw new Error('O valor da transferência e o CPF do destinatário são obrigatórios.');
            }
            // Chame a função para criar a transferência, passando o valor e o CPF do destinatário
            await createTransfer({ amount, recipient_cpf: recipientCpf });

            // Atualize a lista de transferências após a criação bem-sucedida
            onUpdateTransfers();

            setLoading(false);
            onHide();
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Criar Transferência</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className="text-danger">{error}</p>}
                <Form.Group controlId="amount">
                    <Form.Label>Valor da Transferência</Form.Label>
                    <Form.Control
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="recipientCpf">
                    <Form.Label>CPF do Destinatário</Form.Label>
                    <Form.Control
                        type="text"
                        value={recipientCpf}
                        onChange={(e) => setRecipientCpf(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleCreateTransfer} disabled={loading}>
                    {loading ? 'Criando Transferência...' : 'Criar Transferência'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateTransferModal;
