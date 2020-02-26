import React, { useState, useCallback } from 'react';
import { PopupMenuGroup, HeadingItem, Section, ButtonItem } from '@atlaskit/menu';
import { MdMoreHoriz, MdDataUsage, MdSettings, MdDelete } from 'react-icons/md';
import OutsideClickHandler from 'react-outside-click-handler';
import { AddMetric } from '../project/track-metric-modal';
import { RemoveProject } from '../project/delete-project-modal';

import IconButton from '../atomic/icon-button';

import { MenuPositioner, MenuPositionerContainer } from './context-menu.styled';
interface ContextMenuInterface {
  project: any;
}
const ContextMenu: React.FC<ContextMenuInterface> = (props: ContextMenuInterface) => {
  const [isOpen, setOpenState] = useState(false);
  const [addMetricModalState, setAddMetricModalState] = useState(false);
  const [currentMetricTemplate, setMetricTemplate] = useState({});
  const [confirmationDialogOpen, setConfirmationDialogOpenState] = useState(false);

  const openAddMetricModalState = useCallback(
    metricTemplate => {
      setAddMetricModalState(true);
      setMetricTemplate(metricTemplate);
    },
    [setMetricTemplate, setAddMetricModalState]
  );

  const clickOutside = useCallback(() => {
    setOpenState(false);
  }, [setOpenState]);

  const toggleMenuOpen = useCallback(() => {
    setOpenState(!isOpen);
  }, [isOpen, setOpenState]);

  return (
    <>
      <IconButton>
        <MdMoreHoriz onClick={toggleMenuOpen} />
      </IconButton>
      {isOpen && (
        <OutsideClickHandler onOutsideClick={clickOutside}>
          <MenuPositionerContainer>
            <MenuPositioner>
              <PopupMenuGroup>
                <Section>
                  {props.project.metricTemplates.length > 0 && <HeadingItem>Add Metric</HeadingItem>}
                  {props.project.metricTemplates.map(template => (
                    <ButtonItem
                      key={template.key}
                      onClick={() => openAddMetricModalState(template)}
                      elemBefore={<MdDataUsage />}
                      description={template.description}
                    >
                      {template.name}
                    </ButtonItem>
                  ))}
                </Section>
                <Section hasSeparator>
                  <ButtonItem isDisabled elemBefore={<MdSettings />}>
                    Edit Project
                  </ButtonItem>
                  <ButtonItem onClick={() => setConfirmationDialogOpenState(true)} elemBefore={<MdDelete />}>
                    Delete Project
                  </ButtonItem>
                </Section>
              </PopupMenuGroup>
            </MenuPositioner>
          </MenuPositionerContainer>
        </OutsideClickHandler>
      )}
      {addMetricModalState && (
        <AddMetric
          projectId={props.project.id}
          toggleModal={() => setAddMetricModalState(false)}
          metricTemplate={currentMetricTemplate}
          isOpen={addMetricModalState}
        />
      )}
      {confirmationDialogOpen && (
        <RemoveProject
          projectId={props.project.id}
          toggleModal={() => setConfirmationDialogOpenState(false)}
          isOpen={confirmationDialogOpen}
        />
      )}
    </>
  );
};
export default ContextMenu;
