import React, { useState, useEffect } from 'react';
import { getCompetitors } from '../../api';

function CompetitorList() {
    const [competitors, setCompetitors] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCompetitors = async () => {
            try {
                const response = await getCompetitors();
                setCompetitors(response.data);
            } catch (err) {
                setError('Error al cargar competidores');
            }
        };
        fetchCompetitors();
    }, []);

    return (
        <div>
            <h2 className="mb-4">Lista de Competidores</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Género</th>
                        <th>División de Peso</th>
                        <th>Categoría</th>
                        <th>Años de Experiencia</th>
                    </tr>
                </thead>
                <tbody>
                    {competitors.map((competitor) => (
                        <tr key={competitor.id}>
                            <td>{competitor.user.username}</td>
                            <td>{competitor.gender === 'M' ? 'Masculino' : 'Femenino'}</td>
                            <td>{competitor.weight_division} kg</td>
                            <td>{competitor.category === 'sub21' ? 'Sub 21' : '1ra Categoría'}</td>
                            <td>{competitor.years_experience}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CompetitorList;