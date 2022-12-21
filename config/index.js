import { devConfig } from './dev.js';
import { buildConfig } from './build.js';

export const envResolver = {
  development: () => {
    console.log(' --- development ---');
    return devConfig;
  },
  production: () => {
    console.log('--- production ---');
    return buildConfig;
  }
};
