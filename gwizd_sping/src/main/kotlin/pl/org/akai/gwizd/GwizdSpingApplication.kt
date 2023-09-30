package pl.org.akai.gwizd

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class GwizdSpingApplication

fun main(args: Array<String>) {
	runApplication<GwizdSpingApplication>(*args)
}
