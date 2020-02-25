import React, { useCallback, useRef, useEffect, useState } from 'react';
import useResize from '@hooks/onResize';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ProjectTile from '../project/project-tile';
import { LoadMore, PageContainer, LoadingContainer } from './home-styled';
import {
  Masonry,
  AutoSizer,
  createMasonryCellPositioner,
  CellMeasurerCache,
  CellMeasurer,
  WindowScroller
} from 'react-virtualized';

const GET_PROJECTS = gql`
  query projects($limit: Int, $sortOrder: String, $sortKey: String, $exclusiveStartKey: JSON) {
    projects(limit: $limit, sortKey: $sortKey, sortOrder: $sortOrder, exclusiveStartKey: $exclusiveStartKey) {
      queryInfo
      items {
        id
        user {
          id
          userName
          userIcon
        }
        title
        description
        projectType
        coverImages
        tags
        likedBy {
          userName
        }
        followCount
        updatedAt
        createdAt
        metricTemplates {
          key
          name
          description
          type
        }
        collaborators {
          id
          userName
          userIcon
        }
      }
    }
  }
`;

const overscanByPixels = 300;
const gutterSize = 8;
const cellWidth = () => 550;
const cellCache = new CellMeasurerCache({
  defaultHeight: 250,
  fixedWidth: true
});

/**
 * virtualized scroll cell positioner
 */

const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cellCache,
  columnCount: 1,
  columnWidth: cellWidth(),
  spacer: gutterSize
});
const Home: React.FC = () => {
  const ref: any = useRef();
  const _masonry: any = useRef();
  const [items, setItems]: [any, Function] = useState([]);

  /**
   * rest virtual scroll reset cache and cell positioner
   */
  const virtualScrollReset = useCallback(
    width => {
      if (width - 106 < 550) {
        cellPositioner.reset({
          cellMeasurerCache: cellCache,
          columnCount: 1,
          columnWidth: width - 106 - 32,
          spacer: gutterSize
        });
        cellCache.clearAll();
        if (_masonry) {
          _masonry.current.clearCellPositions();
        }
      }
    },
    [_masonry]
  );

  const [queryInfo, setQueryInfo]: [any, Function] = useState();
  const { loading, error, data, ...rest } = useQuery(GET_PROJECTS, {
    variables: { limit: 10, sortOrder: 'desc', sortKey: 'updatedAt', exclusiveStartKey: undefined }
  });

  /**
   * initial page load data setting
   */
  useEffect(() => {
    if (data && data.projects) {
      setItems(data.projects.items);
    }
    if (data && data.projects) {
      setQueryInfo(data.projects.queryInfo);
    }
  }, [data]);

  useEffect(() => {
    if (ref && ref.current) {
      const width = ref.current.clientWidth;
      virtualScrollReset(width);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, virtualScrollReset]);

  const loadMore = useCallback(async () => {
    if (!queryInfo.LastEvaluatedKey) {
      return;
    }
    rest.fetchMore({
      variables: {
        limit: 10,
        exclusiveStartKey: queryInfo.LastEvaluatedKey
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        setItems([...prev.projects.items, ...fetchMoreResult.projects.items]);
        setQueryInfo(fetchMoreResult.projects.queryInfo);
      }
    });
  }, [rest, queryInfo]);

  /**
   * virtualize scroll on resize of window recalculate all the things
   */
  const [width] = useResize(({ width }) => {
    virtualScrollReset(width);
  });

  /**
   * virtualize cell renderer
   */
  const cellRenderer = ({ index, parent, style }: any) => {
    const item = items[index];
    if (!item) {
      return '';
    }
    return (
      <CellMeasurer cache={cellCache} index={index} key={item.id} parent={parent}>
        <div key={item.id} style={{ ...style, width: Math.min(550, width - 106 - 32 - 16) }}>
          <ProjectTile project={item} />
        </div>
      </CellMeasurer>
    );
  };

  if (loading) {
    return <LoadingContainer>loading</LoadingContainer>;
  }
  if (error) {
    return <LoadingContainer>error</LoadingContainer>;
  }
  return (
    <PageContainer ref={ref}>
      <WindowScroller>
        {({ height, scrollTop }) => (
          <AutoSizer disableHeight height={height} overscanByPixels={overscanByPixels} scrollTop={scrollTop}>
            {({ width }) => (
              <Masonry
                ref={_masonry}
                autoHeight={true}
                cellCount={items.length}
                cellMeasurerCache={cellCache}
                cellPositioner={cellPositioner}
                cellRenderer={cellRenderer}
                height={height}
                overscanByPixels={overscanByPixels}
                scrollTop={scrollTop}
                width={width}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
      {queryInfo && queryInfo.LastEvaluatedKey && <LoadMore onClick={loadMore}>load more</LoadMore>}
    </PageContainer>
  );
};

export default Home;
