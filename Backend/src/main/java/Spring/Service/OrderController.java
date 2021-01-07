package Spring.Service;

import Spring.Entity.Animals;
import Spring.Entity.AnimalsRepository;
import Spring.Entity.OrdersRepository;
import Spring.Entity.Orders;
import Spring.Exceptions.ExceptionResponse;
import Spring.Model.GetDashboardResponse;
import com.google.gson.Gson;
import org.springframework.web.bind.annotation.*;

import javax.ejb.NoSuchEntityException;
import java.security.Timestamp;
import java.util.Date;


@CrossOrigin
@RestController
public class OrderController {
    private final OrdersRepository ordersRepository;
    private final AnimalsRepository animalsRepository;
    Gson gson = new Gson();

    public OrderController(
            OrdersRepository ordersRepository,
            AnimalsRepository animalsRepository
    ) {
        this.ordersRepository = ordersRepository;
        this.animalsRepository = animalsRepository;
    }

    @CrossOrigin
    @GetMapping("/orders")
       public @ResponseBody Iterable<Orders> getAllOrders() {

        return ordersRepository.findAll();
    }

    @CrossOrigin
    @PostMapping("/orders")
    protected String doPost(@RequestBody Orders order) throws ExceptionResponse {
        try {
            order.setCreatedAt(new Date());
            ordersRepository.save(order);
            Animals animal = animalsRepository.findItemById(order.getAnimalsId());
            animal.setUser(order.getUserId());
        } catch (Exception $e) {
            Date date = new Date();
            throw new ExceptionResponse(
                    date,
                    "Wystąpił problem podczas składania zamówienia.",
                    $e.getMessage());
        }

        GetDashboardResponse response = new GetDashboardResponse(order, 200);
        return gson.toJson(response);
    }

    @CrossOrigin
    @DeleteMapping("/orders/{orderId}")
    protected String doDelete(@PathVariable Integer orderId) {

        Orders removedOrder = ordersRepository.findItemById(orderId);
        ordersRepository.deleteById(orderId);
        if (removedOrder == null) {
            throw new NoSuchEntityException("Rekord o podanym id nie istnieje.");
        }
        GetDashboardResponse res = new GetDashboardResponse(removedOrder, 200);

        return gson.toJson(res);
    }
}
