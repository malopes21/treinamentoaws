package org.una.sdm.aula09.services.interfaces;

import org.una.sdm.aula09.domain.Product;

import java.util.List;

public interface ProductServiceAPI {

    public Product get(Long id);

    public List<Product> findAll();

    public Product create(Product user);

    public void update(Product user);

    public void remove(Long id);
}
