package pl.org.akai.gwizd.model

import jakarta.persistence.*
import lombok.Data

@Data
@Table(name = "place")
@Entity
data class Place(
        val name: String,
        val description: String,
        val latitude: Double,
        val longitude: Double
) {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    var id: Long? = null
}
