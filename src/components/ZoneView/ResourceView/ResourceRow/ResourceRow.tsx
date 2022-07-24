import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { BaseResource } from '../../../../store/zone/resources/baseResource';
import { formatNumber } from '../../../../utils/formatNumber';
import Tooltip, {
  TooltipDivider,
  TooltipText,
} from '../../../shared/Tooltip/Tooltip';
import { styles } from './ResourceRow.styles';

interface ResourceRowProps {
  resource: BaseResource;
}
const ResourceRow = ({ resource }: ResourceRowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayFudge = 0.000001;
  const showDelta =
    resource.estimatedRate > displayFudge ||
    resource.estimatedRate < -displayFudge;

  return (
    <div ref={containerRef} css={styles.resourceRow} key={resource.name}>
      <Tooltip
        containerRef={containerRef}
        tooltipTop={20}
        tooltipLeft={10}
        width={240}
      >
        {!!resource.consumptionSummary.length && (
          <>
            <TooltipDivider text="production" />
            <TooltipText>
              {resource.productionSummary.map((entry) => {
                return (
                  <div>
                    <span>{entry.producerQuantity}x </span>
                    <span>{entry.producerDisplayName}: </span>
                    <span>{entry.quantityPerSecond}</span>
                  </div>
                );
              })}
            </TooltipText>
          </>
        )}
        {!!resource.productionSummary.length && (
          <>
            <TooltipDivider text="production" />
            <TooltipText>
              {resource.productionSummary.map((entry) => {
                return (
                  <div key={entry.producerDisplayName}>
                    <span>{entry.producerQuantity}x </span>
                    <span>{entry.producerDisplayName}: </span>
                    <span>{entry.quantityPerSecond}</span>
                  </div>
                );
              })}
            </TooltipText>
          </>
        )}
        <TooltipDivider text="storage" />
      </Tooltip>
      <span css={styles.displayName}>{resource.displayName}</span>
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
