import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { Button, Table } from 'react-bootstrap';
import { fetchDeposits } from '../services/transactions/depositFunctions';
import CreateDepositModal from './deposit/components/CreateDepositModal';
import { format } from 'date-fns';

const DepositPage = () => {
    const [deposits, setDeposits] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);

    const updateDeposits = () => {
        fetchDeposits()
            .then(response => {
                setDeposits(response);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar lista de depósitos:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        updateDeposits();
    }, []);

    return (
        <div>
            <Layout>
                <h1 className='pb-4'>Depositos</h1>
                <Button  variant="primary" onClick={handleShowCreateModal}>
                    Criar Depósito
                </Button>
                <CreateDepositModal
                    show={showCreateModal}
                    onHide={handleCloseCreateModal}
                    onUpdateDeposits={updateDeposits} // Passa a função de atualização como prop
                />
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <div className='text-center'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Valor</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deposits.length === 0 ? (
                                    <tr>
                                        <td colSpan="3">Nenhum dado encontrado</td>
                                    </tr>
                                ) : (
                                    deposits.map((deposit, index) => (
                                        <tr key={index}>
                                            <td>{deposit.authorization_code}</td>
                                            <td>{deposit.amount}</td>
                                            <td>{format(new Date(deposit.created_at), 'dd/MM/yyyy HH:mm:ss')}</td>
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

export default DepositPage;
