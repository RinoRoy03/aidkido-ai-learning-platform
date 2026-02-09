    package com.aidkido.service;
    
    import org.springframework.stereotype.Service;
    
    import java.io.InputStream;
    import java.net.URL;
    import java.net.URLEncoder;
    import java.nio.charset.StandardCharsets;
    import java.nio.file.Files;
    import java.nio.file.Path;
    import java.nio.file.StandardCopyOption;
    import java.util.UUID;
    
    @Service
    public class AiImageService {
    
        private static final String AI_IMAGE_DIR = "uploads/ai/";

        public String generateImageFromDrawing(String originalImagePath) {

            try {
                Files.createDirectories(Path.of(AI_IMAGE_DIR));

                String prompt = "kids cartoon drawing colorful";
                String encodedPrompt =
                        URLEncoder.encode(prompt, StandardCharsets.UTF_8);

                String aiUrl =
                        "https://image.pollinations.ai/prompt/" + encodedPrompt;

                String fileName = UUID.randomUUID() + ".png";
                String filePath = AI_IMAGE_DIR + fileName;

                try (InputStream in = new URL(aiUrl).openStream()) {
                    Files.copy(in, Path.of(filePath),
                            StandardCopyOption.REPLACE_EXISTING);
                    return filePath;
                }

            } catch (Exception ex) {

                // ⭐ DO NOT CRASH SERVER
                System.out.println("Pollinations failed, using fallback image");

                try {
                    String fallback = AI_IMAGE_DIR + "fallback.png";

                    Files.copy(
                            Path.of("uploads/default.png"), // put a default image here
                            Path.of(fallback),
                            StandardCopyOption.REPLACE_EXISTING
                    );

                    return fallback;

                } catch (Exception ignore) {
                    return null;
                }
            }
        }

    }
