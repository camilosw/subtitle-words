import React from 'react';
import { parse, subTitleType } from 'subtitle';
import { css } from 'astroturf';

const cn = css`
  .subtitlesInput {
    width: 100%;
    height: 10rem;
  }
`;

interface Props {
  onAdded(values: subTitleType[]): void;
}

const AddSubtitles = ({ onAdded }: Props) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const parsedSubtitles = parse(event.target.value);
    if (parsedSubtitles && parsedSubtitles.length > 0) {
      onAdded(parsedSubtitles);
    }
  };

  return (
    <textarea
      name="subtitles"
      placeholder="Paste subtitles here..."
      className={cn.subtitlesInput}
      onChange={handleOnChange}
    />
  );
};

export default AddSubtitles;
