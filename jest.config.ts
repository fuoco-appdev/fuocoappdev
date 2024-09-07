import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
  setupTestFrameworkScriptFile: '<rootDir>/apps/app/src/setupTests.ts',
};
