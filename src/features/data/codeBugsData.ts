import {
  PracticeDifficultyTier,
  PracticeRouteObjective,
  rankToDifficultyTier,
  uniqueTags,
} from "@/lib/practiceContent";

export interface CodeBugPrompt {
  id: string;
  language: string;
  codeLines: string[];
  bugLineIndex: number; // 0-based
  explanation: string;
  difficultyTier: PracticeDifficultyTier;
  routeObjective: PracticeRouteObjective;
  tags: string[];
}

type RawCodeBugPrompt = Omit<
  CodeBugPrompt,
  "difficultyTier" | "routeObjective" | "tags"
>;

const DEV_REASONING_OBJECTIVE: PracticeRouteObjective = "dev_reasoning";

const inferCodeBugTags = (prompt: RawCodeBugPrompt): string[] => {
  const haystack =
    `${prompt.id} ${prompt.language} ${prompt.explanation}`.toLowerCase();
  const tags = [prompt.language, "debugging", "dev_reasoning"];

  if (haystack.includes("react")) tags.push("react");
  if (haystack.includes("typescript") || haystack.includes("ts_"))
    tags.push("typescript");
  if (haystack.includes("javascript") || haystack.includes("js_"))
    tags.push("javascript");
  if (haystack.includes("sql")) tags.push("sql");
  if (haystack.includes("python")) tags.push("python");
  if (haystack.includes("css")) tags.push("css");
  if (haystack.includes("bash")) tags.push("bash");
  if (haystack.includes("java") && !haystack.includes("javascript"))
    tags.push("java");
  if (haystack.includes("spring") || haystack.includes("springboot"))
    tags.push("springboot");
  if (haystack.includes("quarkus")) tags.push("quarkus");
  if (haystack.includes("kafka")) tags.push("kafka");
  if (haystack.includes("spark")) tags.push("spark");
  if (haystack.includes("security") || haystack.includes("injection"))
    tags.push("security");
  if (haystack.includes("async") || haystack.includes("promise"))
    tags.push("async");
  if (haystack.includes("performance") || haystack.includes("memo"))
    tags.push("performance");

  return uniqueTags(tags);
};

const annotateCodeBugPrompts = (
  prompts: RawCodeBugPrompt[],
): CodeBugPrompt[] => {
  const ranked = prompts
    .map((prompt, index) => ({
      prompt,
      index,
      score:
        prompt.codeLines.length * 10 +
        Math.round(prompt.explanation.length / 40) +
        (["tsx", "typescript", "sql", "golang"].includes(prompt.language)
          ? 2
          : 0),
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
    tags: inferCodeBugTags(prompt),
  }));
};

