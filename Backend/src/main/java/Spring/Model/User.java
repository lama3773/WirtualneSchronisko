package Spring.Model;

import Spring.Enum.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;

public class User implements UserDetails {
    public static final String ROLE = "role";

    private final Role role;
    private final String username;
    private final String password;
    private User user;

    public User(Role role, String login, String password) {
        this.role = role;
        this.username = login;
        this.password = password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new
                SimpleGrantedAuthority("ROLE_"+user.getRole().toString()));
    }
    public String getUsername()
    {
        return username;
    }
    public String getPassword()
    {
        return password;
    }
    public Role getRole()
    {
        return role;
    }
}
