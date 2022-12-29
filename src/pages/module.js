import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Layout, QueryResult, ModuleDetail } from '../components';

const Get_Module = gql`
  query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
        id
        title
        content
        videoUrl
    }
    track(id: $trackId) {
        id
        title
        modules {
        id
        title
        length
        }
    }
  }
`;

/**
 */
const Module = ({moduleId, trackId}) => {
  const { loading, error, data } = useQuery(Get_Module, {
    variables: {moduleId, trackId}
  });

  return (
    <Layout fullWidth>
      <QueryResult error={error} loading={loading} data={data}>
          <ModuleDetail track={data?.track} module={data?.module} />
      </QueryResult>
    </Layout>
  );
};

export default Module;
