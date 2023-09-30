package pl.org.akai.gwizd.repositories

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import pl.org.akai.gwizd.model.Animal
import pl.org.akai.gwizd.model.AnimalType
import pl.org.akai.gwizd.model.DANGEROSITY

@Repository
interface AnimalRepository: CrudRepository<Animal?, Long?> {

    fun getAnimalByGenre(genre: String): List<Animal>

    fun getAnimalByDangerosity(dangerosity: DANGEROSITY): List<Animal>

    fun getAnimalsByType(type: AnimalType): List<Animal>
}