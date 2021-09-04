package awsfinal.awsfinalproject.repository;

import awsfinal.awsfinalproject.entity.Trip;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TripRepository extends JpaRepository<Trip, Long> {
//    @EntityGraph(attributePaths = "authorities")
    Optional<Trip[]> findAllByUsername(String username);
    Optional<Trip> findOneByUsernameAndTripName(String username, String tripName);
    Optional<Trip> findOneByUsernameAndTripId(String username, Long tripId);
}