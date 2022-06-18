import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import Highlight from 'components/Highlight';

interface Props {
  namesList: string[];
  autoFocus?: boolean;
}

const Autocomplete: React.FC<Props> = (props) => {
  const [inputText, setInputText] = useState<string>('');
  const [suggestionsList, setSuggestionsList] = useState<string[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { namesList, autoFocus } = props;

  useEffect(() => {
    // USABILITY: bring focus to autocomplete on component mount
    autoFocus && inputRef.current?.focus();
  });

  const getSuggestions = (searchQuery: string): string[] => {
    return namesList.filter((name) =>
      name.toLowerCase().startsWith(searchQuery.toLowerCase()))
  }

  const resetSuggestionsListt = (): void => {
    setSuggestionsList([]);
  }

  const resetActiveSuggestion = (): void => {
    setActiveSuggestion(-1);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputText(event.target.value);

    if(!event.target.value.length) {
      resetSuggestionsListt();
      return;
    }

    // USABILITY: set first suggestion as default so you can press enter while
    // typing to autocomplete without using arrrow keys
    setActiveSuggestion(0);

    const suggestions = getSuggestions(event.target.value);
    setSuggestionsList(suggestions);
  }

  const handleKeyPress = (event: React.KeyboardEvent): void => {
    const isValidStepUp = activeSuggestion > -1;
    const isValidStepDown = activeSuggestion < (suggestionsList.length - 1);

    switch(event.key) {
      case 'Enter':
        activeSuggestion > -1 && confirmSuggestion();
        break;
      case 'ArrowUp':
        // USABILITY: pressing arrow up in a text field will move the cursor back to the start
        // of the string of text. preventDefault() will override this behavior.
        event.preventDefault();
        isValidStepUp && setActiveSuggestion(activeSuggestion - 1);
        break;
      case 'ArrowDown':
        isValidStepDown && setActiveSuggestion(activeSuggestion + 1);
        break;
    }
  };

  const handleClick = (event: React.MouseEvent, suggestedItem: Number = activeSuggestion): void => {
    event.preventDefault();
    confirmSuggestion();
  }

  const confirmSuggestion = (suggestionIndex = activeSuggestion) : void => {
    setInputText(suggestionsList[suggestionIndex]);
    resetActiveSuggestion();
    resetSuggestionsListt();
  }

  const renderSuggestedItemsList = (suggestionsList: string[], matchString: string): React.ReactNode => {
    return suggestionsList.map(
      (suggestion, index) => {
        const isActiveSuggestion = index === activeSuggestion;
        const styles = isActiveSuggestion 
          ? { backgroundColor: '#dfe5f7'}
          : {};

        return (
          <div
            key={`autocomplete-${index}`}
            className="rct-autocomplete-suggested-item"
            style={styles}
            onClick={(event) => handleClick(event, index)}
            onMouseEnter={() => setActiveSuggestion(index)}>
              <Highlight suggestion={suggestion} matchString={matchString} />
          </div>
        );
      }
    );
  }

  return (
    <>
      <input
        className="rct-autocomplete"
        ref={inputRef}
        placeholder={'Enter username'}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        value={inputText} />
      {renderSuggestedItemsList(suggestionsList, inputText)}
    </>
  )
};

export default Autocomplete;
