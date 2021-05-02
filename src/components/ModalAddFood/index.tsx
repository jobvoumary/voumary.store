import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { ImageDropZone } from '../Dropzone';
import { useState } from 'react';

interface IModalAddFoodProps {
  isOpen: boolean,
  setIsOpen: () => void,
  handleAddFood: (data: IFood) => void
}
interface IFood {
  id: number
  image: string,
  name: string,
  price: string,
  description: string,
  available: boolean
}
function ModalAddFood(props: IModalAddFoodProps) {
  const { isOpen, setIsOpen } = props;
  const [files, setFiles] = useState([])

  const handleSubmit = async (data: IFood) => {
    const { setIsOpen, handleAddFood } = props;

    handleAddFood(data);
    setIsOpen();
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <h1>Nova T-Shirt</h1>

        <Input name="name" label="Nome" placeholder="Ex: Moda Italiana" />
        <Input name="price" label="Preço" placeholder="Ex: 19.90" />
        <Input name="description" label="Descrição" placeholder="Descrição" />
        <ImageDropZone files={(files) => setFiles(files)}/>
       
        <button type="submit" data-testid="add-food-button">
          <p className="text">Salvar</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalAddFood;
