import { useLocation } from 'react-router-dom';
import { URL } from '../../util/fetchURL';
import { useFetch } from '../../hooks/useFetch';
import './Search.css';
import RecipeList from '../../components/RecipeList';

export default function Search() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('q');

  const URLwithParams = URL + search;
  const { data: recipes, isPending, error } = useFetch(URLwithParams);

  return (
    <div>
      <h2 className='page-title'>Recipes including {query}</h2>

      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>loding...</p>}

      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
}
