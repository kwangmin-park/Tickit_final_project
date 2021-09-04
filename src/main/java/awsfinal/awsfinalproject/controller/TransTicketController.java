package awsfinal.awsfinalproject.controller;


import awsfinal.awsfinalproject.dto.TransTicketDto;
import awsfinal.awsfinalproject.entity.TicketMemoInterface;
import awsfinal.awsfinalproject.entity.TicketPriceByDateInterface;
import awsfinal.awsfinalproject.entity.TicketScheduleInterface;
import awsfinal.awsfinalproject.entity.TransTicket;
import awsfinal.awsfinalproject.service.TransTicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TransTicketController {
  //아직 복붙
    private final TransTicketService transTicketService; //서비스를 하나 정의해서, 이 컨트롤러에 할당.

    public TransTicketController(TransTicketService transTicketService) {
        this.transTicketService = transTicketService;
    }

    //POST 메소드니까 뭔가 저장하는 기능..?
    @PostMapping("/add/ticket/transport")
   @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<TransTicket> signup(
            @Valid @RequestBody TransTicketDto ticketDto //관련된 DTO를 정의해서 할당.
    ) {
        return ResponseEntity.ok(transTicketService.registerTicket(ticketDto));
    }

    //GET 메소드고, 특정 유저의, 특정 여행에 대한 티켓을 모두 보여줌
    @GetMapping("/get/ticket/{ticketType}/{username}/{tripId}") //유저이름을 parameter로 받아와서
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<TransTicket[]> getTicketList(@PathVariable String ticketType,@PathVariable String username,@PathVariable String tripId) { //여기에 넣어서 해당 유저의 정보를 빼오는듯
        return ResponseEntity.ok(transTicketService.getTicketListByTicketTypeAndUsernameAndTripId(ticketType,username,tripId).get());
    }

    @GetMapping("/get/ticket/graph/byDate/{username}/{tripId}") //유저이름을 parameter로 받아와서
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<TicketPriceByDateInterface>> getTicketPriceByDateList(@PathVariable String username, @PathVariable String tripId) { //여기에 넣어서 해당 유저의 정보를 빼오는듯
        return ResponseEntity.ok(transTicketService.getTicketPriceByDateByUsernameAndTripId(username,tripId));
    }
    @GetMapping("/get/ticket/memo/{username}/{tripId}") //유저이름을 parameter로 받아와서
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<TicketMemoInterface>> getTicketMemoList(@PathVariable String username, @PathVariable String tripId) { //여기에 넣어서 해당 유저의 정보를 빼오는듯
        return ResponseEntity.ok(transTicketService.getTicketMemoByUsernameAndTripId(username,tripId));
    }

    @GetMapping("/get/ticket/schedule/{username}/{tripId}") //유저이름을 parameter로 받아와서
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<TicketScheduleInterface>> getTicketScheduleList(@PathVariable String username, @PathVariable String tripId) { //여기에 넣어서 해당 유저의 정보를 빼오는듯
        return ResponseEntity.ok(transTicketService.getTicketScheduleByUsernameAndTripId(username,tripId));
    }

    @GetMapping("/get/ticket/{tripId}")
    public ResponseEntity<TransTicket>getTicket(@PathVariable String tripId){
        return ResponseEntity.ok(transTicketService.getTicketById(tripId));
    }



//삭제 관련
  @DeleteMapping("/delete/ticket/{id}")
  @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
  public String delete(@PathVariable Long id){
    transTicketService.deleteTicket(id);
    return "redirect:/main.html";
  }

 // 수정 관련 : 일부 수정도 되도록 PATCH사용
    @PatchMapping("/edit/ticket/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<TransTicket> edit(@Valid @RequestBody TransTicketDto transTicketDto, @PathVariable long id) throws Exception{
        return ResponseEntity.ok(transTicketService.editTicket(transTicketDto,id));
    }

    @GetMapping("/get/ticketDate/{username}/{tripId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<String>> getDates(@PathVariable String username, @PathVariable String tripId){
        return ResponseEntity.ok(transTicketService.getDistinctDateByUsernameAndTripId(username,tripId));
    }


}
