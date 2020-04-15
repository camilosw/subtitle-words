import React from 'react';
import { css } from 'astroturf';
import { useUser } from 'modules/firebase/AuthProvider';
import { auth } from 'modules/firebase';
import { Link } from 'react-router-dom';
import Container from './Container';

const cn = css`
  .header {
    position: sticky;
    top: 0;
    background-color: #fff;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    z-index: 100;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    color: var(--primary);
    font-weight: bolder;
    font-size: 1.5rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    & > a {
      text-decoration: none;
      color: inherit;
    }
  }
  .userAvatar {
    width: 2rem;
    border-radius: 50%;
  }
  .link {
    padding-right: 1rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const User = () => {
  const user = useUser();

  const logout = () => {
    auth.signOut();
  };

  if (user === undefined) {
    return <div>...</div>;
  }

  if (user) {
    return (
      <div className={cn.row}>
        <div onClick={logout} className={cn.link}>
          Logout
        </div>
        {!!user.photoURL && (
          <img src={user.photoURL} alt="" className={cn.userAvatar} />
        )}
      </div>
    );
  }

  return (
    <div>
      <Link to="/sign-in"> Sign in</Link>
    </div>
  );
};

const Header = () => {
  return (
    <header className={cn.header}>
      <Container>
        <div className={cn.row}>
          <div className={cn.logo}>
            <Link to="/">Subtitle Words</Link>
          </div>
          <div>
            <User />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
