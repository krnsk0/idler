import { observer } from 'mobx-react-lite';
import { Zone } from '../../../../store/zone/zone';
import { styles } from './JobsView.styles';

interface JobsViewProps {
  zone: Zone;
}

function JobsView({ zone }: JobsViewProps) {
  return (
    <div css={styles.jobsContainer}>
    workerview
    </div>
  );
}

export default observer(JobsView);
