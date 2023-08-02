const pg = require('pg')

const Client = pg.Client; //single connection to the database
// const Pool = pg.Pool; //group of connections(5)

const config = {
    port: 5432,
    host: 'localhost', 
    database: 'app_demo',
    user: 'postgres',
    password: ''
}

const client = new Client(config);

client.connect();

const action = process.argv[2];
const identifier = process.argv[3];
const breed = process.argv[4];

switch (action) {
    case 'browse':
        client.query('SELECT * from pets;')
            .then(data => {
                console.log(data.rows)
                client.end()
            });
        break;
    
    case 'read':
        // client.query(`SELECT * from pets where id = ${identifier}`) //DONT DO THIS!!!
        client.query('SELECT * FROM pets WHERE id = $1', [identifier])
            .then(data => {
                console.log(data.rows)
                client.end()
            });
        break;

    case 'readByName':
        client.query('SELECT * FROM pets WHERE name = $1', [identifier])
        .then(data => {
            console.log(data.rows);
            client.end();
        });   
        break;

    case 'create':
        client.query('INSERT INTO pets (name, breed ) VALUES ($1, $2)', [identifier, breed])
            .then(() => {
                console.log('added pet');
                client.end();
            })
        break;
        case 'delete':
            client.query('DELETE FROM pets WHERE id = $1;', [identifier])
                .then(() => {
                    console.log('removed pet');
                    client.end();
                })
            break;

    default:
        console.log('no action or nonexistent action provided')
        client.end()
        break;
}


// SELECT * from pets where id = 2; drop table pets;