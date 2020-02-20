import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { environment } from '@environment/environment';
import { projectIsFavorite } from '@store/user/user.selectors';
import {
  ProjectTileContainer,
  ProjectFlex,
  ProjectActions,
  ProjectHeader,
  Title,
  Spacer,
  TagGroup,
  Description,
  ProjectFooter,
  Collaborators,
  SubTitle,
  TimeAgo
} from './project-tile.styled';
import { FaUserCircle } from 'react-icons/fa';
import { MdTurnedInNot, MdTurnedIn, MdShare } from 'react-icons/md';
import Avatar from '@atlaskit/avatar';
import Tag from '@atlaskit/tag';

interface ContainerInterface {
  project: any;
}

const ProjectTileFC: React.FC<ContainerInterface> = ({ project }: ContainerInterface) => {
  const isFavorite = useSelector(state => projectIsFavorite(state, project.id));

  return (
    <ProjectTileContainer>
      <ProjectFlex column>
        <ProjectHeader>
          {project.user.userIcon ? <Avatar size="medium" src={project.user.userIcon} /> : <FaUserCircle />}
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
          {environment.features.share && <MdShare />}
          {environment.features.favorites && (isFavorite ? <MdTurnedIn /> : <MdTurnedInNot />)}
        </ProjectActions>
        <Description>{project.description}</Description>
        {project.tags && project.tags.length > 0 && (
          <TagGroup>
            {project.tags.map(tag => (
              <Tag key={tag} text={tag} color="standard" />
            ))}
          </TagGroup>
        )}
        <ProjectFooter>
          <TimeAgo>Updated {moment(new Date(project.updatedAt)).fromNow()}</TimeAgo>
          <Spacer />
          {project.collaborators && project.collaborators.length > 0 && (
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
