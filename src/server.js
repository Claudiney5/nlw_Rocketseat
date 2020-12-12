const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta pública
server.use(express.static("public"))

//  habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

//utilizando template engine (HTML dinêmico)
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server, 
    noCache: true
}) 

// configurar caminhos da aplicação
server.get("/", (req, res) => {
    return res.render("index.html")
})


server.get("/create-point", (req, res) => {
    //  req.query: Query String da nossa url
    //  console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //  req.body: corpo do nosso formulário
    //  console.log(req.body)

    // inserir dados na tabela com comandos SQL
    const query = `
        INSERT INTO places (
            image,
            name, 
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name, 
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }        
        console.log(this)
        console.log("Cadastro com sucesso")

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
})


server.get("/search-results", (req, res) => {

    const search = req.query.search

    if(search == "") {
        //pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }

    // pegar os dados de banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length
        console.log(rows)
        // mostrar as páginas do html com os dados do BDs
        return res.render("search-results.html", {places: rows, total: total})
    })    
})

//ligar o servidor
server.listen(3000)