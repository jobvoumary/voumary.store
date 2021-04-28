import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next'
import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from '../../styles/styles';

interface DashboardProps {
  products: IFood[],
  isAdmin: Boolean
}
interface IFood {
  id: number,
  image: string,
  name: string,
  price: string,
  description: string,
  available: boolean
}
function Dashboard(props: DashboardProps) {

  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingFood, setEditingFood] = useState({} as IFood)
  const [products, setProducts] = useState<IFood[]>(props.products)

  const handleAddFood = async (food: IFood) => {

    try {
      const response = await api.post('/product', {
        ...food,
        available: true,
      });
      
      setProducts([...products, response.data]);

    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: IFood) => {

    try {
      const foodUpdated = await api.post(
        `/product/update`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = products.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setProducts(foodsUpdated)
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: number) => {

    await api.post(`/product/delete`,
      {
        id: id
      }
    );

    const foodsFiltered = products.filter(food => food.id !== id);

    setProducts(foodsFiltered)
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen)
  }

  const handleEditFood = (food: IFood) => {
    setEditingFood(food)
    setEditModalOpen(true)
  }
  return (
    <>
      <Header openModal={toggleModal} isAdmin={props.isAdmin}/>
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {products &&
          products.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
              isAdmin={props.isAdmin}
            />
          ))}
      </FoodsContainer>
    </>
  );
}



export default Dashboard;
