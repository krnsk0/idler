import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../../helpers/formatNumber';
import { Zone } from '../../../store/zone/zone';
import { styles } from './ResourceView.styles';

interface ResourceViewProps {
  zone: Zone;
}

const ResourceView = ({ zone }: ResourceViewProps) => {
  return (
    <div>
      {zone.resources.asArray.map((resource) => {
        return (
          <div css={styles.resourceRow} key={resource.resourceName}>
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
