package com.unir.sales.service.client;

import com.unir.sales.service.dto.AdminUserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "${client.ribbon.listOfServers}")
public interface UserService {

    @RequestMapping(method = RequestMethod.GET, value = "/api/account")
    AdminUserDTO getAccount();
}
