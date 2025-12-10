import { useState } from "react";

export default function Search() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [searched, setSearched] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    const apiKey = "AIzaSyCnnwBLQaPRuosSPFGLD7p_c_-UBepAt-s";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(
      query
    )}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    setResults(data.items || []);
    setSearched(true);
  };

  const addToFavorites = (video) => {
    if (!favorites.some((v) => v.id.videoId === video.id.videoId)) {
      setFavorites([...favorites, video]);
    }
  };

  const removeFromFavorites = (videoId) => {
    setFavorites(favorites.filter((v) => v.id.videoId !== videoId));
  };

  return (
    <div className="container">
      <div className={`favoritesSidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="favoritesHeader">
          <h3>Favorites</h3>
          <button
            className="sidebarToggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "−" : "+"}
          </button>
        </div>

        {sidebarOpen && (
          <div className="favoritesList">
            {favorites.map((video) => (
              <div key={video.id.videoId} className="favoriteItem">

                <img
                  src={video.snippet.thumbnails.default.url}
                  alt="thumb"
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/watch?v=${video.id.videoId}`,
                      "_blank"
                    )
                  }
                />

                <div className="favInfo">
                  <p>{video.snippet.title}</p>
                  <button onClick={() => removeFromFavorites(video.id.videoId)}>
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      <div className="searchDiv">
        <div className="search-bar box">
          <input
            className="searchBar"
            type="text"
            placeholder="Search your favorite YouTube videos here!"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <button className="searchButton" onClick={handleSearch}>
            <i className="fas fa-search"></i> Search
          </button>
        </div>
      </div>

      {results.length > 0 && <h2 className="searchResults">Search Results</h2>}

      <div className="results">
        {results.map((video) => (
          <div key={video.id.videoId} className="videoCard">
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              onClick={() =>
                window.open(
                  `https://www.youtube.com/watch?v=${video.id.videoId}`,
                  "_blank"
                )
              }
              style={{ cursor: "pointer" }}
            />

            <h2 style={{ marginBottom: "0.5rem" }}>
              {video.snippet.title}
            </h2>

            <p style={{ marginTop: "0" }}>
              {video.snippet.channelTitle}
            </p>

            <button onClick={() => addToFavorites(video)}>
              Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
