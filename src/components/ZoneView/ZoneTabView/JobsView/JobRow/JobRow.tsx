import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { formatNumber } from '../../../../../utils/formatNumber';
import { BaseJob } from '../../../../../store/zone/jobs/baseJob';
import {
  DesktopTooltipTitle,
  TooltipDivider,
  TooltipPortalRenderer,
  TooltipText,
} from '../../../../shared/Tooltip/Tooltip';

import { styles } from './JobRow.styles';
import { RxChevronDown, RxChevronRight } from 'react-icons/rx';

interface JobRowTooltipProps {
  job: BaseJob;
}

const JobRowTooltip = observer(({ job }: JobRowTooltipProps) => {
  return (
    <>
      <DesktopTooltipTitle showDivider={true}>
        {job.displayName}
      </DesktopTooltipTitle>
      <TooltipText italic={true} align={'center'}>
        {job.description}
      </TooltipText>
      <TooltipDivider text="effects" />
      <TooltipText>
        {job.displayEffects.map(
          ({ resourceDisplayName, quantityPerSecond }) => {
            return (
              <div key={resourceDisplayName}>
                {resourceDisplayName}:{' '}
                {formatNumber(quantityPerSecond, { showSign: true })}/sec
              </div>
            );
          },
        )}
      </TooltipText>
    </>
  );
});

interface JobRowProps {
  job: BaseJob;
}

const JobRow = ({ job }: JobRowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <TooltipPortalRenderer containerRef={containerRef}>
        {<JobRowTooltip job={job} />}
      </TooltipPortalRenderer>
      <div
        css={styles.jobRowContainer}
        ref={containerRef}
        onClick={() => job.expandButton()}
      >
        <button type="button" css={styles.expand}>
          {job.isExpanded ? <RxChevronDown /> : <RxChevronRight />}
        </button>
        <div css={styles.name}>{job.displayName}</div>
        <div css={styles.workers}>{job.quantity}</div>
        <div css={styles.buttons}>
          <button
            type="button"
            css={styles.inc}
            onClick={(e) => {
              e.stopPropagation();
              job.decrement();
            }}
            disabled={!job.canDecrement}
          >
            -
          </button>
          <button
            type="button"
            css={styles.dec}
            onClick={(e) => {
              e.stopPropagation();
              job.increment();
            }}
            disabled={!job.canIncrement}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default observer(JobRow);
