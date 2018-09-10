import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
    border-radius: 3px;
    padding: 0.5em;
    margin-left: 1em;
    background: var(--secondary-theme-color);
    color: #fff;
    border: none;
    text-transform: uppercase;
    transition: all 0.05s linear 0s;
    cursor: pointer;

    &:hover {
        background-color: rgba(var(--secondary-theme-color-rgb), 0.8);
        transform: scale(1.01);
    }

    &&:disabled {
        background-color: #999;
        cursor: default;
        transform: none;
    }

    ${props =>
        props.primary &&
        css`
        background: var(--primary-theme-color);

        &:hover {
            background-color: rgba(var(--primary-theme-color-rgb), 0.8);
            transform: scale(1.01);
        }   
    `}; 
`;

class Button extends PureComponent {    

    render() {
        const {
            children, primary, disabled, handleOnClick, 
        } = this.props;
        
        return (
            <StyledButton primary={primary} onClick={handleOnClick} disabled={disabled}>
                {children}
            </StyledButton>
        );
    }
}

export default Button;