package awsfinal.awsfinalproject.service;

import awsfinal.awsfinalproject.dto.ChecklistDto;
import awsfinal.awsfinalproject.entity.Checklist;
import awsfinal.awsfinalproject.repository.ChecklistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ChecklistService {
    private final ChecklistRepository checklistRepository;

    public ChecklistService(ChecklistRepository checklistRepository){
        this.checklistRepository = checklistRepository;
    }


    // tripId, userName, checklistDate로 가져오기
    @Transactional(readOnly = true)
    public Optional<Checklist[]> getChecklistByUsernameAndTripId(String username, String tripId) {
        return checklistRepository.findAllByUsernameAndTripId(username,tripId);
    }

    @Transactional
    public Checklist addListToChecklist(ChecklistDto checklistDto){

        Checklist checklist = Checklist.builder()
                .listId(checklistDto.getListId())
                .username(checklistDto.getUsername())
                .tripId(checklistDto.getTripId())
                .checklistDate(checklistDto.getChecklistDate())
                .categoryId(checklistDto.getCategoryId())
                .content(checklistDto.getContent())
                .isChecked(checklistDto.getIsChecked())
                .build();

        return checklistRepository.save(checklist);
    }

    @Transactional
    public void deleteMinilist(Long id){
        checklistRepository.deleteById(id);
    }


    @Transactional
    public Checklist checkChange(Long id, String check) throws Exception{
        Checklist newChecklist = checklistRepository.findById(id)
                .orElseThrow(()->new Exception("해당 아이디 없음"));
        newChecklist.setIsChecked(check);
        return checklistRepository.save(newChecklist);
    }

//    @Transactional
//    public List<String> rateChecking(String checkDate, String username, String tripId){
//        return checklistRepository.getCheckDataByDate(checkDate,username,tripId);
//    }
}
