package com.asia.ecommerce.repository;

import com.asia.ecommerce.entity.OrderEntity;
import com.asia.ecommerce.entity.OrderedItemEntity;
import com.asia.ecommerce.entity.StoreItemEntity;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findOrderEntityByUserId(long id);

    @Lock(LockModeType.PESSIMISTIC_WRITE) // lock of row in db is used for enabling concurrent use of orders table
    Optional<OrderEntity> findById(long id);
}
