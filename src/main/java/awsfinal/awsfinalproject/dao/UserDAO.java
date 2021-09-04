package awsfinal.awsfinalproject.dao;

import awsfinal.awsfinalproject.dto.UserDTO;
import java.util.List;
public interface UserDAO {
    List<UserDTO> selectUsers(UserDTO param) throws Exception;
}
