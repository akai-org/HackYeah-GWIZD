package pl.org.akai.gwizd.services

import org.springframework.stereotype.Service
import pl.org.akai.gwizd.repositories.ImageRepository

@Service
class ImageService (
        private val imageRepository: ImageRepository
) {

}