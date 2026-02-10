import { MathTopic } from '../../types';

export const calculusTopic: MathTopic = {
    id: 'calculus',
    title: 'Cálculo',
    description: 'Formulario de cálculo integral y diferencial.',
    sections: [
        {
            title: "1. Reglas Generales de Operación",
            headers: ["Regla", "Función y=f(u)", "Derivada dy/dx", "Integral ∫ f(x) dx", "Ejemplo Derivada", "Ejemplo Integral"],
            rows: [
                ["Constante", "k", "0", "kx + C", "y=7 → y'=0", "∫ 7 dx = 7x + C"],
                ["Linealidad", "u ± v", "u' ± v'", "∫ u dx ± ∫ v dx", "(x² + x)' = 2x + 1", "∫ (2x+1) dx = x² + x + C"],
                ["Producto", "u · v", "u'v + uv'", "∫ u dv = uv - ∫ v du", "x sin x → sin x + x cos x", "∫ x eˣ dx = xeˣ - eˣ + C"],
                ["Cociente", "u / v", "(u'v - uv') / v²", "(No hay directa)", "x/eˣ → (eˣ - xeˣ)/e²ˣ", "∫ (1/x) dx = ln|x| + C"],
                ["Cadena", "f(g(x))", "f'(g(x)) · g'(x)", "(Sustitución)", "sin(x²) → 2x cos(x²)", "∫ 2x cos(x²) dx = sin(x²) + C"],
                ["Teorema Fund.", "∫ₐᵇ f(x) dx", "N/A", "F(b) - F(a)", "d/dx ∫ₐˣ f(t)dt = f(x)", "∫₀¹ 2x dx = 1"]
            ],
            studyStrategies: [
                {
                    id: 'calc-general-deriv',
                    name: 'Practicar Derivadas Básicas',
                    questionTemplate: 'Calcula la derivada de: {col1}',
                    questionColumnIndex: 1, // Función
                    answerColumnIndex: 2 // Derivada
                },
                {
                    id: 'calc-general-integ',
                    name: 'Practicar Integrales Básicas',
                    questionTemplate: 'Calcula la integral de: {col1}',
                    questionColumnIndex: 1, // Función
                    answerColumnIndex: 3 // Integral
                }
            ]
        },
        {
            title: "2. Funciones Algebraicas y Trascendentes",
            headers: ["Regla", "Función y=f(u)", "Derivada dy/dx", "Integral ∫ f(x) dx", "Ejemplo Derivada", "Ejemplo Integral"],
            rows: [
                ["Potencia", "uⁿ", "n uⁿ⁻¹ u'", "xⁿ⁺¹/(n+1)", "x⁵ → 5x⁴", "∫ x⁴ dx = x⁵/5 + C"],
                ["Inversa", "1/u", "-u'/u²", "ln|x|", "y=x⁻¹ → y'=-x⁻²", "∫ 5/x dx = 5ln|x| + C"],
                ["Raíz", "√u", "u'/(2√u)", "(2/3)x³/²", "y=√x → y'=1/(2√x)", "∫ √x dx = (2/3)x³/² + C"],
                ["Exponencial", "eᵘ", "u' eᵘ", "eˣ", "e³ˣ → 3e³ˣ", "∫ e³ˣ dx = (1/3)e³ˣ + C"],
                ["Base a", "aᵘ", "u' aᵘ ln(a)", "aˣ/ln(a)", "2ˣ → 2ˣ ln(2)", "∫ 2ˣ dx = 2ˣ/ln(2) + C"],
                ["Log Natural", "ln(u)", "u'/u", "x ln(x) - x", "ln(x) → 1/x", "∫ ln(x) dx = x(ln x - 1) + C"],
                ["Valor Abs.", "|u|", "u' u/|u|", "x|x|/2", "|x| → sgn(x)", "∫₋₁¹ |x| dx = 1"]
            ]
        },
        {
            title: "3. Trigonometría",
            headers: ["Regla", "Función y=f(u)", "Derivada dy/dx", "Integral ∫ f(x) dx", "Ejemplo Derivada", "Ejemplo Integral"],
            rows: [
                ["Seno", "sin(u)", "u' cos(u)", "-cos(x)", "sin(3x) → 3cos(3x)", "∫ sin(3x) dx = -(1/3)cos(3x) + C"],
                ["Coseno", "cos(u)", "-u' sin(u)", "sin(x)", "cos(x²) → -2x sin(x²)", "∫ cos(5x) dx = (1/5)sin(5x) + C"],
                ["Tangente", "tan(u)", "u' sec²(u)", "ln|sec(x)|", "tan(5x) → 5sec²(5x)", "∫ tan(2x) dx = (1/2)ln|sec(2x)| + C"],
                ["Cotangente", "cot(u)", "-u' csc²(u)", "ln|sin(x)|", "cot(2x) → -2csc²(2x)", "∫ cot(3x) dx = (1/3)ln|sin(3x)| + C"],
                ["Secante", "sec(u)", "u' sec(u)tan(u)", "ln|sec(x) + tan(x)|", "sec(4x) → 4sec(4x)tan(4x)", "∫ sec(x) dx = ln|sec x + tan x| + C"],
                ["Cosecante", "csc(u)", "-u' csc(u)cot(u)", "-ln|csc(x) + cot(x)|", "csc(x) → -csc(x)cot(x)", "∫ csc(x) dx = -ln|csc x + cot x| + C"]
            ],
            studyStrategies: [
                {
                    id: 'calc-trig-deriv',
                    name: 'Derivadas Trigonométricas',
                    questionTemplate: 'Derivada de: {col1}',
                    questionColumnIndex: 1,
                    answerColumnIndex: 2
                },
                {
                    id: 'calc-trig-integ',
                    name: 'Integrales Trigonométricas',
                    questionTemplate: 'Integral de: {col1}',
                    questionColumnIndex: 1,
                    answerColumnIndex: 3
                }
            ]
        },
        {
            title: "4. Trigonométricas Inversas",
            headers: ["Regla", "Función y=f(u)", "Derivada dy/dx", "Integral ∫ f(x) dx", "Ejemplo Derivada", "Ejemplo Integral"],
            rows: [
                ["Arcoseno", "arcsin(u)", "u'/√(1-u²)", "x arcsin(x) + √(1-x²)", "arcsin(2x) → 2/√(1-4x²)", "∫ arcsin(x) dx = x arcsin(x) + √(1-x²) + C"],
                ["Arcocoseno", "arccos(u)", "-u'/√(1-u²)", "x arccos(x) - √(1-x²)", "arccos(x) → -1/√(1-x²)", "∫ arccos(x) dx = x arccos(x) - √(1-x²) + C"],
                ["Arcotangente", "arctan(u)", "u'/(1+u²)", "x arctan(x) - (1/2)ln(1+x²)", "arctan(3x) → 3/(1+9x²)", "∫ arctan(x) dx = x arctan(x) - (1/2)ln(1+x²) + C"],
                ["Arcocotangente", "arccot(u)", "-u'/(1+u²)", "x arccot(x) + (1/2)ln(1+x²)", "arccot(x) → -1/(1+x²)", "∫ arccot(x) dx = x arccot(x) + (1/2)ln(1+x²) + C"],
                ["Arcosecante", "arcsec(u)", "u'/(|u|√(u²-1))", "x arcsec(x) - ln|x + √(x²-1)|", "arcsec(2x) → 2/(|2x|√(4x²-1))", "∫ arcsec(x) dx = x arcsec(x) - ln|x+√(x²-1)|+C"]
            ]
        },
        {
            title: "5. Hiperbólicas",
            headers: ["Regla", "Función y=f(u)", "Derivada dy/dx", "Integral ∫ f(x) dx", "Ejemplo Derivada", "Ejemplo Integral"],
            rows: [
                ["Seno Hiperb.", "sinh(u)", "u' cosh(u)", "cosh(x)", "sinh(2x) → 2cosh(2x)", "∫ sinh(2x) dx = (1/2)cosh(2x) + C"],
                ["Coseno Hiperb.", "cosh(u)", "u' sinh(u)", "sinh(x)", "cosh(3x) → 3sinh(3x)", "∫ cosh(3x) dx = (1/3)sinh(3x) + C"],
                ["Tangente Hiperb.", "tanh(u)", "u' sech²(u)", "ln(cosh(x))", "tanh(x²) → 2x sech²(x²)", "∫ tanh(x) dx = ln(cosh x) + C"],
                ["Arcoseno Hip.", "arsinh(u)", "u'/√(u²+1)", "x arsinh(x) - √(x²+1)", "arsinh(x) → 1/√(x²+1)", "∫ arsinh(x) dx = x arsinh(x) - √(x²+1) + C"],
                ["Arcotangente Hip.", "artanh(u)", "u'/(1-u²)", "x artanh(x) + (1/2)ln(1-x²)", "artanh(5x) → 5/(1-25x²)", "∫ artanh(x) dx = x artanh(x) + 0.5ln(1-x²) + C"]
            ]
        },
        {
            title: "6. Técnicas de Integración",
            headers: ["Técnica", "Fórmula / Método", "Ejemplo / Notas"],
            rows: [
                ["Sustitución (u)", "∫ f(g(x))g'(x)dx = ∫ f(u)du", "u = g(x) → du = g'(x)dx"],
                ["Por Partes", "∫ u dv = uv - ∫ v du", "ILATE: Inversa, Log, Alg, Trig, Exp"],
                ["Sustitución Trigonométrica", "√(a²-x²) → x = a sin(θ)", "√(a²+x²) → x = a tan(θ)\n√(x²-a²) → x = a sec(θ)"],
                ["Fracciones Parciales", "P(x)/Q(x) = A/(x-a) + B/(x-b) + ...", "Para factores lineales distintos"],
                ["Integrales de Potencias Trig.", "∫ sinᵐ(x)cosⁿ(x)dx", "Si m o n impar: separar un factor\nSi ambos pares: usar identidades de ángulo mitad"]
            ]
        }
    ]
};
