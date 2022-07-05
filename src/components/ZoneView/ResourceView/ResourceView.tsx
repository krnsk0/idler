import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../../helpers/formatNumber';
import BorderContainer from '../../Debug/shared/BorderContainer/BorderContainer';
import { Zone } from '../../../store/zone/zone';
import { styles } from './ResourceView.styles';

interface ResourceViewProps {
  zone: Zone;
}

const ResourceView = ({ zone }: ResourceViewProps) => {
  return (
    <BorderContainer
      title="resources"
      styleOverride={styles.resourcesContainer}
    >
      {zone.resources.asArray.map((resource) => {
        return (
          <div css={styles.resourceRow} key={resource.name}>
            <span>{resource.displayName}</span>

            {!!resource.estimatedRate && (
              <span css={styles.quantityPerSecond}>
                {formatNumber(resource.estimatedRate, {
                  showSign: true,
                })}
                /s
              </span>
            )}
            <span>
              {formatNumber(resource.quantity)}{' '}
              <span css={styles.cap}>
                /{formatNumber(resource.currentCap, { digits: 0 })}
              </span>
            </span>
          </div>
        );
      })}
    </BorderContainer>
  );
};

export default observer(ResourceView);
