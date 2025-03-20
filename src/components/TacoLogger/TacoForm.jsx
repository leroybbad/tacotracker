import { useState } from 'react';
import { PROTEINS, TOPPINGS, SALSAS } from '../../data/initialData';
import './TacoForm.css';

const TacoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    restaurant: '',
    rating: 3,
    location: {
      city: '',
      state: '',
      country: ''
    },
    protein: [],
    toppings: [],
    salsas: [],
    spiceLevel: 3,
    photo: '',
    notes: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects (location)
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      // Handle regular fields
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    
    if (checked) {
      // Add to array
      setFormData({
        ...formData,
        [category]: [...formData[category], value]
      });
    } else {
      // Remove from array
      setFormData({
        ...formData,
        [category]: formData[category].filter(item => item !== value)
      });
    }
  };
  
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({
        ...formData,
        photo: event.target.result
      });
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  // Render checkbox group
  const renderCheckboxGroup = (items, category, displayName) => (
    <div className="form-group checkbox-group">
      <label className="group-label">{displayName}:</label>
      <div className="checkbox-container">
        {items.map(item => (
          <div key={item} className="checkbox-item">
            <input
              type="checkbox"
              id={`${category}-${item}`}
              value={item}
              checked={formData[category].includes(item)}
              onChange={(e) => handleCheckboxChange(e, category)}
            />
            <label htmlFor={`${category}-${item}`}>{item}</label>
          </div>
        ))}
      </div>
    </div>
  );
  
  // Render star rating
  const renderStarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`star ${i <= formData.rating ? 'filled' : ''}`}
          onClick={() => setFormData({...formData, rating: i})}
        >
          ★
        </span>
      );
    }
    return <div className="star-rating">{stars}</div>;
  };
  
  return (
    <form className="taco-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Taco Name/Type:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Al Pastor, Carne Asada"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="restaurant">Restaurant:</label>
        <input
          type="text"
          id="restaurant"
          name="restaurant"
          value={formData.restaurant}
          onChange={handleChange}
          placeholder="e.g., Taco Bell, Local Taqueria"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="rating">Rating:</label>
        {renderStarRating()}
      </div>
      
      <div className="form-section">
        <h3>Location (Optional)</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location.city">City:</label>
            <input
              type="text"
              id="location.city"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="location.state">State/Province:</label>
            <input
              type="text"
              id="location.state"
              name="location.state"
              value={formData.location.state}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="location.country">Country:</label>
          <input
            type="text"
            id="location.country"
            name="location.country"
            value={formData.location.country}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="form-section">
        <h3>Ingredients</h3>
        {renderCheckboxGroup(PROTEINS, 'protein', 'Protein')}
        {renderCheckboxGroup(TOPPINGS, 'toppings', 'Toppings')}
        {renderCheckboxGroup(SALSAS, 'salsas', 'Salsas')}
      </div>
      
      <div className="form-group">
        <label htmlFor="spiceLevel">Spice Level: {formData.spiceLevel}</label>
        <input
          type="range"
          id="spiceLevel"
          name="spiceLevel"
          value={formData.spiceLevel}
          onChange={handleChange}
          min="1"
          max="5"
        />
        <div className="spice-level-markers">
          <span>Mild</span>
          <span>Medium</span>
          <span>Hot</span>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="photo">Photo (optional):</label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handlePhotoUpload}
        />
        {formData.photo && (
          <div className="photo-preview">
            <img src={formData.photo} alt="Taco preview" />
          </div>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="notes">Notes (optional):</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any special notes about this taco..."
          rows="3"
        />
      </div>
      
      <button type="submit" className="submit-button">Save Taco</button>
    </form>
  );
};

export default TacoForm;