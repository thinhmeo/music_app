import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../context/StateProvider';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const   UserProfile = () => {
    const [{ user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.user?.name || '');
    const [imageUrl, setImageUrl] = useState(user?.user?.imageUrl || '');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleSave = () => {
        const updatedUser = {
            ...user.user,
            name,
            imageUrl,
        };

        // TODO: Gửi API cập nhật profile lên server (viết API riêng)
        console.log("Cập nhật:", updatedUser);

        // Cập nhật vào context (tuỳ thuộc vào cấu trúc useStateValue reducer của bạn)
        dispatch({
            type: 'SET_USER',
            user: { user: updatedUser },
        });

        alert("Cập nhật thành công!");
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

            <div className="flex flex-col gap-4">
                <label className="text-sm text-gray-600">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />

                <label className="text-sm text-gray-600">Avatar URL</label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />

                {imageUrl && (
                    <motion.img
                        src={imageUrl}
                        alt="Avatar Preview"
                        className="w-24 h-24 rounded-full object-cover mx-auto mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    />
                )}

                <motion.button
                    onClick={handleSave}
                    whileTap={{ scale: 0.9 }}
                    className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Save Changes
                </motion.button>
                {/* Nút quay về trang Home */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate('/')}
                    className="mt-2 p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                    Quay về trang Home
                </motion.button>
            </div>
        </div>
    );
};

export default UserProfile;
