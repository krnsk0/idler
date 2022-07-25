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
        <TooltipText light={true} align={'center'} italic={true}>
          {resource.displayName}
        </TooltipText>
        {!!resource.consumptionSummary.length && (
          <>
            <TooltipDivider text="consumption" />
            <TooltipText>TODO</TooltipText>
          </>
        )}
        {!!resource.productionSummary.length && (
          <>
            <TooltipDivider text="production" />
            <TooltipText>
              {resource.productionSummary.map((entry) => {
                return (
                  <div key={entry.producerDisplayName} css={styles.tooltipRow}>
                    <span>
                      {entry.producerQuantity}x {entry.producerDisplayName}
                    </span>
                    <span>
                      {formatNumber(entry.quantityPerSecond, {
                        showSign: true,
                      })}
                      /s
                    </span>
                  </div>
                );
              })}
            </TooltipText>
          </>
        )}
        <TooltipDivider text="storage" />
        <TooltipText>
          <div css={styles.tooltipRow}>
            <span>ship</span>
            <span>{resource.initialCap}</span>
          </div>
        </TooltipText>
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
