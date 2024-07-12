package org.una.sdm.aula09.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.una.sdm.aula09.domain.User;
import org.una.sdm.aula09.services.interfaces.UserServiceAPI;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin()
public class UserResource {

    @Autowired
    private UserServiceAPI userService;

    @GetMapping
    public @ResponseBody
    HttpEntity<List<User>> findAll() {

        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping(value = "/{id}")
    public @ResponseBody
    HttpEntity<User> get(@PathVariable(name = "id") Long id) {

        User user = userService.get(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public @ResponseBody
    HttpEntity<User> create(@RequestBody User user) {

        user = userService.create(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping(value = "/{id}")
    public @ResponseBody
    HttpEntity<User> update(@PathVariable(name = "id") Long id,
            @RequestBody User user) {

        user.setId(id);
        userService.update(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping(value = "/{id}")
    public @ResponseBody
    HttpEntity<User> remove(@PathVariable(name = "id") Long id) {

        userService.remove(id);
        return ResponseEntity.ok().build();
    }
}
