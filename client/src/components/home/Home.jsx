import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useStateValue} from "../../context/StateProvider";
import {SongContainer} from "../music-player/Music";
import {getAllSongs} from "../../api";
import {actionType} from "../../context/reducer";

const Home = () => {
    const navigate = useNavigate();
    const [{ allSongs }, dispatch] = useStateValue();

    useEffect(() => {
        if (!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.songs,
                });
            });
        }
    }, [allSongs]);
    return (
        <div className="w-full px-6 py-10 bg-gray-100 flex flex-col items-start gap-8">
            <h1 className="text-3xl font-bold text-headingColor">Music Zone</h1>

            {/* Danh sách bài hát rút gọn */}
            <div className="w-full">
                <h2 className="text-xl font-semibold mb-4">Top Songs</h2>

                {/* Hiển thị chỉ 6 bài đầu */}
                <SongContainer data={allSongs?.slice(0, 6)}/>

                {/* Nút Show more (tạm thời navigate vào trang music)*/}
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => navigate("/musics")}
                        className="text-sm font-medium text-blue-500 hover:underline hover:text-blue-700 transition-all"
                    >
                        Show more →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home