package com.unir.sales.service.client;

import com.unir.sales.service.dto.ProductDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Map;

@FeignClient(name = "${client.ribbon.listOfServers}")
public interface ProductService {
    @RequestMapping(method = RequestMethod.POST, value = "/services/inventory/api/products/validate-stock")
    List<ProductDTO> validateStock(@RequestBody Map<Long, Integer> productList);

}
