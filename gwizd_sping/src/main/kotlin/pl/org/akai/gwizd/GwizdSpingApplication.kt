package pl.org.akai.gwizd

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@SpringBootApplication(scanBasePackages = ["pl.org.akai.gwizd"])
@EnableJpaRepositories("pl.org.akai.gwizd")
@EntityScan("pl.org.akai.gwizd")
class GwizdSpingApplication

fun main(args: Array<String>) {
	runApplication<GwizdSpingApplication>(*args)
}
