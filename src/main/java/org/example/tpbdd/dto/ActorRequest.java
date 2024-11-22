package org.example.tpbdd.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ActorRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String lastname;
    @Positive
    private int age;
}
