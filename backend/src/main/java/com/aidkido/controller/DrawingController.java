package com.aidkido.controller;

import com.aidkido.dto.DrawingRequestDTO;
import com.aidkido.model.Drawing;
import com.aidkido.service.DrawingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/drawings")
@RequiredArgsConstructor

public class DrawingController {

    private final DrawingService drawingService;

    /* ================= SAVE DRAWING ================= */

    @PostMapping("/upload")
    public Drawing uploadDrawing(@RequestBody DrawingRequestDTO request) {
        return drawingService.saveDrawing(request);
    }

    /* ================= AI RECREATE ================= */

    @PostMapping("/{id}/recreate")
    public Drawing recreateWithAI(@PathVariable Long id) {
        return drawingService.generateAIImage(id);
    }
}
