import React, { useState } from 'react';
import { getCompetitorStats } from '../../api';

function Statistics() {
    const [stats, setStats] = useState(null);
    const [competitorId, setCompetitorId] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFetchStats = async () => {
        if (!competitorId) {
            setError('Por favor, ingresa un ID de competidor.');
            setSuccess('');
            return;
        }
        try {
            const response = await getCompetitorStats(competitorId);
            setStats(response.data);
            setSuccess('¡Estadísticas cargadas con éxito!');
            setError('');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Error al obtener estadísticas. Verifica el ID y el backend.');
            setSuccess('');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Estadísticas de Competidor</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <div className="mb-3">
                <label className="form-label">ID del Competidor</label>
                <input
                    type="number"
                    className="form-control"
                    value={competitorId}
                    onChange={(e) => setCompetitorId(e.target.value)}
                    placeholder="Ingresa el ID del competidor"
                />
            </div>
            <button className="btn btn-primary mb-3" onClick={handleFetchStats}>
                Obtener Estadísticas
            </button>
            {stats && (
                <div className="card p-3">
                    <h4>{stats.competitor.name}</h4>
                    <p>Total de Ataques: {stats.total_attacks}</p>
                    <p>Ataques Efectivos: {stats.effective_attacks}</p>
                    <p>Efectividad: {(stats.effectiveness * 100).toFixed(2)}%</p>
                </div>
            )}
        </div>
    );
}

export default Statistics;