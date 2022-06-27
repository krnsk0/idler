import { observer } from 'mobx-react-lite';
import { enumKeys } from '../../../helpers/enumKeys';
import { formatNumber } from '../../../helpers/formatNumber';
import { ResourceNames } from '../../../store/zone/resources/resourceNames';
import { Zone } from '../../../store/zone/zone';
import { styles } from './ResourceView.styles';

interface ResourceViewProps {
  zone: Zone;
}

const ResourceView = ({ zone }: ResourceViewProps) => {
  return (
    <div>
      {enumKeys(ResourceNames).map((key) => {
        const resource = zone.resources[key];
        return (
          <div css={styles.resourceRow} key={key}>
            <span>Nutrients:</span>
            <span>
              {formatNumber(resource.quantity)}{' '}
              <span css={styles.cap}>
                /{formatNumber(resource.currentCap, { digits: 0 })}
              </span>
            </span>
            <span>
              {formatNumber(resource.estimatedRate, {
                showSign: true,
              })}{' '}
              /sec
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default observer(ResourceView);
