import { observer } from 'mobx-react-lite';
import { BaseJob } from '../../../../../store/zone/jobs/baseJob';

import { styles } from './JobButton.styles';

interface JobButtonProps {
  job: BaseJob;
}

const JobButton = ({ job }: JobButtonProps) => {
  return <></>;
};

export default observer(JobButton);
