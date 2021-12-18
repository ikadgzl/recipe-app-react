import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

export default function SearchBar() {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const onChangeHandler = (e) => [setTerm(e.target.value)];

  const submitHandler = (e) => {
    e.preventDefault();

    setTerm('');
    navigate(`search?q=${term}`);
  };

  return (
    <div className='searchbar'>
      <form onSubmit={submitHandler}>
        <label>
          <span>Search:</span>
          <input type='text' onChange={onChangeHandler} value={term} required />
        </label>
      </form>
    </div>
  );
}
