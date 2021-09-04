package awsfinal.awsfinalproject.service;

import awsfinal.awsfinalproject.dto.TransTicketDto;
import awsfinal.awsfinalproject.entity.TicketMemoInterface;
import awsfinal.awsfinalproject.entity.TicketPriceByDateInterface;
import awsfinal.awsfinalproject.entity.TicketScheduleInterface;
import awsfinal.awsfinalproject.entity.TransTicket;
import awsfinal.awsfinalproject.repository.TransTicketRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TransTicketService { //리포지토리에 만든 인터페이스의 기능 구현
    private final TransTicketRepository transTicketRepository;

    public TransTicketService(TransTicketRepository transTicketRepository) {
        this.transTicketRepository = transTicketRepository;
    }

    //    티켓 등록 (insert 기능)
    @Transactional
    public TransTicket registerTicket(TransTicketDto transTicketDto) {

        TransTicket ticket = TransTicket.builder()
                .ticketId(transTicketDto.getTicketId())
                .ticketDate(transTicketDto.getTicketDate())
                .ticketNickname(transTicketDto.getTicketNickname())

                .departPlace(transTicketDto.getDepartPlace())
                .departCountry(transTicketDto.getDepartCountry())
                .departDate(transTicketDto.getDepartDate())
                .departTime(transTicketDto.getDepartTime())

                .arrivePlace(transTicketDto.getArrivePlace())
                .arriveCountry(transTicketDto.getArriveCountry())
                .arriveDate(transTicketDto.getArriveDate())
                .arriveTime(transTicketDto.getArriveTime())

                .ticketPrice(transTicketDto.getTicketPrice())
                .username(transTicketDto.getUsername())
                .tripId(transTicketDto.getTripId())
                .transportId(transTicketDto.getTransportId())
                .memo(transTicketDto.getMemo())
                .menu(transTicketDto.getMenu())
                .ticketType(transTicketDto.getTicketType())
                .build();
        return transTicketRepository.save(ticket);
    }

//    user, admin 가능 (특정 유저의 특정 여행 선택)
    @Transactional(readOnly = true)
    public Optional<TransTicket[]> getTicketListByTicketTypeAndUsernameAndTripId(String ticketType,String username, String tripId) {
        return transTicketRepository.findAllByTicketTypeAndUsernameAndTripId(ticketType,username,tripId);
    }

    @Transactional(readOnly = true)
    public List<TicketPriceByDateInterface> getTicketPriceByDateByUsernameAndTripId(String username, String tripId) {
        List<TicketPriceByDateInterface> a = transTicketRepository.getTicketPriceEachDate(username,tripId);
        return a;
    }

    @Transactional(readOnly = true)
    public List<TicketMemoInterface> getTicketMemoByUsernameAndTripId(String username, String tripId) {
        List<TicketMemoInterface> a = transTicketRepository.getTicketMemo(username,tripId);
        return a;
    }

    @Transactional(readOnly = true)
    public List<TicketScheduleInterface> getTicketScheduleByUsernameAndTripId(String username, String tripId) {
        List<TicketScheduleInterface> a = transTicketRepository.getTicketSchedule(username,tripId);
        return a;
    }

    @Transactional(readOnly = true)
    public TransTicket getTicketById(String tripId){
        return transTicketRepository.findById(Long.parseLong(tripId)).get();
    }
//id를 받아서 티켓 삭제
    @Transactional
    public void deleteTicket(Long id){
        transTicketRepository.deleteById(id);
    }

    //수정서비스
    @Transactional
    public TransTicket editTicket(TransTicketDto transTicketDto, long id) throws Exception{
        TransTicket newTicket=transTicketRepository.findById(id)
                .orElseThrow(()-> new Exception("해당 아이디 존재하지 않음"));

        newTicket.setTicketDate(transTicketDto.getTicketDate());
        newTicket.setTicketNickname(transTicketDto.getTicketNickname());

        newTicket.setDepartCountry(transTicketDto.getDepartCountry());
        newTicket.setDepartPlace(transTicketDto.getDepartPlace());
        newTicket.setDepartDate(transTicketDto.getDepartDate());
        newTicket.setDepartTime(transTicketDto.getDepartTime());

        newTicket.setArriveCountry(transTicketDto.getArriveCountry());
        newTicket.setArrivePlace(transTicketDto.getArrivePlace());
        newTicket.setArriveDate(transTicketDto.getArriveDate());
        newTicket.setArriveTime(transTicketDto.getArriveTime());

        newTicket.setTicketPrice(transTicketDto.getTicketPrice());
        newTicket.setMemo(transTicketDto.getMemo());
        newTicket.setMenu(transTicketDto.getMenu());
        return transTicketRepository.save(newTicket);
    }

    @Transactional(readOnly = true)
    public List<String> getDistinctDateByUsernameAndTripId(String username,String tripId){
        return transTicketRepository.getChecklistEachDate(username,tripId);
    }
}