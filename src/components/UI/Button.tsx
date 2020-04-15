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
`;

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({ className, ...rest }: Props) => {
  return <button {...rest} className={[className, cn.button].join(' ')} />;
};

export default Button;
