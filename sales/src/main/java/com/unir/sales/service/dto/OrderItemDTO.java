package com.unir.sales.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.unir.sales.domain.OrderItem} entity.
 */
public class OrderItemDTO implements Serializable {

    private Long id;

    @NotNull
    private String description;

    @NotNull
    @Min(value = 0)
    private Integer quantity;

    @NotNull
    @Min(value = 0)
    private Integer pricePerItem;

    @NotNull
    @DecimalMin(value = "0")
    private BigDecimal totalPrice;

    private OrderDTO order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getPricePerItem() {
        return pricePerItem;
    }

    public void setPricePerItem(Integer pricePerItem) {
        this.pricePerItem = pricePerItem;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public OrderDTO getOrder() {
        return order;
    }

    public void setOrder(OrderDTO order) {
        this.order = order;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderItemDTO)) {
            return false;
        }

        OrderItemDTO orderItemDTO = (OrderItemDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, orderItemDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OrderItemDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", quantity=" + getQuantity() +
            ", pricePerItem=" + getPricePerItem() +
            ", totalPrice=" + getTotalPrice() +
            ", order=" + getOrder() +
            "}";
    }
}
