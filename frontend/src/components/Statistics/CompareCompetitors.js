import React, { useState } from 'react';
import { compareCompetitors } from '../../api';

function CompareCompetitors() {
    const [competitor1Id, setCompetitor1Id] = useState('');
    const [competitor2Id, setCompetitor2Id] = useState('');
    const [comparison, setComparison] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleCompare = async () => {
        if (!competitor1Id || !competitor2Id) {
            setError('Por favor, ingresa los IDs de ambos competidores.');
            setSuccess('');
            return;
        }
        if (competitor1Id === competitor2Id) {
            setError('Los IDs deben ser diferentes.');
            setSuccess('');
            return;
        }
        try {
            const response = await compareCompetitors(competitor1Id, competitor2Id);
            setComparison(response.data);
            setSuccess('¡Comparación cargada con éxito!');
            setError('');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Error al comparar competidores. Verifica los IDs y el backend.');
            setSuccess('');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Comparar Competidores</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">ID Competidor 1</label>
                    <input
                        type="number"
                        className="form-control"
                        value={competitor1Id}
                        onChange={(e) => setCompetitor1Id(e.target.value)}
                        placeholder="Ingresa el ID del competidor 1"
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">ID Competidor 2</label>
                    <input
                        type="number"
                        className="form-control"
                        value={competitor2Id}
                        onChange={(e) => setCompetitor2Id(e.target.value)}
                        placeholder="Ingresa el ID del competidor 2"
                    />
                </div>
            </div>
            <button className="btn btn-primary mb-3" onClick={handleCompare}>
                Comparar
            </button>
            {comparison && (
                <div className="row">
                    <div className="col-md-6">
                        <div className="card p-3">
                            <h4>{comparison.competitor1.data.name}</h4>
                            <p>Total de Ataques: {comparison.competitor1.total_attacks}</p>
                            <p>Ataques Efectivos: {comparison.competitor1.effective_attacks}</p>
                            <p>Efectividad: {(comparison.competitor1.effectiveness * 100).toFixed(2)}%</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card p-3">
                            <h4>{comparison.competitor2.data.name}</h4>
                            <p>Total de Ataques: {comparison.competitor2.total_attacks}</p>
                            <p>Ataques Efectivos: {comparison.competitor2.effective_attacks}</p>
                            <p>Efectividad: {(comparison.competitor2.effectiveness * 100).toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CompareCompetitors;