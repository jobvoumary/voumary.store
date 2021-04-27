import styled, { css } from 'styled-components';

interface ContainerProps {
  available: boolean
}
export const Container = styled.div<ContainerProps>`
  background: #f0f0f5;
  border-radius: 8px;
  display: flex;

  flex-direction: column;
  header {
    padding: 0px;
    margin: 0px;
    border-radius: 8px 8px 0px 0px;
    overflow: hidden;
    transition: 0.3s opacity;
    text-align: center;
    
    ${props =>
    !props.available &&
    css`
        opacity: 0.3;
      `};

    img {
      pointer-events: none;
      user-select: none;
      width: 100%;
    }
  }

  section.body {
    flex-grow: 2;

    padding: 8px 12px;
    @media(min-width: 768px){
      padding: 30px;
    }
    h2 {
      font-size: 16px;
      @media(min-width: 768px){
        font-size: 24px;
      }
      color: #3d3d4d;
    }

    p {
      color: #3d3d4d;

      margin-top: 4px;
      font-size: 12px;
      @media(min-width: 768px){
        margin-top: 16px;
        font-size: 24px;
      }
    }

    .price {
      font-weight: 600;
      color: #39b100;
      font-size: 18px;
      margin-top: 4px;
      b {
        font-weight: 600;
      }
      @media(min-width: 768px){
        margin-top: 16px;
        font-size: 24px;
      }
    }
  }
  
  section.footer {
    justify-content: space-between;
    align-items: center;
    background: #e4e4eb;
    border-radius: 0px 0px 8px 8px;
    
    padding: 8px 12px;
    @media(min-width: 768px){
      padding: 20px 30px;
      display: flex;
    }

    div.icon-container {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      @media(min-width: 768px){
        align-items: normal;
        justify-content: normal;
      }
      button {
        background: #fff;
        padding: 10px;
        border-radius: 8px;
        display: flex;
        border: none;
        transition: 0.1s;

        svg {
          color: #3d3d4d;
        }

        & + button {
          margin-left: 6px;
        }
      }
    }

    div.availability-container {
      display: flex;
      align-items: center;

      justify-content: center;
      margin-top: 10px;

      @media(min-width: 768px){
        justify-content: normal;
        margin-top: 0px;
      }
      p {
        color: #3d3d4d;
        display: none;
        @media(min-width: 768px){
          padding: 20px 30px;
          display: inherit;
        }
      }

      .switch {
        position: relative;
        display: inline-block;
        width: 88px;
        height: 32px;
        margin-left: 12px;

        & input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #c72828;
          -webkit-transition: 0.4s;
          transition: 0.4s;
          border-radius: 16px;

          &:before {
            position: absolute;
            content: '';
            height: 20px;
            width: 40px;
            left: 8px;
            bottom: 6px;
            background-color: white;
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: 10px;
          }
        }

        input:checked + .slider {
          background-color: #39b100;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(32px);
          -ms-transform: translateX(32px);
          transform: translateX(32px);
        }
      }
    }
  }
`;
