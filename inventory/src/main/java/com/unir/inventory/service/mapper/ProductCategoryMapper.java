package com.unir.inventory.service.mapper;

import com.unir.inventory.domain.*;
import com.unir.inventory.service.dto.ProductCategoryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProductCategory} and its DTO {@link ProductCategoryDTO}.
 */
@Mapper(componentModel = "spring", uses = { ProductMapper.class, CategoryMapper.class })
public interface ProductCategoryMapper extends EntityMapper<ProductCategoryDTO, ProductCategory> {
    @Mapping(target = "product", source = "product", qualifiedByName = "id")
    @Mapping(target = "category", source = "category", qualifiedByName = "id")
    ProductCategoryDTO toDto(ProductCategory s);
}
