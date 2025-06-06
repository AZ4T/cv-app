module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	moduleNameMapper: {
		'\\.(css|scss|sass)$': 'identity-obj-proxy',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
	collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!**/node_modules/**'],
	coverageThreshold: {
		global: {
			branches: 40,
			functions: 40,
			lines: 40,
			statements: 40,
		},
	},
};
