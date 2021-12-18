import './Navbar.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <div className='navbar'>
      <nav>
        <Link to='/' className='brand'>
          <h1>Recipe`s</h1>
        </Link>
        <SearchBar />
        <Link to='create'>Create Recipe</Link>
      </nav>
    </div>
  );
}
