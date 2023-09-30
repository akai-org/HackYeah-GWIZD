package pl.org.akai.gwizd.model

import jakarta.persistence.*
import lombok.Data

@Data
@Table(name = "tags")
@Entity
data class Tag(
        val name: String,
        val description: String
) {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    var id: Long? = null
}
