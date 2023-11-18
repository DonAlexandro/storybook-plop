import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { Action } from '../interface';
import { Row } from '@tanstack/react-table';

type ActionsMenuProps<R> = {
  row: Row<R>;
  actions: Action[];
};

export const ActionsMenu = <R,>({ actions, row }: ActionsMenuProps<R>) => {
  const [actionsMenuAnchor, setActionsMenuAnchor] = React.useState<null | HTMLElement>(null);

  const isActionMenuOpened = Boolean(actionsMenuAnchor);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionsMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setActionsMenuAnchor(null);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleMenuOpen}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={actionsMenuAnchor} open={isActionMenuOpened} onClose={handleMenuClose}>
        {actions.map((action) => (
          <MenuItem
            onClick={() => {
              action.onClick(row);
              handleMenuClose();
            }}
            key={action.key}
          >
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};
