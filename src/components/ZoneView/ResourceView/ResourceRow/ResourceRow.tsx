import { SerializedStyles } from '@emotion/react';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { BaseResource } from '../../../../store/zone/resources/baseResource';
import { FOOD_PER_WORKER_PER_SECOND_BASE } from '../../../../store/zone/resources/colonists';
import { formatNumber } from '../../../../utils/formatNumber';
import {
  DesktopTooltipTitle,
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
}

const ResourceRowTooltip = ({ resource }: ResourceRowTooltipProps) => {
  return (
    <>
      <DesktopTooltipTitle>{resource.displayName}</DesktopTooltipTitle>
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

      {resource.$modelType === 'COLONISTS' && (
        <>
          <TooltipDivider text="consumption" smallMargin={true} />
          <TooltipText>
            {formatNumber(FOOD_PER_WORKER_PER_SECOND_BASE)} food/sec per
            colonist
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
    </>
  );
};

const ResourceRow = ({ resource }: ResourceRowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <TooltipPortalRenderer containerRef={containerRef}>
        {<ResourceRowTooltip resource={resource} />}
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
          <span css={styles.displayName}>
            <span
              css={styles.invisibleOnDesktop}
              style={{
                transform: resource.isExpanded ? 'rotate(90deg)' : 'none',
                marginRight: '0.2em',
              }}
            >
              {'>'}
            </span>
            {resource.displayName}
          </span>

          <span css={[styles.largeScreenOnly, styles.quantityContainer]}>
            {resource.estimatedRate !== null && (
              <QuantityPerSecond
                estimatedRate={resource.estimatedRate}
                emotionStyles={[
                  styles.largeScreenOnly,
                  styles.quantityPerSecond,
                ]}
              />
            )}
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
            <ResourceRowTooltip resource={resource} />
          </div>
        )}
      </div>
    </>
  );
};

export default observer(ResourceRow);
