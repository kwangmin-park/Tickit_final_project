package awsfinal.awsfinalproject.controller;

import awsfinal.awsfinalproject.dao.UserDAO;
import awsfinal.awsfinalproject.dto.UserDTO;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

//Mapper를 탐색할 패키지를 지정합니다.
@RestController
@MapperScan(basePackages = "awsfinal.awsfinalproject.dao")
public class UserController {

//    UserDAO bean을 자동으로 주입받습니다.
//    @Autowired
//    private UserDAO userDAO;
//
////    Query String으로 country를 받도록 설정합니다.
//    @RequestMapping("/users")
//    public List<UserDTO> users(@RequestParam(value = "country", defaultValue = "") String country) throws Exception {
////        전달받은 country를 가진 UserDTO형 객체를 생성합니다. 이 객체는 MyBatis에 파라미터로 전달합니다.
//        final UserDTO param = new UserDTO(0, null, country);
////        22번째 줄에서 생성한 객체를 파라미터로 전달하여 DB로부터 사용자 목록을 불러옵니다.
//        final List<UserDTO> userList = userDAO.selectUsers(param);
//
//        return userList;
//    }
//
//    @RequestMapping("/hello")
//    public ResponseEntity<String> hello(){
//        return ResponseEntity.ok("hello");
//    }
}
