import { config } from 'dotenv';

config();

const myEnvVars = {
  EAS_PROJECT_ID: process.env.EAS_PROJECT_ID,
};

const withMyEnv = config => {
  return {
    ...config,
    android: {
      ...config.android,
      config: {
        ...config.android?.config,
      },
    },
    // extra: {
    //   ...config.extra,
    //   ...myEnvVars,
    // },
  };
};

export default withMyEnv(require('./app.json').expo);
