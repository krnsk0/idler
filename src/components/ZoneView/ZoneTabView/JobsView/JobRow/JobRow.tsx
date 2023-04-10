import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { BaseJob } from '../../../../../store/zone/jobs/baseJob';
import { TooltipPortalRenderer } from '../../../../shared/Tooltip/Tooltip';

import { styles } from './JobRow.styles';
import { JobRowTooltip } from './JobRowTooltip';

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
      <div css={styles.jobRowOuter} onClick={() => job.expandButton()}>
        <div css={styles.jobRowInner} ref={containerRef}>
          <button type="button" css={styles.expand}>
            <div
              style={{
                transform: job.isExpanded ? 'rotate(90deg)' : 'none',
                display: 'flex' as const,
                justifyContent: 'center' as const,
                alignItems: 'cetner' as const,
                marginLeft: '.6em' as const,
              }}
            >
              {'>'}
            </div>
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
        {job.isExpanded && (
          <div css={[styles.invisibleOnDesktop, styles.expandedJobTooltip]}>
            <JobRowTooltip job={job} />
          </div>
        )}
      </div>
    </>
  );
};

export default observer(JobRow);
