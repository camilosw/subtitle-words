import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { css } from 'astroturf';

const cn = css`
  .button {
    background-color: var(--secondary-light);
    color: var(--secondary-dark);
    padding: 0.375rem 1.25rem;
    border-width: 0;
    border-radius: 1rem;
    font-weight: bold;
    display: inline-block;
    outline: none;
    cursor: pointer;
    &:hover {
      background-color: var(--secondary-light-hover);
    }
  }
  :global(.link) {
    background-color: inherit;
    color: inherit;
    font-weight: 400;
    &:hover {
      text-decoration: underline;
      background-color: inherit;
    }
  }
`;

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: '' | 'link';
};

const Button = ({ className, variant = '', ...rest }: Props) => {
  return (
    <button {...rest} className={[className, cn.button, variant].join(' ')} />
  );
};

export default Button;
