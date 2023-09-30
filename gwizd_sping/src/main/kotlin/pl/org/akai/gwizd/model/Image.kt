package pl.org.akai.gwizd.model

import jakarta.persistence.*
import lombok.Data

@Data
@Table(name = "images")
@Entity
data class Image(
        val name: String,
        val base64: String,
        val description: String
) {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    var id: Long? = null
}