package pl.org.akai.gwizd.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pl.org.akai.gwizd.model.Animal
import pl.org.akai.gwizd.model.AnimalType
import pl.org.akai.gwizd.model.DANGEROSITY
import pl.org.akai.gwizd.services.AnimalService

@RestController
@RequestMapping("/api/v1")
class AnimalController @Autowired constructor(
        private val animalService: AnimalService
) {
    @GetMapping("/animals")
    fun getAllAnimals(): MutableIterable<Animal?> = animalService.getAllAnimals()

    @GetMapping("/animals/{id}")
    fun getAnimalById(id: Long): ResponseEntity<Animal> {
        animalService.getAnimalById(id)?.let {
            return ResponseEntity.ok(it.get())
        }
        return ResponseEntity.notFound().build()
    }

    @GetMapping("/animals/{genre}")
    fun getAnimalByGenre(genre: String): ResponseEntity<List<Animal>> {
        animalService.getAnimalByGenre(genre)?.let {
            return ResponseEntity.ok(it)
        }
        return ResponseEntity.notFound().build()
    }

    @GetMapping("/animals/{dangerosity}")
    fun getAnimalByDangerosity(dangerosity: DANGEROSITY): ResponseEntity<List<Animal>> {
        animalService.getAnimalByDangerosity(dangerosity)?.let {
            return ResponseEntity.ok(it)
        }
        return ResponseEntity.notFound().build()
    }

    @GetMapping("/animals/{type}")
    fun getAnimalsByType(type: AnimalType): ResponseEntity<List<Animal>> {
        animalService.getAnimalsByType(type)?.let {
            return ResponseEntity.ok(it)
        }
        return ResponseEntity.notFound().build()
    }

    @PostMapping("/animals")
    fun addAnimal(@RequestBody animal: Animal): ResponseEntity<Animal> {
        animalService.addAnimal(animal)
        return ResponseEntity.ok(animal)
    }
    @PostMapping("/animals/update")
    fun updateAnimal(@RequestBody  animal: Animal): ResponseEntity<Animal> {
        animalService.updateAnimal(animal)
        return ResponseEntity.ok(animal)
    }

    @DeleteMapping("/animals")
    fun removeAnimal(@RequestBody animal: Animal): ResponseEntity<Animal> {
        animalService.removeAnimal(animal)
        return ResponseEntity.ok(animal)
    }
}