package awsfinal.awsfinalproject.controller;

import awsfinal.awsfinalproject.dto.ChecklistDto;
import awsfinal.awsfinalproject.entity.Checklist;
import awsfinal.awsfinalproject.service.ChecklistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Path;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ChecklistController {
    private final ChecklistService checklistService;

    public ChecklistController(ChecklistService checklistService) {
        this.checklistService = checklistService;
    }


    // tripId, userName, checklistDate로 가져오기
    @GetMapping("/get/checklist/{username}/{tripId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Optional<Checklist[]>> getChecklistsByUsernameAndTripId(@PathVariable String username, @PathVariable String tripId){
        return ResponseEntity.ok(checklistService.getChecklistByUsernameAndTripId(username,tripId));
    }


    @PostMapping("/add/checklist/")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Checklist> addToChecklist(@Valid @RequestBody ChecklistDto checklistDto){
        return ResponseEntity.ok(checklistService.addListToChecklist(checklistDto));
    }

    @DeleteMapping("/delete/mini-list/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public String deleteMinilist(@PathVariable long id){
        checklistService.deleteMinilist(id);
        return "redirect:/main.html";
    }

    @PatchMapping("/edit/checkvalue/{id}/{check}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<Checklist> changeCheck(@PathVariable long id, @PathVariable String check) throws Exception{
        return ResponseEntity.ok(checklistService.checkChange(id,check));
    }

//    @GetMapping("/get/successrate/{checkDate}/{username}/{tripId}")
//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
//    public  ResponseEntity<List<String>> checkRate(@PathVariable String checkDate, @PathVariable String username,@PathVariable String tripId) throws Exception{
//        return ResponseEntity.ok(checklistService.rateChecking(checkDate,username,tripId));    }
}
