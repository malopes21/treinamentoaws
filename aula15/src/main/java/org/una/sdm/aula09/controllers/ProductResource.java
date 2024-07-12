package org.una.sdm.aula09.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.una.sdm.aula09.domain.Product;
import org.una.sdm.aula09.services.interfaces.ProductServiceAPI;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin()
public class ProductResource {

    @Autowired
    private ProductServiceAPI productService;

    @GetMapping
    public @ResponseBody
    HttpEntity<List<Product>> findAll() {

        List<Product> products = productService.findAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping(value = "/{id}")
    public @ResponseBody
    HttpEntity<Product> get(@PathVariable(name = "id") Long id) {

        Product product = productService.get(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public @ResponseBody
    HttpEntity<Product> create(@RequestBody Product product) {

        product = productService.create(product);
        return ResponseEntity.ok(product);
    }

    @PutMapping(value = "/{id}")
    public @ResponseBody
    HttpEntity<Product> update(@PathVariable(name = "id") Long id,
            @RequestBody Product product) {

        product.setId(id);
        productService.update(product);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping(value = "/{id}")
    public @ResponseBody
    HttpEntity<Product> remove(@PathVariable(name = "id") Long id) {

        productService.remove(id);
        return ResponseEntity.ok().build();
    }
}
