import { SerializedStyles } from '@emotion/react';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { BaseResource } from '../../../../store/zone/resources/baseResource';
import { formatNumber } from '../../../../utils/formatNumber';
import {
  TooltipDivider,
  TooltipPortalRenderer,
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
      <div css={emotionStyles}>
        {formatNumber(estimatedRate, {
          showSign: true,
        })}
        /s
      </div>
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

interface ResourceRowTooltipProps {
  resource: BaseResource;
  side: 'right' | 'left';
}

const ResourceRowTooltip = ({ resource, side }: ResourceRowTooltipProps) => {
  return (
    <>
      {side === 'right' && (
        <TooltipText align={'center'} italic={true} largeBottomMargin={true}>
          {resource.displayName}
        </TooltipText>
      )}
      {!!resource.consumptionSummary.length && (
        <>
          <TooltipDivider text="consumption" smallMargin={true} />
          <TooltipText>
            {resource.consumptionSummary.map((entry) => {
              return (
                <div
                  key={entry.producerConsumerDisplayName}
                  css={styles.tooltipRow}
                >
                  <span css={styles.tooltipLeftText}>
                    {entry.producerConsumerQuantity}x{' '}
                    {entry.producerConsumerDisplayName}
                  </span>
                  <span css={styles.tooltipRightText}>
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
          <TooltipDivider text="production" smallMargin={true} />
          <TooltipText>
            {resource.productionSummary.map((entry) => {
              return (
                <div
                  key={entry.producerConsumerDisplayName}
                  css={styles.tooltipRow}
                >
                  <span css={styles.tooltipLeftText}>
                    {entry.producerConsumerQuantity}x{' '}
                    {entry.producerConsumerDisplayName}
                  </span>
                  <span css={styles.tooltipRightText}>
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
          <TooltipDivider text="storage" smallMargin={true} />
          <TooltipText>
            {resource.storageSummary.map((entry) => {
              return (
                <div
                  key={entry.storageProviderDisplayName}
                  css={styles.tooltipRow}
                >
                  <span css={styles.tooltipLeftText}>
                    {entry.storageProviderQuantity
                      ? `${entry.storageProviderQuantity}x `
                      : ``}
                    {entry.storageProviderDisplayName}
                  </span>
                  <span css={styles.tooltipRightText}>
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
      {side === 'left' && <TooltipDivider />}
    </>
  );
};

const ResourceRow = ({ resource }: ResourceRowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <TooltipPortalRenderer containerRef={containerRef}>
        {<ResourceRowTooltip resource={resource} side="right" />}
      </TooltipPortalRenderer>
      <div
        ref={containerRef}
        css={[
          styles.resourceRowOuter,
          resource.showEntranceAnimation() && styles.animateEntrance,
        ]}
        key={resource.name}
        onClick={() => resource.expandResource()}
      >
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
        <div css={[styles.smallScreenOnly, styles.secondResourceRow]}>
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
        {resource.isExpanded && (
          <div
            css={[styles.invisibleOnDesktop, styles.expandedResourceTooltip]}
          >
            <ResourceRowTooltip resource={resource} side="left" />
          </div>
        )}
      </div>
    </>
  );
};

export default observer(ResourceRow);
