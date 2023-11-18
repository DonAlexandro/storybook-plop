import { Box, BoxProps } from '@mui/material';
import styled, { css } from 'styled-components';

const Resizer = styled(Box)<BoxProps & { $isResizing?: boolean }>`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 5px;
  background: rgba(0, 0, 0, 0.5);
  cursor: col-resize;
  user-select: none;
  touch-action: none;
  opacity: 0;

  &:hover {
    opacity: 1;
  }

  ${(props) =>
    props.$isResizing &&
    css`
      background: blue;
      opacity: 1;
    `}
`;

const Styled = { Resizer };

export default Styled;
