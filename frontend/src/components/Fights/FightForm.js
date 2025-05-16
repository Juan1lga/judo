import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createFight, getCompetitors } from '../../api';

function FightForm() {
    const { competitionId } = useParams();
    const [competitor1Id, setCompetitor1Id] = useState('');
    const [competitor2Id, setCompetitor2Id] = useState('');
    const [competitors, setCompetitors] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching competitors...');
                const competitorResponse = await getCompetitors();
                setCompetitors(competitorResponse.data);
                console.log('Competitors fetched:', competitorResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err.response?.data || err.message);
                setError('Error al cargar datos. Verifica el backend.');
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!competitor1Id || !competitor2Id || competitor1Id === competitor2Id) {
            setError('Selecciona dos competidores diferentes.');
            return;
        }
        try {
            const data = {
                competition: parseInt(competitionId),
                competitor1: parseInt(competitor1Id),
                competitor2: parseInt(competitor2Id)
            };
            console.log('Sending fight data:', data);
            const response = await createFight(data);
            console.log('Fight created:', response.data);
            navigate(`/competitions/${competitionId}/fights`);
        } catch (err) {
            console.error('Error creating fight:', err.response?.data || err.message);
            setError(err.response?.data?.detail || 'Error al crear combate. Verifica los datos y el backend.');
        }
    };

    return (
        <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Crear Combate</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Competidor 1</label>
                    <select
                        className="form-control"
                        value={competitor1Id}
                        onChange={(e) => setCompetitor1Id(e.target.value)}
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
                    <label className="form-label">Competidor 2</label>
                    <select
                        className="form-control"
                        value={competitor2Id}
                        onChange={(e) => setCompetitor2Id(e.target.value)}
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
                <button type="submit" className="btn btn-primary w-100">Crear Combate</button>
            </form>
        </div>
    );
}

export default FightForm;