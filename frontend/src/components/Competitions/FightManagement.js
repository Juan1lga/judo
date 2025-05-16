import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCompetitors, createFight, getFights } from '../../api';

function FightManagement() {
    const { id } = useParams();
    const [competitors, setCompetitors] = useState([]);
    const [fights, setFights] = useState([]);
    const [formData, setFormData] = useState({
        competitor1_id: '',
        competitor2_id: '',
        competition: id,
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const competitorsResponse = await getCompetitors();
                const fightsResponse = await getFights();
                setCompetitors(competitorsResponse.data);
                setFights(fightsResponse.data.filter(fight => fight.competition === parseInt(id)));
            } catch (err) {
                setError('Error al cargar datos');
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createFight(formData);
            setFights([...fights, response.data]);
            setFormData({ competitor1_id: '', competitor2_id: '', competition: id });
        } catch (err) {
            setError('Error al crear combate');
        }
    };

    return (
        <div>
            <h2 className="mb-4">Gestionar Combates</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="card p-4 mb-4">
                <div className="mb-3">
                    <label className="form-label">Competidor 1</label>
                    <select
                        className="form-select"
                        name="competitor1_id"
                        value={formData.competitor1_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar</option>
                        {competitors.map((competitor) => (
                            <option key={competitor.id} value={competitor.id}>
                                {competitor.user.username}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Competidor 2</label>
                    <select
                        className="form-select"
                        name="competitor2_id"
                        value={formData.competitor2_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar</option>
                        {competitors.map((competitor) => (
                            <option key={competitor.id} value={competitor.id}>
                                {competitor.user.username}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Crear Combate</button>
            </form>
            <h3>Combates Creados</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Competidor 1</th>
                        <th>Competidor 2</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {fights.map((fight) => (
                        <tr key={fight.id}>
                            <td>{fight.competitor1.user.username}</td>
                            <td>{fight.competitor2.user.username}</td>
                            <td>
                                <Link to={`/fights/${fight.id}/tactical-actions`} className="btn btn-primary btn-sm">
                                    Registrar Acciones
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FightManagement;