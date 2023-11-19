import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Recipes, handleSearch } from './Recipes';
import Form from '../components/Form/Form';
import SearchIcon from '../components/SearchIcon';

const RecipesFilter = ({ selectedRecipeHander }) => {
  const [error, toggleError] = useState(false);
  const [loading, toggleLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const [healt, setHealt] = useState('');
  const [calories, setCalories] = useState('');
  const [diet, setDiet] = useState('');

  const { ingredientParam } = useParams();

  const [filtersChange, setFilterChange] = useState(false);
  const inputSearchRef = useRef(ingredientParam);


  const handleRefChange = (value) => {
    inputSearchRef.current.value = value;
  };

  const navigate = useNavigate();

  const showFilters = (e) => {
    document.getElementById('filtersSection').style.display = 'block';
    document.getElementById('searchInput').style.width = '330px';
    e.target.style.display = 'none';
  };

  const clearFilters = () => {
    setHealt('');
    setCalories('');
    setDiet('');
  };

  const closeFilters = () => {
    clearFilters();
    document.getElementById('filtersSection').style.display = 'none';
    document.getElementById('searchInput').style.width = '220px';
    document.getElementById('filters').style.display = 'block';
  };

  const handleChangeFilters = (e, type) => {
    setFilterChange(true);
    switch (type) {
      case 'healt': setHealt(e.target.value); break;
      case 'calories': setCalories(e.target.value); break;
      case 'diet': setDiet(e.target.value); break;
      default: break;
    }
  };

  const handleSearchChange = () => {
    navigate(`/recipes-filter/${inputSearchRef.current.value}`);

    if (filtersChange) {
      document.getElementById('submitForm').click();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchChange();
    }
  };

  const handleSearchSubmit = async (e) => {

    e.preventDefault();

    toggleError(false);
    try {
      toggleLoading(true);
      const data = await handleSearch(inputSearchRef.current.value, healt, calories, diet);
      setRecipes(data);

      if (!data.length) {
        toggleError('Data not found!');
      }

      toggleLoading(false);
    } catch (e) {
      console.error(e);
      toggleError('Something went wrong retrieving the data');
      toggleLoading(false);
    }
  }

  useEffect(() => {
    if (ingredientParam) {
      inputSearchRef.current.value = ingredientParam;
      document.getElementById('submitForm').click();
    }
  }, [ingredientParam]);

  const formFields = {
    havingParent: true,
    parent: 'searchSection',
    fields:
      [
        { fieldType: 'input', id: 'searchInput', ref: inputSearchRef, defaultValue: inputSearchRef.current, onChange: handleRefChange, onKeyDown: handleKeyDown, placeholder: 'Search for recipes' },
        { fieldType: 'button', id: 'search', child: <SearchIcon />, type: 'button', onClick: handleSearchChange },
        { fieldType: 'button', id: 'filters', text: 'Filters', type: 'button', onClick: showFilters },
        { fieldType: 'button', id: 'submitForm', text: '', type: 'submit', showBtn: false },
      ]
  };

  return (
    <div className="app">
      <h1>Recipe Search</h1>
      <Form formClass="filtersForm" formFields={formFields} showSubmitBtn={false} onSubmit={handleSearchSubmit}>
        <div id="filtersSection">
          <div className="rowSectionRight">
            <Link to="#" onClick={clearFilters}>Clear</Link>
            <Link to="#" onClick={closeFilters}>X</Link>
          </div>
          <h3>Filters</h3>
          <div className="rowSection">
            <select id="allergies" value={healt} onChange={(e) => { handleChangeFilters(e, 'healt') }}>
              <option value="" disabled>Allergies</option>
              <option value="alcohol-cocktail"> alcohol-cocktail  </option>
              <option value="alcohol-free"> alcohol-free  </option>
              <option value="celery-free"> celery-free  </option>
              <option value="crustacean-free"> crustacean-free  </option>
              <option value="dairy-free"> dairy-free  </option>
              <option value="DASH"> DASH  </option>
              <option value="egg-free"> egg-free  </option>
              <option value="fish-free"> fish-free  </option>
              <option value="fodmap-free"> fodmap-free  </option>
              <option value="gluten-free"> gluten-free  </option>
              <option value="immuno-supportive"> immuno-supportive  </option>
              <option value="keto-friendly"> keto-friendly  </option>
              <option value="kidney-friendly"> kidney-friendly  </option>
              <option value="kosher"> kosher  </option>
              <option value="low-fat-abs"> low-fat-abs  </option>
              <option value="low-potassium"> low-potassium  </option>
              <option value="low-sugar"> low-sugar  </option>
              <option value="lupine-free"> lupine-free  </option>
              <option value="Mediterranean"> Mediterranean  </option>
              <option value="mollusk-free"> mollusk-free  </option>
              <option value="mustard-free"> mustard-free  </option>
              <option value="no-oil-added"> no-oil-added  </option>
              <option value="paleo"> paleo  </option>
              <option value="peanut-free"> peanut-free  </option>
              <option value="pescatarian"> pescatarian  </option>
              <option value="pork-free"> pork-free  </option>
              <option value="red-meat-free"> red-meat-free  </option>
              <option value="sesame-free"> sesame-free  </option>
              <option value="shellfish-free"> shellfish-free  </option>
              <option value="soy-free"> soy-free  </option>
              <option value="sugar-conscious"> sugar-conscious  </option>
              <option value="sulfite-free"> sulfite-free  </option>
              <option value="tree-nut-free"> tree-nut-free  </option>
              <option value="vegan"> vegan  </option>
              <option value="vegetarian"> vegetarian  </option>
              <option value="wheat-free"> wheat-free  </option>
            </select>
            <input type="text" id="calories" placeholder='Calories' value={calories} onChange={(e) => { handleChangeFilters(e, 'calories') }} />
          </div>
          <div className="rowSection">
            <select id="diet" value={diet} onChange={(e) => { handleChangeFilters(e, 'diet') }}>
              <option value="" disabled>Diet</option>
              <option value="balanced"> balanced  </option>
              <option value="high-fiber"> high-fiber  </option>
              <option value="high-protein"> high-protein  </option>
              <option value="low-carb"> low-carb  </option>
              <option value="low-fat"> low-fat  </option>
              <option value="low-sodium"> low-sodium  </option>
            </select>
          </div>
        </div>
      </Form>
      {error && <h2 className="error">{error}</h2>}
      {loading && <div className="loader"></div>}
      {!loading && <>
        <div className="recipes">
          <Recipes recipes={recipes} selectedRecipeHander={selectedRecipeHander} />
        </div>
      </>}
    </div>
  );
};

export default RecipesFilter;
