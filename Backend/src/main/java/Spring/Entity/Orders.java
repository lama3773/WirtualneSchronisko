package Spring.Entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private Integer user_id;

    private Integer animals_id;

    private Date created_at;

    public Orders() {
    }

    public Orders(
            Integer id,
            Integer user_id,
            Integer animals_id,
            Date created_at
    ) {
        this.id = id;
        this.user_id = user_id;
        this.animals_id = animals_id;
        this.created_at = created_at;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return user_id;
    }

    public void setUserId(Integer user_id) {
        this.user_id = user_id;
    }

    public Integer getAnimalsId() {
        return animals_id;
    }

    public void setAnimalsId(Integer animals_id) {
        this.animals_id = animals_id;
    }

    public Date getCreatedAt() {
        return created_at;
    }

    public void setCreatedAt(Date created_at) {
        this.created_at = created_at;
    }
}