package com.aidkido.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DrawingRequestDTO {

    @NotNull
    private Long userId;

    @NotBlank
    private String base64Image;
}
