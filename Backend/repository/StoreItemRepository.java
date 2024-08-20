package com.asia.ecommerce.repository;
import com.asia.ecommerce.entity.StoreItemEntity;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreItemRepository extends JpaRepository<StoreItemEntity, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)// lock of row in db is used for enabling concurrent use of store items table
    Optional<StoreItemEntity> findById(long id);
}
