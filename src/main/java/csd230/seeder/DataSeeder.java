package csd230.seeder;

import csd230.entities.BookEntity;
import csd230.entities.GameEntity;
import csd230.entities.MagazineEntity;
import csd230.entities.MovieEntity;
import csd230.entities.UserEntity;
import csd230.repositories.BookRepository;
import csd230.repositories.GameRepository;
import csd230.repositories.MagazineRepository;
import csd230.repositories.MovieRepository;
import csd230.repositories.UserRepository;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.TimeUnit;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final GameRepository gameRepository;
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Faker faker;

    public DataSeeder(
            BookRepository bookRepository,
            MagazineRepository magazineRepository,
            GameRepository gameRepository,
            MovieRepository movieRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.bookRepository = bookRepository;
        this.magazineRepository = magazineRepository;
        this.gameRepository = gameRepository;
        this.movieRepository = movieRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.faker = new Faker();
    }

    @Override
    public void run(String... args) {
        if (bookRepository.count() == 0) seedBooks();
        if (magazineRepository.count() == 0) seedMagazines();
        if (gameRepository.count() == 0) seedGames();
        if (movieRepository.count() == 0) seedMovies();
        seedUsers();
    }

    private void seedBooks() {
        System.out.println("Seeding Books...");
        String[] genres = {"Fantasy", "Sci-Fi", "Mystery", "Romance", "History", "Thriller"};

        for (int i = 0; i < 10; i++) {
            BookEntity book = new BookEntity(
                    faker.book().title(),
                    faker.number().randomDouble(2, 10, 100),
                    faker.number().numberBetween(1, 50),
                    faker.book().author(),
                    genres[faker.number().numberBetween(0, genres.length)],
                    faker.code().isbn10(),
                    faker.book().publisher()
            );
            bookRepository.save(book);
        }
    }

    private void seedMagazines() {
        System.out.println("Seeding Magazines...");
        String[] categories = {"Tech", "Fashion", "Sports", "Business", "Travel"};

        for (int i = 0; i < 5; i++) {
            LocalDateTime issueDate = faker.date().past(365, TimeUnit.DAYS)
                    .toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

            MagazineEntity mag = new MagazineEntity(
                    faker.book().publisher() + " Weekly",
                    faker.number().randomDouble(2, 5, 20),
                    faker.number().numberBetween(10, 100),
                    faker.number().numberBetween(100, 500),
                    issueDate,
                    categories[faker.number().numberBetween(0, categories.length)],
                    faker.book().publisher()
            );
            magazineRepository.save(mag);
        }
    }

    private void seedGames() {
        System.out.println("Seeding Games...");
        String[] platforms = {"PC", "PS5", "Xbox", "Switch"};
        String[] genres = {"Action", "RPG", "Sports", "Adventure"};
        String[] ratings = {"E", "T", "M"};

        for (int i = 0; i < 5; i++) {
            GameEntity game = new GameEntity(
                    faker.esports().game(),
                    faker.number().randomDouble(2, 20, 90),
                    faker.number().numberBetween(5, 40),
                    platforms[faker.number().numberBetween(0, platforms.length)],
                    genres[faker.number().numberBetween(0, genres.length)],
                    faker.company().name(),
                    ratings[faker.number().numberBetween(0, ratings.length)]
            );
            gameRepository.save(game);
        }
    }

    private void seedMovies() {
        System.out.println("Seeding Movies...");
        String[] genres = {"Action", "Drama", "Comedy", "Sci-Fi", "Thriller"};
        String[] ratings = {"G", "PG", "PG-13", "R"};

        for (int i = 0; i < 6; i++) {
            MovieEntity movie = new MovieEntity(
                    faker.movie().title(),
                    faker.name().fullName(),
                    genres[faker.number().numberBetween(0, genres.length)],
                    ratings[faker.number().numberBetween(0, ratings.length)],
                    faker.number().randomDouble(2, 8, 40),
                    faker.number().numberBetween(2, 30),
                    faker.number().numberBetween(80, 180)
            );
            movieRepository.save(movie);
        }
    }

    private void seedUsers() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            userRepository.save(new UserEntity(
                    "admin",
                    passwordEncoder.encode("admin"),
                    "ROLE_ADMIN"
            ));
        }

        if (userRepository.findByUsername("user").isEmpty()) {
            userRepository.save(new UserEntity(
                    "user",
                    passwordEncoder.encode("user"),
                    "ROLE_USER"
            ));
        }

        System.out.println("Default users created: admin/admin and user/user");
    }
}