package csd230.controllers;

import csd230.entities.GameEntity;
import csd230.repositories.GameRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = {"http://localhost:5173"})
public class GameController {

    private final GameRepository gameRepository;

    public GameController(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @GetMapping
    public List<GameEntity> getAllGames() {
        return gameRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameEntity> getGameById(@PathVariable Long id) {
        return gameRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public GameEntity createGame(@RequestBody GameEntity game) {
        return gameRepository.save(game);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GameEntity> updateGame(@PathVariable Long id, @RequestBody GameEntity updatedGame) {
        return gameRepository.findById(id)
                .map(game -> {
                    game.setTitle(updatedGame.getTitle());
                    game.setPrice(updatedGame.getPrice());
                    game.setCopies(updatedGame.getCopies());
                    game.setPlatform(updatedGame.getPlatform());
                    game.setGenre(updatedGame.getGenre());
                    return ResponseEntity.ok(gameRepository.save(game));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        if (!gameRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        gameRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}