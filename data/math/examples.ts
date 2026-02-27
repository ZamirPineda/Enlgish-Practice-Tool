import { SolvedProblem } from "../../types";

export const solvedExamples: SolvedProblem[] = [
  {
    title: "Derivada: Regla del Producto + Cadena",
    problem: "y = x² \\sin(3x)",
    description:
      "Derivar la función aplicando la regla del producto y la regla de la cadena.",
    steps: [
      {
        explanation:
          "Identificar u y v para la regla del producto: (uv)' = u'v + uv'",
        math: "u = x², \\quad v = \\sin(3x)",
      },
      {
        explanation: "Derivar u (Regla de la potencia)",
        math: "u' = 2x",
      },
      {
        explanation:
          "Derivar v (Regla de la cadena: sin(g(x)) -> g'(x)cos(g(x)))",
        math: "v' = \\cos(3x) \\cdot (3x)' = 3\\cos(3x)",
      },
      {
        explanation: "Aplicar la fórmula del producto: u'v + uv'",
        math: "y' = (2x)(\\sin(3x)) + (x²)(3\\cos(3x))",
      },
      {
        explanation: "Simplificar",
        math: "y' = 2x\\sin(3x) + 3x²\\cos(3x)",
      },
    ],
  },
  {
    title: "Integral por Partes",
    problem: "\\int x e^{2x} dx",
    description:
      "Usar la fórmula ∫u dv = uv - ∫v du (ILATE: Algebraica antes que Exponencial)",
    steps: [
      {
        explanation:
          "Elección de u y dv (ILATE: x es Algebraica, e^2x es Exponencial)",
        math: "u = x \\quad \\Rightarrow \\quad du = dx",
      },
      {
        explanation: "Calcular v integrando dv",
        math: "dv = e^{2x} dx \\quad \\Rightarrow \\quad v = \\frac{1}{2}e^{2x}",
      },
      {
        explanation: "Aplicar fórmula: uv - ∫v du",
        math: "\\int x e^{2x} dx = x(\\frac{1}{2}e^{2x}) - \\int \\frac{1}{2}e^{2x} dx",
      },
      {
        explanation: "Resolver la integral restante",
        math: "= \\frac{1}{2}xe^{2x} - \\frac{1}{2} \\int e^{2x} dx",
      },
      {
        explanation: "Integral final constante y resultado",
        math: "= \\frac{1}{2}xe^{2x} - \\frac{1}{2}(\\frac{1}{2}e^{2x}) + C = \\frac{1}{2}xe^{2x} - \\frac{1}{4}e^{2x} + C",
      },
    ],
  },
  {
    title: "Integral por Sustitución Trigonométrica",
    problem: "\\int \\frac{1}{\\sqrt{9-x^2}} dx",
    description: "Forma √(a²-u²) sugiere sustitución x = a sin(θ)",
    steps: [
      {
        explanation: "Identificar a y el cambio de variable",
        math: "a = 3 \\quad \\Rightarrow \\quad x = 3\\sin(\\theta), \\quad dx = 3\\cos(\\theta) d\\theta",
      },
      {
        explanation: "Sustituir en la raíz",
        math: "\\sqrt{9 - (3\\sin\\theta)^2} = \\sqrt{9(1-\\sin^2\\theta)} = \\sqrt{9\\cos^2\\theta} = 3\\cos\\theta",
      },
      {
        explanation: "Sustituir todo en la integral",
        math: "\\int \\frac{1}{3\\cos\\theta} (3\\cos\\theta d\\theta) = \\int 1 d\\theta",
      },
      {
        explanation: "Integrar respecto a θ",
        math: "= \\theta + C",
      },
      {
        explanation: "Volver a la variable x (θ = arcsin(x/3))",
        math: "= \\arcsin(\\frac{x}{3}) + C",
      },
    ],
  },
  {
    title: "Límite: Regla de L'Hôpital",
    problem: "\\lim_{x \\to 0} \\frac{e^x - 1}{\\sin(x)}",
    description:
      "Evaluar el límite que resulta en una forma indeterminada 0/0.",
    steps: [
      {
        explanation: "Evaluar el límite directamente",
        math: "\\frac{e^0 - 1}{\\sin(0)} = \\frac{1-1}{0} = \\frac{0}{0} \\quad (Indeterminado)",
      },
      {
        explanation:
          "Aplicar Regla de L'Hôpital: derivar numerador y denominador por separado",
        math: "\\lim_{x \\to 0} \\frac{\\frac{d}{dx}(e^x - 1)}{\\frac{d}{dx}(\\sin(x))}",
      },
      {
        explanation: "Calcular las derivadas",
        math: "= \\lim_{x \\to 0} \\frac{e^x}{\\cos(x)}",
      },
      {
        explanation: "Evaluar el nuevo límite",
        math: "= \\frac{e^0}{\\cos(0)} = \\frac{1}{1} = 1",
      },
    ],
  },
  {
    title: "Derivada Implícita",
    problem: "x^2 + y^2 = 25",
    description: "Encontrar dy/dx (o y') para la ecuación de un círculo.",
    steps: [
      {
        explanation:
          "Derivar ambos lados respecto a x. Recordar que y es función de x, así que (y²)' = 2y·y'",
        math: "\\frac{d}{dx}(x^2) + \\frac{d}{dx}(y^2) = \\frac{d}{dx}(25)",
      },
      {
        explanation: "Aplicar reglas de derivación",
        math: "2x + 2y \\cdot y' = 0",
      },
      {
        explanation: "Despejar y'",
        math: "2y \\cdot y' = -2x",
      },
      {
        explanation: "Dividir por 2y",
        math: "y' = \\frac{-2x}{2y} = -\\frac{x}{y}",
      },
    ],
  },
  {
    title: "Integral Definida (Área)",
    problem: "\\int_{0}^{3} (x^2 + 1) dx",
    description:
      "Calcular el área bajo la curva desde x=0 hasta x=3 usando el Teorema Fundamental.",
    steps: [
      {
        explanation: "Encontrar la antiderivada F(x)",
        math: "F(x) = \\int (x^2 + 1) dx = \\frac{x^3}{3} + x",
      },
      {
        explanation: "Aplicar la Regla de Barrow: F(b) - F(a)",
        math: "F(3) - F(0) = [\\frac{3^3}{3} + 3] - [\\frac{0^3}{3} + 0]",
      },
      {
        explanation: "Evaluar F(3)",
        math: "F(3) = \\frac{27}{3} + 3 = 9 + 3 = 12",
      },
      {
        explanation: "Calcular resultado final",
        math: "12 - 0 = 12 \\text{ unidades cuadradas}",
      },
    ],
  },
];
