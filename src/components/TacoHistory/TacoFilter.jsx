import { PROTEINS } from '../../data/initialData';
import './TacoFilter.css';

const TacoFilter = ({ sortBy, filters, onSortChange, onFilterChange }) => {
  const handleSortClick = (value) => {
    onSortChange(value);
  };
  
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      dateRange: {
        ...filters.dateRange,
        [name]: value
      }
    });
  };
  
  const handleLocationChange = (e) => {
    onFilterChange({ location: e.target.value });
  };
  
  const handleProteinChange = (e) => {
    onFilterChange({ protein: e.target.value });
  };
  
  const handleViewModeChange = (mode) => {
    onFilterChange({ viewMode: mode });
  };
  
  const handleClearFilters = () => {
    onFilterChange({
      dateRange: { start: '', end: '' },
      location: '',
      protein: ''
    });
  };
  
  return (
    <div className="taco-filter">
      <div className="filter-row sort-buttons">
        <div className="filter-label">Sort by:</div>
        <div className="button-group">
          <button 
            className={`sort-button ${sortBy === 'date' ? 'active' : ''}`}
            onClick={() => handleSortClick('date')}
          >
            Date
          </button>
          <button 
            className={`sort-button ${sortBy === 'location' ? 'active' : ''}`}
            onClick={() => handleSortClick('location')}
          >
            Location
          </button>
          <button 
            className={`sort-button ${sortBy === 'type' ? 'active' : ''}`}
            onClick={() => handleSortClick('type')}
          >
            Type
          </button>
        </div>
      </div>
      
      <div className="filter-row">
        <div className="filter-label">Date Range:</div>
        <div className="date-inputs">
          <input
            type="date"
            name="start"
            value={filters.dateRange.start}
            onChange={handleDateChange}
            placeholder="Start Date"
          />
          <span>to</span>
          <input
            type="date"
            name="end"
            value={filters.dateRange.end}
            onChange={handleDateChange}
            placeholder="End Date"
          />
        </div>
      </div>
      
      <div className="filter-row">
        <div className="filter-label">Location:</div>
        <input
          type="text"
          value={filters.location}
          onChange={handleLocationChange}
          placeholder="Filter by city, state, or country"
          className="text-filter"
        />
      </div>
      
      <div className="filter-row">
        <div className="filter-label">Protein:</div>
        <select 
          value={filters.protein} 
          onChange={handleProteinChange}
          className="select-filter"
        >
          <option value="">All proteins</option>
          {PROTEINS.map(protein => (
            <option key={protein} value={protein}>{protein}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-footer">
        <button 
          className="clear-filters-button"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
        
        <div className="view-toggle">
          <button 
            className={`view-button ${filters.viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('grid')}
            aria-label="Grid View"
            title="Grid View"
          >
            ◫ Grid
          </button>
          <button 
            className={`view-button ${filters.viewMode === 'list' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('list')}
            aria-label="List View"
            title="List View"
          >
            ≡ List
          </button>
        </div>
      </div>
    </div>
  );
};

export default TacoFilter;