package pl.org.akai.gwizd.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import pl.org.akai.gwizd.config.utils.JwtTokenFilter

@Configuration
@EnableWebSecurity
class WebSecurityConfig @Autowired constructor(private var jwtTokenFilter: JwtTokenFilter) {
    @Bean
    @Throws(Exception::class)
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain? {
        return http
            .csrf { csrf -> csrf.disable() }
            .sessionManagement { sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.ALWAYS) }
            .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter::class.java)
            .authorizeHttpRequests { auth ->
                auth
                    .requestMatchers("/swagger-ui/**").permitAll()
                    .requestMatchers("/v3/api-docs/**").permitAll()
                    .requestMatchers("/auth/**").permitAll()
                    .requestMatchers("/me").permitAll()
                    .anyRequest().authenticated()
            }
            .build()
    }
}