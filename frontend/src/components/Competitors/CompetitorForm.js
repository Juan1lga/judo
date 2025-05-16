import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCompetitor } from '../../api';

function CompetitorForm() {
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [weightDivision, setWeightDivision] = useState('');
    const [category, setCategory] = useState('');
    const [experienceYears, setExperienceYears] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const maleWeightDivisions = ['55kg', '60kg', '66kg', '73kg', '81kg', '90kg', '100kg', '+100kg'];
    const femaleWeightDivisions = ['44kg', '48kg', '52kg', '57kg', '63kg', '70kg', '78kg', '+78kg'];
    const categories = ['Sub 21', 'Juvenil', '1ra categoría'];

    // Determinar las divisiones de peso según el género
    const weightDivisions = gender === 'Masculino' ? maleWeightDivisions : gender === 'Femenino' ? femaleWeightDivisions : [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                full_name: fullName,
                gender,
                weight_division: weightDivision,
                category,
                experience_years: parseInt(experienceYears)
            };
            await createCompetitor(data);
            setSuccess('¡Competidor registrado con éxito!');
            setError('');
            setFullName('');
            setGender('');
            setWeightDivision('');
            setCategory('');
            setExperienceYears('');
            setTimeout(() => {
                setSuccess('');
                navigate('/competitors/new'); // Redirige para permitir otro registro
            }, 3000); // Redirige tras 3 segundos
        } catch (err) {
            setError('Error al registrar competidor: ' + (err.response?.data?.detail || err.message));
            setSuccess('');
        }
    };

    return (
        <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Registrar Competidor</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input
                        type="text"
                        className="form-control"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Género</label>
                    <select
                        className="form-control"
                        value={gender}
                        onChange={(e) => {
                            setGender(e.target.value);
                            setWeightDivision(''); // Resetear división de peso al cambiar género
                        }}
                        required
                    >
                        <option value="">Selecciona género</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">División de Peso</label>
                    <select
                        className="form-control"
                        value={weightDivision}
                        onChange={(e) => setWeightDivision(e.target.value)}
                        required
                        disabled={!gender} // Deshabilitar si no se ha seleccionado género
                    >
                        <option value="">Selecciona división de peso</option>
                        {weightDivisions.map((division) => (
                            <option key={division} value={division}>{division}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <select
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Selecciona categoría</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Años de Experiencia</label>
                    <input
                        type="number"
                        className="form-control"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        min="0"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrar</button>
            </form>
        </div>
    );
}

export default CompetitorForm;