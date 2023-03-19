package com.foltan.rest.webservices.restfulwebservices.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

  static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();

  static {
    inMemoryUserList.add(new JwtUserDetails(1L, "andrej",
        "$2a$10$qyylZK1XDx0SKxoN7NEe2O9JKwDPQ7vtDFcY8brHugN7s2pFqpuk6", "ROLE_USER_2"));

    inMemoryUserList.add(new JwtUserDetails(2L, "foltan",
            "$2a$10$VkPr.AAD0yAln5ED/wwZNOymxiXERDhTtv2Hu2UF4.q1d4oVX/qW6", "ROLE_USER_2"));

    //$2a$10$1O/Z27JKyFIFt/TcoIVtOuM7YUC69OZ09CypEXcM50u5hZCVJozoq
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
        .filter(user -> user.getUsername().equals(username)).findFirst();

    if (!findFirst.isPresent()) {
      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
    }

    return findFirst.get();
  }

}

