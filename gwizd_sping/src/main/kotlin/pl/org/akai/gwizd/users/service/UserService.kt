package pl.org.akai.gwizd.users.service

import org.springframework.stereotype.Service
import pl.org.akai.gwizd.model.User
import pl.org.akai.gwizd.users.repository.UserRepository

@Service
class UserService(
    private val userRepository: UserRepository
) {
    fun getAllUser(): MutableIterable<User?> = userRepository.findAll()

    fun addUser(user: User): User? = userRepository.save(user)

    fun getUserByName(name: String): User? = userRepository.findUserByName(name)

    fun deleteUser(user: User) = userRepository.delete(user)

    fun updateUser(user: User) = userRepository.save(user)
}