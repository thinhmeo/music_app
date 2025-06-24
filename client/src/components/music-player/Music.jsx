import React, { useEffect, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../../context/StateProvider";
import { getAllSongs } from "../../api";
import { actionType } from "../../context/reducer";
import SongCard from "../dashboard/SongCard";

const Music = () => {
    const [songFilter, setsongFilter] = useState("");
    const [isFocus, setIsFocus] = useState(false);
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
        <div className="w-full p-4 flex items-center justify-center flex-col">
            <div className="w-full flex justify-center items-center gap-20">
                {/* Search box */}
                <input
                    type="text"
                    className={`w-52 px-4 py-2 border ${isFocus ? "border-gray-500 shadow-md" : "border-gray-300"} rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
                    placeholder="Search Here..."
                    value={songFilter}
                    onChange={(e) => setsongFilter(e.target.value)}
                    onBlur={() => setIsFocus(false)}
                    onFocus={() => setIsFocus(true)}
                />

                {/* Clear filter button */}
                <AiOutlineClear
                    className="text-3xl text-textColor cursor-pointer"
                    onClick={() => setsongFilter("")}
                />
            </div>

            {/* Song list */}
            <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
                {/* Count */}
                <div className="absolute top-4 left-4">
                    <p className="text-xl font-bold">
                        <span className="text-sm font-semibold text-textColor">Count: </span>
                        {allSongs?.length || 0}
                    </p>
                </div>

                <SongContainer
                    data={allSongs?.filter(song =>
                        song.name.toLowerCase().includes(songFilter.toLowerCase())
                    )}
                />
            </div>
        </div>
    );
};

export const SongContainer = ({ data }) => {
    return (
        <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
            {data && data.length > 0 ? (
                data.map((song, i) => (
                    <SongCard key={song._id} data={song} index={i} type="song" />
                ))
            ) : (
                <p className="text-center w-full text-textColor">No songs found.</p>
            )}
        </div>
    );
};

export default Music;
