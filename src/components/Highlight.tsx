import React, { useState, useEffect } from 'react';

interface Props {
  suggestion: string;
  matchString: string;
}

const Highlight: React.FC<Props> = (props) => {
  const { suggestion, matchString } = props;
  const matchLength = matchString.length;
  const highlightedText = suggestion.slice(0, matchLength);
  const normalText = suggestion.substring(matchLength);

  return (
    <>
      <span className="rct-autocomplete-highlight">{highlightedText}</span>{normalText}
    </>
  )
};

export default Highlight;
