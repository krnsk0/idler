import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../../helpers/formatNumber';
import { ResourceNames } from '../../../store/zone/resources/resourceNames';
import { Zone } from '../../../store/zone/zone';
import { styles } from './ResourceView.styles';

interface ResourceViewProps {
  zone: Zone;
}

const ResourceView = ({ zone }: ResourceViewProps) => {
  return (
    <div css={styles.resourceContainer}>
      {(Object.keys(ResourceNames) as Array<keyof typeof ResourceNames>).map(
        (key) => {
          const resource = zone.resources[key];
          return (
            <>
              <span>Nutrients:</span>
              <span>{formatNumber(resource.quantity)}</span>
              <span>
                {formatNumber(resource.estimatedRate, {
                  showSign: true,
                })}
              </span>
            </>
          );
        },
      )}
    </div>
  );
};

export default observer(ResourceView);
