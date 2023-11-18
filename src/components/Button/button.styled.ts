import styled, { css } from 'styled-components';
import { ButtonProps } from './interface';

const Button = styled.button<ButtonProps>`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');

  height: 40px;
  padding: 10px 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.1px;
  font-family: 'Roboto', sans-serif;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}

  ${(props) =>
    props.variant === 'filled' &&
    css`
      border: none;
      color: #fff;
      background-color: #6750a4;

      &:hover {
        box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
      }

      &:active,
      &:focus {
        box-shadow: none;
        background-color: #7965af;
      }
    `}

  ${(props) =>
    props.variant === 'filled' &&
    props.disabled &&
    css`
      color: rgba(29, 27, 32, 0.38);
      background-color: rgba(29, 27, 32, 0.12);

      &:hover {
        box-shadow: none;
      }

      &:active,
      &:focus {
        box-shadow: none;
        background-color: rgba(29, 27, 32, 0.12);
      }
    `}

  ${(props) =>
    props.variant === 'outlined' &&
    css`
      color: #6750a4;
      background: transparent;
      border: 1px solid #79747e;

      &:hover,
      &:active {
        background-color: rgba(103, 80, 164, 0.08);
      }

      &:focus {
        border-color: #6750a4;
      }
    `}

  ${(props) =>
    props.variant === 'outlined' &&
    props.disabled &&
    css`
      color: rgba(29, 27, 32, 0.38);
      background: transparent;
      border-color: rgba(29, 27, 32, 0.12);
      cursor: not-allowed;

      &:hover,
      &:active {
        background: transparent;
      }
    `}
`;

const Styled = { Button };

export default Styled;
