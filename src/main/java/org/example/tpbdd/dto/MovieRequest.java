package org.example.tpbdd.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MovieRequest {
    @NotBlank
    private String title;
    @NotBlank
    private String genre;
    @Min(1900)
    private int year;
    @NotBlank
    private String director;
    @NotNull
    private List<@Valid ActorRequest> actors;
}
