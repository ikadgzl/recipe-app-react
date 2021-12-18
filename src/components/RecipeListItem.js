import './RecipeListItem.css';
import { Link } from 'react-router-dom';

export default function RecipeListItem({ recipe }) {
  const { title, cookingTime, method, id } = recipe;

  return (
    <div className='card'>
      <h3>{title}</h3>
      <p>{cookingTime} to make.</p>
      <div>{method.substring(0, 100)}...</div>

      <Link to={`/recipes/${id}`}>Cook this</Link>
    </div>
  );
}
