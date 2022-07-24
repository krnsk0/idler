import { observer } from 'mobx-react-lite';
import { BaseResource } from '../../../../store/zone/resources/baseResource';
import { formatNumber } from '../../../../utils/formatNumber';
import { styles } from './ResourceRow.styles';

interface ResourceRowProps {
  resource: BaseResource;
}
const ResourceRow = ({ resource }: ResourceRowProps) => {
  const displayFudge = 0.000001;
  const showDelta =
    resource.estimatedRate > displayFudge ||
    resource.estimatedRate < -displayFudge;

  return (
    <div css={styles.resourceRow} key={resource.name}>
      <span>{resource.displayName}</span>
      {showDelta && (
        <span css={styles.quantityPerSecond}>
          {formatNumber(resource.estimatedRate, {
            showSign: true,
          })}
          /s
        </span>
      )}
      <span css={styles.quantityContainer}>
        <span
          css={[
            resource.highlightQuantity &&
              styles.highlight(resource.highlightQuantityAnimationDuration),
          ]}
        >
          {formatNumber(resource.quantity)}
        </span>
        <span css={styles.cap}>
          /{formatNumber(resource.currentCap, { digits: 0 })}
        </span>
      </span>
    </div>
  );
};

export default observer(ResourceRow);
