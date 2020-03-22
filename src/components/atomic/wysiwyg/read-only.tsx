import React from 'react';
import { Element, Leaf } from './slate-functions';
import { ViewOnlyWrapper } from './styled-components';
const RenderNodeRecursive = ({ node }: any) => {
  if (node.type) {
    return (
      <Element {...node} element={node}>
        {Array.isArray(node.children) && node.children.map((node, i) => <RenderNodeRecursive key={i} node={node} />)}
      </Element>
    );
  }
  return (
    <Leaf {...node} leaf={node}>
      {node.text}
    </Leaf>
  );
};
export const RenderView = ({ nodes }: any) => {
  return (
    <ViewOnlyWrapper>
      {nodes.map((node, i) => (
        <RenderNodeRecursive key={i} node={node} />
      ))}
    </ViewOnlyWrapper>
  );
};
