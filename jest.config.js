module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/src/utils/', // Adjust as needed based on your project structure
    ],
};