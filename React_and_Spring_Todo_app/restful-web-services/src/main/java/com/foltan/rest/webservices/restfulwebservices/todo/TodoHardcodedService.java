package com.foltan.rest.webservices.restfulwebservices.todo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TodoHardcodedService {
    private static List<Todo> todos = new ArrayList<Todo>();

    private static long idCounter = 0;
//    static {
//        todos.add(new Todo(++idCounter, "in28minutes","Learn to dance", new Date(),false));
//        todos.add(new Todo(++idCounter, "in28minutes","Learn to micro services", new Date(),false));
//        todos.add(new Todo(++idCounter, "in28minutes","Learn to react", new Date(),false));
//
//    }
///users/in28minutes/todos/1
    public List<Todo> findAll(){
        return todos;
    }

    public Todo save(Todo todo) {
        if(todo.getId()==-1 || todo.getId()==0) {
            todo.setId(++idCounter);
            todos.add(todo);
        } else {
            deleteById(todo.getId());
            todos.add(todo);
        }
        return todo;
    }


    public Todo deleteById(long id){
        Todo todo = findById(id);
        if(todo == null){
            return null;
        }

        if(todos.remove(todo)){
            return todo;
        }
        return null;
    }

    public Todo findById(long id) {
        for (Todo todo : todos) {
            if (todo.getId() == id) {
                return todo;
            }
        }
        return null;
    }


}
