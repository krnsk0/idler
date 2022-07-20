import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../../utils/formatNumber';
import BorderContainer from '../../shared/BorderContainer/BorderContainer';
import { Zone } from '../../../store/zone/zone';
import { styles } from './ResourceView.styles';

interface ResourceViewProps {
  zone: Zone;
}

const ResourceView = ({ zone }: ResourceViewProps) => {
  const satisfaction = zone.power.satisfaction;
  const satisfactionPercentage = formatNumber(satisfaction * 100, {
    digits: 0,
  });
  return (
    <div css={styles.paneContainer}>
      {zone.power.unlocked && (
        <BorderContainer
          title="power"
          rightText={
            satisfaction > 0 && satisfaction < 1
              ? `satisfaction: ${satisfactionPercentage}%`
              : ``
          }
          styleOverride={styles.resourcesContainer}
        >
          <div css={styles.resourceRow}>
            <span>production</span>
            <span>{zone.power.production}</span>
          </div>
          <div css={styles.resourceRow}>
            <span>demand</span>
            <span>{zone.power.demand}</span>
          </div>
        </BorderContainer>
      )}
      {zone.resources.anyUnlocked && (
        <BorderContainer
          title="resources"
          styleOverride={styles.resourcesContainer}
        >
          {zone.resources.unlockedAsArray.map((resource) => {
            const displayFudge = 0.000001;
            return (
              <div css={styles.resourceRow} key={resource.name}>
                <span>{resource.displayName}</span>

                {resource.estimatedRate > displayFudge ||
                  (resource.estimatedRate < -displayFudge && (
                    <span css={styles.quantityPerSecond}>
                      {formatNumber(resource.estimatedRate, {
                        showSign: true,
                      })}
                      /s
                    </span>
                  ))}
                <span css={styles.quantityContainer}>
                  <span>{formatNumber(resource.quantity)}</span>
                  <span css={styles.cap}>
                    /{formatNumber(resource.currentCap, { digits: 0 })}
                  </span>
                </span>
              </div>
            );
          })}
        </BorderContainer>
      )}
    </div>
  );
};

export default observer(ResourceView);
