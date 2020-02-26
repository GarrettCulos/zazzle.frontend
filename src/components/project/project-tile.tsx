import React, { useCallback, useMemo } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { gql, useMutation } from '@apollo/client';

import ContextMenu from '../context-menu/context-menu';
import IconButton from '../atomic/icon-button';

import { environment } from '@environment/environment';
import { projectIsFavorite, projectIsMine } from '@store/user/user.selectors';
import { toggleUserFavorites } from '@store/user/user.actions';
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
import { LineGraph } from './metric-graph';
const CHANGE_FAVORITES = gql`
  mutation changeFavorites($mode: String!, $projectId: String!) {
    changeFavorites(mode: $mode, projectId: $projectId)
  }
`;

interface ContainerInterface {
  project: any;
}

const ProjectTileFC: React.FC<ContainerInterface> = ({ project }: ContainerInterface) => {
  const dispatch = useDispatch();

  const isFavorite = useSelector(state => projectIsFavorite(state, project.id));
  const isMyList = useSelector(state => projectIsMine(state, project.id));
  const [changeFavorites] = useMutation(CHANGE_FAVORITES);
  const toggleFav = useCallback(
    (mode: 'add' | 'remove', projectId: string) => async () => {
      try {
        await changeFavorites({
          variables: { mode, projectId }
        });
        dispatch(toggleUserFavorites(mode, projectId));
      } catch (err) {
        console.error(err);
      }
    },
    [changeFavorites, dispatch]
  );

  const [graphValues, yKeys] = useMemo(() => {
    const yy: { name: string; color: string }[] = [];
    const xx = project.metrics
      ? project.metrics.reduce((data, metric) => {
          const key = new Date(metric.date).getTime();
          if (!yy.some(y => y.name === metric.key)) {
            yy.push({ name: metric.key, color: '#82ca9d' });
          }
          if (data[key]) {
            data[key] = { ...data[key], [metric.key]: parseFloat(metric.value) };
          } else {
            data[key] = { name: moment(metric.date).format('L'), [metric.key]: parseFloat(metric.value) };
          }
          return data;
        }, {})
      : {};
    return [xx, yy];
  }, [project]);

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
        {project.metrics && project.metrics.length > 0 && (
          <LineGraph
            width={550}
            height={200}
            data={Object.keys(graphValues).map(key => graphValues[key])}
            yKeys={yKeys}
          />
        )}
        <ProjectActions>
          #{project.projectType}
          <Spacer />
          {environment.features.share && (
            <IconButton>
              <MdShare />
            </IconButton>
          )}
          {environment.features.favorites &&
            (isFavorite ? (
              <IconButton>
                <MdTurnedIn onClick={toggleFav('remove', project.id)} />
              </IconButton>
            ) : (
              <IconButton>
                <MdTurnedInNot onClick={toggleFav('add', project.id)} />
              </IconButton>
            ))}
          {isMyList && <ContextMenu project={project} />}
        </ProjectActions>
        <Description>{project.description}</Description>
        {project.tags && project.tags.length > 0 && (
          <TagGroup>
            {project.tags.map((tag, index) => (
              <Tag key={`${tag}-${index}`} text={tag} color="standard" />
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
