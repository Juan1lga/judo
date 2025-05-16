import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createTacticalAction, getCompetitors } from '../../api';

function TacticalActionForm() {
    const { fightId } = useParams();
    const [competitorId, setCompetitorId] = useState('');
    const [actionType, setActionType] = useState('');
    const [isEffective, setIsEffective] = useState(false);
    const [competitors, setCompetitors] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompetitors = async () => {
            try {
                console.log('Fetching competitors...');
                const response = await getCompetitors();
                console.log('Competitors fetched:', response.data);
                setCompetitors(response.data);
            } catch (err) {
                console.error('Error fetching competitors:', err.response?.data || err.message);
                setError('Error al cargar competidores. Verifica el backend.');
            }
        };
        fetchCompetitors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!competitorId) {
            setError('Por favor, selecciona un competidor.');
            return;
        }
        if (!actionType.trim()) {
            setError('Por favor, ingresa un tipo de acción.');
            return;
        }
        try {
            const data = {
                fight: parseInt(fightId),
                competitor: parseInt(competitorId),
                action_type: actionType,
                is_effective: isEffective
            };
            console.log('Sending tactical action data:', data);
            const response = await createTacticalAction(data);
            console.log('Tactical action created:', response.data);
            navigate(`/competitions/fights/${fightId}`);
        } catch (err) {
            console.error('Error creating tactical action:', err.response?.data || err.message);
            setError(err.response?.data?.detail || 'Error al registrar acción táctica. Verifica los datos y el backend.');
        }
    };

    return (
        <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Registrar Acción Táctica</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Competidor</label>
                    <select
                        className="form-control"
                        value={competitorId}
                        onChange={(e) => setCompetitorId(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un competidor</option>
                        {competitors.map((competitor) => (
                            <option key={competitor.id} value={competitor.id}>
                                {competitor.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Tipo de Acción</label>
                    <input
                        type="text"
                        className="form-control"
                        value={actionType}
                        onChange={(e) => setActionType(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isEffective}
                        onChange={(e) => setIsEffective(e.target.checked)}
                    />
                    <label className="form-check-label">¿Es efectiva?</label>
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrar</button>
            </form>
        </div>
    );
}

export default TacticalActionForm;