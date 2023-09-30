package pl.org.akai.gwizd.users.repository

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import pl.org.akai.gwizd.users.model.User


@Repository
interface UserRepository : CrudRepository<User?, Long?>