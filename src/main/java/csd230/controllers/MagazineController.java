package csd230.controllers;

import csd230.entities.MagazineEntity;
import csd230.repositories.MagazineRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/magazines")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class MagazineController {

    private final MagazineRepository magazineRepository;

    public MagazineController(MagazineRepository magazineRepository) {
        this.magazineRepository = magazineRepository;
    }

    @GetMapping
    public List<MagazineEntity> getAllMagazines() {
        return magazineRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MagazineEntity> getMagazineById(@PathVariable Long id) {
        return magazineRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MagazineEntity createMagazine(@RequestBody MagazineEntity magazine) {
        return magazineRepository.save(magazine);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateMagazine(@PathVariable Long id, @RequestBody MagazineEntity magazineDetails) {
        return magazineRepository.findById(id).map(magazine -> {
            magazine.setTitle(magazineDetails.getTitle());
            magazine.setPrice(magazineDetails.getPrice());
            magazine.setCopies(magazineDetails.getCopies());
            magazine.setOrderQty(magazineDetails.getOrderQty());
            magazine.setCurrentIssue(magazineDetails.getCurrentIssue());

            magazineRepository.save(magazine);
            return ResponseEntity.noContent().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMagazine(@PathVariable Long id) {
        if (magazineRepository.existsById(id)) {
            magazineRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}