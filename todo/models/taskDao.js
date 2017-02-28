var DocumentDBClient = require('documentdb').DocumentClient;

var DocDBUtils = {
    getOrCreateDatabase: (client, databaseId, callback) => {
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id = @id',
            parameters: [{
                name: '@id',
                value: databaseId
            }]
        };

        client.queryDatabases(querySpec).toArray((err, results) => {
            if(err) {
                callback(err);
            } else {
                if(results.length === 0) {
                    var databaseSpec = {
                        id: databaseId
                    };

                    client.createDatabase(databaseSpec, (err, created) => {
                        callback(null, created);
                    });
                } else {
                    callback(null, results[0]);
                }
            }
        })

    }   
};