const rawCodeBugsData: RawCodeBugPrompt[] = [
  {
    id: "react_use_effect_deps",
    language: "tsx",
    codeLines: [
      "function Counter({ step }) {",
      "  const [count, setCount] = useState(0);",
      "  useEffect(() => {",
      "    setInterval(() => {",
      "      setCount(c => c + step);",
      "    }, 1000);",
      "  }, []);",
      "  return <div>{count}</div>;",
      "}",
    ],
    bugLineIndex: 6,
    explanation:
      "Falta el 'return () => clearInterval(...)' para limpiar el intervalo cuando el componente se desmonte.",
  },
  {
    id: "js_var_reference",
    language: "javascript",
    codeLines: [
      "for (var i = 0; i < 3; i++) {",
      "  setTimeout(function() {",
      "    console.log(i);",
      "  }, 1000);",
      "}",
    ],
    bugLineIndex: 0,
    explanation:
      "Usar 'var' causa que el console.log imprima '3' tres veces. Se debe usar 'let i = 0'.",
  },
  {
    id: "python_default_dict",
    language: "python",
    codeLines: [
      "def append_to_list(value, my_list=[]):",
      "    my_list.append(value)",
      "    return my_list",
      "",
      "list1 = append_to_list(1)",
      "list2 = append_to_list(2)",
    ],
    bugLineIndex: 0,
    explanation:
      "Los argumentos por defecto mutables (como []) se evalÃºan una sola vez. Se debe usar 'my_list=None'.",
  },
  {
    id: "sql_drop_table",
    language: "sql",
    codeLines: ["DELETE FROM users;", "WHERE id = 5;"],
    bugLineIndex: 0,
    explanation:
      "El ';' en la primera lÃ­nea termina la consulta, causando que se borren TODOS los usuarios. El WHERE queda huÃ©rfano.",
  },
  {
    id: "css_flex_margin",
    language: "css",
    codeLines: [
      ".container {",
      "  display: flex;",
      "  justify-content: center;",
      "  margin: auto;",
      "  width: 100%;",
      "}",
    ],
    bugLineIndex: 3,
    explanation:
      "'margin: auto' a menudo choca con 'justify-content'. En flexbox, suele ser innecesario si ya usas justifiers, y puede causar colapso.",
  },
  {
    id: "js_array_mutation",
    language: "javascript",
    codeLines: [
      "const numbers = [1, 2, 3];",
      "const reversed = numbers.reverse();",
      "console.log(numbers[0]); // Returns 3 instead of 1",
    ],
    bugLineIndex: 1,
    explanation:
      "Array.prototype.reverse() muta el array original. DeberÃ­as usar [...numbers].reverse() o numbers.toReversed().",
  },
  {
    id: "ts_non_null_assertion",
    language: "typescript",
    codeLines: [
      "interface User { name: string; age?: number; }",
      "function getAge(user: User) {",
      "  const age = user.age!;",
      "  return age * 2;",
      "}",
    ],
    bugLineIndex: 2,
    explanation:
      "Usar '!' (non-null assertion) es peligroso porque age puede ser undefined, causando un error matemÃ¡tico silencioso o NaN posterior.",
  },
  {
    id: "react_mutating_state",
    language: "tsx",
    codeLines: [
      "const [items, setItems] = useState(['a', 'b']);",
      "const addItem = (newItem) => {",
      "  items.push(newItem);",
      "  setItems(items);",
      "};",
    ],
    bugLineIndex: 2,
    explanation:
      "No debes mutar el estado directamente (items.push). Debes crear un nuevo array: setItems([...items, newItem]).",
  },
  {
    id: "go_goroutine_loop",
    language: "golang",
    codeLines: [
      "func main() {",
      '    words := []string{"a", "b", "c"}',
      "    for _, w := range words {",
      "        go func() {",
      "            fmt.Println(w)",
      "        }()",
      "    }",
      "}",
    ],
    bugLineIndex: 2,
    explanation:
      "En Go <1.22, la variable 'w' es reutilizada en el bucle, por lo que las goroutines probablemente imprimirÃ¡n solo 'c'. Se debe pasar 'w' como argumento.",
  },
  {
    id: "sql_injection_vuln",
    language: "typescript",
    codeLines: [
      "const userId = req.body.id;",
      "const query = `SELECT * FROM users WHERE id = ${userId}`;",
      "db.execute(query);",
    ],
    bugLineIndex: 1,
    explanation:
      "Usar template literals para consultas SQL causa inyecciones SQL. Se deben usar prepared statements o consultas parametrizadas.",
  },
  {
    id: "js_object_reference",
    language: "javascript",
    codeLines: [
      "const defaultSettings = { theme: 'dark' };",
      "const userSettings = defaultSettings;",
      "userSettings.theme = 'light';",
      "console.log(defaultSettings.theme);",
    ],
    bugLineIndex: 1,
    explanation:
      "Al asignar un objeto, se copia la referencia, no el valor. Modificar userSettings altera defaultSettings. Usar spread operator {...defaultSettings}.",
  },
  {
    id: "python_mutable_iter",
    language: "python",
    codeLines: [
      "numbers = [1, 2, 3, 4]",
      "for n in numbers:",
      "    if n % 2 == 0:",
      "        numbers.remove(n)",
    ],
    bugLineIndex: 3,
    explanation:
      "Modificar una lista mientras se itera sobre ella causa saltos inesperados y errores. Iterar sobre una copia: 'for n in numbers[:]:'.",
  },
  {
    id: "css_zindex_context",
    language: "css",
    codeLines: [
      ".modal {",
      "  z-index: 9999;",
      "}",
      ".wrapper {",
      "  opacity: 0.9;",
      "}",
    ],
    bugLineIndex: 4,
    explanation:
      "Darle opacity < 1 a .wrapper crea un nuevo 'stacking context'. Si .modal estÃ¡ dentro de .wrapper, su z-index alto no superarÃ¡ otros elementos fuera del wrapper.",
  },
  {
    id: "react_stale_closure",
    language: "tsx",
    codeLines: [
      "const [count, setCount] = useState(0);",
      "const handleClicks = useCallback(() => {",
      "  setCount(count + 1);",
      "}, []);",
    ],
    bugLineIndex: 2,
    explanation:
      "El closure guarda el valor inicial de 'count' (0) porque 'count' no estÃ¡ en el array de dependencias. Siempre actualizarÃ¡ a 1. Haz: setCount(c => c + 1).",
  },
  {
    id: "bash_spaces_in_var",
    language: "bash",
    codeLines: [
      "TARGET_DIR = /usr/local/bin",
      'echo "Deploying to $TARGET_DIR"',
    ],
    bugLineIndex: 0,
    explanation:
      "En bash, no puede haber espacios antes o despuÃ©s del '=' en las asignaciones de variables.",
  },
  {
    id: "ts_promise_void_return",
    language: "typescript",
    codeLines: [
      "async function fetchData() {",
      "  api.getData().then(data => {",
      "    return data;",
      "  });",
      "}",
    ],
    bugLineIndex: 1,
    explanation:
      "La funciÃ³n no devuelve la Promesa (falta return antes de api.getData) ni hace await, por lo que devolverÃ¡ undefined de inmediato.",
  },
  {
    id: "js_parseint_radix",
    language: "javascript",
    codeLines: [
      "const numbers = ['10', '10', '10'];",
      "const parsed = numbers.map(parseInt);",
      "console.log(parsed);",
    ],
    bugLineIndex: 1,
    explanation:
      "map pasa (valor, Ã­ndice, array). parseInt recibe (cadena, base). El Ã­ndice 1 serÃ¡ base 1, el 2 base 2. Resultado: [10, NaN, 2]. Usa (num) => parseInt(num).",
  },
  {
    id: "python_local_unbound",
    language: "python",
    codeLines: ["x = 10", "def increment():", "    x += 1", "    print(x)"],
    bugLineIndex: 2,
    explanation:
      "Intentar modificar una variable global sin declararla 'global x' lanza UnboundLocalError.",
  },
  {
    id: "sql_count_nulls",
    language: "sql",
    codeLines: [
      "-- Intentando contar usuarios con emails",
      "SELECT COUNT(*) ",
      "FROM users",
      "WHERE email = NULL;",
    ],
    bugLineIndex: 3,
    explanation:
      "En SQL, no se puede usar '=' con NULL. La consulta siempre devolverÃ¡ 0. Se debe usar 'IS NULL'.",
  },
  {
    id: "react_key_index",
    language: "tsx",
    codeLines: [
      "<ul>",
      "  {items.map((item, index) => (",
      "    <li key={index}>",
      "      <input type='text' defaultValue={item.name} />",
      "    </li>",
      "  ))}",
      "</ul>",
    ],
    bugLineIndex: 2,
    explanation:
      "Usar 'index' como key en un array que puede cambiar de orden o mutar (como aÃ±adir o eliminar) rompe el estado interno de React e inputs. Usa un id Ãºnico.",
  },
  {
    id: "css_specificy_war",
    language: "css",
    codeLines: [
      "p.text-red { color: red; }",
      "div#content p { color: blue; }",
      "/* Quieres que p.text-red sea el color rojo, pero no funciona */",
    ],
    bugLineIndex: 1,
    explanation:
      "El selector con ID (#content p) tiene mucha mÃ¡s especificidad (1-0-1) que la clase (0-1-1). DeberÃ¡s aumentar la especificidad de .text-red.",
  },
  {
    id: "js_optional_chaining_func",
    language: "javascript",
    codeLines: [
      "const plugin = getPlugin();",
      "// Only run if setup is a function",
      "if (plugin.setup) {",
      "    plugin?.setup();",
      "}",
    ],
    bugLineIndex: 2,
    explanation:
      "Optional chaining protege if 'plugin' is nulo, pero no si 'setup' no es una funciÃ³n (ej: es un booleano). DeberÃ­a ser: typeof plugin.setup === 'function'.",
  },
  {
    id: "ts_enum_reverse_mapping",
    language: "typescript",
    codeLines: [
      "enum Status { Active, Inactive }",
      "const keys = Object.keys(Status);",
      "console.log(keys.length); // 4, not 2!",
    ],
    bugLineIndex: 0,
    explanation:
      "Los enums numÃ©ricos generan mapeo inverso (valores como keys). Usa enums de tipo string ('Active' = 'ACTIVE') si vas a iterar sobre las llaves de forma segura.",
  },
  {
    id: "react_use_memo_miss",
    language: "tsx",
    codeLines: [
      "const user = { id: props.id };",
      "useEffect(() => {",
      "  fetchData(user);",
      "}, [user]);",
    ],
    bugLineIndex: 0,
    explanation:
      "Se crea un nuevo objeto 'user' en cada renderizado de React, por lo que el `useEffect` se ejecutarÃ¡ infinitamente. Almacena data primitiva [props.id] en las deps.",
  },
  {
    id: "ts_async_foreach",
    language: "typescript",
    codeLines: [
      "const saveAll = async (items: string[]) => {",
      "  items.forEach(async (item) => {",
      "    await saveItem(item);",
      "  });",
      "  return 'done';",
      "};",
    ],
    bugLineIndex: 1,
    explanation:
      "forEach no espera callbacks async. La función devuelve 'done' antes de completar los guardados. Usa for...of o Promise.all.",
  },
  {
    id: "sql_left_join_filtered",
    language: "sql",
    codeLines: [
      "SELECT u.id, o.total",
      "FROM users u",
      "LEFT JOIN orders o ON o.user_id = u.id",
      "WHERE o.status = 'paid';",
    ],
    bugLineIndex: 3,
    explanation:
      "El WHERE sobre la tabla derecha anula el LEFT JOIN y descarta usuarios sin pedidos. Mueve la condición al ON si quieres conservarlos.",
  },
  {
    id: "python_float_equality",
    language: "python",
    codeLines: [
      "total = 0.1 + 0.2",
      "if total == 0.3:",
      "    print('exact match')",
    ],
    bugLineIndex: 1,
    explanation:
      "Comparar floats con igualdad exacta es frágil por precisión binaria. Usa tolerancia o math.isclose(total, 0.3).",
  },
  {
    id: "bash_unquoted_path",
    language: "bash",
    codeLines: ["TARGET=/tmp/My Project", "cp $TARGET/report.txt ./backup/"],
    bugLineIndex: 1,
    explanation:
      'La variable sin comillas se parte por espacios y Bash interpreta rutas separadas. Debe ser cp "$TARGET/report.txt" ./backup/.',
  },
  {
    id: "css_box_sizing_overflow",
    language: "css",
    codeLines: [
      ".card {",
      "  width: 100%;",
      "  padding: 24px;",
      "  border: 2px solid #ccc;",
      "}",
    ],
    bugLineIndex: 1,
    explanation:
      "Con el box model por defecto, width:100% no incluye padding ni border y el componente puede desbordar su contenedor. Falta box-sizing:border-box.",
  },
  {
    id: "react_stale_timeout",
    language: "tsx",
    codeLines: [
      "const [count, setCount] = useState(0);",
      "const handleClick = () => {",
      "  setTimeout(() => setCount(count + 1), 1000);",
      "};",
    ],
    bugLineIndex: 2,
    explanation:
      "El callback captura un valor viejo de count. Si hay varios clics rápidos, se pierden incrementos. Usa setCount((current) => current + 1).",
  },
  // ── Java ──
  {
    id: "java_equals_hashcode",
    language: "java",
    codeLines: [
      "public class User {",
      "  private String name;",
      "  @Override",
      "  public boolean equals(Object o) {",
      "    if (this == o) return true;",
      "    if (!(o instanceof User)) return false;",
      "    return name.equals(((User) o).name);",
      "  }",
      "}",
    ],
    bugLineIndex: 3,
    explanation:
      "Se sobrescribe equals() pero no hashCode(). Los objetos iguales deben tener el mismo hashCode, de lo contrario fallan en HashMap/HashSet.",
  },
  {
    id: "java_string_equality",
    language: "java",
    codeLines: [
      'String a = new String("hello");',
      'String b = new String("hello");',
      "if (a == b) {",
      '  System.out.println("Equal");',
      "}",
    ],
    bugLineIndex: 2,
    explanation:
      "'==' compara referencias, no contenido. Dos objetos String creados con 'new' son distintas referencias. Usa a.equals(b).",
  },
  {
    id: "java_concurrent_modification",
    language: "java",
    codeLines: [
      'List<String> names = new ArrayList<>(List.of("a", "b", "c"));',
      "for (String name : names) {",
      '  if (name.equals("b")) {',
      "    names.remove(name);",
      "  }",
      "}",
    ],
    bugLineIndex: 3,
    explanation:
      "Modificar una lista durante un for-each lanza ConcurrentModificationException. Usa Iterator.remove() o removeIf().",
  },
  // ── Spring Boot ──
  {
    id: "spring_transactional_private",
    language: "java",
    codeLines: [
      "@Service",
      "public class OrderService {",
      "  @Transactional",
      "  private void processOrder(Order order) {",
      "    orderRepo.save(order);",
      "    paymentService.charge(order);",
      "  }",
      "}",
    ],
    bugLineIndex: 3,
    explanation:
      "Spring @Transactional no funciona en métodos private porque los proxies AOP no pueden interceptarlos. El método debe ser public.",
  },
  {
    id: "spring_circular_dependency",
    language: "java",
    codeLines: [
      "@Service",
      "public class ServiceA {",
      "  @Autowired",
      "  private ServiceB serviceB;",
      "}",
      "@Service",
      "public class ServiceB {",
      "  @Autowired",
      "  private ServiceA serviceA;",
      "}",
    ],
    bugLineIndex: 3,
    explanation:
      "Dependencia circular: ServiceA depende de ServiceB y viceversa. Desde Spring 6 no se soporta por defecto. Usa @Lazy o reestructura el diseño.",
  },
  {
    id: "spring_missing_request_body",
    language: "java",
    codeLines: [
      "@RestController",
      "public class UserController {",
      '  @PostMapping("/users")',
      "  public ResponseEntity<User> create(User user) {",
      "    return ResponseEntity.ok(userService.save(user));",
      "  }",
      "}",
    ],
    bugLineIndex: 3,
    explanation:
      "Falta la anotación @RequestBody en el parámetro. Sin ella, Spring intenta resolver User como query params en vez del body JSON.",
  },
  // ── Quarkus ──
  {
    id: "quarkus_blocking_on_reactive",
    language: "java",
    codeLines: [
      '@Path("/items")',
      "public class ItemResource {",
      "  @GET",
      "  public List<Item> getAll() {",
      "    return Item.listAll();",
      "  }",
      "}",
    ],
    bugLineIndex: 3,
    explanation:
      "En Quarkus con RESTEasy Reactive, los endpoints corren en el event-loop por defecto. Llamar una operación bloqueante sin @Blocking bloquea el hilo del event-loop.",
  },
  {
    id: "quarkus_no_args_constructor",
    language: "java",
    codeLines: [
      "@Entity",
      "public class Product {",
      "  @Id @GeneratedValue",
      "  private Long id;",
      "  private String name;",
      "  public Product(String name) {",
      "    this.name = name;",
      "  }",
      "}",
    ],
    bugLineIndex: 5,
    explanation:
      "Las entidades JPA en Quarkus (Hibernate ORM) requieren un constructor sin argumentos (puede ser protected). Sin él, falla la instanciación.",
  },
  {
    id: "quarkus_inject_static",
    language: "java",
    codeLines: [
      "@ApplicationScoped",
      "public class NotificationService {",
      "  @Inject",
      "  static EmailSender sender;",
      "  public void notify(String msg) {",
      "    sender.send(msg);",
      "  }",
      "}",
    ],
    bugLineIndex: 3,
    explanation:
      "CDI no puede inyectar campos estáticos. @Inject solo funciona en campos de instancia. Quita 'static' del campo sender.",
  },
  // ── Kafka ──
  {
    id: "kafka_auto_commit_bug",
    language: "java",
    codeLines: [
      "Properties props = new Properties();",
      'props.put("enable.auto.commit", "true");',
      'props.put("auto.commit.interval.ms", "1000");',
      "KafkaConsumer<String,String> consumer = new KafkaConsumer<>(props);",
      'consumer.subscribe(List.of("orders"));',
      "while (true) {",
      "  var records = consumer.poll(Duration.ofMillis(100));",
      "  processRecords(records); // may throw",
      "}",
    ],
    bugLineIndex: 1,
    explanation:
      "Con auto-commit habilitado, los offsets se commitean antes de que el procesamiento termine. Si processRecords falla, se pierden mensajes. Usa manual commit.",
  },
  {
    id: "kafka_serdes_mismatch",
    language: "java",
    codeLines: [
      "Properties props = new Properties();",
      'props.put("key.serializer", StringSerializer.class.getName());',
      'props.put("value.serializer", StringSerializer.class.getName());',
      "KafkaProducer<String,Order> producer = new KafkaProducer<>(props);",
      'producer.send(new ProducerRecord<>("orders", order.getId(), order));',
    ],
    bugLineIndex: 2,
    explanation:
      "El value.serializer es StringSerializer, pero el tipo del valor es Order. Se necesita un JsonSerializer o un serializador personalizado.",
  },
  {
    id: "kafka_consumer_no_group",
    language: "java",
    codeLines: [
      "Properties props = new Properties();",
      'props.put("bootstrap.servers", "localhost:9092");',
      'props.put("key.deserializer", StringDeserializer.class.getName());',
      'props.put("value.deserializer", StringDeserializer.class.getName());',
      "KafkaConsumer<String,String> consumer = new KafkaConsumer<>(props);",
      'consumer.subscribe(List.of("events"));',
    ],
    bugLineIndex: 4,
    explanation:
      "Falta 'group.id' en las propiedades del consumidor. Sin group.id, Kafka lanzará InvalidGroupIdException al hacer subscribe.",
  },
  // ── Spark ──
  {
    id: "spark_collect_oom",
    language: "java",
    codeLines: [
      'Dataset<Row> bigData = spark.read().parquet("hdfs://data/events");',
      "List<Row> allRows = bigData.collectAsList();",
      "allRows.forEach(row -> process(row));",
    ],
    bugLineIndex: 1,
    explanation:
      "collect() trae TODOS los datos al driver. Con datasets grandes causa OutOfMemoryError. Usa foreach() o transformaciones distribuidas.",
  },
  {
    id: "spark_shuffle_no_repartition",
    language: "python",
    codeLines: [
      "df = spark.read.csv('huge_file.csv', header=True)",
      "result = df.groupBy('country').count()",
      "result = result.join(other_df, 'country')",
      "result.write.parquet('output/')",
    ],
    bugLineIndex: 0,
    explanation:
      "Leer un archivo CSV gigante sin repartition genera particiones desbalanceadas. Agrega .repartition(200) después de la lectura para paralelismo uniforme.",
  },
  {
    id: "spark_unpersisted_reuse",
    language: "python",
    codeLines: [
      "df = spark.read.parquet('events/')",
      "filtered = df.filter(df.status == 'active')",
      "count_by_region = filtered.groupBy('region').count()",
      "avg_by_region = filtered.groupBy('region').avg('amount')",
      "count_by_region.show()",
      "avg_by_region.show()",
    ],
    bugLineIndex: 1,
    explanation:
      "'filtered' se usa dos veces sin persist()/cache(). Spark recalcula todo el DAG desde el parquet en cada acción. Usa filtered.cache() después del filter.",
  },
  // ── Python extra ──
  {
    id: "python_late_binding_closure",
    language: "python",
    codeLines: [
      "funcs = []",
      "for i in range(4):",
      "    funcs.append(lambda: i)",
      "print([f() for f in funcs])",
    ],
    bugLineIndex: 2,
    explanation:
      "Las closures en Python capturan la variable, no su valor. Todas devuelven 3 (último valor de i). Usa 'lambda i=i: i' para capturar el valor.",
  },
  {
    id: "python_is_vs_equals",
    language: "python",
    codeLines: ["a = 1000", "b = 1000", "if a is b:", "    print('same')"],
    bugLineIndex: 2,
    explanation:
      "'is' compara identidad de objeto, no igualdad. Para enteros grandes (>256), Python no cachea objetos, así que 'is' puede fallar. Usa '=='.",
  },
  {
    id: "python_except_broad",
    language: "python",
    codeLines: [
      "try:",
      "    result = process_data(input)",
      "except:",
      "    pass",
    ],
    bugLineIndex: 2,
    explanation:
      "'except:' sin tipo captura TODO incluyendo KeyboardInterrupt y SystemExit. Siempre especifica el tipo: 'except Exception as e:'.",
  },
];

export const codeBugsData: CodeBugPrompt[] =
  annotateCodeBugPrompts(rawCodeBugsData);
