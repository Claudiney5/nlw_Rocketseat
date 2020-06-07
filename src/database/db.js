// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que fara as operações no banco de dados
const db = new sqlite3.Database("./src/database/database3.db")

module.exports = db
// utilizar o objeto de banco de dds para nossas operações
// db.serialize(() => {
    // criar uma tabela com comandos SQL
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)

    // inserir dados na tabela com comandos SQL
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name, 
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `
    // const values = [
    //     "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    //     "Papersite",
    //     "Rua Rep. Argentina, Ponta Aguda",
    //     "Número 1260",
    //     "Santa Catarina",
    //     "Blumenau",
    //     "Papéis, Papelões, Eletrônicos"
    // ]

    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err)
    //     }
        
    //     console.log(this)
    //     console.log("Cadastro com sucesso")
    // }

    // db.run(query, values, afterInsertData)

// -------------------deletar dados da tabela com comandos SQL
//     db.run(`DELETE FROM places WHERE id = ?`, [2], function(err){
//        if(err) {
//         console.log("ERRO!!")
//            return console.log(err)
//        }
//        console.log("Deletado com sucesso")
//     })

//      // -----------------consultar os dados da tabela com comandos SQL
//      db.all(`SELECT * FROM places`, function(err, rows) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log("Aqui estão seus registros:")
//         console.log(rows)
//      })
//  })