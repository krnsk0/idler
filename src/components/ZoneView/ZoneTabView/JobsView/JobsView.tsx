import { observer } from 'mobx-react-lite';
import { Zone } from '../../../../store/zone/zone';
import JobButton from './JobButton/JobButton';
import { styles } from './JobsView.styles';

interface JobsViewProps {
  zone: Zone;
}

function JobsView({ zone }: JobsViewProps) {
  return (
    <div css={styles.jobsContainer}>
      {zone.jobs.unlockedAsArray.map((job) => {
        return <JobButton job={job} key={job.name} />;
      })}
    </div>
  );
}

export default observer(JobsView);
