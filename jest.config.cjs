module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	moduleNameMapper: {
		'\\.(css|scss|sass)$': 'identity-obj-proxy',
		'\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
	collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!**/node_modules/**'],
	coverageThreshold: {
		global: {
			branches: 35,
			functions: 35,
			lines: 35,
			statements: 35,
		},
	},
	transformIgnorePatterns: [
		// by default, node_modules is ignored. Usually OK.
	],
};
