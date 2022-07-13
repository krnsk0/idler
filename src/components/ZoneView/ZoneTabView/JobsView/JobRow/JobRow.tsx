import { observer } from 'mobx-react-lite';
import { BaseJob } from '../../../../../store/zone/jobs/baseJob';

import { styles } from './JobRow.styles';

interface JobRowProps {
  job: BaseJob;
}

const JobRow = ({ job }: JobRowProps) => {
  return (
    <div css={styles.jobRowContainer}>
      <div css={styles.name}>{job.displayName}</div>
      <div css={styles.workers}>{job.workers} assigned</div>
      <div css={styles.buttons}>
        <button type="button" css={styles.inc}>
          -
        </button>
        <button type="button" css={styles.dec}>
          +
        </button>
      </div>
    </div>
  );
};

export default observer(JobRow);
