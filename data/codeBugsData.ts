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
    bugLineIndex: 6, // The [] array should contain `step` or the interval won't update properly. Or missing cleanup. Let's assume missing cleanup for this bug. Actually missing cleanup + missing deps. Let's say missing cleanup.
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
];
