const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./db/knex');

const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/todos', (req,res)=>{
    knex.select()
    .from('todos')
    .then(todos => res.send(todos));
});

app.get('/todos/:id', (req,res)=>{
    knex.select()
    .from('todos')
    .where('id', req.params.id)
    .then(todos => res.send(todos));
});

app.post('/todos', (req,res)=>{
    knex('todos').insert({
        title: 'go play some sports',
        user_id: 1
    })
    .then(()=>{
        knex.select()
        .from('todos')
        .then(todos => res.send(todos));
    });
});

app.put('/todos/:id', (req,res)=>{
    knex('todos')
    .where('id', req.params.id)
    .update({
        title: req.body.title,
        completed: req.body.completed
    })
    .then(()=>{
       knex.select()
        .from('todos')
        .then(todos => res.send(todos)); 
    })
});

app.delete('/todos/:id', (req,res)=>{
    knex('todos')
    .where('id', req.params.id)
    .del()
    .then(()=>{
        knex.select()
        .from('todos')
        .then(todos => res.send(todos));
    });
});

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});