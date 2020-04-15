import React from 'react';
import { css } from 'astroturf';
import { Link, LinkProps } from 'react-router-dom';

const cn = css`
  .button {
    background-color: var(--secondary-light);
    color: var(--secondary-dark);
    padding: 0.375rem 1.25rem;
    border-radius: 1rem;
    font-weight: bold;
    &:hover {
      text-decoration: none;
      background-color: var(--secondary-light-hover);
    }
  }
`;

const ButtonLink = ({ children, className, ...rest }: LinkProps) => {
  return (
    <Link className={[className, cn.button].join(' ')} {...rest}>
      {children}
    </Link>
  );
};

export default ButtonLink;
