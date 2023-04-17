import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../../utils/formatNumber';
import BorderContainer from '../../shared/BorderContainer/BorderContainer';
import { Zone } from '../../../store/zone/zone';
import { styles } from './ZoneLeftPane.styles';
import ResourceRow from './ResourceRow/ResourceRow';
import { formatTime } from '../../../utils/formatTime';

interface ResourceViewProps {
  zone: Zone;
}

const ZoneLeftPane = ({ zone }: ResourceViewProps) => {
  const satisfaction = zone.power.satisfaction;
  const satisfactionPercentage = formatNumber(satisfaction * 100, {
    digits: 0,
  });

  return (
    <div css={styles.paneContainer}>
      {zone.radar.unlocked && (
        <BorderContainer
          title="radar"
          styleOverride={styles.radarContainer}
          showEntranceAnimation={zone.radar.showEntranceAnimation()}
        >
          {zone.radar.isScanning && (
            <div css={styles.radarRow}>
              <span>scanning...</span>
              <span>{formatTime(zone.radar.scanTimeLeft ?? 0)}</span>
            </div>
          )}
        </BorderContainer>
      )}
      {zone.power.unlocked && (
        <BorderContainer
          title="power"
          rightText={
            satisfaction > 0 && satisfaction < 1 ? (
              <span>
                <span css={styles.tabletOnly}>satisfaction </span>
                <span>{satisfactionPercentage}%</span>
              </span>
            ) : (
              ''
            )
          }
          styleOverride={styles.powerContainer}
          showEntranceAnimation={zone.power.showEntranceAnimation()}
        >
          <div css={styles.powerRow}>
            <span>production</span>
            <span>
              {formatNumber(zone.power.production, {
                digits: 2,
                hideDecimalWhenNotNeeded: true,
              })}
            </span>
          </div>
          <div css={styles.powerRow}>
            <span>demand</span>
            <span>
              {formatNumber(zone.power.demand, {
                digits: 2,
                hideDecimalWhenNotNeeded: true,
              })}
            </span>
          </div>
        </BorderContainer>
      )}
      {zone.resources.unlocked && (
        <BorderContainer
          title="resources"
          styleOverride={styles.resourcesContainer}
          showEntranceAnimation={zone.resources.showEntranceAnimation()}
        >
          {zone.resources.unlockedAsArray.map((resource) => {
            return <ResourceRow resource={resource} key={resource.name} />;
          })}
        </BorderContainer>
      )}
    </div>
  );
};

export default observer(ZoneLeftPane);
