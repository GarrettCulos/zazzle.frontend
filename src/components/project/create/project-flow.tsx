import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../atomic/modal';
import { MdClose } from 'react-icons/md';

import { isProjectCreationOpen } from '@store/ui/ui.selectors';
import { toggleProjectCreationModal } from '@store/ui/ui.actions';

import Button from '../../atomic/button';

import { ProjectBaseForm } from './project-base';
import { ProjectDescription } from './project-description';
import { ProjectMetricForm } from './project-metrics';

const FlowStatePill = styled.div<{ active: boolean; valid?: -1 | 0 | 1 }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-style: solid;
  width: 32px;
  height: 32px;
  font-size: 14px;
  margin-right: 16px;

  border-radius: 50%;
  border-width: 1px;
  border-color: var(--font-color__dark);

  background-color: ${({ active }) => (active ? 'white' : 'var(--color-gray)')};
  color: ${({ active }) => (active ? 'var(--font-color)' : 'var(--font-color__dark)')};
`;

const FlowNextLineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px;
`;

const HeaderClose = styled.div`
  cursor: pointer;
  color: white;
  justify-content: flex-end;
`;

const FlowNextLine = styled.div`
  height: 2px;
  border-radius: 1px;
  background-color: var(--font-color__dark);
  width: 100%;
  min-width: 100px;
`;

const FlowHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
  background-color: var(--color-gray);
  color: var(--font-color__dark);
`;

const FlowContainer = styled.div`
  position: fixed;
  top: 5vh;
  right: 50%;
  transform: translateX(50%);
  max-height: 90vh;
  max-width: 800px;
  width: 100%;

  display: flex;
  flex-direction: column;

  background-color: var(--color-gray);
  z-index: 1;
  border-radius: 20px;
`;

const Body = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  flex: 1;
  overflow: auto;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

interface FlowStateInterface {
  current: number;
  state: number;
  next?: number;
  children?: any;
}

export const FlowState: React.FC<FlowStateInterface> = ({ current, state, children }: FlowStateInterface) => {
  if (current === state && children) {
    return <>{children}</>;
  }
  return <></>;
};

export const FlowStateHeader: React.FC<FlowStateInterface> = ({
  current,
  next,
  state,
  children
}: FlowStateInterface) => {
  return (
    <FlowHeader>
      <FlowStatePill active={current === state}>{state}</FlowStatePill>
      <FlowState current={state} state={state}>
        {children}
      </FlowState>
      {next && (
        <FlowNextLineContainer>
          <FlowNextLine />
        </FlowNextLineContainer>
      )}
    </FlowHeader>
  );
};

interface ProjectFlowInterface {
  onSubmit: Function;
}
export const ProjectFlow: React.FC<ProjectFlowInterface> = ({ onSubmit }: ProjectFlowInterface) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(isProjectCreationOpen);
  const onClose = useCallback(() => {
    dispatch(toggleProjectCreationModal(false));
  }, [dispatch]);

  const [flowPosition, setFlowPosition] = useState(1);
  const [form, setFormData]: [any, Function] = useState({});
  const [stateValidity, setValidityState]: [any, Function] = useState({});

  // save state data (this could be saved in redux or context api)
  const setStateData = useCallback(
    state => data => {
      setFormData({ ...form, [state]: data });
    },
    [form, setFormData]
  );

  // hash map of state and state validity (state must be valid for the next button to be enabled)
  const setStateValidity = useCallback(
    state => isValid => {
      setValidityState({ ...stateValidity, [state]: isValid });
    },
    [setValidityState, stateValidity]
  );
  const nextState = useCallback(() => {
    setFlowPosition(flowPosition + 1);
  }, [flowPosition, setFlowPosition]);

  const prevState = useCallback(() => {
    setFlowPosition(Math.max(1, flowPosition - 1));
  }, [flowPosition, setFlowPosition]);

  const submit = useCallback(() => {
    onSubmit({
      title: form[1].title,
      metricTemplates: form[3],
      privateProject: form[1].isPrivate,
      startDate: form[1].startDate,
      endDate: form[1].endDate,
      projectType: form[1].projectType,
      description: JSON.stringify(form[2]),
      tag: form[1].tags,
      event: form[1].event
    });
  }, [form, onSubmit]);

  return isOpen ? (
    <Modal maxWidth={'800px'} onClose={onClose}>
      <FlowContainer>
        <Header>
          <FlowStateHeader state={1} next={2} current={flowPosition}>
            info
          </FlowStateHeader>
          <FlowStateHeader state={2} next={3} current={flowPosition}>
            description
          </FlowStateHeader>
          <FlowStateHeader state={3} current={flowPosition}>
            metrics
          </FlowStateHeader>
          <div style={{ flex: 1 }}></div>
          <HeaderClose>
            <MdClose onClick={onClose} />
          </HeaderClose>
        </Header>
        <Body>
          <FlowState state={1} current={flowPosition}>
            <ProjectBaseForm data={form[1]} isValid={setStateValidity(1)} onChange={setStateData(1)} />
          </FlowState>
          <FlowState state={2} current={flowPosition}>
            <ProjectDescription data={form[2]} isValid={setStateValidity(2)} onChange={setStateData(2)} />
          </FlowState>
          <FlowState state={3} current={flowPosition}>
            <ProjectMetricForm data={form[3]} isValid={setStateValidity(3)} onChange={setStateData(3)} />
          </FlowState>
          <Footer>
            <Button onClick={prevState}>prev</Button>
            {flowPosition !== 3 ? (
              <Button onClick={nextState} disabled={!stateValidity[flowPosition]}>
                next
              </Button>
            ) : (
              <Button onClick={submit}>Create</Button>
            )}
          </Footer>
        </Body>
      </FlowContainer>
    </Modal>
  ) : null;
};
