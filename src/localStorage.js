import localforage from 'localforage';

const resetLocalForage = () => {
  // use this in place of saveState to fix any writing errors by refreshing localForage.
  localforage.setItem('state-v1.0.1', {});
};

export const saveState = (state) => {
  // localforage.setItem('state-v1.0.1', state);
  resetLocalForage();
};
export const loadState = () => localforage.getItem('state-v1.0.1');
