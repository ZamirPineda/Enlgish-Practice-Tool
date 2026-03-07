import {
  PracticeDifficultyTier,
  PracticeRouteObjective,
  rankToDifficultyTier,
  uniqueTags,
} from "@/lib/practiceContent";

export interface CodeSyntaxPrompt {
  id: string;
  prompt: string;
  tokens: string[];
  language: "typescript" | "javascript" | "bash" | "css" | "sql";
  difficultyTier: PracticeDifficultyTier;
  routeObjective: PracticeRouteObjective;
  tags: string[];
}

type RawCodeSyntaxPrompt = Omit<
  CodeSyntaxPrompt,
  "difficultyTier" | "routeObjective" | "tags"
>;

const DEV_REASONING_OBJECTIVE: PracticeRouteObjective = "dev_reasoning";

const inferCodeSyntaxTags = (prompt: RawCodeSyntaxPrompt): string[] => {
  const haystack = `${prompt.id} ${prompt.language} ${prompt.prompt}`.toLowerCase();
  const tags = [prompt.language, "syntax", "dev_reasoning"];

  if (haystack.includes("react")) tags.push("react");
  if (haystack.includes("typescript") || haystack.includes("ts_")) tags.push("typescript");
  if (haystack.includes("javascript") || haystack.includes("js_")) tags.push("javascript");
  if (haystack.includes("sql")) tags.push("sql");
  if (haystack.includes("bash") || haystack.includes("docker") || haystack.includes("git")) tags.push("tooling");
  if (haystack.includes("css")) tags.push("css");
  if (haystack.includes("type") || haystack.includes("interface")) tags.push("types");
  if (haystack.includes("async") || haystack.includes("promise")) tags.push("async");
  if (haystack.includes("query") || haystack.includes("select") || haystack.includes("join")) tags.push("data");

  return uniqueTags(tags);
};

const annotateCodeSyntaxPrompts = (prompts: RawCodeSyntaxPrompt[]): CodeSyntaxPrompt[] => {
  const ranked = prompts
    .map((prompt, index) => ({
      prompt,
      index,
      score:
        prompt.tokens.length * 10 +
        Math.round(prompt.prompt.length / 20) +
        (["typescript", "sql"].includes(prompt.language) ? 2 : 0),
    }))
    .sort((left, right) => left.score - right.score || left.index - right.index);

  const difficultyById = new Map<string, PracticeDifficultyTier>();
  ranked.forEach(({ prompt }, rank) => {
    difficultyById.set(prompt.id, rankToDifficultyTier(rank, ranked.length));
  });

  return prompts.map((prompt) => ({
    ...prompt,
    difficultyTier: difficultyById.get(prompt.id) || "core",
    routeObjective: DEV_REASONING_OBJECTIVE,
    tags: inferCodeSyntaxTags(prompt),
  }));
};

