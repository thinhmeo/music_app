import React, { useEffect, useState } from "react";
import { getAllAlbumns, getSongsByAlbum } from "../../api";
import { actionType } from "../../context/reducer";
import SongCard from "./SongCard";
import { useStateValue } from "../../context/StateProvider";

const DashboardAlbums = () => {
    const [{ allAlbums }, dispatch] = useStateValue();
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [albumSongs, setAlbumSongs] = useState([]);

    useEffect(() => {
        if (!allAlbums) {
            getAllAlbumns().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_ALBUMS,
                    allAlbums: data.album,
                });
            });
        }
    }, []);

    const handleAlbumClick = (album) => {
        setSelectedAlbum(album);

        getSongsByAlbum(album.name).then((data) => {
            setAlbumSongs(data.songs);
        });
    };

    return (
        <div className="w-full p-4 flex items-center justify-center flex-col">
            <h1 className="text-2xl font-bold mb-4">Albums</h1>
            <div className="w-full flex flex-wrap gap-4">
                {allAlbums?.map((album) => (
                    <div
                        key={album._id}
                        className="p-4 border rounded-md cursor-pointer hover:shadow-md"
                        onClick={() => handleAlbumClick(album)}
                    >
                        <img
                            src={album.imageUrl}
                            alt={album.name}
                            className="w-20 h-20 object-cover rounded-md mb-2"
                        />
                        <p className="text-center font-semibold">{album.name}</p>
                    </div>
                ))}
            </div>

            {selectedAlbum && (
                <div className="w-full mt-8">
                    <h2 className="text-xl font-bold mb-4">
                        Songs in album {selectedAlbum.name}
                    </h2>
                    <div className="w-full flex flex-wrap gap-4">
                        {albumSongs.length > 0 ? (
                            albumSongs.map((song, i) => (
                                <SongCard key={song._id} data={song} index={i} type="album" />
                            ))
                        ) : (
                            <p>No songs found for this album.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardAlbums;
