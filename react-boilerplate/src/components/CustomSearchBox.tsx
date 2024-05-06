import { useState, useRef } from 'react';
import {
    useInstantSearch,
    useSearchBox,
    UseSearchBoxProps
} from 'react-instantsearch';
import { SearchIcon } from '@heroicons/react/outline';

function CustomSearchBox(props: UseSearchBoxProps) {
    const { query, refine } = useSearchBox(props);
    const { status } = useInstantSearch();
    const [inputValue, setInputValue] = useState(query);
    const inputRef = useRef<HTMLInputElement>(null);

    const isSearchStalled = status === 'stalled';
    const [isFocused, setIsFocused] = useState(false);

    function setQuery(newQuery: string) {
        setInputValue(newQuery);
        refine(newQuery);
    }

    function handleFocus() {
        setIsFocused(true);
    }

    function handleBlur() {
        setIsFocused(false);
    }

    return (
        <div>
            <form
                action=""
                role="search"
                noValidate
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    if (inputRef.current) {
                        inputRef.current.blur();
                    }
                }}
                onReset={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    setQuery('');

                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                }}
            >
                <div className={`relative border rounded-full shadow-md ${isFocused ? 'border-yellow-400' : 'border-gray-300'}`}>
                    <span className="absolute inset-y-0 left-1 flex items-center pl-2">
                        <SearchIcon className={`h-5 w-5 ${isFocused ? 'text-yellow-400' : 'text-gray-400'}`} />
                    </span>
                    <input
                        ref={inputRef}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        placeholder="Search for Pokémon"
                        spellCheck={false}
                        maxLength={512}
                        type="search"
                        value={inputValue}
                        onChange={(event) => {
                            setQuery(event.currentTarget.value);
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        autoFocus
                        className="py-2 pl-10 pr-4 flex-grow rounded-full text-slate-800 focus:outline-none w-full"
                    />
                    {inputValue.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            className="absolute inset-y-0 right-0 flex items-center pr-2 focus:outline-none"
                        >
                            <span className={`${isFocused ? 'text-blue-500 hover:text-blue-600' : 'text-gray-400'}`}>
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </span>
                        </button>
                    )}
                </div>
                <span hidden={!isSearchStalled} className="ml-2">Searching…</span>
            </form>
        </div>
    );
}

export default CustomSearchBox;


