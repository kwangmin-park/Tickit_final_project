package awsfinal.awsfinalproject.controller;

import awsfinal.awsfinalproject.dto.TripDto;
import awsfinal.awsfinalproject.entity.Trip;
import awsfinal.awsfinalproject.service.TripService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @PostMapping("/register/trip")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Trip> signup(
            @Valid @RequestBody TripDto tripDto
    ) {
        return ResponseEntity.ok(tripService.registerTrip(tripDto));
    }

    @PostMapping("/update/trip")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Trip> updateTrip(
            @Valid @RequestBody TripDto tripDto
    ) {
        return ResponseEntity.ok(tripService.updateTrip(tripDto));
    }

    @GetMapping("/get/trip/{username}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<Trip[]> getTripList(@PathVariable String username) {
        return ResponseEntity.ok(tripService.getTripByUserName(username).get());
    }

    @DeleteMapping("/delete/trip/{tripId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public void deleteTrip(@PathVariable Long tripId){
        tripService.deleteTicket(tripId);
    }
}
