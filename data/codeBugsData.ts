export interface CodeBugPrompt {
  id: string;
  language: string;
  codeLines: string[];
  bugLineIndex: number; // 0-based
  explanation: string;
}

export const codeBugsData: CodeBugPrompt[] = [
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
      "Los argumentos por defecto mutables (como []) se evalúan una sola vez. Se debe usar 'my_list=None'.",
  },
  {
    id: "sql_drop_table",
    language: "sql",
    codeLines: ["DELETE FROM users;", "WHERE id = 5;"],
    bugLineIndex: 0,
    explanation:
      "El ';' en la primera línea termina la consulta, causando que se borren TODOS los usuarios. El WHERE queda huérfano.",
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
      "Array.prototype.reverse() muta el array original. Deberías usar [...numbers].reverse() o numbers.toReversed().",
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
      "Usar '!' (non-null assertion) es peligroso porque age puede ser undefined, causando un error matemático silencioso o NaN posterior.",
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
      "En Go <1.22, la variable 'w' es reutilizada en el bucle, por lo que las goroutines probablemente imprimirán solo 'c'. Se debe pasar 'w' como argumento.",
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
      "Darle opacity < 1 a .wrapper crea un nuevo 'stacking context'. Si .modal está dentro de .wrapper, su z-index alto no superará otros elementos fuera del wrapper.",
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
      "El closure guarda el valor inicial de 'count' (0) porque 'count' no está en el array de dependencias. Siempre actualizará a 1. Haz: setCount(c => c + 1).",
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
      "En bash, no puede haber espacios antes o después del '=' en las asignaciones de variables.",
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
      "La función no devuelve la Promesa (falta return antes de api.getData) ni hace await, por lo que devolverá undefined de inmediato.",
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
      "map pasa (valor, índice, array). parseInt recibe (cadena, base). El índice 1 será base 1, el 2 base 2. Resultado: [10, NaN, 2]. Usa (num) => parseInt(num).",
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
      "En SQL, no se puede usar '=' con NULL. La consulta siempre devolverá 0. Se debe usar 'IS NULL'.",
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
      "Usar 'index' como key en un array que puede cambiar de orden o mutar (como añadir o eliminar) rompe el estado interno de React e inputs. Usa un id único.",
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
      "El selector con ID (#content p) tiene mucha más especificidad (1-0-1) que la clase (0-1-1). Deberás aumentar la especificidad de .text-red.",
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
      "Optional chaining protege if 'plugin' is nulo, pero no si 'setup' no es una función (ej: es un booleano). Debería ser: typeof plugin.setup === 'function'.",
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
      "Los enums numéricos generan mapeo inverso (valores como keys). Usa enums de tipo string ('Active' = 'ACTIVE') si vas a iterar sobre las llaves de forma segura.",
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
      "Se crea un nuevo objeto 'user' en cada renderizado de React, por lo que el `useEffect` se ejecutará infinitamente. Almacena data primitiva [props.id] en las deps.",
  },
];
