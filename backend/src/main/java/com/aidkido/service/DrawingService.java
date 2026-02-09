package com.aidkido.service;

import com.aidkido.dto.DrawingRequestDTO;
import com.aidkido.model.Drawing;
import com.aidkido.model.User;
import com.aidkido.repository.DrawingRepository;
import com.aidkido.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DrawingService {

    private final DrawingRepository drawingRepository;
    private final UserRepository userRepository;
    private final AiImageService aiImageService;

    private static final String IMAGE_DIR = "uploads/drawings/";

    /* ================= SAVE DRAWING ================= */

    public Drawing saveDrawing(DrawingRequestDTO dto) {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String imagePath = saveBase64Image(dto.getBase64Image());

        Drawing drawing = Drawing.builder()
                .user(user)
                .originalImagePath(imagePath)
                .createdAt(LocalDateTime.now())
                .build();

        return drawingRepository.save(drawing);
    }

    private String saveBase64Image(String base64Image) {

        try {
            if (base64Image == null || base64Image.isBlank()) {
                throw new RuntimeException("Image is empty");
            }

            // remove header
            if (base64Image.contains(",")) {
                base64Image = base64Image.split(",")[1];
            }

            byte[] imageBytes = Base64.getDecoder().decode(base64Image);

            File directory = new File(IMAGE_DIR);
            if (!directory.exists()) directory.mkdirs();

            String fileName = UUID.randomUUID() + ".png";
            String filePath = IMAGE_DIR + fileName;

            try (FileOutputStream fos = new FileOutputStream(filePath)) {
                fos.write(imageBytes);
            }

            return filePath;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Invalid Base64 image sent from frontend");
        }
    }


    /* ================= AI GENERATION ================= */

    public Drawing generateAIImage(Long drawingId) {

        Drawing drawing = drawingRepository.findById(drawingId)
                .orElseThrow(() -> new RuntimeException("Drawing not found"));

        // Call AI service (clean separation)
        String aiImagePath = aiImageService.generateImageFromDrawing(
                drawing.getOriginalImagePath()
        );

        drawing.setAiImagePath(aiImagePath);
        return drawingRepository.save(drawing);
    }
}

