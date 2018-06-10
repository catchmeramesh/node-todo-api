const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First todo test'
},{
    _id: new ObjectID(),
    text: 'Second todo test'
}]
beforeEach((done)=>{
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(()=>done());
});

describe('POST /todos',()=>{
    it('Should insert a new todo',(done)=>{
        
        var text = 'Todo text test';

         request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err)=>{
                    done(err);
                });
            });
    });

    it('Should not create a todo if an invalide text is passed',(done)=>{
        var text = '';
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }

                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err)=>{
                    done(err);
                })
            });
    });

});

describe('GET /todos',()=>{
    it('Should get the todos',(done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(2)
            })
            .end(done);
    });
});

describe('GET /todos/:id', ()=>{
    it('Should get the todo',(done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });
    it('Should return 404 when the todo not exists',(done)=>{
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });
    it('Should return 404 when the object id is not valid',(done)=>{
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id',()=>{
    it('Should delete a todo',(done)=>{
        var idHex = todos[0]._id.toHexString()
        request(app)
            .delete(`/todos/${idHex}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                
                Todo.findById(idHex).then((todo)=>{
                    expect(todo).toNotExist();
                    done();
                }).catch((e)=>{
                    done(e);
                })

            })
    });

    it('Should not delete the todo if the id is not valid',(done)=>{
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    });

    it('Should not delete the todo if todo not found',(done)=>{
        request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    })

});













