import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { ImageDropZone } from '../Dropzone';
import { useState } from 'react';

interface IModalEditFoodProps {
  isOpen: boolean,
  setIsOpen: () => void,
  editingFood: IFoodRequest,
  handleUpdateFood: (data: IFoodRequest)=>void
}
interface IFoodRequest {
  id: number,
  image: string
  name: string
  price: string
  description: string,
  available: boolean
}
function ModalEditFood(props: IModalEditFoodProps) {
  const { isOpen, setIsOpen, editingFood } = props;

  const [files, setFiles] = useState([])
  const handleSubmit = async (data:IFoodRequest) => {
    const { setIsOpen, handleUpdateFood } = props;

    handleUpdateFood(data);
    setIsOpen();
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar T-Shirt</h1>
        <Input name="name" label="Nome do produto" placeholder="Ex: Moda Italiana" />
        <Input name="price" label="Preço" placeholder="Ex: 19.90" />
        <Input name="description" label="Descrição" placeholder="Descrição" />
        <ImageDropZone files={(files) => setFiles(files)} initialFiles={editingFood.image}/>

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Salvar</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}


export default ModalEditFood;
