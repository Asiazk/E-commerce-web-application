package com.asia.ecommerce.model;

import com.asia.ecommerce.entity.OrderedItemEntity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetails {
    private long id;
    private long userId;
    private Date date;
    private OrderStatus orderStatus;
    private List<OrderItemDetails> orderItemDetails;
    private int totalAmount;
}
