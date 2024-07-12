package org.una.sdm.aula09.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.una.sdm.aula09.domain.User;
import org.una.sdm.aula09.exceptions.UserNotFoundException;
import org.una.sdm.aula09.repositories.UserRepositoryJPA;
import org.una.sdm.aula09.services.interfaces.UserServiceAPI;

import java.util.List;

@Service
public class UserService implements UserServiceAPI {

    @Autowired
    private UserRepositoryJPA repositoryJPA;

    @Transactional(readOnly = true)
    public User get(Long id){

        try {
            User User = repositoryJPA.findById(id).get();
            return User;
        } catch (Exception ex) {
            throw new UserNotFoundException(String.format("User não existe com esse id: %s ", id));
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {

        return repositoryJPA.findAll();
    }

    @Override
    @Transactional(readOnly = false)
    public User create(User user) {
        if(user.getUsername() == null) {
            throw new RuntimeException("Username é obrigatório!");
        }
        return repositoryJPA.save(user);
    }

    @Override
    @Transactional(readOnly = false)
    public void update(User User) {
        repositoryJPA.save(User);
    }

    @Override
    @Transactional(readOnly = false)
    public void remove(Long id) {
        repositoryJPA.deleteById(id);
    }

}
