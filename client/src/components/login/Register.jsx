import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        avatarUrl: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('/api/users/register', form);
            if (res.data.success) {
                alert('Đăng ký thành công! Hãy đăng nhập.');
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng ký thất bại');
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <input
                    type="text"
                    name="name"
                    placeholder="Tên hiển thị"
                    className="w-full mb-4 px-4 py-2 border rounded"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full mb-4 px-4 py-2 border rounded"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    className="w-full mb-4 px-4 py-2 border rounded"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="avatarUrl"
                    placeholder="Ảnh đại diện (URL - tuỳ chọn)"
                    className="w-full mb-4 px-4 py-2 border rounded"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
                >
                    Đăng ký
                </button>

                <p className="text-sm mt-4 text-center">
                    Đã có tài khoản?{' '}
                    <span
                        onClick={() => navigate('/login')}
                        className="text-blue-500 cursor-pointer"
                    >
            Đăng nhập
          </span>
                </p>
            </form>
        </div>
    );
};

export default Register;