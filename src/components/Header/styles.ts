import styled from 'styled-components';

export const Container = styled.div`
  background: #FBCDCD;
  padding: 30px 0;

  header {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 8px 90px;
    @media(min-width: 768px){
      padding: 0 0 90px;
    }
    img{
      width: 120px;
      height: auto;
      @media(min-width: 768px){
        width: auto
      }
    }
    nav {
      div {
        button {
          font-weight: 600;
          border-radius: 8px;
          border: 0;
          background: #39b100;
          color: #fff;

          display: flex;
          flex-direction: row;
          align-items: center;

          .text {
            padding: 16px 24px;
            display: none;
            @media(min-width: 768px){
              display: initial
            }
          }

          .icon {
            display: flex;
            padding: 16px 16px;
            background: #41c900;
            border-radius: 8px;
            margin: 0 auto;
            @media(min-width: 768px){
              border-radius: 0 8px 8px 0;
            }
          }
        }
      }
    }
  }
`;
