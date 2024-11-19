// jest.config.ts

import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Alias support
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript files
  },
  collectCoverage: true,
  collectCoverageFrom: ['components/**/*.tsx'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};

// Create and export the Jest configuration
export default createJestConfig(customJestConfig);
