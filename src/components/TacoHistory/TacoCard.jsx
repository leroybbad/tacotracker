import { useState } from 'react';
import './TacoCard.css';

const TacoCard = ({ taco, viewMode }) => {
  const [expanded, setExpanded] = useState(false);
  
  const {
    name,
    date,
    location,
    protein,
    toppings,
    preparation,
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
    return `${loc.city}, ${loc.state}, ${loc.country}`;
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
          <div className="taco-location">
            <span className="detail-label">Location:</span> {formatLocation(location)}
          </div>
          
          <div className="taco-protein">
            <span className="detail-label">Protein:</span> {protein.join(', ')}
          </div>
          
          <div className="taco-spice">
            <span className="detail-label">Spice Level:</span> {renderSpiceLevel(spiceLevel)}
          </div>
          
          {expanded && (
            <>
              {preparation && (
                <div className="taco-preparation">
                  <span className="detail-label">Preparation:</span> {preparation}
                </div>
              )}
              
              {toppings.length > 0 && (
                <div className="taco-toppings">
                  <span className="detail-label">Toppings:</span> {toppings.join(', ')}
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