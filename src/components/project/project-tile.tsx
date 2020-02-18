import React from 'react';
import moment from 'moment';
import {
  ProjectTileContainer,
  ProjectFlex,
  ProjectActions,
  ProjectHeader,
  Title,
  Spacer,
  Description,
  ProjectFooter,
  Collaborators,
  SubTitle,
  TimeAgo
} from './project-tile.styled';
import { FaUserCircle } from 'react-icons/fa';
import { MdTurnedInNot, MdTurnedIn, MdShare } from 'react-icons/md';
interface ContainerInterface {
  project: any;
}

const ProjectTileFC: React.FC<ContainerInterface> = ({ project }: ContainerInterface) => {
  if (!project) {
    console.log(project);
    return <div>empty</div>;
  }
  return (
    <ProjectTileContainer>
      <ProjectFlex column>
        <ProjectHeader>
          <FaUserCircle />
          <ProjectFlex column justifyContent="center">
            <Title>{project.title}</Title>
            <SubTitle>{project.user.userName} </SubTitle>
          </ProjectFlex>
        </ProjectHeader>
        {project.coverImages && project.coverImages.length > 0 && (
          <ProjectFlex>
            <div style={{ height: '300px', width: '100%', background: 'rgb(64, 64, 221)' }}>{project.coverImages}</div>
          </ProjectFlex>
        )}
        <ProjectActions>
          #{project.projectType}
          <Spacer />
          <MdShare />
          <MdTurnedIn />
          <MdTurnedInNot />
        </ProjectActions>
        <Description>{project.description}</Description>
        <ProjectFooter>
          <TimeAgo>Updated {moment(new Date(project.updatedAt)).fromNow()}</TimeAgo>
          <Spacer />
          {project.collaborators && (
            <Collaborators>
              {project.collaborators.length} Collaborator{project.collaborators.length > 1 ? 's' : ''}
            </Collaborators>
          )}
        </ProjectFooter>
      </ProjectFlex>
    </ProjectTileContainer>
  );
};

export default ProjectTileFC;
