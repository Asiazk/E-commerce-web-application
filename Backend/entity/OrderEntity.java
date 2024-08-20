package com.asia.ecommerce.entity;

import com.asia.ecommerce.model.OrderStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long userId;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @OneToMany
    private List<OrderedItemEntity> cartItems = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    private OrderStatus orderStatus;

    private int totalAmount;

    public void addItemsToCartItems(OrderedItemEntity item) {
        cartItems.add(item);
    }


}
