package com.darshan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.darshan.model.User;

import java.util.Optional;



public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    void deleteByEmail(String email);

   Optional<User> findByEmail(String email);
}
