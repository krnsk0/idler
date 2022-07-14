import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { formatNumber } from '../../../../../helpers/formatNumber';
import { BaseJob } from '../../../../../store/zone/jobs/baseJob';
import Tooltip, {
  TooltipDivider,
  TooltipText,
} from '../../../../shared/Tooltip/Tooltip';

import { styles } from './JobRow.styles';

interface JobRowProps {
  job: BaseJob;
}

const JobRow = ({ job }: JobRowProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      css={styles.jobRowContainer}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {hovered && (
        <Tooltip top={0} left={200} width={200}>
          <TooltipText italic={true} align={'center'} light={true}>
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
        </Tooltip>
      )}
      <div css={styles.name}>{job.displayName}</div>
      <div css={styles.workers}>{job.workers}</div>
      <div css={styles.buttons}>
        <button
          type="button"
          css={styles.inc}
          onClick={() => job.decrement()}
          disabled={!job.canDecrement}
        >
          -
        </button>
        <button
          type="button"
          css={styles.dec}
          onClick={() => job.increment()}
          disabled={!job.canIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default observer(JobRow);