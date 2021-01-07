package Spring.Model;

import Spring.Entity.Animals;
import Spring.Entity.Orders;
import Spring.Entity.User;

import java.util.List;

public class GetDashboardResponse {

    private List<Animals> animals;
    private Animals animal;
    private Orders order;
    private User user;
    private int status;

    public GetDashboardResponse(List<Animals> animals, int status) {
        this.animals = animals;
        this.status = status;
    }
    public GetDashboardResponse(Animals animal, int status) {
        this.animal = animal;
        this.status = status;
    }
    public GetDashboardResponse(Orders order, int status) {
        this.order = order;
        this.status = status;
    }
    public GetDashboardResponse(User user, int status) {
        this.user = user;
        this.status = status;
    }
}