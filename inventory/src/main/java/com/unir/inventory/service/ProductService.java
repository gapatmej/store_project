package com.unir.inventory.service;

import com.unir.inventory.domain.Product;
import com.unir.inventory.repository.ProductRepository;
import com.unir.inventory.service.dto.CategoryDTO;
import com.unir.inventory.service.dto.ProductCategoryDTO;
import com.unir.inventory.service.dto.ProductDTO;
import com.unir.inventory.service.mapper.ProductMapper;

import java.util.*;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

/**
 * Service Implementation for managing {@link Product}.
 */
@Service
@Transactional
public class ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductService.class);

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;
    private final ProductCategoryService productCategoryService;

    private final CategoryService categoryService;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper, ProductCategoryService productCategoryService, CategoryService categoryService) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.productCategoryService = productCategoryService;
        this.categoryService = categoryService;
    }

    /**
     * Save a product.
     *
     * @param productDTO the entity to save.
     * @return the persisted entity.
     */
    public ProductDTO save(ProductDTO productDTO) {
        log.debug("Request to save Product : {}", productDTO);
        Product product = productMapper.toEntity(productDTO);
        product = productRepository.save(product);

        productCategoryService.deleteByProductId(product.getId());
        for (CategoryDTO c:productDTO.getCategories()) {
            ProductCategoryDTO productCategoryDTO = new ProductCategoryDTO();
            productCategoryDTO.setProduct(productMapper.toDto(product));
            productCategoryDTO.setCategory(c);
            productCategoryService.save(productCategoryDTO);
        }

        return productMapper.toDto(product);
    }

    /**
     * Partially update a product.
     *
     * @param productDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ProductDTO> partialUpdate(ProductDTO productDTO) {
        log.debug("Request to partially update Product : {}", productDTO);

        return productRepository
            .findById(productDTO.getId())
            .map(
                existingProduct -> {
                    productCategoryService.deleteByProductId(existingProduct.getId());
                    productMapper.partialUpdate(existingProduct, productDTO);
                    return existingProduct;
                }
            )
            .map(productRepository::save)
            .map(i->{
                for (CategoryDTO c:productDTO.getCategories()) {
                    ProductCategoryDTO productCategoryDTO = new ProductCategoryDTO();
                    productCategoryDTO.setProduct(productMapper.toDto(i));
                    productCategoryDTO.setCategory(c);
                    productCategoryService.save(productCategoryDTO);
                }
                return i;
            })
            .map(productMapper::toDto);
    }

    /**
     * Get all the products.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ProductDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Products");
        return productRepository.findAll(pageable).map(productMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Page<ProductDTO> searchByCategoryAndName(Set<Long> categories, String name, Pageable pageable) {
        if(categories.isEmpty())
            categories = categoryService.findAll().stream().map(CategoryDTO::getId).collect(Collectors.toSet());
        return productRepository.searchByCategoryAndName(name, categories, pageable).map(productMapper::toDto);
    }

    /**
     * Get one product by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProductDTO> findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        Optional<ProductDTO> productDTO = productRepository.findById(id).map(productMapper::toDto);
        productDTO.ifPresent(dto -> dto.setCategories(productCategoryService
            .findByProductId(id).stream().map(ProductCategoryDTO::getCategory).collect(Collectors.toCollection(LinkedList::new))));
        return productDTO;
    }

    /**
     * Delete the product by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Product : {}", id);
        productRepository.deleteById(id);
    }

    @Transactional
    public List<ProductDTO> validateStock(Map<Long,Integer> productList){
        List<Product> products = productRepository.findAllByIdIn(productList.keySet());
        List<ProductDTO> result = new ArrayList<>();
        boolean error = false;
        for (Map.Entry<Long, Integer> entry : productList.entrySet()) {
            Long id = entry.getKey();
            Integer quantity = entry.getValue();
            Product product = products.stream().filter(p->p.getId().equals(id)).findFirst().orElse(null);
            if(product == null){
                ProductDTO productDTO = new ProductDTO();
                productDTO.setId(id);
                productDTO.setMessageValidation(String.format("Producto con el id %d no encontrado",id));
                result.add(productDTO);
                error=true;
                continue;
            }

            Integer currentStock = product.getStock();
            if(currentStock < quantity){
                ProductDTO productDTO = productMapper.toDto(product);
                productDTO.setMessageValidation(String.format("Producto con el id %d no tiene stock",id));
                error=true;
                result.add(productDTO);
                continue;
            }

            product.setStock(currentStock-quantity);
            product = productRepository.save(product);
            result.add(productMapper.toDto(product));
        }

        if(error){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }

        return result;
    }

}
