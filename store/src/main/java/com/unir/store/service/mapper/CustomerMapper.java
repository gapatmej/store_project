package com.unir.store.service.mapper;

import com.unir.store.domain.*;
import com.unir.store.service.dto.CustomerDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Customer} and its DTO {@link CustomerDTO}.
 */
@Mapper(componentModel = "spring", uses = { UserMapper.class })
public interface CustomerMapper extends EntityMapper<CustomerDTO, Customer> {
    @Mapping(target = "user", source = "user", qualifiedByName = "login")
    CustomerDTO toDto(Customer s);
}
