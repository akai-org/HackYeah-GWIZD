package pl.org.akai.gwizd.model

import jakarta.persistence.*
import lombok.Data
import org.springframework.context.annotation.Primary

@Data
@Entity
@Table(name = "users")
data class User(
        val name: String,
        var password: String,
        val url: String,
        val email: String,
        val age: Int
) {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    var id: Long? = null
}
