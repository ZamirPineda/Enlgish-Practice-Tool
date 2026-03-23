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
  language:
    | "typescript"
    | "javascript"
    | "bash"
    | "css"
    | "sql"
    | "java"
    | "python";
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
  const haystack =
    `${prompt.id} ${prompt.language} ${prompt.prompt}`.toLowerCase();
  const tags = [prompt.language, "syntax", "dev_reasoning"];

  if (haystack.includes("react")) tags.push("react");
  if (haystack.includes("typescript") || haystack.includes("ts_"))
    tags.push("typescript");
  if (haystack.includes("javascript") || haystack.includes("js_"))
    tags.push("javascript");
  if (haystack.includes("sql")) tags.push("sql");
  if (
    haystack.includes("bash") ||
    haystack.includes("docker") ||
    haystack.includes("git")
  )
    tags.push("tooling");
  if (haystack.includes("css")) tags.push("css");
  if (haystack.includes("java") && !haystack.includes("javascript"))
    tags.push("java");
  if (haystack.includes("spring") || haystack.includes("springboot"))
    tags.push("springboot");
  if (haystack.includes("quarkus")) tags.push("quarkus");
  if (haystack.includes("kafka")) tags.push("kafka");
  if (haystack.includes("spark") || haystack.includes("pyspark"))
    tags.push("spark");
  if (haystack.includes("python") || haystack.includes("py_"))
    tags.push("python");
  if (haystack.includes("type") || haystack.includes("interface"))
    tags.push("types");
  if (haystack.includes("async") || haystack.includes("promise"))
    tags.push("async");
  if (
    haystack.includes("query") ||
    haystack.includes("select") ||
    haystack.includes("join")
  )
    tags.push("data");

  return uniqueTags(tags);
};