const rawCodeSyntaxData: RawCodeSyntaxPrompt[] = [
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
      "Selecciona todos los usuarios activos ordenados por fecha de creaciÃ³n",
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
    prompt: "Mapea un array de nÃºmeros para multiplicarlos por 2",
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
      "Define una interfaz en TypeScript para un Usuario con id numÃ©rico y nombre opcional",
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
  {
    id: "bash_git_commit",
    prompt: "Haz un commit en Git con el mensaje 'feat: aÃ±adir login'",
    language: "bash",
    tokens: ["git", "commit", "-m", '"feat: aÃ±adir login"'],
  },
  {
    id: "bash_git_push_force",
    prompt: "Haz un push forzado a la rama 'main' en el remoto 'origin'",
    language: "bash",
    tokens: ["git", "push", "origin", "main", "--force"],
  },
  {
    id: "react_use_effect",
    prompt:
      "Crea un useEffect que se ejecute solo una vez al montar (sin dependencias)",
    language: "typescript",
    tokens: [
      "useEffect",
      "(",
      "(",
      ")",
      "=>",
      "{",
      "}",
      ",",
      "[",
      "]",
      ")",
      ";",
    ],
  },
  {
    id: "ts_generic_function",
    prompt:
      "Crea una funciÃ³n genÃ©rica en TypeScript que devuelva el mismo valor que recibe",
    language: "typescript",
    tokens: [
      "function",
      "identity",
      "<",
      "T",
      ">",
      "(",
      "arg",
      ":",
      "T",
      ")",
      ":",
      "T",
      "{",
      "return",
      "arg",
      ";",
      "}",
    ],
  },
  {
    id: "js_destructuring",
    prompt: "Desestructura 'name' y 'age' de un objeto llamado 'user'",
    language: "javascript",
    tokens: ["const", "{", "name", ",", "age", "}", "=", "user", ";"],
  },
  {
    id: "sql_join",
    prompt:
      "Haz un INNER JOIN entre 'users' y 'orders' usando la columna 'user_id'",
    language: "sql",
    tokens: [
      "SELECT",
      "*",
      "FROM",
      "users",
      "INNER JOIN",
      "orders",
      "ON",
      "users.id",
      "=",
      "orders.user_id",
    ],
  },
  {
    id: "css_grid_template",
    prompt: "Crea un grid con 3 columnas de igual tamaÃ±o usando css-grid",
    language: "css",
    tokens: [
      "display:",
      "grid;",
      "grid-template-columns:",
      "repeat",
      "(",
      "3",
      ",",
      "1fr",
      ")",
      ";",
    ],
  },
  {
    id: "bash_rm_rf",
    prompt: "Borra recursivamente y sin confirmaciÃ³n el directorio 'dist'",
    language: "bash",
    tokens: ["rm", "-rf", "dist/"],
  },
  {
    id: "react_use_memo",
    prompt: "Memoriza el resultado de 'expensiveMath(a, b)' con useMemo",
    language: "typescript",
    tokens: [
      "const",
      "result",
      "=",
      "useMemo",
      "(",
      "(",
      ")",
      "=>",
      "expensiveMath",
      "(",
      "a",
      ",",
      "b",
      ")",
      ",",
      "[",
      "a",
      ",",
      "b",
      "]",
      ")",
      ";",
    ],
  },
  {
    id: "js_promise_all",
    prompt: "Espera a que dos promesas (p1 y p2) se resuelvan simultÃ¡neamente",
    language: "javascript",
    tokens: [
      "const",
      "results",
      "=",
      "await",
      "Promise.all",
      "(",
      "[",
      "p1",
      ",",
      "p2",
      "]",
      ")",
      ";",
    ],
  },
  {
    id: "bash_docker_build",
    prompt:
      "Construye una imagen Docker etiquetada como 'myapp:latest' desde el directorio actual",
    language: "bash",
    tokens: ["docker", "build", "-t", "myapp:latest", "."],
  },
  {
    id: "ts_omit_utility",
    language: "typescript",
    prompt:
      "Usa el utility type Omit para crear un tipo UserWithoutId a partir de User",
    tokens: [
      "type",
      "UserWithoutId",
      "=",
      "Omit",
      "<",
      "User",
      ",",
      "'id'",
      ">",
      ";",
    ],
  },
  {
    id: "js_optional_chaining",
    language: "javascript",
    prompt:
      "Accede de forma segura a la propiedad 'zip' dentro de 'user.address'",
    tokens: ["const", "zip", "=", "user", "?.", "address", "?.", "zip", ";"],
  },
  {
    id: "sql_insert_into",
    language: "sql",
    prompt: "Inserta un nuevo usuario con nombre 'Alice' en la tabla 'users'",
    tokens: [
      "INSERT INTO",
      "users",
      "(",
      "name",
      ")",
      "VALUES",
      "(",
      "'Alice'",
      ")",
      ";",
    ],
  },
  {
    id: "css_hover_transition",
    language: "css",
    prompt:
      "AÃ±ade una transiciÃ³n suave de 0.3s a la propiedad background-color",
    tokens: ["transition:", "background-color", "0.3s", "ease-in-out", ";"],
  },
  {
    id: "ts_async_fetch_wrapper",
    language: "typescript",
    prompt: "Declara una función async fetchUser que reciba un id y retorne await api.get(`/users/${id}`)",
    tokens: [
      "const",
      "fetchUser",
      "=",
      "async",
      "(",
      "id",
      ":",
      "string",
      ")",
      "=>",
      "await",
      "api.get",
      "(",
      "`/users/${id}`",
      ")",
      ";",
    ],
  },
  {
    id: "js_object_destructure",
    language: "javascript",
    prompt: "Extrae name y email del objeto user usando destructuring",
    tokens: [
      "const",
      "{",
      "name",
      ",",
      "email",
      "}",
      "=",
      "user",
      ";",
    ],
  },
  {
    id: "sql_group_by_having",
    language: "sql",
    prompt: "Cuenta pedidos por customer_id y conserva solo los clientes con más de 3 pedidos",
    tokens: [
      "SELECT",
      "customer_id",
      ",",
      "COUNT(*)",
      "FROM",
      "orders",
      "GROUP BY",
      "customer_id",
      "HAVING",
      "COUNT(*)",
      ">",
      "3",
      ";",
    ],
  },
  {
    id: "bash_find_logs",
    language: "bash",
    prompt: "Busca archivos .log dentro de ./dist y elimina los mayores de 10M",
    tokens: [
      "find",
      "./dist",
      "-name",
      "'*.log'",
      "-size",
      "+10M",
      "-delete",
    ],
  },
  {
    id: "css_grid_fit",
    language: "css",
    prompt: "Configura una grilla responsive con columnas repeat(auto-fit, minmax(220px, 1fr))",
    tokens: [
      "display:",
      "grid;",
      "grid-template-columns:",
      "repeat(",
      "auto-fit",
      ",",
      "minmax(",
      "220px",
      ",",
      "1fr",
      ")",
      ")",
      ";",
    ],
  },
  {
    id: "ts_record_utility",
    language: "typescript",
    prompt: "Usa Record para tipar un diccionario de métricas numéricas por nombre",
    tokens: [
      "type",
      "MetricsByName",
      "=",
      "Record",
      "<",
      "string",
      ",",
      "number",
      ">",
      ";",
    ],
  },
];

export const codeSyntaxData: CodeSyntaxPrompt[] =
  annotateCodeSyntaxPrompts(rawCodeSyntaxData);
