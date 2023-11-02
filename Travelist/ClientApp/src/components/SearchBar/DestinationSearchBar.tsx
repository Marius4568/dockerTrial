import { useRef, useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import useClickOutside from '../../hooks/useClickOutside.ts';
import mockDestinations from '../../mockData/mockDestinations.ts';
import { setFocus, setSuggestions, setSearchQuery } from '../../redux/slices/destinationSearchSlice.ts';
import { RootState } from '../../redux/stores/store.ts';
import debounce from '../../utils/debounce.ts';
import Button from '../Button/Button.tsx';

export default function DestinationSearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const inputRef = useRef(null);
  const searchContainer = useRef(null);

  const { isFocused, suggestions } = useSelector((state: RootState) => state.destinationSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    const debouncedUpdate = debounce(updateFilteredSuggestions, 300);

    debouncedUpdate();

    return () => {
      if (debouncedUpdate.cancel) {
        debouncedUpdate.cancel();
      }
    };

  }, [inputValue]);

  useEffect(() => { 
    if(!isFocused) setHighlightedIndex(null);;
  }, [isFocused]);

  useClickOutside(searchContainer, () => dispatch(setFocus(false)));

  function updateFilteredSuggestions() {
    // TODO: make an API call when the backend is ready
    const filteredSuggestions = mockDestinations.filter((destination) =>
      destination.city.toLowerCase().includes(inputValue.toLowerCase())
    );

    dispatch(setSuggestions(filteredSuggestions));
    dispatch(setSearchQuery(inputValue));
  }

  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    if (event.target === inputRef.current) {
      dispatch(setFocus(true));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDestinationClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.textContent) {
      setInputValue(target.textContent);
      dispatch(setFocus(false));
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => { 
    switch (event.key) {
    case 'ArrowDown':
    case 'ArrowUp':
      handleUpAndDownKeys(event.key);
      break;
    case 'Enter':
      handleEnterKey();
      break;
    default:
      break;
    }
  };

  function handleUpAndDownKeys(key: string) {
    console.log(highlightedIndex);
    const direction = key.toLowerCase() === 'arrowdown' ? 1 : -1;
    const { length } = suggestions;

    if (highlightedIndex === null) {
      setHighlightedIndex(direction === 1 ? 0 : length - 1);
      return;
    }

    setHighlightedIndex((highlightedIndex + direction + length) % length);
  }

  function handleEnterKey() {
    if (highlightedIndex !== null && suggestions[highlightedIndex]) {
      setInputValue(suggestions[highlightedIndex].city);
      setHighlightedIndex(null);
      dispatch(setFocus(false));

      if (inputRef.current) { 
        (inputRef.current as HTMLInputElement).blur();
      }
    }
    if (inputValue.length > 0) { 
      // TODO: Handle search when backend is ready
    }
  }

  function handleSearchButtonClick() { 
    // TODO: Handle search when backend is ready
    setHighlightedIndex(null);
    dispatch(setFocus(false));
  }

  return (
    <div ref={searchContainer} className={`absolute -bottom-11 left-[50%] flex w-[80%] translate-x-[-50%] justify-center rounded-2xl bg-[#90CEAC]/80 px-6 py-5 shadow-lg sm:w-[60%] md:w-[60%] ${isFocused ? 'z-10' : ''}`}>
      <div className='relative w-full'>
        <FiSearch className='absolute left-4 top-[50%] hidden translate-y-[-50%] text-[1.25rem] sm:block' />
        <input 
          ref={inputRef}
          value={inputValue}
          className=" border-gray focus:border-gray-focus/70 w-full rounded-full border-2 p-3 pl-4 pr-[4.5rem] shadow-2xl outline-none transition-all duration-300 ease-in-out sm:pl-[3rem] sm:pr-[6.5rem]"
          type="text"
          placeholder="Search Destinations..."
          onChange={handleChange}
          onKeyDown={handleInputKeyDown}
          onFocus={handleFocus}
        />
        <Button handleClick={handleSearchButtonClick} theme="black" title="" className='absolute right-2 top-[50%] translate-y-[-50%] py-2 sm:px-5'>
          <p className="hidden sm:block">Search</p>
          <FiSearch className="block text-[1.25rem] sm:hidden" />
        </Button>
      </div>
      
      {isFocused && (
        <>
          {/* We're handling key events in the input therefore disabling the error below */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div 
            className="absolute left-0 top-full mt-2 w-full rounded-lg bg-white shadow-lg"
            onClick={handleDestinationClick}
            role="listbox"
            tabIndex={0}
          >
            {suggestions.length === 0 && inputValue.length > 0 ? (
              <div className="px-4 py-2">No results found.</div>
            ) : suggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                role='option'
                aria-selected={highlightedIndex === index ? 'true' : 'false'}
                className={`hover:bg-gray focus:bg-gray cursor-pointer px-4 py-2 ${highlightedIndex === index ? 'bg-gray' : ''}`}
              >
                {suggestion.city}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}