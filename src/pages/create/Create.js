import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { URL } from '../../util/fetchURL';
import './Create.css';

export default function Create() {
  const [recipeInfo, setRecipeInfo] = useState({
    title: '',
    ingredients: [],
    method: '',
    cookingTime: ''
  });
  const [newIngredient, setNewIngredient] = useState('');
  const ingredientInput = useRef(null);
  const navigate = useNavigate();

  const { data, isPending, error, postData } = useFetch(URL, 'POST');

  const onChangeHandler = (e) => {
    if (e.target.name === 'newIngredient') {
      setNewIngredient(e.target.value);
    } else {
      setRecipeInfo((prevInfo) => ({
        ...prevInfo,
        [e.target.name]: e.target.value
      }));
    }
  };

  const addIngedientHandler = (e) => {
    e.preventDefault();

    const trimmedNewIngredient = newIngredient.trim();

    if (
      trimmedNewIngredient &&
      !recipeInfo.ingredients.includes(trimmedNewIngredient)
    ) {
      setRecipeInfo((prevInfo) => ({
        ...prevInfo,
        ingredients: [...prevInfo.ingredients, trimmedNewIngredient]
      }));
    }

    setNewIngredient('');
    ingredientInput.current.focus();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    postData({
      ...recipeInfo,
      cookingTime: recipeInfo.cookingTime + ' minutes'
    });
  };

  useEffect(() => {
    let timer;
    if (data) {
      timer = setTimeout(() => {
        navigate('/');
      }, 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [data, navigate]);

  return (
    <div className='create'>
      <h2 className='page-title'>Add a new Recipe!</h2>

      <form onSubmit={submitHandler}>
        <label>
          <span>Recipe title:</span>
          <input
            type='text'
            value={recipeInfo.title}
            onChange={onChangeHandler}
            name='title'
            required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className='ingredients'>
            <input
              type='text'
              value={newIngredient}
              onChange={onChangeHandler}
              name='newIngredient'
              ref={ingredientInput}
            />

            <button className='btn' onClick={addIngedientHandler}>
              Add new ingredient!
            </button>
          </div>
        </label>

        <p>
          Current ingredients:
          {recipeInfo.ingredients.map((ingredient) => (
            <em key={ingredient}>{ingredient},</em>
          ))}
        </p>

        <label>
          <span>Recipe method:</span>
          <textarea
            type='text'
            value={recipeInfo.method}
            onChange={onChangeHandler}
            name='method'
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            type='number'
            value={recipeInfo.cookingTime}
            onChange={onChangeHandler}
            name='cookingTime'
            required
          />
        </label>

        <button className='btn' type='submit'>
          Submit!
        </button>
      </form>
    </div>
  );
}
