package com.asia.ecommerce.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserOrder {
    private long userId;
    private List<OrderDetails> orderList;
}
