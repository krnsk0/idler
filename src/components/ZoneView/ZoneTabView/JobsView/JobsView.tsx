import { observer } from 'mobx-react-lite';
import { Zone } from '../../../../store/zone/zone';
import JobRow from './JobRow/JobRow';
import { styles } from './JobsView.styles';

interface JobsViewProps {
  zone: Zone;
}

function JobsView({ zone }: JobsViewProps) {
  return (
    <div css={styles.jobsContainer}>
      <div css={styles.jobsInner}>
        <div css={styles.unassignedContainer}>
          <div css={styles.unassigned}>unassigned</div>
          <div>{zone.jobs.unassigned}</div>
        </div>
        {zone.jobs.unlockedAsArray.map((job) => {
          return <JobRow job={job} key={job.name} />;
        })}
      </div>
    </div>
  );
}

export default observer(JobsView);
