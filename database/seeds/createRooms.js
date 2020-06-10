
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('rooms').del()
    .then(function () {
      // Inserts seed entries
      return knex('rooms').insert([
        {user_id: 2, name: 'DavyJones Brasil', players: 1, max_players: 4, ip: '193.123.10.8'},
        {user_id: 1, name: 'Server Autenticos v2.0', players: 3, max_players: 8, ip: '213.157.23.1'},
        {user_id: 4, name: 'Server do Maicão', players: 12, max_players: 12, ip: '164.232.73.7'}
      ]);
    });
};
