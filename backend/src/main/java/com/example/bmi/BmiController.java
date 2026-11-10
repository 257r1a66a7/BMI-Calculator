package com.example.bmi;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class BmiController {

    @PostMapping("/bmi")
    public BmiResponse calculateBmi(@Valid @RequestBody BmiRequest request) {
        double heightCm = request.getHeightCm();
        double weightKg = request.getWeightKg();

        if (!Double.isFinite(heightCm) || !Double.isFinite(weightKg)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Enter valid numeric values.");
        }

        double heightMetres = heightCm / 100.0;
        double bmi = weightKg / (heightMetres * heightMetres);
        bmi = Math.round(bmi * 100.0) / 100.0;

        String category;
        if (bmi < 18.5) {
            category = "Below adult reference range";
        } else if (bmi < 25.0) {
            category = "Within adult reference range";
        } else if (bmi < 30.0) {
            category = "Above adult reference range";
        } else {
            category = "High adult BMI range";
        }

        return new BmiResponse(bmi, category);
    }
}
