package org.una.sdm.aula09.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.una.sdm.aula09.domain.Product;
import org.una.sdm.aula09.exceptions.ProductNotFoundException;
import org.una.sdm.aula09.repositories.ProductRepositoryJPA;
import org.una.sdm.aula09.services.interfaces.ProductServiceAPI;

import java.util.List;

@Service
public class ProductService implements ProductServiceAPI {

    @Autowired
    private ProductRepositoryJPA repositoryJPA;

    @Transactional(readOnly = true)
    public Product get(Long id){

        try {
            Product User = repositoryJPA.findById(id).get();
            return User;
        } catch (Exception ex) {
            throw new ProductNotFoundException(
                    String.format("Produto não existe com esse id: %s ", id));
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Product> findAll() {

        return repositoryJPA.findAll();
    }

    @Override
    @Transactional(readOnly = false)
    public Product create(Product product) {
        if(product.getId() != null) {
            throw new RuntimeException("Id deve ser nulo pra criar um produto!");
        }
        return repositoryJPA.save(product);
    }

    @Override
    @Transactional(readOnly = false)
    public void update(Product product) {
        repositoryJPA.save(product);
    }

    @Override
    @Transactional(readOnly = false)
    public void remove(Long id) {
        repositoryJPA.deleteById(id);
    }

}
