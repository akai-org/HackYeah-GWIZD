package pl.org.akai.gwizd.repositories

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import pl.org.akai.gwizd.model.Tag

@Repository
interface TagRepository: CrudRepository<Tag, Long>