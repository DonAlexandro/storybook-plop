import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from "react"
import Styled from "./button.styled"
import { ButtonProps } from "./interface"

export const Button: FC<PropsWithChildren<ButtonHTMLAttributes<ButtonProps> & ButtonProps>> = ({ variant = 'filled', icon, children, ...props }) => {
  return (
    <Styled.Button variant={variant} {...props}>
      {icon ? (
        <React.Fragment>
          <span>{icon}</span>
          {children}
        </React.Fragment>
      ) : children}
    </Styled.Button>
  )
}
