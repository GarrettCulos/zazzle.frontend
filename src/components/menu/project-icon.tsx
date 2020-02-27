import React from 'react';
import styled from 'styled-components';
import { MdFolderOpen, MdLink } from 'react-icons/md';

const ProjectIconContainer = styled.div<{ isPrivate?: boolean }>`
  display: flex;
  position: relative;
  opacity: ${({ isPrivate }) => (isPrivate ? 0.5 : 1)};
  svg {
    margin: 0;
  }
`;
interface ProjectIconInterface {
  isPrivate?: boolean;
  src?: string;
}

export const ProjectIcon: React.FC<ProjectIconInterface> = ({ isPrivate, src }: ProjectIconInterface) => {
  return (
    <ProjectIconContainer isPrivate={isPrivate}>
      {isPrivate ? <MdLink /> : src ? src : <MdFolderOpen />}
    </ProjectIconContainer>
  );
};
