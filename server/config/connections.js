
module.exports.connections = {

  meeqs: {
    adapter: 'sails-postgresql',
    host: '99.125.202.24',
    port: 5432,
    user: 'pi',
    password: '',
    database: 'meeqs'
  },
  
  test: {
    adapter: 'sails-postgresql',
    host: '99.125.202.24',
    port: 5432,
    user: 'pi',
    password: '',
    database: 'meeqs_test'
  },

  local: {
    adapter: 'sails-postgresql',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'swordfish',
    database: 'MEEQS'
  }

};
