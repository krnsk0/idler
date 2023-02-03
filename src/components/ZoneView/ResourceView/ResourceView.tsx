import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../../utils/formatNumber';
import BorderContainer from '../../shared/BorderContainer/BorderContainer';
import { Zone } from '../../../store/zone/zone';
import { styles } from './ResourceView.styles';
import ResourceRow from './ResourceRow/ResourceRow';

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
          styleOverride={styles.powerContainer}
          showEntranceAnimation={zone.power.showEntranceAnimation}
          entranceAnimationDuration={zone.power.entranceAnimationDuration}
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
          showEntranceAnimation={zone.resources.showEntranceAnimation}
          entranceAnimationDuration={zone.resources.entranceAnimationDuration}
        >
          {zone.resources.unlockedAsArray.map((resource) => {
            return <ResourceRow resource={resource} key={resource.name} />;
          })}
        </BorderContainer>
      )}
    </div>
  );
};

export default observer(ResourceView);
