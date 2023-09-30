package pl.org.akai.gwizd.users.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.factory.PasswordEncoderFactories
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import pl.org.akai.gwizd.config.utils.JwtTokenUtil
import pl.org.akai.gwizd.users.model.User
import pl.org.akai.gwizd.users.service.UserService


@RestController
@RequestMapping("/auth")
class AuthController @Autowired constructor(
    private val jwtTokenUtil: JwtTokenUtil,
    private val userService: UserService
) {
    @PostMapping("/login")
    fun login(@RequestParam username: String?, @RequestParam password: String?): ResponseEntity<String> {
        val passwordEncoder: PasswordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder()
        val user = userService.getUserByName(username!!)
        if (user == null || !passwordEncoder.matches(password, user.password)) {
            return ResponseEntity.badRequest().build()
        }
        val token = jwtTokenUtil.generateToken(username)
        return ResponseEntity.ok(token)
    }
    @PostMapping("/register")
    fun register(@RequestBody user: User): ResponseEntity<String> {
        val token = jwtTokenUtil.generateToken(user.name)
        val passwordEncoder: PasswordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder()
        user.password = passwordEncoder.encode(user.password)
        userService.addUser(user)
        return ResponseEntity.ok(token)
    }
}