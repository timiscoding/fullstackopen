// add some helpful assertions
import '@testing-library/jest-dom/extend-expect';

// this is basically: afterEach(cleanup)
import '@testing-library/react/cleanup-after-each';

let savedItems = {};
const localStorageMock = {
  getItem: key => savedItems[key] || null,
  setItem: (key, val) => {
    savedItems[key] = val;
  },
  clear: () => {
    savedItems = {};
  }
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
