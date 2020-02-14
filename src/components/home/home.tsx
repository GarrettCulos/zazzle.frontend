import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_PROJECTS = gql`
  query projects($limit: Int, $exclusiveStartKey: JSON) {
    projects(limit: $limit, exclusiveStartKey: $exclusiveStartKey) {
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
        likedBy {
          userName
        }
        followCount
        updatedAt
        collaborators {
          id
          userName
          userIcon
        }
      }
    }
  }
`;

const PageContainer = styled.div`
  padding: 24px;
`;

const Home: React.FC = () => {
  const { loading, error, data, ...rest } = useQuery(GET_PROJECTS, {
    variables: { limit: 25, exclusiveStartKey: undefined }
  });
  console.log(rest, data);
  const loadMore = useCallback(() => {
    rest.fetchMore({
      variables: {
        limit: 25,
        exclusiveStartKey: data && data.queryInfo && data.queryInfo.LastEvaluatedKey
      },
      updateQuery: d => {
        console.log(d);
      }
    });
  }, [data, rest]);

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <PageContainer>
      {data.projects.items.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
      <div onClick={loadMore}>load more</div>
    </PageContainer>
  );
};

export default Home;
