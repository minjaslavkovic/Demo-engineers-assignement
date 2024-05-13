import { useRef, useEffect, useState } from 'react';
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch'; 
import { SearchIcon, XIcon } from '@heroicons/react/outline'; 

export function CustomRefinementList(props: UseRefinementListProps) {
  // Extract values from the useRefinementList hook.
  const {
    items, 
    refine, 
    searchForItems, 
    canToggleShowMore, 
    isShowingMore, 
    toggleShowMore, 
  } = useRefinementList(props);

  // Ref for the search input.
  const inputRef = useRef<HTMLInputElement>(null);
  // State to manage search query.
  const [searchQuery, setSearchQuery] = useState('');
  // State to manage input focus.
  const [isFocused, setIsFocused] = useState(false);

  // Focus the input on component mount.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Function to handle search.
  const handleSearch = (value: string) => {
    setSearchQuery(value); 
    searchForItems(value); 
  };

  // Function to clear search.
  const clearSearch = () => {
    setSearchQuery(''); 
    searchForItems(''); 
    if (inputRef.current) {
      inputRef.current.focus(); 
    }
  };

  return (
    <>
      {/* Search input */}
      <div className="relative mb-6 sm:mb-4">
        <div className={`flex items-center border rounded-full shadow-sm ${isFocused ? 'border-yellow-400' : 'border-gray-300'} focus-within:border-yellow-400 bg-white`}>
          <span className={`p-2 ${isFocused ? 'text-yellow-400' : 'text-gray-400'}`}>
            {/* Search icon */}
            <SearchIcon className="h-4 w-4" /> 
          </span>
          <input
            ref={inputRef}
            type="search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            value={searchQuery}
            onChange={(event) => handleSearch(event.currentTarget.value)}
            onFocus={() => setIsFocused(true)} 
            onBlur={() => setIsFocused(false)} 
            className="py-1 pl-1 pr-8 rounded-full text-sm focus:outline-none w-24 sm:w-32" 
            placeholder="Search"
          />
          {/* Clear search button */}
          {searchQuery.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-2 focus:outline-none"
            >
              {/* Clear search icon */}
              <XIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" /> 
            </button>
          )}
        </div>
      </div>
      {/* Refinement list */}
      <ul>
        {/* Map through items and display */}
        {items.map((item) => (
          <li key={item.label} className="pb-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={item.isRefined}
                onChange={() => refine(item.value)} // Handle checkbox change
                className="form-checkbox text-green-400 h-5 w-5 pr-2 cursor-pointer" // Checkbox styles
              />
              {/* Item label */}
              <span className="px-2 text-gray-700 hover:text-gray-900 text-base">{item.label}</span> 
              {/* Item count */}
              <span className="ml-1 bg-white text-emerald-500 hover:text-emerald-700 font-semibold text-xs px-2 py-1 rounded-full shadow-md">{item.count}</span> 
            </label>
          </li>
        ))}
      </ul>
      {/* Show more/less button */}
      <button className="my-2 bg-green-400 text-white px-3 py-2 rounded-full text-xs hover:bg-green-500" onClick={toggleShowMore} disabled={!canToggleShowMore}>
        {isShowingMore ? 'Show less' : 'Show more'} 
      </button>
    </>
  );
}

