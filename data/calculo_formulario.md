# Formulario Maestro de Cálculo

## 1. Reglas Generales de Operación
| Regla | Función $y=f(x)$ | Derivada $\frac{dy}{dx}$ | Integral $\int f(x) dx$ | Ejemplo |
| :--- | :--- | :--- | :--- | :--- |
| **Constante** | $k$ | $0$ | $kx + C$ | $y=7 \to y'=0$ |
| **Linealidad** | $u \pm v$ | $u' \pm v'$ | $\int u dx \pm \int v dx$ | $(x^2+x)' = 2x+1$ |
| **Producto** | $u \cdot v$ | $u'v + uv'$ | $\int u dv = uv - \int v du$ | $x \sin x \to \sin x + x\cos x$ |
| **Cociente** | $\frac{u}{v}$ | $\frac{u'v - uv'}{v^2}$ | *(No hay directa)* | $\frac{x}{e^x} \to \frac{e^x - xe^x}{e^{2x}}$ |
| **Cadena** | $f(g(x))$ | $f'(g(x)) \cdot g'(x)$ | *(Sustitución)* | $\sin(x^2) \to \cos(x^2)\cdot 2x$ |
| **Teorema Fund.** | $\int_a^b f(x) dx$ | N/A | $F(b) - F(a)$ | $\int_0^1 2x dx = 1$ |

## 2. Funciones Algebraicas y Trascendentes
| Tipo | Función $f(x)$ | Derivada $f'(x)$ | Integral $\int f(x) dx$ | Ejemplo |
| :--- | :--- | :--- | :--- | :--- |
| **Potencia** | $x^n$ | $nx^{n-1}$ | $\frac{x^{n+1}}{n+1}, n \neq -1$ | $x^5 \to 5x^4$ |
| **Inversa** | $\frac{1}{x}$ | $-\frac{1}{x^2}$ | $\ln|x|$ | $y=x^{-1} \to y'=-x^{-2}$ |
| **Raíz** | $\sqrt{x}$ | $\frac{1}{2\sqrt{x}}$ | $\frac{2}{3}x^{3/2}$ | $y=\sqrt{x} \to y'=\frac{1}{2}x^{-1/2}$ |
| **Exponencial** | $e^x$ | $e^x$ | $e^x$ | $e^{3x} \to 3e^{3x}$ |
| **Base a** | $a^x$ | $a^x \ln(a)$ | $\frac{a^x}{\ln(a)}$ | $2^x \to 2^x \ln(2)$ |
| **Log Natural** | $\ln(x)$ | $\frac{1}{x}$ | $x \ln(x) - x$ | $\ln(x) \to 1/x$ |
| **Valor Abs.** | $|x|$ | $\frac{x}{|x|}$ | $\frac{x|x|}{2}$ | $|x| \to \text{sgn}(x)$ |

## 3. Trigonometría
| Función | Derivada $f'(x)$ | Integral $\int f(x) dx$ | Ejemplo Derivada |
| :--- | :--- | :--- | :--- |
| $\sin(x)$ | $\cos(x)$ | $-\cos(x)$ | $\sin(3x) \to 3\cos(3x)$ |
| $\cos(x)$ | $-\sin(x)$ | $\sin(x)$ | $\cos(x^2) \to -2x\sin(x^2)$ |
| $\tan(x)$ | $\sec^2(x)$ | $\ln|\sec(x)|$ | $\tan(5x) \to 5\sec^2(5x)$ |
| $\cot(x)$ | $-\csc^2(x)$ | $\ln|\sin(x)|$ | $\cot(2x) \to -2\csc^2(2x)$ |
| $\sec(x)$ | $\sec(x)\tan(x)$ | $\ln|\sec(x) + \tan(x)|$ | $\sec(4x) \to 4\sec(4x)\tan(4x)$ |
| $\csc(x)$ | $-\csc(x)\cot(x)$ | $-\ln|\csc(x) + \cot(x)|$ | $\csc(x) \to -\csc(x)\cot(x)$ |

## 4. Trigonométricas Inversas
| Función | Derivada $f'(x)$ | Integral $\int f(x) dx$ | Ejemplo Derivada |
| :--- | :--- | :--- | :--- |
| $\arcsin(x)$ | $\frac{1}{\sqrt{1-x^2}}$ | $x \arcsin(x) + \sqrt{1-x^2}$ | $\arcsin(2x) \to \frac{2}{\sqrt{1-4x^2}}$ |
| $\arccos(x)$ | $-\frac{1}{\sqrt{1-x^2}}$ | $x \arccos(x) - \sqrt{1-x^2}$ | $\arccos(x) \to \frac{-1}{\sqrt{1-x^2}}$ |
| $\arctan(x)$ | $\frac{1}{1+x^2}$ | $x \arctan(x) - \frac{1}{2}\ln(1+x^2)$ | $\arctan(3x) \to \frac{3}{1+9x^2}$ |
| $\text{arccot}(x)$ | $-\frac{1}{1+x^2}$ | $x \text{arccot}(x) + \frac{1}{2}\ln(1+x^2)$ | $\text{arccot}(x) \to \frac{-1}{1+x^2}$ |
| $\text{arcsec}(x)$ | $\frac{1}{|x|\sqrt{x^2-1}}$ | $x \text{arcsec}(x) - \ln|x + \sqrt{x^2-1}|$ | $\text{arcsec}(2x) \to \frac{2}{|2x|\sqrt{4x^2-1}}$ |

## 5. Hiperbólicas
| Función | Derivada $f'(x)$ | Integral $\int f(x) dx$ | Ejemplo Derivada |
| :--- | :--- | :--- | :--- |
| $\sinh(x)$ | $\cosh(x)$ | $\cosh(x)$ | $\sinh(2x) \to 2\cosh(2x)$ |
| $\cosh(x)$ | $\sinh(x)$ | $\sinh(x)$ | $\cosh(3x) \to 3\sinh(3x)$ |
| $\tanh(x)$ | $\text{sech}^2(x)$ | $\ln(\cosh(x))$ | $\tanh(x^2) \to 2x\text{sech}^2(x^2)$ |
| $\text{arsinh}(x)$ | $\frac{1}{\sqrt{x^2+1}}$ | $x \text{arsinh}(x) - \sqrt{x^2+1}$ | $\text{arsinh}(x) \to \frac{1}{\sqrt{x^2+1}}$ |
| $\text{artanh}(x)$ | $\frac{1}{1-x^2}$ | $x \text{artanh}(x) + \frac{1}{2}\ln(1-x^2)$ | $\text{artanh}(5x) \to \frac{5}{1-25x^2}$ |
