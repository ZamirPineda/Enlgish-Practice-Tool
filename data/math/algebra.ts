import { MathTopic } from "../../types";

export const algebraTopic: MathTopic = {
  id: "algebra",
  title: "Álgebra",
  description: "Fundamentos de álgebra.",
  sections: [
    {
      title: "1. Productos Notables y Factorización",
      headers: ["Nombre", "Fórmula/Identidad", "Ejemplo"],
      rows: [
        [
          "Diferencia de Cuadrados",
          "a² - b² = (a - b)(a + b)",
          "x² - 9 = (x - 3)(x + 3)",
        ],
        [
          "Trinomio Cuadrado Perfecto",
          "(a ± b)² = a² ± 2ab + b²",
          "(x + 3)² = x² + 6x + 9",
        ],
        [
          "Suma de Cubos",
          "a³ + b³ = (a + b)(a² - ab + b²)",
          "x³ + 8 = (x + 2)(x² - 2x + 4)",
        ],
        [
          "Diferencia de Cubos",
          "a³ - b³ = (a - b)(a² + ab + b²)",
          "x³ - 27 = (x - 3)(x² + 3x + 9)",
        ],
        ["Factor Común", "ax + ay = a(x + y)", "2x² + 4x = 2x(x + 2)"],
        [
          "Trinomio de la forma x²+bx+c",
          "x² + (a+b)x + ab = (x+a)(x+b)",
          "x² + 5x + 6 = (x+2)(x+3)",
        ],
      ],
    },
    {
      title: "2. Ecuación Cuadrática",
      headers: ["Concepto", "Fórmula", "Notas"],
      rows: [
        [
          "Fórmula General",
          "x = (-b ± √(b² - 4ac)) / 2a",
          "Para ax² + bx + c = 0",
        ],
        [
          "Discriminante (Δ)",
          "Δ = b² - 4ac",
          "Δ > 0: 2 raíces reales\nΔ = 0: 1 raíz real\nΔ < 0: Raíces complejas",
        ],
        ["Suma de Raíces", "x₁ + x₂ = -b/a", ""],
        ["Producto de Raíces", "x₁ · x₂ = c/a", ""],
      ],
    },
    {
      title: "3. Leyes de Exponentes y Radicales",
      headers: ["Regla", "Identidad", "Ejemplo"],
      rows: [
        ["Producto de Potencias", "aᵐ · aⁿ = aᵐ⁺ⁿ", "x² · x³ = x⁵"],
        ["Cociente de Potencias", "aᵐ / aⁿ = aᵐ⁻ⁿ", "x⁵ / x² = x³"],
        ["Potencia de Potencia", "(aᵐ)ⁿ = aᵐ·ⁿ", "(x²)³ = x⁶"],
        ["Potencia de un Producto", "(ab)ⁿ = aⁿ · bⁿ", "(2x)³ = 8x³"],
        ["Exponente Negativo", "a⁻ⁿ = 1 / aⁿ", "x⁻² = 1/x²"],
        ["Exponente Cero", "a⁰ = 1", "5⁰ = 1 (a ≠ 0)"],
        ["Raíz como Exponente", "ⁿ√aᵐ = aᵐ/ⁿ", "³√x² = x²/³"],
        ["Producto de Raíces", "ⁿ√a · ⁿ√b = ⁿ√(a·b)", "√2 · √3 = √6"],
      ],
    },
  ],
};
