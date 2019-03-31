module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Claims', [{
    tenantRef: 'INIT',
    monthOfClaim: 'Oct, 2018',
    weekday: null,
    weekend: null,
    shift: 9,
    amount: 7200,
    requester: 1,
    status: 'Awaiting BSM',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    monthOfClaim: 'Nov, 2018',
    weekday: 12,
    weekend: 7,
    shift: null,
    amount: 7400,
    requester: 3,
    status: 'Awaiting BSM',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    monthOfClaim: 'Dec, 2018',
    weekday: 17,
    weekend: 6,
    shift: null,
    amount: 7350,
    requester: 3,
    status: 'Awaiting supervisor',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    monthOfClaim: 'Dec, 2018',
    weekday: 19,
    weekend: 5,
    shift: null,
    amount: 6850,
    requester: 4,
    status: 'Awaiting supervisor',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    monthOfClaim: 'Jan, 2019',
    weekday: 14,
    weekend: 6,
    shift: null,
    amount: 6900,
    requester: 5,
    status: 'Awaiting supervisor',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    monthOfClaim: 'Jan, 2019',
    weekday: 17,
    weekend: 4,
    shift: null,
    amount: 6150,
    requester: 6,
    status: 'Awaiting supervisor',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    monthOfClaim: 'Jan, 2019',
    weekday: 9,
    weekend: 2,
    shift: null,
    amount: 2950,
    requester: 7,
    status: 'Awaiting supervisor',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    monthOfClaim: 'Jan, 2019',
    weekday: 16,
    weekend: 5,
    shift: null,
    amount: 6400,
    requester: 8,
    status: 'Processing',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    monthOfClaim: 'March, 2019',
    weekday: 12,
    weekend: 8,
    shift: null,
    amount: 8200,
    requester: 6,
    status: 'Processing',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    monthOfClaim: 'March, 2019',
    weekday: 20,
    weekend: 8,
    shift: null,
    amount: 9400,
    requester: 6,
    status: 'Processing',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Claims')
};
