import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_PROJECTS = gql`
  query {
    projects
  }
`;

const PageContainer = styled.div`
  padding: 24px;
`;

const Home: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  return <PageContainer>{JSON.stringify(data.projects)}</PageContainer>;
};

export default Home;
