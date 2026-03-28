import React from "react";
import { teamStyles } from "../Data/TeamData";
import "../App.css";

const ResultCard = ({ item, activeTab }) => {/* The Blueprint for a single info card that adapts whether it's showing a person or a team. */
  const getTeamColor = (item) => { /* A Paint Picker that grabs the official team color (like Ferrari red) or defaults to gray if it's missing. */
    if (!item) return "#333";
    const teamId = item.Constructor?.constructorId || item.constructorId;
    return teamStyles[teamId]?.mainColor || "#333";
  };

  const isDriver = activeTab === "drivers"; /* A Quick Switch that checks if the user is looking at the Drivers list or the Teams list. */
  const itemId = isDriver ? item.driverId : item.constructorId; /* A Label Maker that decides whether to use a Driver ID or a Constructor ID to find the right data. */


  let imagePath;/* An Image Scout that looks for a photo in my folders but stays calm and hides the image if it can't find the file. */
  try {
    imagePath = require(`../Assets/${activeTab}/${itemId}.png`);
  } catch (err) {
    console.warn(`Image not found for ${itemId}`);
    imagePath = null; 
  }

  return ( /* The Layout where the card actually gets built and placed on the screen. */
    <div className="Competitor-Column">
      <div 
        className={`Result-Card ${isDriver ? "card-driver" : "card-team"}`} 
        style={{ backgroundColor: getTeamColor(item) }}/* The Interior Decorator that paints the card's background based on the team's branding. */
      >
        {imagePath && ( /* The Photo Frame that only shows a picture if the Scout actually found one. */
          <img 
            src={imagePath} 
            className={isDriver ? "Driver-Headshot" : "Team-Logo"} 
            alt={isDriver ? item.familyName : item.name} 
          />
        )}

        <div className="Card-Overlay-Fade" />

        <div className="Name-Display">
          {isDriver ? (
            
            <div className="Driver-Name-Wrapper">
              <span className="First-Name">{item.givenName}</span>
              <span className="Last-Name">{item.familyName}</span>
            </div>
          ) : (
            
            <div className="Constructor-Name-Wrapper">
              <span className="Team-Full-Name">{item.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;