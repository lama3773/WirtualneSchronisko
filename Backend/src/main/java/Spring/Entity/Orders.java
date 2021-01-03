package Spring.Entity;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private Integer user_id;

    private Integer address_id;

    private String animals_id;

    private Date created_at;

    public Orders() {
    }

    public Orders(
            Integer id,
            Integer user_id,
            Integer address_id,
            String animals_id,
            Date created_at
    ) {
        this.id = id;
        this.user_id = user_id;
        this.address_id = address_id;
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

    public Integer getAddressId() {
        return address_id;
    }

    public void setAddressId(Integer address_id) {
        this.address_id = address_id;
    }

    public String getAnimalsId() {
        return animals_id;
    }

    public void setAnimalsId(String animals_id) {
        this.animals_id = animals_id;
    }

    public Date getCreatedAt() {
        return created_at;
    }

    public void setCreatedAt(Date created_at) {
        this.created_at = created_at;
    }
}