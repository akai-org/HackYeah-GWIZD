package pl.org.akai.gwizd.users.controller

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.factory.PasswordEncoderFactories
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import pl.org.akai.gwizd.config.utils.JwtTokenUtil
import pl.org.akai.gwizd.model.LoginRequest
import pl.org.akai.gwizd.model.User
import pl.org.akai.gwizd.users.service.UserService


@RestController
@RequestMapping("/auth")
class AuthController @Autowired constructor(
    private val jwtTokenUtil: JwtTokenUtil,
    private val userService: UserService,
) {

    private val logger = LoggerFactory.getLogger(AuthController::class.java)
    @PostMapping("/login")
    fun login(@RequestBody login: LoginRequest): ResponseEntity<String> {
        val passwordEncoder: PasswordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder()

        val user = userService.getUserByName(login.email)
        if (user == null || !passwordEncoder.matches(login.password, user.password)) {
            logger.error("User not found")
            return ResponseEntity.badRequest().build()
        }
        val token = jwtTokenUtil.generateToken(login.email)
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
    @GetMapping("/me")
    fun refresh(): ResponseEntity<String> {
        return ResponseEntity.ok("OK")
    }
}