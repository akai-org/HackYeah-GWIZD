package pl.org.akai.gwizd.users.service

import org.springframework.stereotype.Service
import pl.org.akai.gwizd.users.model.User
import pl.org.akai.gwizd.users.repository.UserRepository

@Service
class UserService(
    private val userRepository: UserRepository
) {
    fun getAllUser() = userRepository.findAll()

    fun addUser(user: User) = userRepository.save(user)
}