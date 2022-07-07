import { observer } from 'mobx-react-lite';
import TechButton from './TechButton/TechButton';
import { styles } from './Navbar.styles';

const Navbar = () => {
  return (
    <div css={styles.navbar}>
      <h1 css={styles.title}>planetfall</h1>
      <div css={styles.techButtonContainer}>
        <TechButton />
      </div>
      <div css={styles.rightContainer}>
        <a>options</a>
      </div>
    </div>
  );
};

export default observer(Navbar);
