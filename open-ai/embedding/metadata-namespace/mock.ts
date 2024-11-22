import { ClientInfo } from './types.js';

export const clientInfo: ClientInfo = {
  personalDetails: [
    {
      description: 'He is 52 years old, weighs 200 pounds, and is 6 feet tall.',
      metadata: {
        subCategory: 'basicInfo',
      },
    },
    {
      description:
        'Known chronic conditions include hypertension and Type 2 diabetes.',
      metadata: {
        subCategory: 'chronicConditions',
      },
    },
  ],
  workEnvironment: [
    {
      description:
        'He works as a remote software developer and spends over 10 hours daily at his home office.',
      metadata: {
        subCategory: 'dailyRoutine',
      },
    },
    {
      description:
        'He uses a standing desk for at least 2 hours during his workday to alleviate discomfort from prolonged sitting.',
      metadata: {
        subCategory: 'ergonomicAdjustments',
      },
    },
    {
      description:
        'He uses an ergonomic chair designed to support spine alignment and reduce the risk of back issues.',
      metadata: {
        subCategory: 'ergonomicAdjustments',
      },
    },
  ],
  physicalHealth: [
    {
      description:
        'He experiences lower back pain, which is occasionally exacerbated by long sitting hours and an inadequate office chair.',
      metadata: {
        subCategory: 'backPain',
      },
    },
    {
      description: 'Using stairs frequently exacerbates his knee stiffness.',
      metadata: {
        subCategory: 'kneeIssues',
      },
    },
  ],
  homeEnvironment: [
    {
      description:
        'He lives in a suburban two-story house with ergonomic modifications like handrails in corridors and bathrooms to aid mobility.',
      metadata: {
        subCategory: 'ergonomics',
      },
    },
    {
      description:
        'His home gym includes fitness equipment such as a treadmill, stationary bike, and free weights.',
      metadata: {
        subCategory: 'equipment',
      },
    },
    {
      description:
        'He has a dedicated space for yoga and stretching, which helps maintain flexibility and reduce stress.',
      metadata: {
        subCategory: 'activityArea',
      },
    },
  ],
  exerciseRoutine: [
    {
      description:
        'He attends water aerobics classes twice a week to aid joint mobility and alleviate muscle stiffness.',
      metadata: {
        subCategory: 'waterAerobics',
      },
    },
    {
      description:
        'He follows a 30-minute morning routine of stretching and light yoga.',
      metadata: {
        subCategory: 'morningRoutine',
      },
    },
    {
      description:
        'He aims to integrate more high-intensity interval training (HIIT) into his weekly routine to enhance endurance and strength.',
      metadata: {
        subCategory: 'HIIT',
      },
    },
  ],
};
