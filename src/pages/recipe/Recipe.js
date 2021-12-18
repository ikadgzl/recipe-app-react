import './Recipe.css';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { URL } from '../../util/fetchURL';
import RecipeDetails from '../../components/RecipeDetails';

export default function Recipe() {
  const { id } = useParams();

  const { data: recipe, isPending, error } = useFetch(`${URL}/${id}`);

  return (
    <div className='recipe'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>loding...</p>}

      {recipe && <RecipeDetails recipe={recipe} />}
    </div>
  );
}
