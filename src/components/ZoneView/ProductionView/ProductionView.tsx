import { observer } from 'mobx-react-lite';
import { Zone } from '../../../store/zone/zone';
import BuildingButton from './BuildingButton/BuildingButton';
import { styles } from './ProdutionView.styles';

interface ProductionViewProps {
  zone: Zone;
}

function ProductionView({ zone }: ProductionViewProps) {
  return (
    <div css={styles.buildingsContainer}>
      {zone.buildings.asArray.map((building) => {
        return <BuildingButton building={building} />;
      })}
    </div>
  );
}

export default observer(ProductionView);
