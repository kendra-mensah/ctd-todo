import { NavLink } from 'react-router-dom';

function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>

      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : 'inactive')}
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'active' : 'inactive')}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
