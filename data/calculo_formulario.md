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
| Tipo | Función $y=f(u)$ | Derivada $\frac{dy}{dx}$ | Integral $\int f(x) dx$ | Ejemplo |
| :--- | :--- | :--- | :--- | :--- |
| **Potencia** | $u^n$ | $nu^{n-1}u'$ | $\frac{x^{n+1}}{n+1}, n \neq -1$ | $x^5 \to 5x^4$ |
| **Inversa** | $\frac{1}{u}$ | $-\frac{u'}{u^2}$ | $\ln|x|$ | $y=x^{-1} \to y'=-x^{-2}$ |
| **Raíz** | $\sqrt{u}$ | $\frac{u'}{2\sqrt{u}}$ | $\frac{2}{3}x^{3/2}$ | $y=\sqrt{x} \to y'=\frac{1}{2}x^{-1/2}$ |
| **Exponencial** | $e^u$ | $u'e^u$ | $e^x$ | $e^{3x} \to 3e^{3x}$ |
| **Base a** | $a^u$ | $u' a^u \ln(a)$ | $\frac{a^x}{\ln(a)}$ | $2^x \to 2^x \ln(2)$ |
| **Log Natural** | $\ln(u)$ | $\frac{u'}{u}$ | $x \ln(x) - x$ | $\ln(x) \to 1/x$ |
| **Valor Abs.** | $|u|$ | $\frac{u' u}{|u|}$ | $\frac{x|x|}{2}$ | $|x| \to \text{sgn}(x)$ |

## 3. Trigonometría
| Función | Derivada $\frac{dy}{dx}$ | Integral $\int f(x) dx$ | Ejemplo Derivada |
| :--- | :--- | :--- | :--- |
| $\sin(u)$ | $u'\cos(u)$ | $-\cos(x)$ | $\sin(3x) \to 3\cos(3x)$ |
| $\cos(u)$ | $-u'\sin(u)$ | $\sin(x)$ | $\cos(x^2) \to -2x\sin(x^2)$ |
| $\tan(u)$ | $u'\sec^2(u)$ | $\ln|\sec(x)|$ | $\tan(5x) \to 5\sec^2(5x)$ |
| $\cot(u)$ | $-u'\csc^2(u)$ | $\ln|\sin(x)|$ | $\cot(2x) \to -2\csc^2(2x)$ |
| $\sec(u)$ | $u'\sec(u)\tan(u)$ | $\ln|\sec(x) + \tan(x)|$ | $\sec(4x) \to 4\sec(4x)\tan(4x)$ |
| $\csc(u)$ | $-u'\csc(u)\cot(u)$ | $-\ln|\csc(x) + \cot(x)|$ | $\csc(x) \to -\csc(x)\cot(x)$ |

## 4. Trigonométricas Inversas
| Función | Derivada $\frac{dy}{dx}$ | Integral $\int f(x) dx$ | Ejemplo Derivada |
| :--- | :--- | :--- | :--- |
| $\arcsin(u)$ | $\frac{u'}{\sqrt{1-u^2}}$ | $x \arcsin(x) + \sqrt{1-x^2}$ | $\arcsin(2x) \to \frac{2}{\sqrt{1-4x^2}}$ |
| $\arccos(u)$ | $-\frac{u'}{\sqrt{1-u^2}}$ | $x \arccos(x) - \sqrt{1-x^2}$ | $\arccos(x) \to \frac{-1}{\sqrt{1-x^2}}$ |
| $\arctan(u)$ | $\frac{u'}{1+u^2}$ | $x \arctan(x) - \frac{1}{2}\ln(1+x^2)$ | $\arctan(3x) \to \frac{3}{1+9x^2}$ |
| $\text{arccot}(u)$ | $-\frac{u'}{1+u^2}$ | $x \text{arccot}(x) + \frac{1}{2}\ln(1+x^2)$ | $\text{arccot}(x) \to \frac{-1}{1+x^2}$ |
| $\text{arcsec}(u)$ | $\frac{u'}{|u|\sqrt{u^2-1}}$ | $x \text{arcsec}(x) - \ln|x + \sqrt{x^2-1}|$ | $\text{arcsec}(2x) \to \frac{2}{|2x|\sqrt{4x^2-1}}$ |

## 5. Hiperbólicas
| Función | Derivada $\frac{dy}{dx}$ | Integral $\int f(x) dx$ | Ejemplo Derivada |
| :--- | :--- | :--- | :--- |
| $\sinh(u)$ | $u'\cosh(u)$ | $\cosh(x)$ | $\sinh(2x) \to 2\cosh(2x)$ |
| $\cosh(u)$ | $u'\sinh(u)$ | $\sinh(x)$ | $\cosh(3x) \to 3\sinh(3x)$ |
| $\tanh(u)$ | $u'\text{sech}^2(u)$ | $\ln(\cosh(x))$ | $\tanh(x^2) \to 2x\text{sech}^2(x^2)$ |
| $\text{arsinh}(u)$ | $\frac{u'}{\sqrt{u^2+1}}$ | $x \text{arsinh}(x) - \sqrt{x^2+1}$ | $\text{arsinh}(x) \to \frac{1}{\sqrt{x^2+1}}$ |
| $\text{artanh}(u)$ | $\frac{u'}{1-u^2}$ | $x \text{artanh}(x) + \frac{1}{2}\ln(1-x^2)$ | $\text{artanh}(5x) \to \frac{5}{1-25x^2}$ |
