package pl.org.akai.gwizd.model

import jakarta.persistence.*
import lombok.Data

@Data
@Table(name = "report_cases")
@Entity
data class ReportCase(
        val name: String,
        val description: String,
        @ManyToOne
        val place: Place,
        @ManyToOne
        val image: Image,
        @OneToOne
        val animal: Animal,
        @ManyToMany
        val tags: List<Tag>,
        @ManyToOne
        val user: User
){
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    var id: Long? = null
}
