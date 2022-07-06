import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../../../../helpers/formatNumber';
import { BaseProducer } from '../../../../../store/zone/producers/baseProducer';
import {
  TooltipText,
  TooltipDivider,
} from '../../../../shared/Tooltip/Tooltip';
import ZoneEntityButton from '../../../../shared/ZoneEntityButton/ZoneEntityButton';
import { styles } from './ProducerButton.styles';

interface ProducerButtonProps {
  building: BaseProducer;
}

function ProducerButton({ building }: ProducerButtonProps) {
  return (
    <ZoneEntityButton
      tooltip={
        <>
          <TooltipText italic={true} align={'center'} light={true}>
            {building.description}
          </TooltipText>
          <TooltipDivider text={'cost'} />
          <TooltipText>
            {building.currentCostDisplay.map(
              ({ resourceDisplayName, quantity }) => {
                return (
                  <div key={resourceDisplayName}>
                    {resourceDisplayName}: {formatNumber(quantity)}
                  </div>
                );
              },
            )}
          </TooltipText>
          <TooltipDivider text={'effects'} />
          <TooltipText light={true}>
            {building.displayEffects.map(
              ({ resourceDisplayName, quantityPerSecond }) => {
                return (
                  <div key={resourceDisplayName}>
                    {resourceDisplayName}:{' '}
                    {formatNumber(quantityPerSecond, { showSign: true })}/sec
                  </div>
                );
              },
            )}
          </TooltipText>
          <TooltipDivider />
          <TooltipText light={true} align={'right'} italic={true}>
            {building.splashText}
          </TooltipText>
        </>
      }
      onClick={() => building.buy(1)}
      disabled={!building.affordable}
    >
      <span>
        {building.displayName} ({formatNumber(building.quantity, { digits: 0 })}
        )
      </span>
    </ZoneEntityButton>
  );
}

export default observer(ProducerButton);
