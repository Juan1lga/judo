import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCompetition } from '../../api';

function CompetitionForm() {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { name, date };
            await createCompetition(data);
            setSuccess('¡Competición registrada con éxito!');
            setError('');
            setName('');
            setDate('');
            setTimeout(() => {
                setSuccess('');
                navigate('/competitions/new'); // Redirige para permitir otro registro
            }, 3000); // Redirige tras 3 segundos
        } catch (err) {
            setError('Error al registrar competición');
            setSuccess('');
        }
    };

    return (
        <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Registrar Competición</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrar</button>
            </form>
        </div>
    );
}

export default CompetitionForm;