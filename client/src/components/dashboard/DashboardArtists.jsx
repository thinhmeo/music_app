import React, { useEffect, useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { getAllArtists, getSongsByArtist } from "../../api";
import { actionType } from "../../context/reducer";

const DashboardArtists = () => {
  const [{ allArtists }, dispatch] = useStateValue();
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artistSongs, setArtistSongs] = useState([]);

  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artists,
        });
      });
    }
  }, []);

  const handleArtistClick = (artist) => {
    setSelectedArtist(artist);

    getSongsByArtist(artist.name).then((data) => {
      setArtistSongs(data.songs);
    });
  };

  return (
      <div className="w-full p-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Artists</h1>
        <div className="w-full flex flex-wrap gap-4">
          {allArtists?.map((artist) => (
              <div
                  key={artist._id}
                  className="p-4 border rounded-md cursor-pointer hover:shadow-md"
                  onClick={() => handleArtistClick(artist)}
              >
                <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-20 h-20 object-cover rounded-full mb-2"
                />
                <p className="text-center font-semibold">{artist.name}</p>
              </div>
          ))}
        </div>

        {selectedArtist && (
            <div className="w-full mt-8">
              <h2 className="text-xl font-bold mb-4">
                Songs by {selectedArtist.name}
              </h2>
              <div className="w-full flex flex-wrap gap-4">
                {artistSongs.length > 0 ? (
                    artistSongs.map((song) => (
                        <div
                            key={song._id}
                            className="p-4 border rounded-md shadow-md"
                        >
                          <p className="font-semibold">{song.name}</p>
                        </div>
                    ))
                ) : (
                    <p>No songs found for this artist.</p>
                )}
              </div>
            </div>
        )}
      </div>
  );
};

export default DashboardArtists;
