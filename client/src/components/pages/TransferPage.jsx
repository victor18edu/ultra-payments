import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { Button, Table } from 'react-bootstrap';
import CreateTransferModal from './transfer/components/CreateTransferModal';
import { fetchTransfers } from '../services/transactions/transferFunctions';
import { format } from 'date-fns';

const TransferPage = () => {
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);

    const updateTransfers = () => {
        fetchTransfers()
            .then(response => {
                setTransfers(response);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar lista de transferências:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        updateTransfers();
    }, []);

    return (
        <div>
            <Layout>
                <h1 className='pb-4'>Transferências</h1>
                <Button  variant="primary" onClick={handleShowCreateModal}>
                    Criar Transferência
                </Button>
                <CreateTransferModal
                    show={showCreateModal}
                    onHide={handleCloseCreateModal}
                    onUpdateTransfers={updateTransfers}
                />
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <div className='text-center'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Código de Autorização</th>
                                    <th>Valor</th>
                                    <th>Data</th>
                                    <th>Destinatário (CPF)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transfers.length === 0 ? (
                                    <tr>
                                        <td colSpan="4">Nenhum dado encontrado</td>
                                    </tr>
                                ) : (
                                    transfers.map((transfer, index) => (
                                        <tr key={index}>
                                            <td>{transfer.authorization_code}</td>
                                            <td>{transfer.amount}</td>
                                            <td>{format(new Date(transfer.created_at), 'dd/MM/yyyy HH:mm:ss')}</td>
                                            <td>{transfer.related_user.cpf}</td> {/* Exibir o CPF do destinatário */}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                )}
            </Layout>
        </div>
    );
};

export default TransferPage;
