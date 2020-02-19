import styled from 'styled-components';

export const ProjectTileContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  box-sizing: border-box;
  cursor: pointer;
`;

export const ProjectTile = styled.div`
  display: flex;
  flex-direction: column;
`;

interface FlexContainer {
  column?: boolean;
  alignItems?: string;
  justifyContent?: string;
}
export const ProjectFlex = styled.div<FlexContainer>`
  box-sizing: border-box;
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  align-items: ${({ alignItems, column }) => (alignItems || column ? 'flex-start' : 'center')};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  min-height: 42px;
`;

export const Title = styled.div`
  font-size: 13px;
  margin: 0px 12px;
`;

export const SubTitle = styled.div`
  font-size: 12px;
  margin: 0px 12px;
  color: #999;
`;

export const ProjectHeader = styled(ProjectFlex)`
  width: 100%;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-color);
`;

export const ProjectActions = styled(ProjectFlex)`
  width: 100%;
  padding: 0 12px;
  font-size: 12px;
`;

export const Spacer = styled.div`
  flex: 1;
`;
export const TagGroup = styled(ProjectFlex)`
  font-size: 12px;
  padding: 4px 8px;
  min-height: 24px;
  width: 100%;
`;
export const Description = styled(ProjectFlex)`
  font-size: 12px;
  padding: 12px;
  width: 100%;
`;
export const ProjectFooter = styled(ProjectFlex)`
  font-size: 12px;
  border-top: 1px solid var(--border-color);
  width: 100%;
  padding: 8px 12px;
  color: #999;
`;
export const Collaborators = styled.div`
  font-size: 12px;
`;
export const TimeAgo = styled.div`
  text-transform: uppercase;
`;
