
import React, { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { app } from '../../config/firebase.config';
import { useStateValue } from '../../context/StateProvider';
import { validateUser } from '../../api';
import { actionType } from '../../context/reducer';
import { LoginBg } from '../../assets/img';

const Login = ({ setAuth }) => {
  const navigate = useNavigate();
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async e => {
    e.preventDefault();
    setError('Chức năng đăng nhập với email/password hiện đang phát triển.');
    // TODO: Thêm xử lý gọi API khi backend có login email/pass
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then(userCred => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged(user => {
          if (user) {
            user.getIdToken().then(token => {
              validateUser(token).then(data => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
            navigate("/");
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/login");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem('auth') === 'true') {
      navigate('/');
    }
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <img src={LoginBg} alt="Login Background" className="w-full h-full object-cover" />

      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full md:w-96 bg-white p-6 rounded-lg shadow-lg backdrop-blur-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

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

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
          >
            Đăng nhập
          </button>

          <div
            className="w-full mt-4 flex items-center justify-center gap-2 py-2 rounded-md bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="text-xl" />
            <span>Đăng nhập với Google</span>
          </div>

          <p className="text-sm mt-4 text-center">
            Chưa có tài khoản?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-blue-500 cursor-pointer"
            >
              Đăng ký
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
