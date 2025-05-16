import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCompetitions } from '../../api';

function CompetitionList() {
    const [competitions, setCompetitions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                const response = await getCompetitions();
                setCompetitions(response.data);
            } catch (err) {
                setError('Error al cargar competiciones');
            }
        };
        fetchCompetitions();
    }, []);

    return (
        <div>
            <h2 className="mb-4">Lista de Competiciones</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Evento</th>
                        <th>Atletas</th>
                        <th>Combates</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {competitions.map((competition) => (
                        <tr key={competition.id}>
                            <td>{competition.name}</td>
                            <td>{competition.type === 'nacional' ? 'Nacional' : 'Internacional'}</td>
                            <td>{competition.event === 'entrenamiento' ? 'Entrenamiento' : 'Combate Oficial'}</td>
                            <td>{competition.num_athletes}</td>
                            <td>{competition.num_fights}</td>
                            <td>
                                <Link to={`/competitions/${competition.id}/fights`} className="btn btn-primary btn-sm">
                                    Gestionar Combates
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CompetitionList;