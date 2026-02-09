import React from 'react';

const CalculusView: React.FC = () => {

    const sections = [
        {
            title: "1. Reglas Generales de Operación",
            headers: ["Regla", "Función y=f(x)", "Derivada dy/dx", "Integral ∫ f(x) dx", "Ejemplo"],
            rows: [
                ["Constante", "k", "0", "kx + C", "y=7 → y'=0"],
                ["Linealidad", "u ± v", "u' ± v'", "∫ u dx ± ∫ v dx", "(x² + x)' = 2x + 1"],
                ["Producto", "u · v", "u'v + uv'", "∫ u dv = uv - ∫ v du", "x sin x → sin x + x cos x"],
                ["Cociente", "u / v", "(u'v - uv') / v²", "(No hay directa)", "x/eˣ → (eˣ - xeˣ)/e²ˣ"],
                ["Cadena", "f(g(x))", "f'(g(x)) · g'(x)", "(Sustitución)", "sin(x²) → cos(x²) · 2x"],
                ["Teorema Fund.", "∫ₐᵇ f(x) dx", "N/A", "F(b) - F(a)", "∫₀¹ 2x dx = 1"]
            ]
        },
        {
            title: "2. Funciones Algebraicas y Trascendentes",
            headers: ["Tipo", "Función f(x)", "Derivada f'(x)", "Integral ∫ f(x) dx", "Ejemplo"],
            rows: [
                ["Potencia", "xⁿ", "nxⁿ⁻¹", "xⁿ⁺¹/(n+1), n ≠ -1", "x⁵ → 5x⁴"],
                ["Inversa", "1/x", "-1/x²", "ln|x|", "y=x⁻¹ → y'=-x⁻²"],
                ["Raíz", "√x", "1/(2√x)", "(2/3)x³/²", "y=x¹/² → y'=(1/2)x⁻¹/²"],
                ["Exponencial", "eˣ", "eˣ", "eˣ", "e³ˣ → 3e³ˣ"],
                ["Base a", "aˣ", "aˣ ln(a)", "aˣ/ln(a)", "2ˣ → 2ˣ ln(2)"],
                ["Log Natural", "ln(x)", "1/x", "x ln(x) - x", "ln(x) → 1/x"],
                ["Valor Abs.", "|x|", "x/|x|", "x|x|/2", "|x| → sgn(x)"]
            ]
        },
        {
            title: "3. Trigonometría",
            headers: ["Función", "Derivada f'(x)", "Integral ∫ f(x) dx", "Ejemplo Derivada"],
            rows: [
                ["sin(x)", "cos(x)", "-cos(x)", "sin(3x) → 3cos(3x)"],
                ["cos(x)", "-sin(x)", "sin(x)", "cos(x²) → -2x sin(x²)"],
                ["tan(x)", "sec²(x)", "ln|sec(x)|", "tan(5x) → 5sec²(5x)"],
                ["cot(x)", "-csc²(x)", "ln|sin(x)|", "cot(2x) → -2csc²(2x)"],
                ["sec(x)", "sec(x)tan(x)", "ln|sec(x) + tan(x)|", "sec(4x) → 4sec(4x)tan(4x)"],
                ["csc(x)", "-csc(x)cot(x)", "-ln|csc(x) + cot(x)|", "csc(x) → -csc(x)cot(x)"]
            ]
        },
        {
            title: "4. Trigonométricas Inversas",
            headers: ["Función", "Derivada f'(x)", "Integral ∫ f(x) dx", "Ejemplo Derivada"],
            rows: [
                ["arcsin(x)", "1/√(1-x²)", "x arcsin(x) + √(1-x²)", "arcsin(2x) → 2/√(1-4x²)"],
                ["arccos(x)", "-1/√(1-x²)", "x arccos(x) - √(1-x²)", "arccos(x) → -1/√(1-x²)"],
                ["arctan(x)", "1/(1+x²)", "x arctan(x) - (1/2)ln(1+x²)", "arctan(3x) → 3/(1+9x²)"],
                ["arccot(x)", "-1/(1+x²)", "x arccot(x) + (1/2)ln(1+x²)", "arccot(x) → -1/(1+x²)"],
                ["arcsec(x)", "1/(|x|√(x²-1))", "x arcsec(x) - ln|x + √(x²-1)|", "arcsec(2x) → 2/(|2x|√(4x²-1))"]
            ]
        },
        {
            title: "5. Hiperbólicas",
            headers: ["Función", "Derivada f'(x)", "Integral ∫ f(x) dx", "Ejemplo Derivada"],
            rows: [
                ["sinh(x)", "cosh(x)", "cosh(x)", "sinh(2x) → 2cosh(2x)"],
                ["cosh(x)", "sinh(x)", "sinh(x)", "cosh(3x) → 3sinh(3x)"],
                ["tanh(x)", "sech²(x)", "ln(cosh(x))", "tanh(x²) → 2x sech²(x²)"],
                ["arsinh(x)", "1/√(x²+1)", "x arsinh(x) - √(x²+1)", "arsinh(x) → 1/√(x²+1)"],
                ["artanh(x)", "1/(1-x²)", "x artanh(x) + (1/2)ln(1-x²)", "artanh(5x) → 5/(1-25x²)"]
            ]
        }
    ];

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-900">
            <div className="flex-shrink-0 bg-slate-900 border-b border-slate-700/50 p-4 text-center">
                <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 font-mono tracking-tight">
                    FORMULARIO MAESTRO DE CÁLCULO
                </h2>
                <p className="text-slate-400 text-xs md:text-sm mt-1">
                    Reglas, derivadas e integrales fundamentales
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 pb-20 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {sections.map((section, idx) => (
                    <div key={idx} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden shadow-sm">
                        <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
                            <h3 className="font-bold text-sky-400 text-lg">{section.title}</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm md:text-base border-collapse">
                                <thead className="bg-slate-900/50 text-slate-300 font-semibold">
                                    <tr>
                                        {section.headers.map((h, i) => (
                                            <th key={i} className="p-3 border-b border-slate-700 min-w-[100px] whitespace-nowrap">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {section.rows.map((row, rIdx) => (
                                        <tr key={rIdx} className="hover:bg-slate-700/30 transition-colors">
                                            {row.map((cell, cIdx) => (
                                                <td key={cIdx} className="p-3 font-mono text-slate-200">
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

                <div className="text-center text-slate-500 text-xs pt-8">
                    Formulario basado en solicitud del usuario.
                </div>
            </div>
        </div>
    );
};

export default CalculusView;
