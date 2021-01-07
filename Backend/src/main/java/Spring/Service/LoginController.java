package Spring.Service;

import Spring.Entity.User;
import Spring.Entity.UserRepository;
import com.google.gson.Gson;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginController {
    Gson gson = new Gson();
    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @CrossOrigin
    @PostMapping("/login")
    public String doPost(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            HttpServletRequest request
    ) throws Exception {

        request.logout();
        request.login(username, password);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, String> data = new HashMap<String, String>();
        data.put("role", authentication.getAuthorities().toString());
        User user = userRepository.getByUsernameAndPassword(username, password);
        data.put("user_id", user.getId().toString());

        return gson.toJson(data);
    }

    @CrossOrigin
    @GetMapping("/logout")
    public void logout(HttpServletRequest request) throws Exception {
        try {
            request.logout();
        } catch (Exception e) {
            throw new Exception();
        }
    }
}