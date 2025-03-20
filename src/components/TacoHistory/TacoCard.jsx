import { useState } from 'react';
import './TacoCard.css';

const TacoCard = ({ taco, viewMode }) => {
  const [expanded, setExpanded] = useState(false);
  
  const {
    name,
    date,
    restaurant,
    rating,
    location,
    protein,
    toppings,
    salsas,
    spiceLevel,
    photo,
    notes
  } = taco;
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  // Format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format the location
  const formatLocation = (loc) => {
    const parts = [];
    if (loc.city) parts.push(loc.city);
    if (loc.state) parts.push(loc.state);
    if (loc.country) parts.push(loc.country);
    return parts.join(', ') || 'Not specified';
  };
  
  // Render rating as stars
  const renderRating = (stars) => {
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };
  
  // Render spice level as emojis
  const renderSpiceLevel = (level) => {
    const emojis = '🔥'.repeat(level);
    return emojis || 'No spice';
  };
  
  return (
    <div className={`taco-card ${viewMode} ${expanded ? 'expanded' : ''}`} onClick={toggleExpand}>
      <div className="taco-card-header">
        <h3 className="taco-name">{name}</h3>
        <div className="taco-date">{formatDate(date)}</div>
      </div>
      
      <div className="taco-card-content">
        {photo && (
          <div className="taco-photo">
            <img src={photo} alt={name} />
          </div>
        )}
        
        <div className="taco-details">
          <div className="taco-restaurant">
            <span className="detail-label">Restaurant:</span> {restaurant}
          </div>
          
          <div className="taco-rating">
            <span className="detail-label">Rating:</span> 
            <span className="rating-stars">{renderRating(rating)}</span>
          </div>
          
          {(location.city || location.state || location.country) && (
            <div className="taco-location">
              <span className="detail-label">Location:</span> {formatLocation(location)}
            </div>
          )}
          
          <div className="taco-protein">
            <span className="detail-label">Protein:</span> {protein.join(', ')}
          </div>
          
          <div className="taco-spice">
            <span className="detail-label">Spice Level:</span> {renderSpiceLevel(spiceLevel)}
          </div>
          
          {expanded && (
            <>
              {toppings.length > 0 && (
                <div className="taco-toppings">
                  <span className="detail-label">Toppings:</span> {toppings.join(', ')}
                </div>
              )}
              
              {salsas && salsas.length > 0 && (
                <div className="taco-salsas">
                  <span className="detail-label">Salsas:</span> {salsas.join(', ')}
                </div>
              )}
              
              {notes && (
                <div className="taco-notes">
                  <span className="detail-label">Notes:</span> {notes}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <div className="taco-card-footer">
        <button className="expand-button" onClick={(e) => {
          e.stopPropagation();
          toggleExpand();
        }}>
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
};

export default TacoCard;