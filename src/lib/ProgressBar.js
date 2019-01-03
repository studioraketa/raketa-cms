import React from 'react';
import styled from 'styled-components';

const ProgressWrapper = styled.div`
  height: 2em;
  background-color: #efefef;
`;

const Progress = styled.div`
  padding-left: .5em;
  height: 2.4em;
  font-size: .85em;
  line-height: 2.4em;
  color: #fff;
  background-color: #4cae4c;
`;

const ProgressBar = ({ total, done }) => {
  const progress = (100 / total) * done;

  return (
    <ProgressWrapper>
      <Progress style={{ width: `${progress}%` }}>{done}/{total}</Progress>
    </ProgressWrapper>
  );
};

export default ProgressBar;
