import React from "react";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const MyFavorite = () => {
    const [{ favoriteSongs }, dispatch] = useStateValue();

    const removeFromFavorites = (id) => {
        dispatch({
            type: actionType.REMOVE_FAVORITE,
            payload: id,
        });
    };

    return (
        <div className="w-full p-4">
            <h2 className="text-2xl font-bold text-headingColor mb-4">My Favorite Songs</h2>
            {favoriteSongs && favoriteSongs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {favoriteSongs.map(song => (
                        <div key={song._id} className="bg-white p-4 rounded-lg shadow-md">
                            <p className="text-lg font-semibold">{song.name}</p>
                            <p className="text-sm text-gray-500">{song.artist}</p>
                            <button
                                onClick={() => removeFromFavorites(song._id)}
                                className="mt-2 text-sm text-red-500 hover:underline"
                            >
                                Xoá khỏi yêu thích
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-textColor">Bạn chưa yêu thích bài hát nào.</p>
            )}
        </div>
    );
};

export default MyFavorite;
