package com.asia.ecommerce.repository;

import com.asia.ecommerce.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<AdminEntity,Long> {
    Optional<AdminEntity> findByName(String name);
    boolean existsByName(String name);
}
