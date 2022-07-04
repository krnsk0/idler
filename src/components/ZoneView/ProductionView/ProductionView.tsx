import { observer } from 'mobx-react-lite';
import { Zone } from '../../../store/zone/zone';
import BuildingView from './BuildingButton/BuildingButton';
import { styles } from './ProdutionView.styles';

interface ProductionViewProps {
  zone: Zone;
}

function ProductionView({ zone }: ProductionViewProps) {
  return (
    <div css={styles.buildingsContainer}>
      {zone.buildings.asArray.map((building) => {
        return <BuildingView building={building} />;
      })}
    </div>
  );
}

export default observer(ProductionView);
