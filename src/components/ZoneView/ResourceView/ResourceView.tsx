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
            <span>nutrients:</span>
            <span>
              {formatNumber(resource.quantity)}{' '}
              <span css={styles.cap}>
                /{formatNumber(resource.currentCap, { digits: 0 })}
              </span>
            </span>
            <span>
              {formatNumber(resource.estimatedRate, {
                showSign: true,
              })}
              /s
            </span>
          </div>
        );
      })}
    </BorderContainer>
  );
};

export default observer(ResourceView);
