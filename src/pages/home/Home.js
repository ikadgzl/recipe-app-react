import './Home.css';
import RecipeList from '../../components/RecipeList';
import { URL } from '../../util/fetchURL';
import { useFetch } from '../../hooks/useFetch';

export default function Home() {
  const { data: recipes, isPending, error } = useFetch(URL);

  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>loding...</p>}

      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
}
