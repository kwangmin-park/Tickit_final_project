package awsfinal.awsfinalproject.service;

import awsfinal.awsfinalproject.dto.TripDto;
import awsfinal.awsfinalproject.entity.Trip;
import awsfinal.awsfinalproject.repository.TripRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class TripService {
    private final TripRepository tripRepository;

    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

//    여행 등록
    @Transactional
    public Trip registerTrip(TripDto tripDto) {
        if (tripRepository.findOneByUsernameAndTripName(tripDto.getUsername(), tripDto.getTripName()).orElse(null) != null) {
            throw new RuntimeException("이미 등록된 여행입니다.");
        }
        Trip trip = Trip.builder()
                .username(tripDto.getUsername())
                .tripName(tripDto.getTripName())
                .targetPrice(tripDto.getTargetPrice())
                .curPrice(tripDto.getCurPrice())
                .build();
        return tripRepository.save(trip);
    }

    @Transactional
    public Trip updateTrip(TripDto tripDto) {
        Trip trip = tripRepository.findOneByUsernameAndTripId(tripDto.getUsername(), tripDto.getTripId()).orElse(null);
        if(trip == null){
            throw new RuntimeException("유저정보, 여행정보 매칭에 실패했습니다.");
        }
        trip.setTripName(tripDto.getTripName());
        trip.setTargetPrice(tripDto.getTargetPrice());
        trip.setCurPrice(tripDto.getCurPrice());
        return tripRepository.save(trip);
    }

    @Transactional
    public void deleteTicket(Long tripid) {
        tripRepository.deleteById(tripid);
    }



//    user, admin 가능
    @Transactional(readOnly = true)
    public Optional<Trip[]> getTripByUserName(String username) {
        return tripRepository.findAllByUsername(username);
    }
}