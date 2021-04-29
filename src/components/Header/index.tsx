import { FiPlusSquare } from 'react-icons/fi';

import { Container } from './styles';

interface IHeaderProps {
  openModal: ()=>void,
  isAdmin?: Boolean
}

function Header(props: IHeaderProps){
  const { openModal } = props;
  const isAdmin = props.isAdmin
  return (
    <Container>
      <header>
        <img src="https://i.imgur.com/UAAhJRr.png" alt="@voumary" />
        {isAdmin ? (
          <nav>
          <div>
            <button
              type="button"
              onClick={openModal}
            >
              <div className="text">Nova T-shirt</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
        ): null}
        
      </header>
    </Container>
  )
}

export default Header;
