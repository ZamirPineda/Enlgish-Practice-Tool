import React, { useState } from 'react';
import LatexRenderer from './LatexRenderer';

type MathTab = 'calculus' | 'geometry' | 'algebra' | 'examples';

const MathView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<MathTab>('calculus');

    const calculusSections = [
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
    ];

    const geometrySections = [
        {
            title: "1. Figuras Planas (2D)",
            headers: ["Figura", "Fórmulas (Área y Perímetro)", "Esquema / Notas"],
            rows: [
                ["Triángulo", "A = (b · h) / 2\nP = a + b + c", "b: base, h: altura\nP: Suma de lados"],
                ["Cuadrado", "A = l²\nP = 4l", "l: lado"],
                ["Rectángulo", "A = b · h\nP = 2(b + h)", "b: base, h: altura"],
                ["Paralelogramo", "A = b · h\nP = 2(a + b)", "h: altura perpendicular a la base b"],
                ["Trapecio", "A = h · (B + b) / 2\nP = Suma de lados", "B: base mayor, b: base menor, h: altura"],
                ["Círculo", "A = π · r²\nP = 2 · π · r", "r: radio, d: diámetro (d=2r)"],
                ["Elipse", "A = π · a · b\nP ≈ π[3(a+b) - √((3a+b)(a+3b))]", "a: semieje mayor, b: semieje menor"],
                ["Rombo", "A = (D · d) / 2\nP = 4l", "D: diagonal mayor, d: diagonal menor"]
            ]
        },
        {
            title: "2. Cuerpos Geométricos (3D)",
            headers: ["Cuerpo", "Fórmulas (Volumen y Área Superficial)", "Notas"],
            rows: [
                ["Cubo", "V = l³\nA = 6l²", "l: arista"],
                ["Prisma Rectangular (Ortoedro)", "V = l · w · h\nA = 2(lw + lh + wh)", "l: largo, w: ancho, h: altura"],
                ["Cilindro", "V = π · r² · h\nA = 2πr(r + h)", "r: radio base, h: altura"],
                ["Cono", "V = (1/3) · π · r² · h\nA = πr(r + g)", "g: generatriz √(r² + h²)"],
                ["Esfera", "V = (4/3) · π · r³\nA = 4 · π · r²", "r: radio"],
                ["Pirámide (Base Cuadrada)", "V = (1/3) · l² · h\nA = l² + 2l · ap", "ap: apotema de la cara lateral"]
            ]
        }
    ];

    const solvedExamples = [
        {
            title: "Derivada: Regla del Producto + Cadena",
            problem: "y = x² \\sin(3x)",
            description: "Derivar la función aplicando la regla del producto y la regla de la cadena.",
            steps: [
                {
                    explanation: "Identificar u y v para la regla del producto: (uv)' = u'v + uv'",
                    math: "u = x², \\quad v = \\sin(3x)"
                },
                {
                    explanation: "Derivar u (Regla de la potencia)",
                    math: "u' = 2x"
                },
                {
                    explanation: "Derivar v (Regla de la cadena: sin(g(x)) -> g'(x)cos(g(x)))",
                    math: "v' = \\cos(3x) \\cdot (3x)' = 3\\cos(3x)"
                },
                {
                    explanation: "Aplicar la fórmula del producto: u'v + uv'",
                    math: "y' = (2x)(\\sin(3x)) + (x²)(3\\cos(3x))"
                },
                {
                    explanation: "Simplificar",
                    math: "y' = 2x\\sin(3x) + 3x²\\cos(3x)"
                }
            ]
        },
        {
            title: "Integral por Partes",
            problem: "\\int x e^{2x} dx",
            description: "Usar la fórmula ∫u dv = uv - ∫v du (ILATE: Algebraica antes que Exponencial)",
            steps: [
                {
                    explanation: "Elección de u y dv (ILATE: x es Algebraica, e^2x es Exponencial)",
                    math: "u = x \\quad \\Rightarrow \\quad du = dx"
                },
                {
                    explanation: "Calcular v integrando dv",
                    math: "dv = e^{2x} dx \\quad \\Rightarrow \\quad v = \\frac{1}{2}e^{2x}"
                },
                {
                    explanation: "Aplicar fórmula: uv - ∫v du",
                    math: "\\int x e^{2x} dx = x(\\frac{1}{2}e^{2x}) - \\int \\frac{1}{2}e^{2x} dx"
                },
                {
                    explanation: "Resolver la integral restante",
                    math: "= \\frac{1}{2}xe^{2x} - \\frac{1}{2} \\int e^{2x} dx"
                },
                {
                    explanation: "Integral final constante y resultado",
                    math: "= \\frac{1}{2}xe^{2x} - \\frac{1}{2}(\\frac{1}{2}e^{2x}) + C = \\frac{1}{2}xe^{2x} - \\frac{1}{4}e^{2x} + C"
                }
            ]
        },
        {
            title: "Integral por Sustitución Trigonométrica",
            problem: "\\int \\frac{1}{\\sqrt{9-x^2}} dx",
            description: "Forma √(a²-u²) sugiere sustitución x = a sin(θ)",
            steps: [
                {
                    explanation: "Identificar a y el cambio de variable",
                    math: "a = 3 \\quad \\Rightarrow \\quad x = 3\\sin(\\theta), \\quad dx = 3\\cos(\\theta) d\\theta"
                },
                {
                    explanation: "Sustituir en la raíz",
                    math: "\\sqrt{9 - (3\\sin\\theta)^2} = \\sqrt{9(1-\\sin^2\\theta)} = \\sqrt{9\\cos^2\\theta} = 3\\cos\\theta"
                },
                {
                    explanation: "Sustituir todo en la integral",
                    math: "\\int \\frac{1}{3\\cos\\theta} (3\\cos\\theta d\\theta) = \\int 1 d\\theta"
                },
                {
                    explanation: "Integrar respecto a θ",
                    math: "= \\theta + C"
                },
                {
                    explanation: "Volver a la variable x (θ = arcsin(x/3))",
                    math: "= \\arcsin(\\frac{x}{3}) + C"
                }
            ]
        }
    ];

    const algebraSections = [
        {
            title: "1. Productos Notables y Factorización",
            headers: ["Nombre", "Fórmula/Identidad", "Ejemplo"],
            rows: [
                ["Diferencia de Cuadrados", "a² - b² = (a - b)(a + b)", "x² - 9 = (x - 3)(x + 3)"],
                ["Trinomio Cuadrado Perfecto", "(a ± b)² = a² ± 2ab + b²", "(x + 3)² = x² + 6x + 9"],
                ["Suma de Cubos", "a³ + b³ = (a + b)(a² - ab + b²)", "x³ + 8 = (x + 2)(x² - 2x + 4)"],
                ["Diferencia de Cubos", "a³ - b³ = (a - b)(a² + ab + b²)", "x³ - 27 = (x - 3)(x² + 3x + 9)"],
                ["Factor Común", "ax + ay = a(x + y)", "2x² + 4x = 2x(x + 2)"],
                ["Trinomio de la forma x²+bx+c", "x² + (a+b)x + ab = (x+a)(x+b)", "x² + 5x + 6 = (x+2)(x+3)"]
            ]
        },
        {
            title: "2. Ecuación Cuadrática",
            headers: ["Concepto", "Fórmula", "Notas"],
            rows: [
                ["Fórmula General", "x = (-b ± √(b² - 4ac)) / 2a", "Para ax² + bx + c = 0"],
                ["Discriminante (Δ)", "Δ = b² - 4ac", "Δ > 0: 2 raíces reales\nΔ = 0: 1 raíz real\nΔ < 0: Raíces complejas"],
                ["Suma de Raíces", "x₁ + x₂ = -b/a", ""],
                ["Producto de Raíces", "x₁ · x₂ = c/a", ""]
            ]
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
                ["Producto de Raíces", "ⁿ√a · ⁿ√b = ⁿ√(a·b)", "√2 · √3 = √6"]
            ]
        }
    ];

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-900">
            {/* Header with Tabs */}
            <div className="flex-shrink-0 bg-slate-900 border-b border-slate-700/50 p-4 text-center">
                <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 font-mono tracking-tight mb-4">
                    FORMULARIO MATEMÁTICO
                </h2>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setActiveTab('calculus')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'calculus'
                            ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/50'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                    >
                        ∫ Cálculo
                    </button>
                    <button
                        onClick={() => setActiveTab('geometry')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'geometry'
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                    >
                        📐 Geometría
                    </button>
                    <button
                        onClick={() => setActiveTab('algebra')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'algebra'
                            ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/50'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                    >
                        🧮 Álgebra
                    </button>
                    <button
                        onClick={() => setActiveTab('examples')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'examples'
                            ? 'bg-amber-500 text-white shadow-lg shadow-amber-900/50'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                    >
                        💡 Ejemplos
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 pb-20 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">

                {activeTab === 'calculus' && (
                    <>
                        <div className="text-center mb-6">
                            <p className="text-slate-400 text-xs md:text-sm">
                                Donde <strong>u</strong> es una función derivable de <strong>x</strong> (Regla de la Cadena).
                            </p>
                        </div>
                        {calculusSections.map((section, idx) => (
                            <div key={idx} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden shadow-sm">
                                <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
                                    <h3 className="font-bold text-sky-400 text-lg">{section.title}</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm md:text-base border-collapse">
                                        <thead className="bg-slate-900/50 text-slate-300 font-semibold">
                                            <tr>
                                                {section.headers.map((h, i) => (
                                                    <th key={i} className="p-3 border-b border-slate-700 min-w-[120px] whitespace-nowrap first:min-w-[100px]">
                                                        {h}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/50">
                                            {section.rows.map((row, rIdx) => (
                                                <tr key={rIdx} className="hover:bg-slate-700/30 transition-colors">
                                                    {row.map((cell, cIdx) => (
                                                        <td key={cIdx} className={`p-3 text-slate-200 ${cIdx === 0 ? 'font-bold text-sky-200' : 'font-mono'}`}>
                                                            {/* Render as LaTeX if it looks like a formula (contains special chars or numbers and is not just text) */}
                                                            {cIdx > 0 && (cell.includes('\\') || cell.includes('∫') || cell.includes('^')) ? (
                                                                <LatexRenderer formula={cell} />
                                                            ) : (
                                                                cell
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {activeTab === 'geometry' && (
                    <>
                        <div className="text-center mb-6">
                            <p className="text-slate-400 text-xs md:text-sm">
                                Áreas, Perímetros y Volúmenes de figuras comunes.
                            </p>
                        </div>
                        {geometrySections.map((section, idx) => (
                            <div key={idx} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden shadow-sm">
                                <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
                                    <h3 className="font-bold text-emerald-400 text-lg">{section.title}</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm md:text-base border-collapse">
                                        <thead className="bg-slate-900/50 text-slate-300 font-semibold">
                                            <tr>
                                                {section.headers.map((h, i) => (
                                                    <th key={i} className="p-3 border-b border-slate-700 min-w-[150px] whitespace-nowrap">
                                                        {h}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/50">
                                            {section.rows.map((row, rIdx) => (
                                                <tr key={rIdx} className="hover:bg-slate-700/30 transition-colors">
                                                    {row.map((cell, cIdx) => (
                                                        <td key={cIdx} className={`p-3 text-slate-200 align-top ${cIdx === 0 ? 'font-bold text-emerald-200' : 'font-mono whitespace-pre-wrap'}`}>
                                                            {cell}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {activeTab === 'algebra' && (
                    <>
                        <div className="text-center mb-6">
                            <p className="text-slate-400 text-xs md:text-sm">
                                Factorización, Ecuaciones y Leyes de Exponentes.
                            </p>
                        </div>
                        {algebraSections.map((section, idx) => (
                            <div key={idx} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden shadow-sm">
                                <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
                                    <h3 className="font-bold text-violet-400 text-lg">{section.title}</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm md:text-base border-collapse">
                                        <thead className="bg-slate-900/50 text-slate-300 font-semibold">
                                            <tr>
                                                {section.headers.map((h, i) => (
                                                    <th key={i} className="p-3 border-b border-slate-700 min-w-[150px] whitespace-nowrap">
                                                        {h}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/50">
                                            {section.rows.map((row, rIdx) => (
                                                <tr key={rIdx} className="hover:bg-slate-700/30 transition-colors">
                                                    {row.map((cell, cIdx) => (
                                                        <td key={cIdx} className={`p-3 text-slate-200 align-top ${cIdx === 0 ? 'font-bold text-violet-200' : 'font-mono whitespace-pre-wrap'}`}>
                                                            {cIdx > 0 && (cell.includes('\\') || cell.includes('=') || cell.includes('^')) ? (
                                                                <LatexRenderer formula={cell} />
                                                            ) : (
                                                                cell
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {activeTab === 'examples' && (
                    <>
                        <div className="text-center mb-6">
                            <p className="text-slate-400 text-xs md:text-sm">
                                Problemas resueltos paso a paso para entender la lógica.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {solvedExamples.map((ex, idx) => (
                                <div key={idx} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden shadow-lg flex flex-col">
                                    <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
                                        <h3 className="font-bold text-amber-400 text-base">{ex.title}</h3>
                                    </div>
                                    <div className="p-4 bg-slate-900/30 flex-1">
                                        <div className="mb-4 text-center">
                                            <div className="text-lg font-mono text-white bg-slate-700 px-3 py-1 rounded-md inline-block">
                                                <LatexRenderer formula={ex.problem} block />
                                            </div>
                                            <p className="text-slate-400 text-sm mt-2 italic">{ex.description}</p>
                                        </div>
                                        <div className="space-y-3">
                                            {ex.steps.map((step, sIdx) => (
                                                <div key={sIdx} className="text-sm border-l-2 border-slate-600 pl-3">
                                                    <p className="text-amber-200/80 font-semibold mb-1">Paso {sIdx + 1}:</p>
                                                    <p className="text-slate-300 mb-1">{step.explanation}</p>
                                                    <div className="text-sky-300 font-mono bg-slate-800/50 p-1 rounded inline-block">
                                                        <LatexRenderer formula={step.math} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <div className="text-center text-slate-500 text-xs pt-8">
                    {activeTab === 'calculus' ? 'Formulario de cálculo integral y diferencial.' :
                        activeTab === 'geometry' ? 'Fórmulas geométricas esenciales.' :
                            activeTab === 'algebra' ? 'Fundamentos de álgebra.' :
                                'Ejemplos detallados de aplicación.'}
                </div>
            </div>
        </div>
    );
};

export default MathView;
