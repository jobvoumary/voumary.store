import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import Link from 'next/link'

import { Container } from './styles';
import api from '../../services/api';
import urlify from '../../utils';

interface IFood {
  id: number
  image: string,
  name: string,
  price: string,
  description: string,
  available: boolean
}

interface IFoodProps {
  food: IFood,
  handleDelete: (foodId: number) => void,
  handleEditFood: (data: IFood) => void,
  isAdmin: Boolean
}
function Food(props: IFoodProps) {
  const isAdmin = props.isAdmin
  const [isAvailable, setIsAvailable] = useState(props.food.available)

  const { food, handleDelete } = props;
  const toggleAvailable = async () => {
    const { food } = props;

    await api.post(
      `/product/update`,
      { ...food, available: !isAvailable, },
    );
    setIsAvailable(!isAvailable);
  }
  const setEditingFood = () => {
    const { food, handleEditFood } = props;

    handleEditFood(food);
  }
  return (
    <Container available={isAvailable}>
      <Link href={`/${urlify(food.name)}/${food.id}`}>
        <a>
          <header>
            <img src={food.image[0]} alt={food.name} />
          </header>
          <section className="body">
            <h2>{food.name}</h2>
            <p>{food.description}</p>
            <p className="price">
              <span>A partir de</span>
              R$ <b>{food.price}</b>
            </p>
          </section>
        </a>
      </Link>
      { isAdmin ? (
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={setEditingFood}
              data-testid={`edit-food-${food.id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => handleDelete(food.id)}
              data-testid={`remove-food-${food.id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>

          <div className="availability-container">
            <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

            <label htmlFor={`available-switch-${food.id}`} className="switch">
              <input
                id={`available-switch-${food.id}`}
                type="checkbox"
                checked={isAvailable}
                onChange={toggleAvailable}
                data-testid={`change-status-food-${food.id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </section>
      ) : null}

    </Container>
  )
}

export default Food;
