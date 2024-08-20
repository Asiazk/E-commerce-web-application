package com.asia.ecommerce.controller;

import com.asia.ecommerce.entity.OrderEntity;
import com.asia.ecommerce.entity.OrderedItemEntity;
import com.asia.ecommerce.entity.UserEntity;
import com.asia.ecommerce.model.OrderDetails;
import com.asia.ecommerce.model.OrderItem;
import com.asia.ecommerce.model.OrderItemDetails;
import com.asia.ecommerce.model.OrderStatus;
import com.asia.ecommerce.services.OrderService;
import com.asia.ecommerce.services.ProductService;
import com.asia.ecommerce.services.UserService;
import org.hibernate.query.Order;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")// allow communication between UI application and spring
@RestController
@RequestMapping("/api/v1")
public class OrderController {

    private OrderService orderService;
    private UserService userService;

    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping("/order/{userId}")
    public ResponseEntity<?> processOrder(@PathVariable long userId, @RequestBody List<OrderItem> cart) {
        orderService.processOrder(userId, cart);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/orders/{userId}")
    public ResponseEntity<List<OrderDetails>> getAllUserOrders(@PathVariable long userId) {
        return ResponseEntity.ok(orderService.getAllUserOrders(userId));
    }

    @GetMapping("/orders/all")
    public List<List<OrderDetails>> getAllOrders() {
        List<List<OrderDetails>> ordersList = new ArrayList<>();
        List<UserEntity> users = userService.getAllUsers();

        for (UserEntity user : users) {
            ordersList.add(orderService.getAllUserOrders(user.getId()));
        }
        return ordersList;
    }

    @PutMapping("/orders/edit/{orderId}")
    public ResponseEntity<?> changeOrderStatus(@PathVariable long orderId, @RequestBody String newStatus) {
        orderService.changeOrderStatus(orderId, newStatus);
        return ResponseEntity.ok("Status changed successfully");
    }
}
