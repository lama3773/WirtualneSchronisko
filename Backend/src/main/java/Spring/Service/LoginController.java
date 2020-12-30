package Spring.Service;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class LoginController {

    @CrossOrigin
    @PostMapping("/login")
    public String doPost(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            HttpServletRequest request
    ) throws Exception {

            request.logout();
            request.login(username,password);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            return authentication.getAuthorities().toString();

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