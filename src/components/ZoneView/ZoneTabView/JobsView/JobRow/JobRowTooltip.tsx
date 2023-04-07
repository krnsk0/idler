import { observer } from 'mobx-react-lite';
import { BaseJob } from '../../../../../store/zone/jobs/baseJob';

import {
  DesktopTooltipTitle,
  TooltipDivider,
  TooltipText,
} from '../../../../shared/Tooltip/Tooltip';

interface JobRowTooltipProps {
  job: BaseJob;
}

export const JobRowTooltip = observer(({ job }: JobRowTooltipProps) => {
  return (
    <>
      <DesktopTooltipTitle showDivider={true}>
        {job.displayName}
      </DesktopTooltipTitle>
      <TooltipText italic={true} align={'center'}>
        {job.description}
      </TooltipText>
      <TooltipDivider text="base effects" />
      <TooltipText>
        {job.tooltipDescriptors.map((descriptor) => {
          return <div key={descriptor}>{descriptor}</div>;
        })}
      </TooltipText>
    </>
  );
});
