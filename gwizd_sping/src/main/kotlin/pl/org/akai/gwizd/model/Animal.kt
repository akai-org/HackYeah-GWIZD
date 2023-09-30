package pl.org.akai.gwizd.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import lombok.Data

@Data
@Table(name = "animals")
@Entity
data class Animal(
        val name: String,
        val description: String,
        val genre: String,
        val tag: String,
        val type: AnimalType,
        val dangerosity: DANGEROSITY

) {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    var id: Long? = null
}

enum class AnimalType {
    BIRD,
    MAMMAL,
    REPTILE,
    AMPHIBIAN,
    FISH,
    INVERTEBRATE
}

enum class DANGEROSITY {
    HARMLESS,
    DANGEROUS,
    DEADLY
}
