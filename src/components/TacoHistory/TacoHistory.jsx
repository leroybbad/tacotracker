import { useState, useMemo } from 'react';
import { useTacoData } from '../../hooks/useTacoData';
import TacoCard from './TacoCard';
import TacoFilter from './TacoFilter';
import './TacoHistory.css';

const TacoHistory = () => {
  const { tacos } = useTacoData();
  const [sortBy, setSortBy] = useState('date'); // 'date', 'location', 'type'
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    location: '',
    protein: '',
    viewMode: 'grid' // 'grid' or 'list'
  });
  
  // Filter and sort tacos
  const filteredAndSortedTacos = useMemo(() => {
    // First, filter tacos
    let filtered = [...tacos];
    
    // Date range filter
    if (filters.dateRange.start) {
      filtered = filtered.filter(taco => taco.date >= filters.dateRange.start);
    }
    if (filters.dateRange.end) {
      filtered = filtered.filter(taco => taco.date <= filters.dateRange.end);
    }
    
    // Location filter
    if (filters.location) {
      const locationQuery = filters.location.toLowerCase();
      filtered = filtered.filter(taco => 
        taco.location.city.toLowerCase().includes(locationQuery) ||
        taco.location.state.toLowerCase().includes(locationQuery) ||
        taco.location.country.toLowerCase().includes(locationQuery)
      );
    }
    
    // Protein filter
    if (filters.protein) {
      filtered = filtered.filter(taco => 
        taco.protein.includes(filters.protein)
      );
    }
    
    // Then, sort tacos
    switch (sortBy) {
      case 'date':
        // Sort by date, newest first
        return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        
      case 'location':
        // Sort by location (country, then state, then city)
        return filtered.sort((a, b) => {
          const locationA = `${a.location.country}-${a.location.state}-${a.location.city}`;
          const locationB = `${b.location.country}-${b.location.state}-${b.location.city}`;
          return locationA.localeCompare(locationB);
        });
        
      case 'type':
        // Sort by protein type
        return filtered.sort((a, b) => {
          const typeA = a.protein.sort().join('-');
          const typeB = b.protein.sort().join('-');
          return typeA.localeCompare(typeB);
        });
        
      default:
        return filtered;
    }
  }, [tacos, sortBy, filters]);
  
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };
  
  const handleFilterChange = (newFilters) => {
    setFilters({
      ...filters,
      ...newFilters
    });
  };
  
  return (
    <div className="taco-history">
      <TacoFilter 
        sortBy={sortBy} 
        filters={filters} 
        onSortChange={handleSortChange} 
        onFilterChange={handleFilterChange}
      />
      
      {filteredAndSortedTacos.length > 0 ? (
        <div className={`taco-list ${filters.viewMode}`}>
          {filteredAndSortedTacos.map(taco => (
            <TacoCard key={taco.id} taco={taco} viewMode={filters.viewMode} />
          ))}
        </div>
      ) : (
        <div className="no-tacos">
          <p>No tacos found matching your filters.</p>
          {tacos.length === 0 && (
            <p>You haven't logged any tacos yet. Start by adding your first taco!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TacoHistory;