import { MockAppController } from '../controller/MockAppController';
import { ActionButtonExpandCollapse } from './ActionButtonExpandCollapse';

const toggleExpandCollapseUI = async () => {
  console.log('Fullscreen expand/collapse UI action called');
};

export const Expanded = () => (
  <MockAppController
    isExpanded={true}
    toggleExpandCollapseUI={toggleExpandCollapseUI}
  >
    <ActionButtonExpandCollapse />
  </MockAppController>
);

export const Collapsed = () => (
  <MockAppController
    isExpanded={false}
    toggleExpandCollapseUI={toggleExpandCollapseUI}
  >
    <ActionButtonExpandCollapse />
  </MockAppController>
);
