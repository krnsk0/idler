import { SerializedStyles } from '@emotion/react';
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

const QuantityPerSecond = observer(
  ({
    estimatedRate,
    emotionStyles,
  }: {
    estimatedRate: number;
    emotionStyles: SerializedStyles | SerializedStyles[];
  }) => {
    return (
      <span css={emotionStyles}>
        {formatNumber(estimatedRate, {
          showSign: true,
        })}
        /s
      </span>
    );
  },
);

const ResourceCap = observer(({ currentCap }: { currentCap: number }) => {
  return (
    <span css={styles.cap}>/{formatNumber(currentCap, { digits: 0 })}</span>
  );
});

const ResourceQuantity = observer(
  ({
    resource,
    emotionStyles,
  }: {
    resource: BaseResource;
    emotionStyles?: SerializedStyles | SerializedStyles[];
  }) => {
    return (
      <span
        css={[
          emotionStyles,
          styles.quantity,
          resource.showHighlight &&
            styles.highlight(resource.highlightAnimationDuration),
        ]}
      >
        {formatNumber(resource.quantity)}
      </span>
    );
  },
);

const ResourceRow = ({ resource }: ResourceRowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} css={styles.resourceRowOuter} key={resource.name}>
      <div css={styles.resourceRowTop}>
        <span css={styles.displayName}>{resource.displayName}</span>
        {resource.estimatedRate !== null && (
          <QuantityPerSecond
            estimatedRate={resource.estimatedRate}
            emotionStyles={[styles.largeScreenOnly, styles.quantityPerSecond]}
          />
        )}
        <span css={[styles.largeScreenOnly, styles.quantityContainer]}>
          <ResourceQuantity resource={resource} />
          <ResourceCap currentCap={resource.currentCap} />
        </span>
        <ResourceQuantity
          resource={resource}
          emotionStyles={styles.smallScreenOnly}
        />
      </div>
      <div css={[styles.smallScreenOnly, styles.resourceRowBottom]}>
        {resource.estimatedRate !== null ? (
          <QuantityPerSecond
            estimatedRate={resource.estimatedRate}
            emotionStyles={[styles.quantityPerSecond]}
          />
        ) : (
          <div />
        )}
        <ResourceCap currentCap={resource.currentCap} />
      </div>
      <Tooltip containerRef={containerRef} position="BOTTOM" width={240}>
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
    </div>
  );
};

export default observer(ResourceRow);
