package pl.org.akai.gwizd.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pl.org.akai.gwizd.model.Animal
import pl.org.akai.gwizd.model.AnimalType
import pl.org.akai.gwizd.model.DANGEROSITY
import pl.org.akai.gwizd.repositories.AnimalRepository

@Service
class AnimalService(
        private val animalRepository: AnimalRepository
) {
    fun getAllAnimals() = animalRepository.findAll()
    fun getAnimalById(id: Long) = animalRepository.findById(id)

    fun addAnimal(animal: Animal) = animalRepository.save(animal)

    fun removeAnimal(animal: Animal) = animalRepository.delete(animal)

    fun updateAnimal(animal: Animal) = animalRepository.save(animal)

    fun getAnimalByGenre(genre: String) = animalRepository.getAnimalByGenre(genre)

    fun getAnimalByDangerosity(dangerosity: DANGEROSITY) = animalRepository.getAnimalByDangerosity(dangerosity)

    fun getAnimalsByType(type: AnimalType) = animalRepository.getAnimalsByType(type)
}