package com.asia.ecommerce.repository;

import com.asia.ecommerce.entity.UserEntity;
import com.asia.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

// Repository is made for creating functions of SQL query to DB
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmailId(String email);
    boolean existsByEmailId(String email);
}
