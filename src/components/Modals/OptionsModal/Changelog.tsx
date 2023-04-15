import { changelogContent } from './changelogContent';
import { styles } from './OptionsModal.styles';

interface ChangelogProps {
  closeChangelog: () => void;
}

export const Changelog = ({ closeChangelog }: ChangelogProps) => {
  return (
    <div css={styles.optionsContainer}>
      <h2>changelog</h2>
      <div css={styles.changelogContainer}>
        {changelogContent.map((release) => {
          return (
            <div key={release.version} css={styles.release}>
              <h3>
                {release.version} (
                {release.date
                  .toLocaleDateString('en-us', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  })
                  .replaceAll('/', '-')}
                )
              </h3>
              <ul>
                {release.changes.map((change) => (
                  <li key={change}>{change}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div css={styles.bottomContainer}>
        <button css={styles.button} onClick={() => closeChangelog()}>
          {'close'}
        </button>
        v{APP_VERSION}
      </div>
    </div>
  );
};