const annotateCodeSyntaxPrompts = (
  prompts: RawCodeSyntaxPrompt[],
): CodeSyntaxPrompt[] => {
  const ranked = prompts
    .map((prompt, index) => ({
      prompt,
      index,
      score:
        prompt.tokens.length * 10 +
        Math.round(prompt.prompt.length / 20) +
        (["typescript", "sql"].includes(prompt.language) ? 2 : 0),
    }))
    .sort(
      (left, right) => left.score - right.score || left.index - right.index,
    );

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
    prompt:
      "Declara una función async fetchUser que reciba un id y retorne await api.get(`/users/${id}`)",
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
    id: "ts_async_try_catch",
    language: "typescript",
    prompt:
      "Escribe una función async saveUser que use try/catch alrededor de await api.post('/users', payload)",
    tokens: [
      "const",
      "saveUser",
      "=",
      "async",
      "(",
      "payload",
      ":",
      "UserPayload",
      ")",
      "=>",
      "{",
      "try",
      "{",
      "return",
      "await",
      "api.post",
      "(",
      "'/users'",
      ",",
      "payload",
      ")",
      ";",
      "}",
      "catch",
      "(",
      "error",
      ")",
      "{",
      "throw",
      "error",
      ";",
      "}",
      "}",
    ],
  },
  {
    id: "ts_promise_all_settled",
    language: "typescript",
    prompt:
      "Combina Promise.allSettled para esperar profileRequest y settingsRequest y guardar el resultado tipado",
    tokens: [
      "const",
      "results",
      ":",
      "PromiseSettledResult<UserProfile | UserSettings>[]",
      "=",
      "await",
      "Promise.allSettled",
      "(",
      "[",
      "profileRequest",
      ",",
      "settingsRequest",
      "]",
      ")",
      ";",
    ],
  },
  {
    id: "ts_async_for_await",
    language: "typescript",
    prompt:
      "Recorre un AsyncIterable de eventos con for await...of y registra cada payload en TypeScript",
    tokens: [
      "for",
      "await",
      "(",
      "const",
      "event",
      "of",
      "eventStream",
      ")",
      "{",
      "console.log",
      "(",
      "event.payload",
      ")",
      ";",
      "}",
    ],
  },
  {
    id: "js_object_destructure",
    language: "javascript",
    prompt: "Extrae name y email del objeto user usando destructuring",
    tokens: ["const", "{", "name", ",", "email", "}", "=", "user", ";"],
  },
  {
    id: "sql_group_by_having",
    language: "sql",
    prompt:
      "Cuenta pedidos por customer_id y conserva solo los clientes con más de 3 pedidos",
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
    tokens: ["find", "./dist", "-name", "'*.log'", "-size", "+10M", "-delete"],
  },
  {
    id: "css_grid_fit",
    language: "css",
    prompt:
      "Configura una grilla responsive con columnas repeat(auto-fit, minmax(220px, 1fr))",
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
    prompt:
      "Usa Record para tipar un diccionario de métricas numéricas por nombre",
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
  // ── Java ──
  {
    id: "java_main_method",
    prompt: "Declara el método main de Java que imprima 'Hello World'",
    language: "java",
    tokens: [
      "public",
      "static",
      "void",
      "main",
      "(",
      "String[]",
      "args",
      ")",
      "{",
      "System.out.println",
      "(",
      '"Hello World"',
      ")",
      ";",
      "}",
    ],
  },
  {
    id: "java_for_each",
    prompt: "Itera una lista de nombres con un for-each e imprime cada uno",
    language: "java",
    tokens: [
      "for",
      "(",
      "String",
      "name",
      ":",
      "names",
      ")",
      "{",
      "System.out.println",
      "(",
      "name",
      ")",
      ";",
      "}",
    ],
  },
  {
    id: "java_stream_filter",
    prompt: "Filtra una lista de usuarios activos usando Java Streams",
    language: "java",
    tokens: [
      "List<User>",
      "active",
      "=",
      "users",
      ".stream()",
      ".filter",
      "(",
      "u",
      "->",
      "u.isActive()",
      ")",
      ".collect",
      "(",
      "Collectors.toList()",
      ")",
      ";",
    ],
  },
  // ── Spring Boot ──
  {
    id: "spring_get_mapping",
    prompt: "Crea un endpoint GET en Spring que devuelva una lista de usuarios",
    language: "java",
    tokens: [
      "@GetMapping",
      "(",
      '"/users"',
      ")",
      "public",
      "List<User>",
      "getUsers",
      "(",
      ")",
      "{",
      "return",
      "userService.findAll()",
      ";",
      "}",
    ],
  },
  {
    id: "spring_autowired_constructor",
    prompt: "Inyecta un servicio en un controlador Spring usando constructor",
    language: "java",
    tokens: [
      "private",
      "final",
      "UserService",
      "userService",
      ";",
      "public",
      "UserController",
      "(",
      "UserService",
      "userService",
      ")",
      "{",
      "this.userService",
      "=",
      "userService",
      ";",
      "}",
    ],
  },
  // ── Quarkus ──
  {
    id: "quarkus_rest_endpoint",
    prompt: "Crea un endpoint REST GET en Quarkus que devuelva un saludo",
    language: "java",
    tokens: [
      "@Path",
      "(",
      '"/hello"',
      ")",
      "@GET",
      "@Produces",
      "(",
      "MediaType.TEXT_PLAIN",
      ")",
      "public",
      "String",
      "hello",
      "(",
      ")",
      "{",
      "return",
      '"Hello"',
      ";",
      "}",
    ],
  },
  {
    id: "quarkus_panache_find",
    prompt: "Busca un producto por nombre usando Panache en Quarkus",
    language: "java",
    tokens: [
      "public",
      "List<Product>",
      "findByName",
      "(",
      "String",
      "name",
      ")",
      "{",
      "return",
      "Product.find",
      "(",
      '"name"',
      ",",
      "name",
      ")",
      ".list()",
      ";",
      "}",
    ],
  },
  // ── Kafka ──
  {
    id: "kafka_send_record",
    prompt:
      "Envía un mensaje al topic 'orders' con clave y valor usando KafkaProducer",
    language: "java",
    tokens: [
      "producer.send",
      "(",
      "new",
      "ProducerRecord<>",
      "(",
      '"orders"',
      ",",
      "key",
      ",",
      "value",
      ")",
      ")",
      ";",
    ],
  },
  {
    id: "kafka_consumer_poll",
    prompt: "Consume mensajes de Kafka con poll y timeout de 100ms",
    language: "java",
    tokens: [
      "ConsumerRecords<String,String>",
      "records",
      "=",
      "consumer.poll",
      "(",
      "Duration.ofMillis",
      "(",
      "100",
      ")",
      ")",
      ";",
    ],
  },
  // ── Spark ──
  {
    id: "spark_read_csv",
    prompt: "Lee un CSV con encabezado como DataFrame en PySpark",
    language: "python",
    tokens: [
      "df",
      "=",
      "spark.read",
      ".option",
      "(",
      "'header'",
      ",",
      "True",
      ")",
      ".csv",
      "(",
      "'data.csv'",
      ")",
    ],
  },
  {
    id: "spark_groupby_agg",
    prompt:
      "Agrupa un DataFrame por 'country' y calcula el promedio de 'sales' en PySpark",
    language: "python",
    tokens: [
      "result",
      "=",
      "df",
      ".groupBy",
      "(",
      "'country'",
      ")",
      ".agg",
      "(",
      "avg",
      "(",
      "'sales'",
      ")",
      ")",
    ],
  },
  // ── Python extra ──
  {
    id: "py_list_comprehension",
    prompt:
      "Crea una lista con los cuadrados de los números del 1 al 10 usando list comprehension",
    language: "python",
    tokens: [
      "squares",
      "=",
      "[",
      "x ** 2",
      "for",
      "x",
      "in",
      "range(1, 11)",
      "]",
    ],
  },
  {
    id: "py_dict_comprehension",
    prompt:
      "Crea un diccionario que mapee cada nombre a su longitud usando dict comprehension",
    language: "python",
    tokens: [
      "lengths",
      "=",
      "{",
      "name",
      ":",
      "len(name)",
      "for",
      "name",
      "in",
      "names",
      "}",
    ],
  },
  {
    id: "py_try_except",
    prompt: "Maneja una excepción ValueError al convertir input a entero",
    language: "python",
    tokens: [
      "try",
      ":",
      "value = int(input())",
      "except",
      "ValueError",
      "as",
      "e",
      ":",
      "print(f'Error: {e}')",
    ],
  },
];

export const codeSyntaxData: CodeSyntaxPrompt[] =
  annotateCodeSyntaxPrompts(rawCodeSyntaxData);
