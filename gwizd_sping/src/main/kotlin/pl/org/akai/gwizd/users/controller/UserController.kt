package pl.org.akai.gwizd.users.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import pl.org.akai.gwizd.users.exceptions.UserCreateException
import pl.org.akai.gwizd.users.model.User
import pl.org.akai.gwizd.users.service.UserService

@RestController("api/v1")
class UserController(
    private val userService: UserService
) {

    @GetMapping("/users")
    fun getAllUsers(): ResponseEntity<MutableIterable<User?>> {
        return userService.getAllUser().let {
            ResponseEntity.ok(it)
        }
    }

    @PostMapping("/users")
    fun addUser(user: User): ResponseEntity<User> {
        userService.addUser(user)?.let {
            return ResponseEntity.ok(it)
        }
        throw UserCreateException()
    }
    @GetMapping("/users/{name}")
    fun addUser(@PathVariable name: String): ResponseEntity<User> {
        userService.getUserByName(name)?.let {
            return ResponseEntity.ok(it)
        }
        return ResponseEntity.notFound().build()
    }
}