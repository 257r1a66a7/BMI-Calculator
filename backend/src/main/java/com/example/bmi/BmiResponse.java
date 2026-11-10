package com.example.bmi;

public class BmiResponse {
    private final double bmi;
    private final String category;

    public BmiResponse(double bmi, String category) {
        this.bmi = bmi;
        this.category = category;
    }

    public double getBmi() { return bmi; }
    public String getCategory() { return category; }
}
