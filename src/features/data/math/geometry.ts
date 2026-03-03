import { MathTopic } from "@/types";

export const geometryTopic: MathTopic = {
  id: "geometry",
  title: "Geometría",
  description: "Fórmulas geométricas esenciales.",
  sections: [
    {
      title: "1. Figuras Planas (2D)",
      headers: ["Figura", "Fórmulas (Área y Perímetro)", "Esquema / Notas"],
      rows: [
        [
          "Triángulo",
          "A = (b · h) / 2\nP = a + b + c",
          "b: base, h: altura\nP: Suma de lados",
        ],
        ["Cuadrado", "A = l²\nP = 4l", "l: lado"],
        ["Rectángulo", "A = b · h\nP = 2(b + h)", "b: base, h: altura"],
        [
          "Paralelogramo",
          "A = b · h\nP = 2(a + b)",
          "h: altura perpendicular a la base b",
        ],
        [
          "Trapecio",
          "A = h · (B + b) / 2\nP = Suma de lados",
          "B: base mayor, b: base menor, h: altura",
        ],
        [
          "Círculo",
          "A = π · r²\nP = 2 · π · r",
          "r: radio, d: diámetro (d=2r)",
        ],
        [
          "Elipse",
          "A = π · a · b\nP ≈ π[3(a+b) - √((3a+b)(a+3b))]",
          "a: semieje mayor, b: semieje menor",
        ],
        [
          "Rombo",
          "A = (D · d) / 2\nP = 4l",
          "D: diagonal mayor, d: diagonal menor",
        ],
      ],
      studyStrategies: [
        {
          id: "geo-areas-2d",
          name: "Fórmulas de Áreas y Perímetros",
          questionTemplate: "¿Fórmulas para: {col0}?",
          questionColumnIndex: 0,
          answerColumnIndex: 1,
        },
      ],
    },
    {
      title: "2. Cuerpos Geométricos (3D)",
      headers: ["Cuerpo", "Fórmulas (Volumen y Área Superficial)", "Notas"],
      rows: [
        ["Cubo", "V = l³\nA = 6l²", "l: arista"],
        [
          "Prisma Rectangular (Ortoedro)",
          "V = l · w · h\nA = 2(lw + lh + wh)",
          "l: largo, w: ancho, h: altura",
        ],
        [
          "Cilindro",
          "V = π · r² · h\nA = 2πr(r + h)",
          "r: radio base, h: altura",
        ],
        [
          "Cono",
          "V = (1/3) · π · r² · h\nA = πr(r + g)",
          "g: generatriz √(r² + h²)",
        ],
        ["Esfera", "V = (4/3) · π · r³\nA = 4 · π · r²", "r: radio"],
        [
          "Pirámide (Base Cuadrada)",
          "V = (1/3) · l² · h\nA = l² + 2l · ap",
          "ap: apotema de la cara lateral",
        ],
      ],
    },
  ],
};
