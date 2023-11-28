package com.unir.sales.service;

import com.unir.sales.domain.Order;
import com.unir.sales.domain.enumeration.OrderStatus;
import com.unir.sales.repository.OrderRepository;
import com.unir.sales.service.client.ProductService;
import com.unir.sales.service.client.UserService;
import com.unir.sales.service.dto.AdminUserDTO;
import com.unir.sales.service.dto.OrderDTO;
import com.unir.sales.service.dto.OrderItemDTO;
import com.unir.sales.service.dto.ProductDTO;
import com.unir.sales.service.mapper.OrderMapper;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.unir.sales.web.rest.errors.BadRequestAlertException;
import org.apache.commons.codec.digest.DigestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Order}.
 */
@Service
@Transactional
public class OrderService {

    private final Logger log = LoggerFactory.getLogger(OrderService.class);

    private final OrderRepository orderRepository;

    private final OrderMapper orderMapper;

    private final ProductService productService;
    private final OrderItemService orderItemService;
    private final UserService userService;

    public OrderService(OrderRepository orderRepository, OrderMapper orderMapper, ProductService productService, OrderItemService orderItemService, UserService userService) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.productService = productService;
        this.orderItemService = orderItemService;
        this.userService = userService;
    }

    /**
     * Save a order.
     *
     * @param orderDTO the entity to save.
     * @return the persisted entity.
     */
    public OrderDTO save(OrderDTO orderDTO) {
        log.debug("Request to save Order : {}", orderDTO);
        List<ProductDTO> products = productService.validateStock(orderDTO.getOrderItems().stream().collect(Collectors.toMap(OrderItemDTO::getProductId,OrderItemDTO::getQuantity)));

        ProductDTO productDTO = products.stream().filter(p->p.getMessageValidation() != null).findFirst().orElse(null);
        if(productDTO != null){
            throw new BadRequestAlertException(productDTO.getMessageValidation(), "", "idexists");
        }

        addDataToDetail(orderDTO,products);
        Order order = orderMapper.toEntity(orderDTO);
        order.setPlacedDate(Instant.now());
        order.setStatus(OrderStatus.COMPLETED);
        order.setCode(DigestUtils.md5Hex(String.valueOf(System.currentTimeMillis())));

        AdminUserDTO adminUserDTO = userService.getAccount();
        order.setCustomerId(adminUserDTO.getLogin());
        order.setCustomerName(String.format("%s %s",adminUserDTO.getFirstName(),adminUserDTO.getLastName()));
        order = orderRepository.save(order);

        OrderDTO result = orderMapper.toDto(order);
        result.setOrderItems(orderItemService.save(orderDTO.getOrderItems(),order.getId()));
        return result;
    }

    private void addDataToDetail(OrderDTO orderDTO, List<ProductDTO> products){
        for (OrderItemDTO oI: orderDTO.getOrderItems()) {
            ProductDTO product = products.stream().filter(p->p.getId().equals(oI.getProductId())).findFirst().orElse(null);
            oI.setDescription(product.getName());
            oI.setPricePerItem(product.getPrice());
            oI.setTotalPrice(product.getPrice().multiply(new BigDecimal(oI.getQuantity())));
        }
        orderDTO.setTotal(orderDTO.getOrderItems().stream().map(OrderItemDTO::getTotalPrice).reduce(BigDecimal.ZERO,BigDecimal::add));
    }

    /**
     * Partially update a order.
     *
     * @param orderDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<OrderDTO> partialUpdate(OrderDTO orderDTO) {
        log.debug("Request to partially update Order : {}", orderDTO);

        return orderRepository
            .findById(orderDTO.getId())
            .map(
                existingOrder -> {
                    orderMapper.partialUpdate(existingOrder, orderDTO);
                    return existingOrder;
                }
            )
            .map(orderRepository::save)
            .map(orderMapper::toDto);
    }

    /**
     * Get all the orders.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<OrderDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Orders");
        return orderRepository.findAll(pageable).map(orderMapper::toDto);
    }

    /**
     * Get one order by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<OrderDTO> findOne(Long id) {
        log.debug("Request to get Order : {}", id);
        return orderRepository.findById(id).map(orderMapper::toDto);
    }

    /**
     * Delete the order by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Order : {}", id);
        orderRepository.deleteById(id);
    }
}
