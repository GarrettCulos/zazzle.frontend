import React from 'react';
import styled from 'styled-components';
import './index.scss';

interface ColorBarInterface {
    width?: number;
    color: string;
}
const ColorBar = styled.div<ColorBarInterface>`
    min-height: 200px;
    background-color: ${({ color }) => color };
    width: ${({ width }) => width ? `${width}px` : '60px' };
`
const ColorContainer = styled.div`
    display: flex;
    flex-direction: row;
`

export const Colors = () => (
    <>
        Light theme color pallet <br />
        <ColorContainer>
            <ColorBar width={20} color={'var(--color-gray__dark)'} />
            <ColorBar width={220} color={'var(--color-gray)'} />
            <ColorBar width={120} color={'var(--color-gray__light)'} />
            <ColorBar width={120} color={'var(--color-gray__lightest)'} />
            <ColorBar color={'var(--color-primary)'} />
            <ColorBar color={'var(--color-primary__dark)'} />
            <ColorBar color={'var(--color-secondary)'} />
            <ColorBar color={'var(--color-secondary__dark)'} />
            <ColorBar width={20} color={'var(--color-error)'} />
        </ColorContainer>
    </>
);

export default {
    component: Colors,
    title: 'Theme',
};
