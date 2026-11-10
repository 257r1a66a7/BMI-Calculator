package com.example.bmi;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

public class BmiRequest {
    @NotNull(message = "Height is required.")
    @DecimalMin(value = "50.0", message = "Height must be at least 50 cm.")
    @DecimalMax(value = "250.0", message = "Height must be at most 250 cm.")
    private Double heightCm;

    @NotNull(message = "Weight is required.")
    @DecimalMin(value = "10.0", message = "Weight must be at least 10 kg.")
    @DecimalMax(value = "500.0", message = "Weight must be at most 500 kg.")
    private Double weightKg;

    public Double getHeightCm() { return heightCm; }
    public void setHeightCm(Double heightCm) { this.heightCm = heightCm; }
    public Double getWeightKg() { return weightKg; }
    public void setWeightKg(Double weightKg) { this.weightKg = weightKg; }
}
