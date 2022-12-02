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
            <TooltipText>
              {resource.consumptionSummary.map((entry) => {
                return (
                  <div
                    key={entry.producerConsumerDisplayName}
                    css={styles.tooltipRow}
                  >
                    <span>
                      {entry.producerConsumerQuantity}x{' '}
                      {entry.producerConsumerDisplayName}
                    </span>
                    <span>
                      {formatNumber(-entry.resourceQuantityPerSecond, {
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
        {!!resource.productionSummary.length && (
          <>
            <TooltipDivider text="production" />
            <TooltipText>
              {resource.productionSummary.map((entry) => {
                return (
                  <div
                    key={entry.producerConsumerDisplayName}
                    css={styles.tooltipRow}
                  >
                    <span>
                      {entry.producerConsumerQuantity}x{' '}
                      {entry.producerConsumerDisplayName}
                    </span>
                    <span>
                      {formatNumber(entry.resourceQuantityPerSecond, {
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
        {!!resource.storageSummary.length && (
          <>
            <TooltipDivider text="storage" />
            <TooltipText>
              {resource.storageSummary.map((entry) => {
                return (
                  <div
                    key={entry.storageProviderDisplayName}
                    css={styles.tooltipRow}
                  >
                    <span>
                      {entry.storageProviderQuantity
                        ? `${entry.storageProviderQuantity}x `
                        : ``}
                      {entry.storageProviderDisplayName}
                    </span>
                    <span>
                      {formatNumber(entry.storage, {
                        digits: 0,
                      })}
                    </span>
                  </div>
                );
              })}
            </TooltipText>
          </>
        )}
      </Tooltip>
      <span css={styles.displayName}>{resource.displayName}</span>
      {resource.estimatedRate !== null && (
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
            styles.quantity,
            resource.showHighlight &&
              styles.highlight(resource.highlightAnimationDuration),
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
