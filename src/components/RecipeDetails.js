import './RecipeDetails.css';

export default function RecipeDetails({ recipe }) {
  const { title, cookingTime, method, ingredients } = recipe;

  return (
    <>
      <h2 className='page-title'>{title}</h2>
      <p>Takes {cookingTime} to cook.</p>
      <ul>
        {ingredients.map((ing) => (
          <li key={ing}>{ing}</li>
        ))}
      </ul>
      <p className='method'>{method}</p>
    </>
  );
}
