package com.unir.inventory.service.mapper;

import com.unir.inventory.domain.*;
import com.unir.inventory.service.dto.ProductDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Product} and its DTO {@link ProductDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {
    @Named("id")
    @Mapping(target = "id", source = "id")
    ProductDTO toDtoId(Product product);
}
