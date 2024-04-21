import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { Button, Table } from 'react-bootstrap';
import { fetchDeposits } from '../services/transactions/depositFunctions';
import CreateDepositModal from './deposit/components/CreateDepositModal';



const DepositPage = () => {
    const [deposits, setDeposits] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);

    useEffect(() => {
        fetchDeposits()
            .then(response => {
                setDeposits(response);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar lista de depósitos:', error);
                setLoading(false);
            });
    }, []);
    return (
        <div>
            <Layout>
                <h1 className='pb-4'>Depositos</h1>
                <Button  variant="primary" onClick={handleShowCreateModal}>
                    Criar Depósito
                </Button>
                <CreateDepositModal show={showCreateModal} onHide={handleCloseCreateModal} />
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
                                            <td>{index + 1}</td>
                                            <td>{deposit.amount}</td>
                                            <td>{deposit.date}</td>
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
