export interface CodeSyntaxPrompt {
  id: string;
  prompt: string;
  tokens: string[];
  language: "typescript" | "javascript" | "bash" | "css" | "sql";
}

export const codeSyntaxData: CodeSyntaxPrompt[] = [
  {
    id: "ts_arrow_fn",
    prompt:
      "Crea un arrow function en TypeScript que reciba un nombre y devuelva un saludo",
    language: "typescript",
    tokens: [
      "const",
      "greet",
      "=",
      "(",
      "name",
      ":",
      "string",
      ")",
      "=>",
      "{",
      "return",
      "`Hello ${name}`",
      "}",
    ],
  },
  {
    id: "react_use_state",
    prompt: "Inicializa un estado en React llamado 'count' con valor 0",
    language: "typescript",
    tokens: [
      "const",
      "[",
      "count",
      ",",
      "setCount",
      "]",
      "=",
      "useState",
      "(",
      "0",
      ")",
      ";",
    ],
  },
  {
    id: "bash_docker_run",
    prompt:
      "Ejecuta un contenedor Docker en segundo plano mapeando el puerto 80",
    language: "bash",
    tokens: ["docker", "run", "-d", "-p", "80:80", "nginx"],
  },
  {
    id: "sql_select_users",
    prompt:
      "Selecciona todos los usuarios activos ordenados por fecha de creación",
    language: "sql",
    tokens: [
      "SELECT",
      "*",
      "FROM",
      "users",
      "WHERE",
      "active",
      "=",
      "true",
      "ORDER BY",
      "created_at",
      "DESC",
    ],
  },
  {
    id: "css_flex_center",
    prompt: "Centra el contenido de un div usando flexbox (2 propiedades)",
    language: "css",
    tokens: [
      "display:",
      "flex;",
      "justify-content:",
      "center;",
      "align-items:",
      "center;",
    ],
  },
  {
    id: "js_array_map",
    prompt: "Mapea un array de números para multiplicarlos por 2",
    language: "javascript",
    tokens: [
      "const",
      "doubled",
      "=",
      "numbers",
      ".",
      "map",
      "(",
      "n",
      "=>",
      "n",
      "*",
      "2",
      ")",
      ";",
    ],
  },
  {
    id: "ts_interface",
    prompt:
      "Define una interfaz en TypeScript para un Usuario con id numérico y nombre opcional",
    language: "typescript",
    tokens: [
      "interface",
      "User",
      "{",
      "id",
      ":",
      "number",
      ";",
      "name",
      "?:",
      "string",
      ";",
      "}",
    ],
  },
];
