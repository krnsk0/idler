export const makeZoneName = () => {
  const zoneNames = ['Garden', 'Reprieve', 'University', 'Redoubt'];
  const name = zoneNames[Math.floor(Math.random() * zoneNames.length)];
  const number = Math.floor(Math.random() * 100);
  return `${name} ${number}`;
};
