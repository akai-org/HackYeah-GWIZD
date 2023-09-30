package pl.org.akai.gwizd.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import pl.org.akai.gwizd.config.utils.JwtTokenUtil


@EnableWebMvc
@Configuration
@ComponentScan("pl.org.akai.gwizd")
open class WebConfig @Autowired constructor(private val jwtTokenUtil: JwtTokenUtil): WebMvcConfigurer  {
    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry.addResourceHandler("swagger-ui.html")
            .addResourceLocations("classpath:/META-INF/resources/")
        registry.addResourceHandler("/webjars/**")
            .addResourceLocations("classpath:/META-INF/resources/webjars/")
    }
}