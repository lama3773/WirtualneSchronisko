package Spring.Service;

import Spring.Entity.Animals;
import Spring.Entity.UserRepository;
import Spring.Entity.User;
import Spring.Exceptions.ExceptionResponse;
import Spring.Model.GetDashboardResponse;
import com.google.gson.Gson;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.ejb.NoSuchEntityException;
import java.util.Date;

@CrossOrigin
@RestController
public class UserController {
    Gson gson = new Gson();

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @CrossOrigin
    @PostMapping("/register")
    public @ResponseBody String registerUser(@RequestParam String email, @RequestParam String username, @RequestParam String password, @RequestParam(required=false) String address) {

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setRole(0);
        newUser.setEmail(email);
        newUser.setAddress(address);
        if (address.isEmpty()) {
            newUser.setAddress(address);
        }
        newUser.setCreated(new Date());
        userRepository.save(newUser);
        return "Saved";
    }
    @CrossOrigin
    @PostMapping("/users")
    public @ResponseBody String addNewUser(@RequestBody User newUser) {
        newUser.setCreated(new Date());
        userRepository.save(newUser);
        return "Saved";
    }
    @CrossOrigin
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/users/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @CrossOrigin
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/users/{userId}")
    public @ResponseBody User getAllUsers(@PathVariable Integer userId) {
        return userRepository.findUserById(userId);
    }

    @CrossOrigin
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/users/newones")
    public @ResponseBody Iterable<User> getAllNotConfirmedUsers() {
        return userRepository.findByRole(0);
    }

    @CrossOrigin
    @DeleteMapping("/users/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    protected String doDelete(@PathVariable Integer userId) {

        User removedUser = userRepository.findUserById(userId);
        userRepository.deleteById(userId);
        if (removedUser == null) {
            throw new NoSuchEntityException("Rekord o podanym id nie istnieje.");
        }
        GetDashboardResponse res = new GetDashboardResponse(removedUser, 200);

        return gson.toJson(res);
    }
    @CrossOrigin
    @PutMapping("/users/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String doPut(@RequestBody User newUser) {

        User user = userRepository.findUserById(newUser.getId());
        if (user != null) {
            if (newUser.getUsername() != null) user.setUsername(newUser.getUsername());
            if (newUser.getEmail() != null) user.setEmail(newUser.getEmail());
            if (newUser.getPassword() != null) user.setPassword(newUser.getPassword());
            if (newUser.getAddress() != null) user.setAddress(newUser.getAddress());
            if (newUser.getRole() != null) user.setRole(newUser.getRole());
            userRepository.save(user);
            GetDashboardResponse response = new GetDashboardResponse(user, 200);
            return gson.toJson(response);
        }
        throw new NoSuchEntityException("Rekord o podanym id nie istnieje.");
    }
}