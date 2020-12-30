package Spring.Service;

import Spring.Model.Book;

import javax.persistence.EntityExistsException;
import java.util.HashSet;

public class DashboardService {
    static HashSet<Book> books = new HashSet<>();

    public DashboardService() {
        books.add(new Book("Jak zdobyć przyjaciół i zjednać sobie ludzi", "Dale Carnegie", "2015-01-01"));
        books.add(new Book("Bracia Karamazow", "Fiodor Dostojewski", "1880-11-01"));
        books.add(new Book("Mój przyjaciel Leonard", "James Frey", "2005-06-15"));
        books.add(new Book("Sapiens. Od zwierząt do bogów", "Yuval Noah Harari", "2011-01-01"));
        books.add(new Book("Cień wiatru", "Carlos Ruiz Zafón", "2005-01-01"));
    }

    public static HashSet<Book> getBooks() {
        return books;
    }

    public static Book addBook(Book newBook) {
        checkIfBookAlreadyExist(newBook);
        books.add(newBook);
        return newBook;
    }

    public static boolean checkIfBookAlreadyExist(Book newBook) {
        if (books.contains(newBook)) {
            throw new EntityExistsException("Książka o podanych parametrach już istnieje w bazie.");
        }
        return false;
    }

    public static Book removeBook(Integer removeBookId) {
        Book removedBook = Book.getBookById(books, removeBookId);
        books.removeIf(book -> book.getId().equals(removeBookId));
        return removedBook;
    }
}
