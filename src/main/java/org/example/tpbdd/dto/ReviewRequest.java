package org.example.tpbdd.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewRequest {
    @NotBlank
    private String movie;
    @NotBlank
    private String reviewerName;
    @NotBlank
    private String review;
    @NotNull
    @Min(0)
    @Max(5)
    private Float rating;
}
