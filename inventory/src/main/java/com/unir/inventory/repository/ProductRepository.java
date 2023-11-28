package com.unir.inventory.repository;

import com.unir.inventory.domain.Product;
import feign.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * Spring Data SQL repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT distinct p FROM Product p LEFT JOIN ProductCategory pc on pc.product.id = p.id " +
        "WHERE pc.category.id IN :categories AND UPPER(p.name) LIKE UPPER(concat('%', :name, '%')) ")
    Page<Product> searchByCategoryAndName(@Param("name")String name, @Param("categories") Set<Long> categories, Pageable pageable);

    List<Product> findAllByIdIn(Set<Long> ids);
}

