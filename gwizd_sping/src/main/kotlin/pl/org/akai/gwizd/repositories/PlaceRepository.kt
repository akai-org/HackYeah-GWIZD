package pl.org.akai.gwizd.repositories

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import pl.org.akai.gwizd.model.Place

@Repository
interface PlaceRepository: CrudRepository<Place, Long> {
}