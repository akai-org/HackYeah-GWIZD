package pl.org.akai.gwizd.users.service

import org.springframework.stereotype.Service
import pl.org.akai.gwizd.users.model.User
import pl.org.akai.gwizd.users.repository.UserRepository

@Service
class UserService(
    private val userRepository: UserRepository
) {
    fun getAllUser(): MutableIterable<User?> = userRepository.findAll()

    fun addUser(user: User): User? = userRepository.save(user)

    fun getUserByName(name: String): User? = userRepository.findUserByName(name)
}