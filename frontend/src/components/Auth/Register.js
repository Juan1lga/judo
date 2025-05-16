import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        gender: 'M',
        weight_division: '55',
        category: 'sub21',
        years_experience: 0,
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            setError('Error al registrar usuario');
        }
    };

    return (
        <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Registrarse</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Género</label>
                    <select className="form-select" name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">División de Peso</label>
                    <select className="form-select" name="weight_division" value={formData.weight_division} onChange={handleChange}>
                        {formData.gender === 'M' ? (
                            <>
                                <option value="55">55 kg</option>
                                <option value="60">60 kg</option>
                                <option value="66">66 kg</option>
                                <option value="73">73 kg</option>
                                <option value="81">81 kg</option>
                                <option value="90">90 kg</option>
                                <option value="100">100 kg</option>
                                <option value="+100">+100 kg</option>
                            </>
                        ) : (
                            <>
                                <option value="44">44 kg</option>
                                <option value="48">48 kg</option>
                                <option value="52">52 kg</option>
                                <option value="57">57 kg</option>
                                <option value="63">63 kg</option>
                                <option value="70">70 kg</option>
                                <option value="78">78 kg</option>
                                <option value="+78">+78 kg</option>
                            </>
                        )}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
                        <option value="sub21">Sub 21</option>
                        <option value="primera">1ra Categoría</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Años de Experiencia</label>
                    <input
                        type="number"
                        className="form-control"
                        name="years_experience"
                        value={formData.years_experience}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;