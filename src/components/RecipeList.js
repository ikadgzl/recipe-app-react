import './RecipeList.css';
import RecipeListItem from './RecipeListItem';

export default function RecipeList({ recipes }) {
  if (recipes.length === 0) {
    return <div className='error'>No recipes to load...</div>;
  }

  return (
    <div className='recipe-list'>
      {recipes.map((recipe) => (
        <RecipeListItem recipe={recipe} key={recipe.id} />
      ))}
    </div>
  );
}
