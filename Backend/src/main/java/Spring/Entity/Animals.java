package Spring.Entity;

import javax.persistence.*;

@Entity
public class Animals {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String breed;

    private String age;

    private String image_src;

    private String category;

    private Integer user;

    @Lob // for big data objects
    private byte[] image;

    public Animals() {
    }

    public Animals(
            Integer id,
            String name,
            String breed,
            String age,
            String image_src,
            Integer user,
            String category,
            byte[] image
    ) {
        this.id = id;
        this.name = name;
        this.breed = breed;
        this.age = age;
        this.image_src = image_src;
        this.user = user;
        this.category = category;
        this.image = image;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getImageSrc() {
        return image_src;
    }

    public void setImageSrc(String image_src) {
        this.image_src = image_src;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Integer getUser() {
        return user;
    }

    public void setUser(Integer user) {
        this.user = user;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}