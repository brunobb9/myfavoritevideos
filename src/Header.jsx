import React from "react";

export default function Header() {
  return (
    <header className="header">
      <div className="headerContainer">
   <img src="./src/assets/imgs/yt-icon.png" className="iconYT"/>
        <h1 className="intro" onClick={() => window.location.reload()} style={{cursor:"pointer"}}>
           My Favorite Videos
        </h1>
      </div>
    </header>
  );
}
