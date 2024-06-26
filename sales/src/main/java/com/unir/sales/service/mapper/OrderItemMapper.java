package com.unir.sales.service.mapper;

import com.unir.sales.domain.*;
import com.unir.sales.service.dto.OrderItemDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link OrderItem} and its DTO {@link OrderItemDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrderItemMapper extends EntityMapper<OrderItemDTO, OrderItem> {
    OrderItemDTO toDto(OrderItem s);

    @Mapping(source = "orderId", target = "order.id")
    OrderItem toEntity (OrderItemDTO orderItemDTO);
}
