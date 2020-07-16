import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
	localStorage.clear();
	localStorage.setItem.mockClear();
});
