export interface TechCard {
  prompt: string;
  answer: string;
}

export interface TechDeck {
  id: string;
  name: string;
  cards: TechCard[];
}

export const techDecks: TechDeck[] = [
  {
    id: "algoritmos",
    name: "Algoritmos",
    cards: [
      {
        prompt:
          "¿Qué modelan naturalmente las estructuras de datos de tipo grafo?",
        answer:
          "Relaciones, interacciones e interdependencias complejas entre objetos.",
      },
      {
        prompt:
          "En el modelo de programación Bulk Synchronous Parallel (BSP), la computación sobre vértices se representa como una secuencia de _____.",
        answer: "supersteps (superpasos)",
      },
      {
        prompt:
          "¿Qué sistema, introducido por Google, fue la primera implementación de BSP con una API nativa para la programación de algoritmos de grafos?",
        answer: "El sistema Pregel.",
      },
      {
        prompt:
          "¿Cuál es el paradigma de computación que popularizó el sistema Pregel?",
        answer:
          'Un paradigma de computación "piensa como un vértice" (think like a vertex).',
      },
      {
        prompt:
          "En Pregel, ¿cómo se minimiza la sobrecarga de comunicación entre máquinas?",
        answer:
          "Preservando la localidad de los datos, asegurando que el cómputo se realiza sobre datos almacenados localmente.",
      },
      {
        prompt:
          "¿Qué abstracción introduce GraphX, que extiende el Resilient Distributed Dataset (RDD) de Spark?",
        answer:
          "El Resilient Distributed Graph (RDG), que asocia registros con vértices y aristas en un grafo.",
      },
      {
        prompt:
          "Según el estudio experimental, ¿qué sistema de procesamiento de grafos mostró la menor utilización de CPU en promedio?",
        answer: "GraphLab.",
      },
      {
        prompt:
          "¿Qué es la partición de grafos balanceada y por qué es un problema computacionalmente difícil?",
        answer:
          "Es un problema NP-completo que busca dividir un grafo en componentes de tamaño similar minimizando las conexiones entre ellos.",
      },
      {
        prompt:
          "El algoritmo distribuido JA-BE-JA utiliza búsqueda local y _____ para la partición de grafos.",
        answer: "simulated annealing (recocido simulado)",
      },
      {
        prompt:
          "¿Cuáles son los dos tipos de particionamiento de grafos que aborda el algoritmo JA-BE-JA?",
        answer:
          "Particionamiento por corte de aristas (edge-cut) y particionamiento por corte de vértices (vertex-cut).",
      },
      {
        prompt: "¿Qué es una tabla hash o tabla de troceado?",
        answer:
          "Una estructura de datos que utiliza una función hash para mapear claves a índices en un arreglo, permitiendo búsquedas, inserciones y eliminaciones rápidas.",
      },
      {
        prompt:
          "En las tablas hash, ¿qué ocurre cuando dos claves diferentes generan el mismo índice?",
        answer: "Ocurre una colisión.",
      },
      {
        prompt:
          "¿Cuál es la técnica de resolución de colisiones en tablas hash donde cada ranura del arreglo apunta a una lista de elementos que colisionaron en esa ranura?",
        answer: "Encadenamiento (chaining).",
      },
      {
        prompt:
          "¿Para qué tipo de grafos se aplica un algoritmo de ordenamiento topológico?",
        answer: "Grafos dirigidos acíclicos (DAGs).",
      },
      {
        prompt: "En el contexto de grafos, ¿qué es la densidad?",
        answer:
          "La relación entre el número real de aristas y el número máximo posible de aristas, definida como $e / (v(v-1)/2)$.",
      },
      {
        prompt:
          "¿Cuál es la complejidad temporal en el peor de los casos del algoritmo de ordenamiento Bubble Sort?",
        answer: "$O(n^2)$.",
      },
      {
        prompt:
          "¿Qué es el costo amortizado por operación en una secuencia de $n$ operaciones?",
        answer: "El costo total de las operaciones dividido por $n$.",
      },
      {
        prompt:
          "¿Para qué tipo de estructuras de datos es útil el análisis amortizado?",
        answer:
          "Para estructuras que ocasionalmente incurren en un gran costo para reequilibrar o mejorar su estado interno, pero donde tales operaciones no ocurren con frecuencia.",
      },
      {
        prompt:
          "En una arquitectura NUMA, ¿qué sucede si un proceso accede a memoria que no es local a su procesador?",
        answer:
          "El acceso es más lento porque debe usar las interconexiones entre procesadores.",
      },
      {
        prompt:
          "En la jerarquía de cachés de una CPU moderna, ¿cuáles son los dos tipos de caché L1?",
        answer: "La caché L1d para datos y la caché L1i para instrucciones.",
      },
      {
        prompt:
          "¿Cuáles son las tres partes que componen una dirección de memoria en el contexto de una caché?",
        answer:
          "Tag (etiqueta), Set index (índice de conjunto) y Block offset (desplazamiento de bloque).",
      },
      {
        prompt:
          "¿Qué principio establece que si un programa accede a una ubicación de memoria, es muy probable que vuelva a acceder a la misma ubicación en un futuro cercano?",
        answer: "El principio de localidad temporal.",
      },
      {
        prompt:
          "¿Qué construcción de programación es un impulsor principal de la localidad temporal?",
        answer: "Los bucles (loops).",
      },
      {
        prompt:
          "¿Qué principio establece que si un programa accede a una ubicación de memoria, es muy probable que también acceda a ubicaciones cercanas?",
        answer: "El principio de localidad espacial.",
      },
      {
        prompt: "¿Qué es un DAG en el contexto de Airflow?",
        answer:
          "Una especificación de las dependencias entre tareas que define el orden en que deben ejecutarse.",
      },
      {
        prompt:
          "¿Cuál es la complejidad temporal promedio del algoritmo QuickSort?",
        answer: "$\\Theta(n \\log(n))$.",
      },
      {
        prompt:
          "¿Cuál es la complejidad de espacio en el peor de los casos para el algoritmo Heapsort?",
        answer: "$O(1)$.",
      },
      {
        prompt: "¿Qué es un filtro de Bloom?",
        answer:
          "Una estructura de datos probabilística eficiente en espacio que se utiliza para probar si un elemento es miembro de un conjunto.",
      },
      {
        prompt:
          "¿Qué tipo de error puede producir un filtro de Bloom al consultar la pertenencia de un elemento?",
        answer:
          "Puede producir falsos positivos (indicar que un elemento está en el conjunto cuando no lo está), pero nunca falsos negativos.",
      },
      {
        prompt:
          "En un filtro de Bloom, un array de $m$ bits se inicializa a 0 y se utilizan $k$ _____ diferentes.",
        answer: "funciones de hash",
      },
      {
        prompt:
          "Mencione una aplicación de los filtros de Bloom en sistemas de bases de datos como Bigtable o Cassandra.",
        answer:
          "Reducir las búsquedas en disco para filas o columnas que no existen, mejorando el rendimiento de las consultas.",
      },
      {
        prompt:
          "¿Qué son los filtros de Bloom escalables (Scalable Bloom filters)?",
        answer:
          "Una variante que puede adaptarse dinámicamente al número de elementos almacenados, asegurando una probabilidad máxima de falsos positivos.",
      },
      {
        prompt:
          "¿Qué permiten los filtros de Bloom en capas (Layered Bloom filters)?",
        answer:
          "Rastrear cuántas veces se ha añadido un elemento al filtro de Bloom.",
      },
      {
        prompt:
          "¿Garantiza el algoritmo de búsqueda en profundidad (DFS) el camino más corto entre dos nodos?",
        answer:
          "No, DFS puede encontrar una solución, pero no necesariamente la más directa, ya que explora una ruta a fondo antes de retroceder.",
      },
      {
        prompt:
          "En el análisis de conjuntos de datos disjuntos con compresión de caminos, ¿cuál es el costo amortizado de la operación `find`?",
        answer:
          "Es casi constante, específicamente $O(\\log^* n)$, donde $\\log^*$ es el logaritmo iterado.",
      },
      {
        prompt:
          "¿Por qué los bucles son excelentes ejemplos de localidad temporal?",
        answer:
          "Porque el cuerpo del bucle se ejecuta muchas veces, accediendo repetidamente a las mismas instrucciones y variables.",
      },
      {
        prompt: "En una caché, ¿qué función cumple la etiqueta (tag)?",
        answer:
          "Suministra los bits restantes de la dirección de memoria para distinguir entre diferentes ubicaciones que mapean al mismo bloque de caché.",
      },
      {
        prompt:
          '¿Qué característica define a los algoritmos "cache-oblivious" (ajenos a la caché)?',
        answer:
          "Son eficientes en el uso de la caché pero no requieren ajuste de parámetros dependientes del hardware, como el tamaño de la caché.",
      },
      {
        prompt:
          "¿Cuál es la complejidad de caché del algoritmo iterativo estándar para multiplicar dos matrices de $n \\times n$?",
        answer:
          "$\\Omega(n^3)$, que es el peor comportamiento asintótico posible para un algoritmo con trabajo $O(n^3)$.",
      },
      {
        prompt:
          "En procesamiento de grafos, ¿qué tipo de algoritmos ofrecen más oportunidades para mejorar la localidad de memoria?",
        answer:
          'Los algoritmos "all-active", como PageRank, donde todos o la mayoría de los vértices están activos en cada iteración.',
      },
      {
        prompt: "¿Qué es la complejidad espacial de un algoritmo?",
        answer:
          "Mide cómo cambia el consumo de memoria adicional de un algoritmo al variar el volumen de datos de entrada.",
      },
      {
        prompt:
          "Un algoritmo que no crea estructuras de datos dependientes del tamaño de la entrada tiene una complejidad espacial de _____.",
        answer: "$O(1)$ o espacio constante",
      },
      {
        prompt:
          "El framework LMAX Disruptor utiliza una estructura de datos circular basada en un array llamada _____ para la comunicación entre hilos.",
        answer: "ring buffer (búfer anular)",
      },
      {
        prompt:
          "¿Qué problema común en las implementaciones de colas concurrentes busca evitar el LMAX Disruptor?",
        answer:
          "La contención de escritura en la cabeza, la cola y el tamaño de la cola, y la ineficiencia de la caché debido al 'false sharing'.",
      },
      {
        prompt:
          "¿Cuál es la diferencia principal entre el Count-Min Sketch y el Count Sketch en cuanto al tipo de error?",
        answer:
          "Count-Min Sketch tiene un error unilateral (la estimación nunca es menor que el valor real), mientras que Count Sketch tiene un error bilateral (la estimación puede ser mayor o menor).",
      },
      {
        prompt:
          "¿Para qué problema se utiliza comúnmente la estructura de datos Count-Min Sketch?",
        answer:
          "Para estimar la frecuencia de elementos en un flujo de datos (data stream) a gran escala y con baja latencia.",
      },
      {
        prompt:
          "En Airflow, ¿qué sucede con las tareas dependientes de una tarea que se salta (skipped) si la regla de activación (trigger rule) es `all_success`?",
        answer: "También se saltarán en cascada.",
      },
      {
        prompt:
          "¿Qué son los grafos dirigidos acíclicos (DAGs) y qué representan comúnmente?",
        answer:
          "Son grafos con aristas dirigidas que no contienen ciclos, y comúnmente representan dependencias o relaciones de precedencia.",
      },
      {
        prompt:
          "En investigación observacional, ¿por qué es crucial ajustar las variables de confusión (confounders)?",
        answer:
          "Para eliminar sesgos y poder identificar una relación causal, comparando grupos que sean lo más similares posible.",
      },
      {
        prompt:
          "¿Por qué los algoritmos sin bloqueo (lock-free) tienden a superar a sus contrapartes con bloqueo bajo alta contención?",
        answer:
          "Porque evitan o reducen el número de cambios de contexto del sistema operativo, lo que mejora el rendimiento general del sistema.",
      },
      {
        prompt:
          "El algoritmo de ordenamiento Merge Sort tiene una complejidad espacial de _____, debido a las copias temporales que se crean durante la fusión.",
        answer: "$O(n)$",
      },
      {
        prompt: "¿Qué es una memoria Write-Back (WB)?",
        answer:
          "Un tipo de memoria caché donde los datos modificados se escriben de nuevo en la memoria principal solo cuando la línea de caché es desalojada, a diferencia de Write-Through que escribe inmediatamente.",
      },
      {
        prompt:
          "El filtro de Bloom Racional (Rational Bloom filter) es una variante que permite un número de funciones de hash _____ en lugar de entero.",
        answer: "racional (no entero)",
      },
      {
        prompt:
          "¿Qué ventaja ofrece el filtro de Bloom Racional sobre el filtro de Bloom tradicional en términos de tasa de falsos positivos?",
        answer:
          "Puede lograr una tasa de falsos positivos menor o igual a la de un filtro de Bloom normal, al aproximarse mejor al número óptimo de funciones de hash.",
      },
      {
        prompt:
          "¿Qué es la partición de grafos en streaming (streaming graph partitioning)?",
        answer:
          "Es el proceso de particionar un grafo a medida que sus vértices y aristas llegan secuencialmente, sin tener el grafo completo disponible de antemano.",
      },
      {
        prompt: "¿Qué es el 'false sharing' en programación multihilo?",
        answer:
          "Es una condición de degradación del rendimiento que ocurre cuando hilos en diferentes procesadores modifican variables que no están relacionadas, pero que residen en la misma línea de caché.",
      },
      {
        prompt:
          "¿Cómo se puede mitigar el 'false sharing' para variables globales?",
        answer:
          "Asegurando que las variables accedidas por diferentes hilos estén en líneas de caché distintas, por ejemplo, mediante alineación de memoria (padding).",
      },
      {
        prompt:
          "¿Qué garantiza el algoritmo de búsqueda en anchura (BFS) en grafos no ponderados?",
        answer:
          "Encuentra el camino más corto desde el nodo de inicio a todos los demás nodos.",
      },
      {
        prompt:
          "La búsqueda en anchura (BFS) se implementa típicamente de forma iterativa utilizando una estructura de datos de tipo _____.",
        answer: "cola (queue)",
      },
      {
        prompt:
          "El modelo de programación de grafos _____ se enfoca en procesar las aristas de forma independiente, lo cual puede llevar a un acceso a memoria más secuencial.",
        answer: "centrado en aristas (edge-centric)",
      },
      {
        prompt: "¿Qué es un árbol binario?",
        answer:
          "Una estructura de datos de tipo árbol en la que cada nodo puede tener como máximo dos hijos, denominados hijo izquierdo e hijo derecho.",
      },
      {
        prompt:
          "¿Qué propiedad fundamental define a un árbol binario de búsqueda (BST)?",
        answer:
          "Para cualquier nodo, todos los valores en su subárbol izquierdo son menores que su valor, y todos los valores en su subárbol derecho son mayores.",
      },
      {
        prompt: "¿Qué son los punteros de peligro (hazard pointers)?",
        answer:
          "Una técnica de reclamación de memoria segura para objetos dinámicos sin bloqueo, donde cada hilo indica los nodos a los que está a punto de acceder.",
      },
      {
        prompt:
          "¿Cuándo un hilo puede reclamar de forma segura un nodo retirado utilizando punteros de peligro?",
        answer:
          "Cuando, después de una revisión, el nodo retirado no coincide con ninguno de los punteros de peligro de los otros hilos.",
      },
      {
        prompt:
          "La propiedad que define la semántica de las estructuras de datos concurrentes, requiriendo que cada operación parezca tener efecto instantáneamente en algún punto entre su invocación y respuesta, se llama _____.",
        answer: "linearizability (linealizabilidad)",
      },
      {
        prompt:
          "¿Qué es la contención de operaciones (operation contention) en estructuras de datos concurrentes?",
        answer:
          "Ocurre cuando una operación afecta frecuentemente el resultado de otra operación que ocurre poco después, como escrituras y lecturas en un objeto popular.",
      },
      {
        prompt:
          "A diferencia de un filtro de Bloom, un sketch de conteo de distintos como HyperLogLog no intenta almacenar todos los ítems, sino que mantiene su tamaño pequeño. ¿Qué valor almacena HLL en cada uno de sus 'bins' o registros?",
        answer:
          "Solo el valor máximo observado de una métrica derivada del hash (como la posición del primer 1).",
      },
      {
        prompt:
          "¿Qué son las tres operaciones costosas al buscar un ítem en una tabla hash?",
        answer:
          "1. Hashear la clave, 2. Mapear el hash a una ranura (módulo), y 3. Acceder a la memoria de esa ranura.",
      },
      {
        prompt:
          "¿Qué operación atómica es fundamental para muchas implementaciones de bloqueo en arquitecturas como ARM, y consta de una carga y un almacenamiento condicional?",
        answer:
          "Load-Link / Store-Conditional (LL/SC), en ARM se usan las instrucciones LDREX y STREX.",
      },
      {
        prompt:
          "¿Qué es un acceso a memoria no temporal (non-temporal memory access)?",
        answer:
          "Es una instrucción que escribe datos directamente en la memoria principal, evitando que se carguen en la jerarquía de caché, lo cual es útil para datos que no se reutilizarán pronto.",
      },
      {
        prompt:
          "El ordenamiento topológico se puede implementar usando una búsqueda en profundidad (DFS). ¿En qué momento se añade un nodo a la estructura que dará el orden final?",
        answer:
          "Un nodo se añade después de que todos sus descendientes (nodos a los que apunta) hayan sido visitados.",
      },
      {
        prompt:
          "¿Qué son los locks de lectura-escritura (Readers–writer locks)?",
        answer:
          "Un mecanismo de sincronización que permite el acceso concurrente a múltiples lectores, pero requiere acceso exclusivo para un único escritor.",
      },
      {
        prompt:
          "¿Qué problema puede ocurrir si dos hilos con locks de lectura intentan actualizarlos a locks de escritura simultáneamente?",
        answer: "Se produce un deadlock (interbloqueo).",
      },
      {
        prompt:
          "Además del confinamiento y la inmutabilidad, ¿cuál es la tercera forma principal de lograr seguridad en hilos (thread safety)?",
        answer:
          "Usar tipos de datos seguros para hilos (threadsafe data types) para almacenar los datos mutables compartidos.",
      },
      {
        prompt:
          "¿Qué técnica utiliza HyperLogLog para agregar los valores de sus registros y mitigar el impacto de valores atípicos (outliers)?",
        answer: "La media armónica.",
      },
      {
        prompt: "¿Qué es un árbol de segmentos (Segment Tree)?",
        answer:
          "Una estructura de datos en forma de árbol que almacena información sobre intervalos o segmentos de un arreglo, permitiendo responder eficientemente a consultas de rango.",
      },
      {
        prompt:
          "¿Para qué tipo de operaciones es eficiente un árbol de segmentos?",
        answer:
          "Para consultas de rango como suma, mínimo o máximo en un intervalo $[l...r]$ y actualizaciones de elementos individuales, ambas en tiempo $O(\\log n)$.",
      },
      {
        prompt:
          "¿Qué son los árboles de segmentos persistentes y cuál es una de sus aplicaciones?",
        answer:
          "Son árboles de segmentos que conservan versiones anteriores al ser modificados. Se usan en sistemas de control de versiones como Git para gestionar el historial de cambios.",
      },
      {
        prompt:
          "En el diseño de sistemas de componentes de entidad (ECS), ¿qué son los componentes?",
        answer:
          "Son tipos de datos simples (plain datatypes) sin comportamiento, que contienen solo datos.",
      },
      {
        prompt:
          "En el modelo ECS, las _____ son funciones que se aplican a entidades que tienen un conjunto específico de componentes.",
        answer: "sistemas (systems)",
      },
      {
        prompt:
          "¿Qué propiedad de los árboles rojo-negros los hace valiosos para aplicaciones en tiempo real?",
        answer:
          "Ofrecen garantías de tiempo en el peor de los casos ($O(\\log n)$) para inserción, eliminación y búsqueda.",
      },
      {
        prompt:
          "En Linux, el planificador Completely Fair Scheduler y la llamada al sistema epoll utilizan internamente _____ para gestionar sus datos.",
        answer: "árboles rojo-negros (red-black trees)",
      },
      {
        prompt: "¿Qué es la memoización?",
        answer:
          "Una técnica de optimización, utilizada en programación dinámica, que consiste en almacenar los resultados de subproblemas para evitar volver a calcularlos.",
      },
      {
        prompt:
          "La programación dinámica con memoización sigue un enfoque _____, mientras que la tabulación sigue un enfoque _____.",
        answer:
          "top-down (de arriba hacia abajo); bottom-up (de abajo hacia arriba)",
      },
      {
        prompt:
          "¿Cuál es la complejidad temporal y espacial del algoritmo de Kahn para el ordenamiento topológico?",
        answer:
          "La complejidad temporal es $O(V+E)$ y la complejidad de espacio auxiliar es $O(V)$.",
      },
      {
        prompt:
          "El acceso a cualquier elemento de un arreglo es una operación de tiempo constante ($O(1)$) porque sus elementos se almacenan en ubicaciones de memoria _____.",
        answer: "contiguas",
      },
      {
        prompt: "¿Qué es una estructura de datos Trie o árbol de prefijos?",
        answer:
          "Una estructura de datos en forma de árbol utilizada para almacenar un conjunto dinámico o un arreglo asociativo donde las claves suelen ser cadenas de caracteres.",
      },
      {
        prompt: "¿Qué es la arquitectura de memoria NUMA?",
        answer:
          "Non-Uniform Memory Architecture, donde el tiempo de acceso a la memoria depende de la ubicación de la memoria en relación con un procesador.",
      },
      {
        prompt:
          "En una arquitectura multi-core, ¿qué es el protocolo de coherencia de caché MESI?",
        answer:
          "Un protocolo que gestiona el estado de las líneas de caché (Modified, Exclusive, Shared, Invalid) para mantener la consistencia de los datos entre los cachés de diferentes núcleos.",
      },
      {
        prompt:
          "¿Qué es la paginación en la gestión de memoria de un sistema operativo?",
        answer:
          "Un esquema que permite que el espacio de direcciones físicas de un proceso no sea contiguo, dividiendo la memoria virtual en bloques de tamaño fijo llamados páginas.",
      },
      {
        prompt:
          "Para acelerar la traducción de direcciones virtuales a físicas, las CPUs utilizan una caché especial llamada _____.",
        answer: "Translation Lookaside Buffer (TLB)",
      },
      {
        prompt:
          "¿Qué es el problema ABA en la programación concurrente sin bloqueo?",
        answer:
          "Ocurre cuando una ubicación de memoria se lee una vez (valor A), es modificada por otro hilo (a B y luego de vuelta a A), y luego se lee de nuevo, haciendo que el primer hilo crea erróneamente que no ha habido cambios.",
      },
    ],
  },
  {
    id: "apx",
    name: "Apx",
    cards: [
      {
        prompt:
          "¿Qué es el ROP (Registro de Operaciones) en la arquitectura APX?",
        answer:
          "Es un registro interno utilizado con fines de auditoría, fraude o informativos, que indica la finalización de cada transacción ejecutada.",
      },
      {
        prompt:
          "Después de finalizar la transacción de la aplicación, las ejecuciones regresan a la capa de arquitectura de control para ejecutar las acciones ____.",
        answer: "posteriores",
      },
      {
        prompt:
          "¿Qué tipo de bases de datos soporta APX para ser utilizadas por las aplicaciones?",
        answer: "Bases de datos SQL y NOSQL.",
      },
      {
        prompt:
          "En APX, la gestión de autorizaciones está delegada en módulos de _____ y módulos de Arquitectura.",
        answer: "Seguridad Lógica",
      },
      {
        prompt:
          "¿Cuál es la herramienta recomendada para la gestión de repositorios de código en el stack de desarrollo de APX?",
        answer: "Bitbucket.",
      },
      {
        prompt:
          "¿Qué versión de Java Development Kit (JDK) se recomienda encarecidamente para desarrollar con APX?",
        answer: "OpenJDK versión 8.",
      },
      {
        prompt:
          "¿Qué herramienta se utiliza para la gestión de artefactos construidos en el proceso de desarrollo de software APX?",
        answer: "Artifactory.",
      },
      {
        prompt:
          "¿Para qué se utiliza la APX CLI (Interfaz de línea de comandos)?",
        answer:
          "Para crear proyectos tipo APX (librería, DTO, Transacción, etc.), administrar dependencias y gestionar utilidades.",
      },
      {
        prompt:
          "Según la convención de nomenclatura de APX, ¿cómo debe ser el `groupId` para un componente DTO?",
        answer:
          "Debe seguir la sintaxis `com.bbva.{TU_UUAA}.dto.{TU_ELECCIÓN_DE_NOMBRE}`.",
      },
      {
        prompt:
          "En la estructura de un test JUnit para una transacción APX, ¿qué identifica la parte 'UUAA' en el nombre de la clase `UUAAT00101ESTransactionTest`?",
        answer: "Identifica el código de la aplicación.",
      },
      {
        prompt:
          "En la nomenclatura de librerías APX, ¿qué significa el sufijo 'IMPL' en un nombre como 'UUAARXXXIMPL'?",
        answer: "Indica que es la implementación de la biblioteca.",
      },
      {
        prompt:
          "Según la convención de nomenclatura para los métodos de interfaz de una librería APX, ¿cuál es el prefijo obligatorio para cualquier nombre de método?",
        answer: "El prefijo obligatorio es 'execute'.",
      },
      {
        prompt:
          "Para invocar desde una transacción una librería que accede a la base de datos, ¿qué método se utiliza para obtener la instancia de la librería?",
        answer:
          "Se utiliza el método `this.getServiceLibrary(UUAAR001.class)`.",
      },
      {
        prompt:
          "En un archivo de propiedades SQL para JDBC en APX, ¿qué elemento precede a la consulta SQL para indicar la base de datos a utilizar?",
        answer:
          "El nombre lógico de la base de datos seguido de un punto y coma (ej. `db1;`).",
      },
      {
        prompt:
          "Para crear una librería que usa el motor de reglas Drools en APX, ¿qué utilidad se debe agregar usando la APX CLI?",
        answer: "Se debe agregar la utilidad `drools`.",
      },
      {
        prompt:
          "¿Qué método se utiliza en una librería APX para invocar un servicio de backend a través de la utilidad de interconexión?",
        answer:
          "Se utiliza el método `this.interBackendConnectionUtils.invoke(serviceName, paramsIn)`.",
      },
      {
        prompt:
          "Para crear una librería que utiliza el Creador de Documentos para generar PDFs, ¿qué utilidad se debe agregar con la APX CLI?",
        answer: "Se debe agregar la utilidad `docgen`.",
      },
      {
        prompt:
          "¿Qué motor es el principal en el contexto de APX, haciendo que las transacciones se implementen como un paquete (bundle)?",
        answer: "OSGi es el motor principal.",
      },
      {
        prompt:
          "En el flujo de una transacción APX, ¿qué componente procesa la solicitud HTTP inicial y valida los parámetros de entrada?",
        answer: "El componente `PGRestService`.",
      },
      {
        prompt:
          "En el archivo `pom.xml` de una transacción APX, ¿qué plugin de Maven se encarga de empaquetar el componente como un 'bundle' OSGi?",
        answer: "El plugin `Apache Felix` (maven-bundle-plugin).",
      },
      {
        prompt:
          "En el `pom.xml` de una transacción APX, la propiedad `Bundle-Category` dentro de la configuración del plugin de Apache Felix debe tener el valor ____.",
        answer: "transaction",
      },
      {
        prompt:
          "¿Qué es la clase abstracta de una transacción en APX y qué métodos contiene?",
        answer:
          "Contiene los métodos que acceden a los parámetros de la transacción, como los métodos 'get' para recuperar datos y 'set' para establecerlos.",
      },
      {
        prompt:
          "Cuando se trabaja con fechas en APX, la arquitectura siempre usa la zona horaria _____ para devolver un parámetro de entrada de fecha.",
        answer: "UTC",
      },
      {
        prompt:
          "¿Cómo se define un objeto de transferencia de datos (DTO) en el contexto de APX?",
        answer:
          "Son objetos simples o complejos que no deben contener lógica de negocio, solo mecanismos de serialización para transferir datos.",
      },
      {
        prompt:
          "En una clase DTO de APX, ¿por qué es importante el atributo `serialVersionUID`?",
        answer:
          "Se utiliza durante la deserialización para verificar que el emisor y el receptor de un objeto serializado tengan cargadas clases compatibles.",
      },
      {
        prompt:
          "En una librería APX, ¿en qué proyecto (interfaz o implementación) se deben declarar las dependencias de otras librerías o utilidades?",
        answer: "En el proyecto de implementación.",
      },
      {
        prompt:
          "Según la tabla de dependencias de APX, ¿se puede agregar una dependencia a otra librería en el `pom.xml` de una librería de interfaz?",
        answer:
          "No, las dependencias de librerías solo se agregan en la librería de implementación.",
      },
      {
        prompt:
          "¿Cuál es el código de retorno en una respuesta APX que indica 'OK + consejo'?",
        answer: "El código de retorno es '04'.",
      },
      {
        prompt:
          "¿Qué código de retorno APX indica un rechazo con error grave y código de error?",
        answer: "El código de retorno es '12'.",
      },
      {
        prompt:
          "Para obtener el valor de un parámetro de entrada de tipo DTO en una transacción APX, ¿qué método se utiliza?",
        answer: "Se utiliza el método `getEntityIn`.",
      },
      {
        prompt:
          "Para enviar contenido a través de Multipart desde una transacción APX, ¿qué tipo de parámetro de salida se debe declarar?",
        answer:
          "Se debe declarar un parámetro de salida de tipo Archivo (File).",
      },
      {
        prompt:
          "¿Cuál es el tamaño máximo total de archivos que se puede recibir o enviar en una transacción APX a través de Multipart?",
        answer: "20971520 bytes (aproximadamente 20 MB).",
      },
      {
        prompt:
          "¿Qué método se utiliza en una transacción APX para recuperar parámetros recibidos a través del encabezado?",
        answer: "El método `getRequestHeader()`.",
      },
      {
        prompt:
          "¿Qué nivel de logging de SLF4j se utiliza para imprimir avisos o fallos no críticos que no impiden que la aplicación continúe su flujo?",
        answer: "El nivel `LOGGER.warn`.",
      },
      {
        prompt:
          "En APX, la gravedad de un error o aviso que ocurre durante la ejecución debe ser determinada por la ______, ya que tiene el contexto de las librerías que orquesta.",
        answer: "transacción",
      },
      {
        prompt:
          "¿Cuál es el código de error de la arquitectura APX Online para 'EL USUARIO NO TIENE PERMISOS PARA EJECUTAR LA TRANSACCION'?",
        answer: "QWPO01211008.",
      },
      {
        prompt:
          "¿Qué significa el código de error `QWPO01211032` en la arquitectura online de APX?",
        answer: "Significa 'ERROR AL ACCEDER A LA BASE DE DATOS'.",
      },
      {
        prompt:
          "Para definir la visibilidad de una librería APX y que pueda ser consumida por cualquier otra UUAA, ¿qué valor se debe asignar?",
        answer: "Se debe asignar un asterisco ('*').",
      },
      {
        prompt:
          "Para enviar un evento durante la ejecución de una transacción a Upsilon, ¿qué método se debe utilizar?",
        answer: "El método `sendEvent`.",
      },
      {
        prompt:
          "Para enviar un evento de forma asíncrona en las post-acciones de una transacción, ¿qué método se debe utilizar?",
        answer: "El método `addPostEvent`.",
      },
      {
        prompt:
          "Para recuperar literales dinámicos desde una tabla de la base de datos en APX, ¿qué clase proporciona el método `getLiteralFromCode`?",
        answer: "La clase `AbstractLibrary`.",
      },
      {
        prompt:
          "En la utilidad JDBC de APX, ¿qué excepción se lanza si una consulta no devuelve ningún resultado?",
        answer: "Se lanza `com.bbva.apx.exception.db.NoResultException`.",
      },
      {
        prompt:
          "¿Qué excepción de la utilidad JDBC de APX se captura al intentar insertar una clave duplicada?",
        answer: "Se captura `com.bbva.apx.exception.db.DuplicateKeyException`.",
      },
      {
        prompt:
          "Las plantillas para la utilidad Document Creator de APX deben estar escritas en _____ para generar PDFs.",
        answer: "Lenguaje XHTML",
      },
      {
        prompt:
          "En la utilidad Document Creator de APX, ¿qué método se utiliza para transformar una lista de imágenes JPG en un PDF de varias páginas?",
        answer:
          "El método `imagesToPdf(List<InputStream> imageList, float imageDpi)`.",
      },
      {
        prompt:
          "¿Qué unidad de medida se utiliza para determinar el tamaño de las imágenes en plantillas RTF para evitar problemas de resolución?",
        answer: "Se utiliza el Twip (Twentleth of a Point).",
      },
      {
        prompt:
          "Para forzar un salto de página antes de un elemento en un PDF generado con Document Creator, ¿qué propiedad CSS se debe utilizar?",
        answer: "La propiedad `page-break-before` con el valor `always`.",
      },
      {
        prompt:
          "En la utilidad de reglas de APX, ¿qué método de `rulesUtils` se utiliza para ejecutar todas las reglas de la aplicación?",
        answer: "El método `fireAllRules`.",
      },
      {
        prompt:
          "Para la precompilación de reglas en APX, se debe incluir un archivo llamado _____ en la ruta `/src/main/resources` del proyecto.",
        answer: "rules.txt",
      },
      {
        prompt:
          "Al utilizar el API Connector de APX, ¿qué método se utiliza para obtener un token de Google Cloud Platform (GCP)?",
        answer: "El método `getGoogleCloudPlatformToken()`.",
      },
      {
        prompt:
          "Para que el patrón Circuit Breaker funcione en el API Connector de APX, ¿qué propiedad de configuración debe establecerse en `true`?",
        answer: "`api.connector.<id>.circuitBreaker.enabled`.",
      },
      {
        prompt:
          "¿Qué utilidad APX se debe usar para invocar transacciones CICS en el host (exclusivo para EE. UU.)?",
        answer: "La utilidad CICS (`interBackendCicsUtils`).",
      },
      {
        prompt:
          "En la utilidad Mongo de APX, ¿qué operación se utiliza para ejecutar un pipeline de agregación de datos?",
        answer: "La operación de agregación (`EnumOperation.AGREGGATES`).",
      },
      {
        prompt:
          "En la utilidad Mongo de APX, el paradigma de procesamiento de datos para condensar grandes volúmenes se conoce como ____.",
        answer: "Map-Reduce",
      },
      {
        prompt:
          "La utilidad GRPC de APX se utilizará de forma predeterminada para invocaciones de tipo ____.",
        answer: "LRA (Long Running Actions)",
      },
      {
        prompt:
          "La utilidad Compress Manager de APX en modo ONLINE tiene una restricción de un máximo de ____ archivos permitidos para comprimir o descomprimir.",
        answer: "5",
      },
      {
        prompt: "¿Dónde se almacenan las credenciales en la arquitectura APX?",
        answer: "Se almacenan en Vault.",
      },
      {
        prompt:
          "Para leer los archivos ROP almacenados en Epsilon, ¿qué herramienta CLI se recomienda utilizar?",
        answer: "Se recomienda usar la Ether CLI.",
      },
      {
        prompt:
          "En APX es posible acceder a las fechas contables. El método `this.getAccountingDateCurrentDate()` devuelve la fecha contable ____.",
        answer: "actual",
      },
      {
        prompt:
          "¿Qué librería de infraestructura de APX permite a las aplicaciones obtener la descripción de un literal de base de datos?",
        answer: "La librería QWYPR051.",
      },
      {
        prompt:
          "¿Para qué se utiliza la librería de infraestructura APX QWYPR053?",
        answer:
          "Permite a las aplicaciones insertar o actualizar descripciones de literales de bases de datos.",
      },
      {
        prompt:
          "La librería de infraestructura APX QWYPRX21 permite obtener información de las tablas de ____.",
        answer: "Canal-Medio-Servicio",
      },
      {
        prompt:
          "¿Qué librería de infraestructura APX se utiliza para validar el nivel de contenido de un usuario o lista de usuarios?",
        answer: "La librería QWYPRX25.",
      },
      {
        prompt:
          "La librería de infraestructura QWYPRX62 se utiliza para realizar operaciones relacionadas con el ____.",
        answer: "IBAN (cálculo y validación)",
      },
      {
        prompt:
          "¿Qué librería de arquitectura replica la funcionalidad de la rutina HOST QPIPRX80 para consultar tablas SGAT?",
        answer: "La librería QWYPRX80.",
      },
      {
        prompt:
          "En la nueva forma de realizar tests unitarios en APX, se recomienda dejar de usar el contexto de Spring y utilizar _____ en su lugar.",
        answer: "Mockito",
      },
      {
        prompt:
          "El comando `apx check --test --repair` en la CLI de APX se utiliza para...",
        answer:
          "Presentar un esqueleto de la clase de prueba unitaria y ayudar a reparar la estructura de pruebas existente.",
      },
      {
        prompt:
          "¿Qué es una Unidad de Implementación (UD) en el contexto de APX?",
        answer:
          "Es una agrupación de componentes APX (transacción, librería, DTO) que siguen el mismo ciclo de vida y se implementan en bloque.",
      },
      {
        prompt:
          "En el modelo de branching de APX, ¿desde qué rama se originan las ramas de `feature`?",
        answer: "Se originan desde la rama `develop`.",
      },
      {
        prompt:
          "Para corregir un error en una versión ya desplegada en Producción, ¿qué tipo de rama se debe crear según el modelo de APX?",
        answer: "Se debe crear una rama de `hotfix`.",
      },
      {
        prompt:
          "¿Qué herramienta se utiliza para la implementación de recursos en los diferentes entornos de APX?",
        answer: "La Consola Ether.",
      },
      {
        prompt:
          "Para poder desplegar en el entorno de Producción (PRO), la versión de lanzamiento debe haber sido creada a partir de una ____ y no de una rama.",
        answer: "etiqueta (tag)",
      },
      {
        prompt:
          "¿Qué comando de la APX CLI se utiliza para verificar la versión instalada?",
        answer: "`apx version`.",
      },
      {
        prompt:
          "¿Qué comando de la APX CLI se utiliza para crear el esqueleto de una nueva transacción?",
        answer: "`apx init trx`.",
      },
      {
        prompt: "El comando `apx add dep` se utiliza para...",
        answer:
          "Agregar una dependencia (como un DTO o una librería) a un componente APX.",
      },
      {
        prompt:
          "Para agregar la utilidad de acceso a base de datos a una librería, se debe ejecutar el comando `apx add util -n _____`.",
        answer: "jdbc",
      },
      {
        prompt:
          "¿Qué comando de la APX CLI se utiliza para desplegar un componente en el entorno local?",
        answer: "`apx deploy local`.",
      },
      {
        prompt:
          "Para enviar una solicitud a una transacción en el entorno local usando la APX CLI, ¿qué comando se debe utilizar?",
        answer: "`apx send req`.",
      },
      {
        prompt:
          "Según las directrices de codificación de APX, todo el desarrollo (clases, métodos, comentarios) debe estar definido en ____.",
        answer: "inglés",
      },
      {
        prompt:
          "La creación y gestión de hilos por parte de las aplicaciones en APX está ____.",
        answer: "prohibida",
      },
      {
        prompt:
          "La comunicación desde APX hacia servicios externos (NO APX) debe realizarse exclusivamente a través de la utilidad ____.",
        answer: "API Connector (APIConnector)",
      },
    ],
  },
  {
    id: "aws",
    name: "Aws",
    cards: [
      {
        prompt:
          "¿Qué servicio de gestión de datos de AWS se puede utilizar para publicar datos y hacerlos disponibles a través de una aplicación web personalizada?",
        answer: "Amazon DataZone.",
      },
      {
        prompt:
          "Amazon EMR es la plataforma de big data en la nube para procesar grandes cantidades de datos utilizando herramientas de código abierto como _____.",
        answer: "Apache Spark, Apache Hive y Presto.",
      },
      {
        prompt:
          "¿Qué servicio de análisis de AWS está diseñado específicamente para la industria de servicios financieros (FSI)?",
        answer: "Amazon FinSpace.",
      },
      {
        prompt:
          "Amazon Kinesis Data Streams es un servicio de streaming de datos en tiempo real que puede capturar continuamente _____ de datos por segundo desde cientos de miles de fuentes.",
        answer: "gigabytes.",
      },
      {
        prompt:
          "¿Cuál es el servicio de inteligencia de negocios (BI) rápido y basado en la nube que facilita la entrega de información a todos en una organización?",
        answer: "Quick Suite (o QuickSight).",
      },
      {
        prompt:
          "¿Qué servicio web de AWS ayuda a procesar y mover datos de manera fiable entre diferentes servicios de cómputo y almacenamiento de AWS a intervalos especificados?",
        answer: "AWS Data Pipeline.",
      },
      {
        prompt:
          "¿Cómo se llama el servicio que facilita la configuración de un repositorio de datos seguro, centralizado y curado en días?",
        answer: "AWS Lake Formation.",
      },
      {
        prompt:
          "¿Cuál es el nivel de certificación de AWS ideal para quienes son nuevos en la computación en la nube y cubre conceptos esenciales?",
        answer: "Nivel Fundacional (Foundational).",
      },
      {
        prompt:
          "La certificación AWS Certified Cloud Practitioner requiere tener al menos _____ de experiencia industrial básica en el dominio de AWS Cloud.",
        answer: "6 meses.",
      },
      {
        prompt:
          "¿Qué nivel de certificación de AWS requiere más de 2 años de experiencia diseñando arquitecturas o gestionando entornos de AWS?",
        answer: "Nivel Profesional (Professional).",
      },
      {
        prompt:
          "Las certificaciones de _____ requieren un profundo conocimiento del dominio elegido, ya que el nivel del examen es bastante más alto.",
        answer: "Especialidad (Specialty).",
      },
      {
        prompt:
          "Según AWS, su infraestructura es hasta _____ veces más eficiente energéticamente que los centros de datos locales tradicionales.",
        answer: "4.1.",
      },
      {
        prompt:
          "¿Qué métrica se utiliza para medir la eficiencia de un centro de datos, donde una puntuación más baja indica mayor eficiencia?",
        answer:
          "Efectividad del Uso de Energía (Power Usage Effectiveness - PUE).",
      },
      {
        prompt:
          "El PUE global de los centros de datos de AWS en 2024 fue de 1.15, mejor que el promedio de la industria de la nube pública de _____.",
        answer: "1.25.",
      },
      {
        prompt:
          "¿Qué métrica mide el volumen de agua extraída por kWh de carga de TI dentro de un centro de datos?",
        answer:
          "Efectividad del Uso del Agua (Water Usage Effectiveness - WUE).",
      },
      {
        prompt:
          "¿Qué tipo de instancias de Amazon EC2, basadas en procesadores de AWS, utilizan hasta un 60% menos de energía que instancias comparables para el mismo rendimiento?",
        answer: "Instancias basadas en AWS Graviton.",
      },
      {
        prompt:
          "En 2024, AWS comenzó a hacer la transición a _____ para alimentar los generadores de respaldo en sus centros de datos, reduciendo las emisiones de gases de efecto invernadero hasta en un 90%.",
        answer: "aceite vegetal hidrotratado (HVO) o diésel renovable.",
      },
      {
        prompt:
          "AWS se ha comprometido a ser _____ para 2030, devolviendo más agua a las comunidades de la que consume.",
        answer: "agua positivo (water positive).",
      },
      {
        prompt:
          "¿Cuál es el servicio web de AWS que proporciona capacidad de cómputo segura y de tamaño variable (servidores virtuales) en la nube?",
        answer: "Amazon Elastic Compute Cloud (Amazon EC2).",
      },
      {
        prompt:
          "AWS _____ es una oferta de infraestructura de AWS optimizada para aplicaciones de computación de borde móvil en la red 5G.",
        answer: "Wavelength.",
      },
      {
        prompt:
          "¿Qué oferta de nube integrada, desarrollada conjuntamente por AWS y VMware, permite a las organizaciones migrar y extender sus entornos locales basados en vSphere a la nube de AWS?",
        answer: "VMware Cloud on AWS.",
      },
      {
        prompt:
          "El modelo de precios de AWS donde los clientes solo pagan por los servicios que consumen, sin costos iniciales ni compromisos a largo plazo, se llama _____.",
        answer: "pago por uso (pay-as-you-go).",
      },
      {
        prompt:
          "¿Qué herramienta oficial de AWS proporciona a los usuarios un pronóstico detallado de sus posibles costos en la nube?",
        answer: "AWS Pricing Calculator.",
      },
      {
        prompt:
          "En AWS, el pilar de optimización de costos que implica hacer coincidir los tipos y tamaños de las instancias con los requisitos reales de la carga de trabajo se conoce como _____.",
        answer: "ajuste de tamaño (Right-Sizing).",
      },
      {
        prompt:
          "Para cargas de trabajo predecibles, ¿qué opciones de precios de AWS ofrecen descuentos de hasta el 72% a cambio de un compromiso de uso?",
        answer: "Savings Plans o Instancias Reservadas.",
      },
      {
        prompt:
          "¿Qué tipo de instancias de Amazon EC2 permiten ejecutar cargas de trabajo tolerantes a fallos con descuentos de hasta el 90% sobre el precio bajo demanda?",
        answer: "Instancias Spot de Amazon EC2.",
      },
      {
        prompt:
          "El servicio _____ proporciona recomendaciones para optimizar el uso de sus recursos de AWS, como la identificación de instancias EC2 inactivas.",
        answer: "AWS Cost Explorer o AWS Trusted Advisor.",
      },
      {
        prompt:
          "¿Cuál es la cuota de mercado de Amazon Web Services (AWS) en la infraestructura de nube global a partir del segundo trimestre de 2025?",
        answer: "30%.",
      },
      {
        prompt:
          "En el mercado de infraestructura en la nube, Microsoft Azure ocupa el segundo lugar con una cuota de mercado del _____ en el segundo trimestre de 2025.",
        answer: "20%.",
      },
      {
        prompt:
          "¿Qué servicio de AWS para ETL (Extract, Transform, Load) sin servidor se utiliza para preparar y transformar datos para el análisis?",
        answer: "AWS Glue.",
      },
      {
        prompt:
          "¿Cuál es el servicio de AWS para consultar datos de forma interactiva en S3 y otras fuentes utilizando SQL estándar?",
        answer: "Amazon Athena.",
      },
      {
        prompt:
          "El servicio de AWS para construir, entrenar y desplegar modelos de aprendizaje automático se llama _____.",
        answer: "Amazon SageMaker.",
      },
      {
        prompt:
          "La integración de Amazon QuickSight con Amazon Q permite a los usuarios realizar consultas de datos en _____.",
        answer: "lenguaje natural.",
      },
      {
        prompt:
          "A finales de 2025, la nube de AWS abarca 120 Zonas de Disponibilidad dentro de _____ Regiones Geográficas.",
        answer: "38.",
      },
      {
        prompt:
          "Las _____ son implementaciones de infraestructura de AWS que integran servicios de cómputo y almacenamiento de AWS dentro de los centros de datos de los proveedores de servicios de comunicaciones en el borde de la red 5G.",
        answer: "Zonas de Wavelength (Wavelength Zones).",
      },
      {
        prompt:
          "Para una experiencia híbrida verdaderamente consistente, ¿qué servicio permite ejecutar la infraestructura y los servicios de AWS en las instalaciones?",
        answer: "AWS Outposts.",
      },
      {
        prompt:
          "Definición: La columna vertebral de los servicios en la nube de AWS, que comprende cientos de centros de datos estratégicamente ubicados en todo el mundo.",
        answer: "Infraestructura Global de AWS (AWS Global Infrastructure).",
      },
      {
        prompt:
          "Una Zona de Disponibilidad (AZ) de AWS consiste en uno o más _____ con energía, refrigeración y seguridad física independientes.",
        answer: "centros de datos discretos.",
      },
      {
        prompt:
          "¿Qué componentes de la infraestructura de AWS acercan los servicios principales de AWS a las principales ciudades para reducir la latencia para los usuarios finales?",
        answer: "Zonas Locales (Local Zones).",
      },
      {
        prompt:
          "Los _____ sirven como puntos finales de AWS para el almacenamiento en caché de contenido y son utilizados por servicios como CloudFront para optimizar la entrega de contenido.",
        answer: "Puntos de Presencia o Ubicaciones de Borde (Edge Locations).",
      },
      {
        prompt:
          "¿Qué servicio de AWS IoT facilita la creación de gemelos digitales de sistemas del mundo real como edificios, fábricas o líneas de producción?",
        answer: "AWS IoT TwinMaker.",
      },
      {
        prompt:
          "A partir del 15 de julio de 2025, los nuevos clientes de AWS reciben hasta _____ en créditos de AWS Free Tier.",
        answer: "$200.",
      },
      {
        prompt:
          "¿Qué servicio de AWS IoT facilita la recolección, almacenamiento, organización y monitoreo de datos de equipos industriales a escala?",
        answer: "AWS IoT SiteWise.",
      },
      {
        prompt:
          "El modelo de precios _____ de AWS le permite adaptar su negocio según la necesidad y no según los pronósticos, reduciendo el riesgo de sobreaprovisionamiento.",
        answer: "pago por uso (pay-as-you-go).",
      },
      {
        prompt:
          "¿Qué servicio de AWS ofrece bases de datos relacionales administradas con motores comunes como MySQL, PostgreSQL y SQL Server?",
        answer: "Amazon RDS (Relational Database Service).",
      },
      {
        prompt:
          "Para aplicaciones que necesitan una latencia constante de milisegundos de un solo dígito, ¿qué base de datos NoSQL totalmente administrada ofrece AWS?",
        answer: "Amazon DynamoDB.",
      },
      {
        prompt:
          "El servicio _____ es una red de entrega de contenido (CDN) global para acelerar la distribución de contenido web estático y dinámico.",
        answer: "Amazon CloudFront.",
      },
      {
        prompt: "AWS Shield protege contra ataques de _____.",
        answer: "Denegación de Servicio Distribuido (DDoS).",
      },
      {
        prompt:
          "¿Qué servicio permite el control seguro y centralizado del acceso a los recursos de AWS mediante la creación de usuarios, grupos y roles?",
        answer: "AWS Identity & Access Management (IAM).",
      },
      {
        prompt:
          "El enfoque estratégico de AWS para 2025 posiciona la _____ como la base central de la infraestructura moderna.",
        answer: "inteligencia artificial (AI).",
      },
      {
        prompt:
          '¿Qué servicio gestionado de AWS proporciona acceso a modelos de base (FMs) a través de una API, incluyendo la familia "Nova" de Amazon y modelos de terceros?',
        answer: "Amazon Bedrock.",
      },
      {
        prompt:
          "En re:Invent 2025, AWS anunció _____, una nueva clase de agentes de IA que pueden trabajar de forma autónoma durante horas o días.",
        answer: "agentes de frontera (frontier agents).",
      },
      {
        prompt:
          "¿Cuál es el nuevo servicio anunciado en re:Invent 2025 que simplifica la personalización de modelos para construir agentes de IA más rápidos y eficientes?",
        answer:
          "Ajuste Fino por Refuerzo (Reinforcement Fine Tuning - RFT) en Amazon Bedrock.",
      },
      {
        prompt:
          "Amazon Bedrock AgentCore es una plataforma avanzada para construir y desplegar _____ de forma segura a escala.",
        answer: "agentes.",
      },
      {
        prompt:
          "La disponibilidad general de _____ permite a los sistemas de IA almacenar y consultar vectores de forma nativa en Amazon S3 para la búsqueda semántica.",
        answer: "Amazon S3 Vectors.",
      },
      {
        prompt:
          "En re:Invent 2025, AWS anunció _____ para implementar infraestructura de IA de AWS totalmente gestionada en los centros de datos de los clientes.",
        answer: "AWS AI Factories.",
      },
      {
        prompt:
          "¿Qué nueva oferta de soporte de AWS combina la velocidad de la IA con la experiencia de los ingenieros de AWS para proporcionar tiempos de respuesta más rápidos?",
        answer:
          "Nuevos y mejorados planes de AWS Support (por ejemplo, Business Support+).",
      },
      {
        prompt:
          "AWS _____ en vista previa multicloud está diseñado para simplificar la creación de conexiones con ancho de banda dedicado entre AWS y otros proveedores de servicios, comenzando con Google Cloud.",
        answer: "Interconnect.",
      },
      {
        prompt:
          "El servicio AWS IoT _____ crea visualizaciones digitales utilizando mediciones y análisis de una variedad de sensores, cámaras y aplicaciones empresariales del mundo real.",
        answer: "TwinMaker.",
      },
      {
        prompt:
          "Las _____ son ideales para aplicaciones de baja latencia como el streaming en vivo o la realidad aumentada, acercando las aplicaciones a los usuarios finales.",
        answer: "Zonas Locales de AWS (AWS Local Zones).",
      },
      {
        prompt:
          "¿Qué servicio de AWS proporciona herramientas para construir redes blockchain únicas y acceder a soluciones de socios validadas?",
        answer: "Blockchain on AWS.",
      },
      {
        prompt:
          "En el tercer trimestre de 2025, el mercado global de infraestructura en la nube alcanzó los _____ mil millones de dólares.",
        answer: "$102.6.",
      },
      {
        prompt:
          "La cuota de mercado combinada de AWS, Microsoft Azure y Google Cloud en el tercer trimestre de 2025 fue del _____.",
        answer: "66%.",
      },
      {
        prompt:
          "Amazon _____ es una base de datos relacional nativa de la nube que ofrece de 3 a 5 veces el rendimiento de las alternativas de código abierto.",
        answer: "Aurora.",
      },
      {
        prompt:
          "Las bases de datos _____ de AWS ofrecen opciones sin servidor que eliminan la necesidad de gestionar la capacidad al escalar instantáneamente bajo demanda.",
        answer: "totalmente gestionadas.",
      },
      {
        prompt:
          "¿Qué servicio de AWS para big data proporciona un marco de Hadoop gestionado para procesar enormes volúmenes de datos de manera eficiente?",
        answer: "Amazon EMR.",
      },
      {
        prompt:
          "El servicio AWS _____ es un sistema operativo en tiempo real, de código abierto y neutral en la nube para dispositivos con recursos limitados como microcontroladores.",
        answer: "FreeRTOS.",
      },
      {
        prompt:
          "¿Qué servicio de AWS permite el procesamiento local, la mensajería y la inferencia de ML en el borde, conectando de forma segura los dispositivos de borde a los servicios de AWS?",
        answer: "AWS IoT Greengrass.",
      },
      {
        prompt:
          "Para el análisis de datos, ¿qué servicio sin servidor permite analizar datos en Amazon S3 usando SQL estándar?",
        answer: "Amazon Athena.",
      },
      {
        prompt:
          "¿Cuál es el almacén de datos en la nube de AWS que ofrece un rendimiento de precio hasta tres veces mejor que otras alternativas en la nube?",
        answer: "Amazon Redshift.",
      },
      {
        prompt:
          "AWS _____ aprovecha el aprendizaje automático para descubrir y clasificar datos sensibles almacenados en AWS.",
        answer: "Macie.",
      },
      {
        prompt:
          "¿Qué servicio de AWS realiza evaluaciones de seguridad automatizadas de las instancias EC2 para identificar vulnerabilidades?",
        answer: "Amazon Inspector.",
      },
      {
        prompt:
          "Para el gobierno de recursos, AWS _____ rastrea las configuraciones de los recursos y los cambios a lo largo del tiempo.",
        answer: "Config.",
      },
      {
        prompt:
          "El servicio _____ crea registros de eventos de la actividad del usuario y las llamadas a la API, lo que apoya el análisis de seguridad y la auditoría de cumplimiento.",
        answer: "AWS CloudTrail.",
      },
      {
        prompt:
          "¿Qué servicio inspecciona los entornos de AWS y proporciona recomendaciones sobre optimización de costos, rendimiento y seguridad?",
        answer: "AWS Trusted Advisor.",
      },
      {
        prompt:
          "La quinta generación del chip de CPU de AWS, anunciada en re:Invent 2025 y que ofrece el mejor rendimiento de precio, se llama _____.",
        answer: "Graviton5.",
      },
      {
        prompt:
          "Los _____ son los chips de AWS diseñados específicamente para el entrenamiento de aprendizaje profundo de alto rendimiento de modelos de IA generativa.",
        answer: "aceleradores AWS Trainium.",
      },
      {
        prompt:
          "En AWS, una _____ es un área geográfica que contiene múltiples centros de datos físicos conocidos como Zonas de Disponibilidad (AZs).",
        answer: "Región.",
      },
      {
        prompt:
          "¿Qué servicio de AWS permite a los desarrolladores desplegar y escalar aplicaciones y servicios web sin preocuparse por la infraestructura subyacente?",
        answer: "AWS Elastic Beanstalk.",
      },
      {
        prompt:
          "¿Cuál es la base de datos de grafos de AWS utilizada para casos de uso como detección de fraude, redes sociales y motores de recomendación?",
        answer: "Amazon Neptune.",
      },
      {
        prompt:
          "La solución de AWS que permite ejecutar funciones de Lambda en cómputo de EC2, manteniendo la simplicidad sin servidor, se llama _____.",
        answer: "AWS Lambda Managed Instances.",
      },
      {
        prompt:
          "La nueva capacidad de AWS Lambda que permite construir aplicaciones que coordinan múltiples pasos de manera fiable durante largos períodos se llama _____.",
        answer: "AWS Lambda Durable Functions.",
      },
      {
        prompt:
          "Para modernizar el código, el servicio impulsado por IA que aprende los patrones de una organización y automatiza las transformaciones se llama _____.",
        answer: "AWS Transform custom.",
      },
      {
        prompt:
          "¿Qué servicio de DNS web escalable de AWS se utiliza para enrutar a los usuarios finales a aplicaciones de Internet?",
        answer: "Amazon Route 53.",
      },
      {
        prompt:
          "El servicio de almacenamiento de objetos de AWS conocido por su escalabilidad, durabilidad del 99.999999999% (11 nueves) y bajo costo es _____.",
        answer: "Amazon S3 (Simple Storage Service).",
      },
      {
        prompt:
          "Para el archivado de datos a largo plazo y de bajo costo, ¿qué servicio de almacenamiento ofrece AWS?",
        answer: "Amazon S3 Glacier.",
      },
      {
        prompt:
          "AWS proporciona una conexión de red dedicada desde sus instalaciones a AWS a través del servicio _____.",
        answer: "AWS Direct Connect.",
      },
      {
        prompt:
          "¿Qué servicio de AWS proporciona control centralizado sobre las claves criptográficas utilizadas para proteger sus datos?",
        answer: "AWS KMS (Key Management Service).",
      },
      {
        prompt:
          "La familia de modelos de base de Amazon, que ofrece un rendimiento de precio líder en la industria, se llama _____.",
        answer: "Amazon Nova.",
      },
      {
        prompt:
          "¿Qué nuevo agente de AWS, en vista previa, actúa como un ingeniero de guardia autónomo para acelerar la respuesta a incidentes?",
        answer: "AWS DevOps Agent.",
      },
      {
        prompt:
          "El nuevo agente de seguridad de AWS, _____, asegura las aplicaciones de forma proactiva desde el diseño hasta el despliegue mediante análisis de código impulsado por IA.",
        answer: "AWS Security Agent.",
      },
      {
        prompt:
          "Amazon _____ es la herramienta de IDE de ML basada en la web todo en uno que proporciona aplicaciones para todas las tareas comunes de ML.",
        answer: "SageMaker Studio.",
      },
      {
        prompt:
          "¿Cuál es la interfaz de ML sin código dentro de SageMaker que permite a los usuarios de negocio construir modelos de ML sin escribir código?",
        answer: "Amazon SageMaker Canvas.",
      },
      {
        prompt:
          "Amazon SageMaker _____ es un centro que proporciona modelos de ML entrenados y preconfigurados para ajustarlos y desplegarlos sin problemas.",
        answer: "JumpStart.",
      },
      {
        prompt:
          "¿Cuál es el servicio de base de datos de series temporales de AWS, eficiente para aplicaciones de IoT, DevOps y telemetría industrial?",
        answer: "Amazon Timestream.",
      },
      {
        prompt:
          "El servicio de base de datos NoSQL de tipo columna ancha de AWS, compatible con Apache Cassandra, se llama _____.",
        answer: "Amazon Keyspaces.",
      },
      {
        prompt:
          "Para el 2024, Amazon igualó el 100% de la electricidad consumida por sus operaciones globales con fuentes de _____.",
        answer: "energía renovable.",
      },
      {
        prompt:
          "¿Cuál es el nivel de certificación de AWS que se basa en el nivel de asociado y requiere diseñar arquitecturas más complejas?",
        answer: "AWS Certified Solutions Architect – Professional.",
      },
      {
        prompt:
          "La plataforma _____ ofrece una interfaz de usuario unificada para la mayoría de los servicios de AWS.",
        answer: "AWS Management Console.",
      },
      {
        prompt:
          "¿Qué servicio de AWS se utiliza para ejecutar contenedores en una infraestructura gestionada por el cliente?",
        answer: "Amazon ECS Anywhere.",
      },
      {
        prompt:
          "Para almacenar, gestionar y desplegar imágenes de contenedores, AWS ofrece el servicio _____.",
        answer: "Amazon Elastic Container Registry (ECR).",
      },
      {
        prompt:
          "¿Cuál es la base de datos relacional de AWS que reduce el TCO en un 34% y tiene un retorno de la inversión de 5 meses, excluyendo Aurora?",
        answer: "Amazon RDS.",
      },
      {
        prompt:
          "¿Qué servicio de caché en memoria de AWS, según IDC, tiene un ROI a tres años del 449%?",
        answer: "Amazon ElastiCache.",
      },
      {
        prompt:
          "Las instancias _____ de AWS están diseñadas para ser hasta un 40% más eficientes energéticamente que los chips Trainium2.",
        answer: "AWS Trainium3.",
      },
      {
        prompt:
          "Las instancias _____ ofrecen hasta un 50% de mejor rendimiento por vatio en comparación con instancias EC2 comparables para inferencia.",
        answer: "basadas en Inferentia2.",
      },
      {
        prompt:
          "En el tercer trimestre de 2025, la tasa de crecimiento interanual de los ingresos de AWS se reaceleró al _____.",
        answer: "20%.",
      },
      {
        prompt:
          "Los servicios de nube específicos de GenAI experimentaron un crecimiento explosivo, expandiéndose entre un _____ en el segundo trimestre de 2025.",
        answer: "140% y 180%.",
      },
      {
        prompt:
          "Para el 2025, AWS ofrece más de _____ servicios completamente funcionales.",
        answer: "200.",
      },
      {
        prompt:
          "La certificación _____ se centra en asegurar los entornos de AWS y es ideal para profesionales de la seguridad.",
        answer: "AWS Certified Security – Specialty.",
      },
      {
        prompt:
          "El servicio de AWS para la orquestación y gestión de recursos en la nube para Kubernetes que elimina el mantenimiento de la infraestructura es _____.",
        answer: "Amazon EKS Capabilities.",
      },
      {
        prompt:
          "¿Qué nuevo modelo de precios de AWS ayuda a mantener la eficiencia de costos mientras proporciona flexibilidad con los servicios de bases de datos?",
        answer: "Database Savings Plans.",
      },
      {
        prompt:
          "Amazon _____ mejora el rendimiento de la base de datos de vectores y el costo con aceleración de GPU y auto-optimización.",
        answer: "OpenSearch Service.",
      },
      {
        prompt:
          "¿Qué servicio de AWS permite el acceso a los datos de Amazon FSx for NetApp ONTAP como si estuvieran en S3, facilitando la integración con servicios de IA?",
        answer: "Puntos de Acceso de Amazon S3 (Amazon S3 Access Points).",
      },
      {
        prompt: "¿Qué es Amazon Bedrock Studio?",
        answer:
          "Una interfaz web que facilita a los desarrolladores la colaboración y construcción de aplicaciones de IA generativa.",
      },
      {
        prompt:
          "La versión 2023 de Amazon Linux (AL2023) mejora la postura de seguridad con políticas preconfiguradas y _____ habilitado por defecto.",
        answer: "IMDSv2 (Instance Metadata Service Version 2).",
      },
      {
        prompt:
          "¿Qué servicio de AWS permite ejecutar trabajos de procesamiento por lotes totalmente gestionados a cualquier escala?",
        answer: "AWS Batch.",
      },
      {
        prompt: "¿Qué permite AWS Auto Scaling?",
        answer:
          "Ajustar automáticamente la capacidad de los recursos de cómputo y bases de datos para satisfacer la demanda.",
      },
      {
        prompt:
          "El servicio AWS _____ unifica las estadísticas de carbono para el uso de la nube e incluye capacidades de informes de Alcance 3.",
        answer: "Customer Carbon Footprint Tool (CCFT).",
      },
      {
        prompt:
          "¿Qué programa de AWS permite a las organizaciones acceder al entrenamiento de modelos Nova para construir sus propios modelos de frontera personalizados?",
        answer: "Amazon Nova Forge.",
      },
      {
        prompt:
          "¿Qué nuevo agente de Amazon Nova, ahora disponible de forma general, ayuda a los desarrolladores a construir agentes de IA que automatizan tareas basadas en navegador con más del 90% de fiabilidad?",
        answer: "Amazon Nova Act.",
      },
    ],
  },
  {
    id: "azure",
    name: "Azure",
    cards: [
      {
        prompt:
          "¿Qué porcentaje del mercado global de infraestructura en la nube poseía Amazon Web Services (AWS) en el segundo trimestre de 2025?",
        answer:
          "AWS poseía el 30% del mercado global de infraestructura en la nube.",
      },
      {
        prompt:
          "¿Cuál era la cuota de mercado de Microsoft Azure en el mercado de infraestructura en la nube en el segundo trimestre de 2025?",
        answer: "Microsoft Azure tenía una cuota de mercado del 20%.",
      },
      {
        prompt:
          "¿Qué cuota de mercado tenía Google Cloud en la infraestructura global de la nube en el segundo trimestre de 2025?",
        answer: "Google Cloud tenía una cuota de mercado del 13%.",
      },
      {
        prompt:
          "En conjunto, ¿qué porcentaje del mercado de infraestructura en la nube controlaban los 'Tres Grandes' (AWS, Azure y Google Cloud) en el segundo trimestre de 2025?",
        answer: "Controlaban el 63% del mercado.",
      },
      {
        prompt:
          "¿A cuánto ascendieron los ingresos del mercado global de infraestructura en la nube en el segundo trimestre de 2025?",
        answer: "Los ingresos alcanzaron los 99 mil millones de dólares.",
      },
      {
        prompt:
          "¿Cuál fue el crecimiento interanual del mercado de infraestructura en la nube en el segundo trimestre de 2025?",
        answer: "El mercado creció un 25% interanual.",
      },
      {
        prompt:
          "¿En qué porcentaje crecieron los servicios en la nube específicos de GenAI en el segundo trimestre de 2025?",
        answer:
          "Los servicios en la nube específicos de GenAI crecieron un 160%.",
      },
      {
        prompt: "Término: Azure Kubernetes Service (AKS)",
        answer:
          "Definición: Una plataforma de Kubernetes gestionada para desplegar y administrar aplicaciones en contenedores en Azure.",
      },
      {
        prompt:
          "¿Qué servicio de Azure permite ejecutar contenedores de Linux o Windows sin necesidad de crear máquinas virtuales?",
        answer: "Azure Container Instances (ACI).",
      },
      {
        prompt:
          "El servicio _____ es una solución de almacenamiento de objetos en Azure para almacenar grandes volúmenes de datos no estructurados como texto e imágenes.",
        answer: "Azure Blob Storage",
      },
      {
        prompt:
          "¿Qué servicio de red de Azure es el componente fundamental para una red privada y permite la comunicación entre recursos de Azure?",
        answer: "Azure Virtual Network (VNet).",
      },
      {
        prompt: "¿Cuál es el propósito de Azure Arc?",
        answer:
          "Permite gestionar y gobernar servidores, clústeres de Kubernetes y aplicaciones desde una plataforma unificada en entornos multinube, locales y de borde.",
      },
      {
        prompt: "Término: Azure DevOps",
        answer:
          "Definición: Un conjunto de servicios que agiliza el ciclo de vida del desarrollo de software mejorando la colaboración entre los equipos de desarrollo y operaciones.",
      },
      {
        prompt:
          "¿Qué servicio dentro de Azure DevOps proporciona repositorios Git para el control de código fuente?",
        answer: "Azure Repos.",
      },
      {
        prompt:
          "El servicio de Azure DevOps que soporta la integración y entrega continuas (CI/CD) se llama _____.",
        answer: "Azure Pipelines",
      },
      {
        prompt:
          "¿Qué certificación de Azure está diseñada para validar el conocimiento fundamental de los servicios en la nube como redes, almacenamiento y seguridad?",
        answer: "AZ-900: Microsoft Azure Fundamentals.",
      },
      {
        prompt: "Término: Azure AI Foundry",
        answer:
          "Definición: Una plataforma de IA de extremo a extremo en Azure que ofrece modelos, herramientas y capacidades de monitoreo para diseñar y escalar aplicaciones de IA.",
      },
      {
        prompt:
          "¿Qué nuevo servicio de base de datos NoSQL totalmente gestionado, anunciado en Ignite 2025 y ahora disponible de forma general, está diseñado para flexibilidad híbrida y multinube?",
        answer: "Azure DocumentDB.",
      },
      {
        prompt:
          "Microsoft SQL Server 2025, ahora disponible de forma general, permite la replicación de datos a Microsoft OneLake mediante la duplicación de bases de datos en _____.",
        answer: "Microsoft Fabric",
      },
      {
        prompt:
          "¿Cuál es el nombre del nuevo servicio de base de datos PostgreSQL en la nube de Azure, en vista previa privada, diseñado para aplicaciones de misión crítica?",
        answer: "Azure HorizonDB.",
      },
      {
        prompt:
          "¿Qué nueva capacidad de Azure App Service, actualmente en vista previa, permite mover aplicaciones web .NET a la nube con cambios mínimos de configuración?",
        answer: "Managed Instance en Azure App Service.",
      },
      {
        prompt:
          "La última generación de _____ admite un rendimiento de almacenamiento remoto de hasta 20 Gbps y un ancho de banda de red de hasta 400 Gbps.",
        answer: "Azure Boost",
      },
      {
        prompt: "¿Qué es Azure Cobalt 200?",
        answer:
          "Es la CPU Cobalt de nueva generación de Azure, basada en Arm y diseñada para potenciar aplicaciones nativas en la nube.",
      },
      {
        prompt:
          "¿Qué nueva capacidad de Microsoft Entra, en vista previa, proporciona una solución de nivel empresarial para prevenir la proliferación de agentes y proteger sus identidades?",
        answer: "Microsoft Entra Agent ID.",
      },
      {
        prompt: "Término: Azure Machine Learning studio",
        answer:
          "Definición: Un recurso de alto nivel que proporciona un lugar centralizado para que científicos de datos y desarrolladores trabajen con artefactos para construir y desplegar modelos de aprendizaje automático.",
      },
      {
        prompt:
          "El servicio de Azure que se integra con Microsoft Copilot Studio para crear bots de IA de bajo código se llama _____.",
        answer: "Azure AI Bot Service",
      },
      {
        prompt:
          "Con más de 60 regiones en todo el mundo, Azure garantiza que los datos cumplan con los requisitos locales de cumplimiento y regulatorios, una característica conocida como _____.",
        answer: "residencia de datos (data residency)",
      },
      {
        prompt:
          "¿Cómo se llama la capacidad de Azure que permite ejecutar algunos recursos en servidores propios mientras se utiliza la nube para otros?",
        answer: "Capacidad de nube híbrida.",
      },
      {
        prompt:
          "La certificación AI-102 de Microsoft corresponde al rol de _____.",
        answer: "Azure AI Engineer Associate",
      },
      {
        prompt:
          "¿Qué certificación está diseñada para el rol de Microsoft Azure Solutions Architect Expert?",
        answer: "AZ-305: Microsoft Azure Solutions Architect Expert.",
      },
      {
        prompt:
          "El servicio _____ proporciona máquinas virtuales IaaS y artefactos preconfigurados en entornos de laboratorio para desarrollo y pruebas.",
        answer: "Azure DevTest Labs",
      },
      {
        prompt:
          "¿Qué dos servicios principales ofrece Azure para automatizar cargas de trabajo y reducir errores operativos?",
        answer: "Azure Automation y Azure Logic Apps.",
      },
      {
        prompt:
          "¿Cómo se llama la capa universal de contexto de Microsoft que combina inteligencia de Work IQ, Fabric IQ y Foundry IQ para agentes de IA?",
        answer:
          "Se trata de una nueva capa de contexto universal, no se le da un nombre único específico.",
      },
      {
        prompt: "Término: Fabric IQ",
        answer:
          "Definición: Una capacidad en vista previa que extiende la capa semántica unificada de Power BI a las operaciones de negocio para proporcionar una vista conectada en tiempo real de la empresa.",
      },
      {
        prompt: "¿Qué es Foundry IQ?",
        answer:
          "Es la nueva generación de generación aumentada por recuperación (RAG), que ofrece una forma más inteligente de conectar agentes con datos desde una única base de conocimiento.",
      },
      {
        prompt:
          "En el contexto de Microsoft Foundry, ¿qué son las herramientas de Protocolo de Contexto de Modelo (MCP)?",
        answer:
          "Son un catálogo unificado de herramientas que permiten a los desarrolladores enriquecer agentes con contexto de negocio en tiempo real y lógica personalizada.",
      },
      {
        prompt:
          "El servicio _____ ofrece agentes alojados, memoria incorporada y flujos de trabajo de múltiples agentes en una plataforma gestionada e interoperable.",
        answer: "Foundry Agent Service",
      },
      {
        prompt:
          "¿Qué marco de código abierto de Microsoft unifica Semantic Kernel y AutoGen para un desarrollo de agentes unificado y resiliente?",
        answer: "Microsoft Agent Framework.",
      },
      {
        prompt:
          "Microsoft mantiene entornos de Azure distintos para necesidades regulatorias específicas, como Commercial Cloud, _____ y China Cloud.",
        answer: "US Government Cloud",
      },
      {
        prompt:
          "¿Qué estándar de cumplimiento regional de Singapur figura en las ofertas de cumplimiento de Microsoft Azure?",
        answer: "Singapore MTCS Level 3.",
      },
      {
        prompt:
          "¿Qué estándar de cumplimiento relacionado con la industria de la salud en EE. UU. soporta Azure?",
        answer: "HIPAA (Health Insurance Portability and Accountability Act).",
      },
      {
        prompt:
          "El estándar de seguridad de la industria de tarjetas de pago que cumple Azure es _____.",
        answer: "PCI DSS (Payment Card Industry Data Security Standard)",
      },
      {
        prompt:
          "¿Qué servicio de base de datos de Azure ofrece bases de datos relacionales y no relacionales?",
        answer:
          "Azure ofrece servicios separados, como Azure SQL Database (relacional) y Azure Cosmos DB (no relacional/multimodelo).",
      },
      {
        prompt: "¿Qué es AKS Automatic?",
        answer:
          "Una versión de Azure Kubernetes Service que reduce la curva de aprendizaje y los riesgos de mala configuración al automatizar el mantenimiento del clúster.",
      },
      {
        prompt:
          "¿Qué lenguaje de consulta es esencial para un Fabric Analytics Engineer Associate, además de SQL y DAX?",
        answer: "Kusto Query Language (KQL).",
      },
      {
        prompt:
          "El modelo de Azure _____, que ahora soporta la generación de video a partir de imágenes, está disponible en las regiones de Suecia Central y Este de EE. UU. 2.",
        answer: "Sora",
      },
      {
        prompt:
          "¿Qué es la diarización en el contexto de los modelos de audio de Azure OpenAI?",
        answer:
          "Es el proceso de identificar quién habló y cuándo en un flujo de audio, transformando conversaciones en transcripciones atribuidas a un hablante.",
      },
      {
        prompt:
          "¿Qué API de Azure OpenAI reúne las capacidades de las API de chat completions y assistants en una experiencia unificada?",
        answer: "La API Responses.",
      },
      {
        prompt:
          "Azure DocumentDB es un servicio NoSQL totalmente gestionado construido sobre tecnología de código abierto y compatible con los drivers de _____.",
        answer: "MongoDB",
      },
      {
        prompt: "Término: Azure Elastic SAN",
        answer:
          "Definición: Un servicio de almacenamiento que proporciona una experiencia de extremo a extremo comparable a las redes de área de almacenamiento (SAN) locales para aplicaciones críticas.",
      },
      {
        prompt:
          "El servicio _____ de Azure es una red de entrega de contenido (CDN) global que optimiza las experiencias del usuario entregando contenido desde el borde de la red.",
        answer: "Azure Front Door",
      },
      {
        prompt:
          "¿Qué iniciativa de Microsoft se centra en la inversión en la región de la UE para permitir que los clientes procesen y almacenen datos dentro de la UE?",
        answer: "EU Data Boundary for Microsoft Cloud.",
      },
      {
        prompt:
          "¿Qué empresa de tecnología de GPU se ha integrado con los servicios de infraestructura de Azure AI, incluyendo la plataforma Blackwell?",
        answer: "NVIDIA.",
      },
      {
        prompt:
          "Con la integración de Defender for Cloud y _____, se busca proteger las aplicaciones a lo largo de todo su ciclo de vida, desde el código hasta el tiempo de ejecución.",
        answer: "GitHub",
      },
      {
        prompt:
          "¿Qué servicio de Azure proporciona una vista unificada de los activos de IA agéntica para gestionar la postura de seguridad y reducir el riesgo?",
        answer: "Microsoft Defender (como parte de Microsoft Agent 365).",
      },
      {
        prompt: "Término: Regiones Soberanas de Azure",
        answer:
          "Definición: Instancias de Azure diseñadas para cumplir con estrictos estándares de seguridad, cumplimiento y privacidad en regiones con fuertes restricciones regulatorias, como China y para el gobierno de EE. UU.",
      },
      {
        prompt:
          "¿A través de qué socio opera Microsoft su instancia de Azure en China para garantizar que todos los datos permanezcan dentro de las fronteras del país?",
        answer: "21Vianet (21VNET).",
      },
      {
        prompt:
          "El modelo de precios de Azure que permite a los clientes pagar solo por los recursos que consumen se conoce como _____.",
        answer: "pago por uso (pay-as-you-go)",
      },
      {
        prompt:
          "¿Qué servicio de Azure permite conexiones de fibra privadas y dedicadas entre la infraestructura local y los centros de datos de Azure, sin pasar por la internet pública?",
        answer: "Azure ExpressRoute.",
      },
      {
        prompt: "¿Cuál es el propósito del servicio Azure Functions?",
        answer:
          "Es un servicio de computación sin servidor (serverless) que permite ejecutar código basado en eventos sin gestionar la infraestructura.",
      },
      {
        prompt:
          "La certificación AZ-500 de Microsoft está orientada al rol de _____.",
        answer: "Microsoft Azure Security Engineer Associate",
      },
      {
        prompt:
          "¿Qué nuevo modelo de lenguaje grande (LLM) de OpenAI fue introducido en Foundry en Ignite 2025?",
        answer: "GPT-5.1.",
      },
      {
        prompt:
          "El servicio _____ de Azure se utiliza para crear, probar, desplegar y gestionar chatbots en múltiples canales.",
        answer: "Azure AI Bot Service",
      },
      {
        prompt:
          "¿Qué es el 'spillover' en el contexto de los despliegues provisionados de Azure OpenAI?",
        answer:
          "Es una función que gestiona las fluctuaciones de tráfico en despliegues provisionados, redirigiendo los excesos a un despliegue estándar designado.",
      },
      {
        prompt:
          "El 'Model router' para Azure AI Foundry es un modelo de chat desplegable que automáticamente selecciona el mejor _____ para responder a una solicitud.",
        answer: "modelo de chat subyacente",
      },
      {
        prompt:
          "Según un estudio de IDC, las empresas 'Frontier' (líderes en la adopción de IA) están logrando retornos _____ veces más altos que los adoptantes lentos.",
        answer: "tres",
      },
      {
        prompt:
          "¿Qué porcentaje de las empresas 'Frontier' están monetizando casos de uso de IA específicos de la industria para aumentar sus ingresos?",
        answer: "El 67%.",
      },
      {
        prompt:
          "¿Qué tipo de arquitectura de aplicaciones se beneficia enormemente del uso de Azure Kubernetes Service (AKS) para gestionar unidades de código acopladas de forma laxa?",
        answer: "Arquitectura de microservicios.",
      },
      {
        prompt:
          "En Azure Machine Learning Studio, ¿qué función simplifica el desarrollo de aplicaciones de IA con modelos de lenguaje grandes (LLMs)?",
        answer: "Prompt flow.",
      },
      {
        prompt:
          "¿Cuál es el sistema operativo especializado que Microsoft Azure utiliza para su 'capa de tejido' (fabric layer)?",
        answer:
          "Un sistema operativo especializado con el mismo nombre, Azure.",
      },
      {
        prompt:
          "El componente de Azure que mantiene la escalabilidad y fiabilidad de los servicios en el centro de datos, gestionando la asignación de memoria y el balanceo de carga, es el _____.",
        answer: "Azure Fabric Controller",
      },
      {
        prompt:
          "¿Qué API proporciona Azure para que un desarrollador interactúe con los servicios, construida sobre REST, HTTP y XML?",
        answer:
          "Azure proporciona una API construida sobre esos estándares, no tiene un nombre único y específico más allá de la 'API de Azure'.",
      },
      {
        prompt:
          "Azure soporta múltiples lenguajes de programación. ¿Cuáles son algunos ejemplos clave mencionados?",
        answer: "C#, Python, JavaScript, Java y PHP.",
      },
      {
        prompt:
          "¿En qué año se lanzó comercialmente Windows Azure, la versión inicial de la plataforma?",
        answer: "Se lanzó comercialmente en 2010.",
      },
      {
        prompt:
          "¿Cuándo se cambió el nombre de Windows Azure a Microsoft Azure, marcando un cambio estratégico hacia el software de código abierto y IaaS?",
        answer: "En marzo de 2014.",
      },
      {
        prompt:
          "Al final del año fiscal 2025, ¿cuántos centros de datos operaba Microsoft en más de 70 regiones?",
        answer: "Operaba más de 400 centros de datos.",
      },
      {
        prompt:
          "El modelo de transcripción de audio de OpenAI que ofrece diarización se llama _____.",
        answer: "gpt-4o-transcribe-diarize",
      },
      {
        prompt:
          "Según un estudio de IDC, se estima que el número de empresas que utilizan IA agéntica se _____ en los próximos dos años.",
        answer: "triplicará",
      },
      {
        prompt:
          "¿Qué servicio de seguridad de Microsoft ayuda a proteger los datos, las aplicaciones y las redes en la nube, y es una habilidad clave para un Azure Security Engineer?",
        answer:
          "Azure incluye múltiples servicios, pero el rol se centra en gestionar identidad y acceso, controles de seguridad y protección contra amenazas.",
      },
      {
        prompt:
          "¿Qué plan de soporte de Azure está incluido para todos los clientes y proporciona recursos de autoayuda y soporte de facturación?",
        answer: "El plan Básico.",
      },
      {
        prompt:
          "¿Cuánto cuesta el plan de soporte 'Standard' de Azure por mes, que ofrece soporte técnico 24/7 para problemas críticos?",
        answer: "Cuesta 100 dólares al mes.",
      },
      {
        prompt:
          "En diciembre de 2025, ¿qué especialización de Microsoft Azure fue renombrada a 'AI Apps on Microsoft Azure Specialization'?",
        answer: "La especialización 'Build AI Apps with Microsoft Azure'.",
      },
      {
        prompt: "Término: Azure DevTest Labs",
        answer:
          "Definición: Un servicio que permite crear y gestionar rápidamente entornos de desarrollo y pruebas en Azure utilizando plantillas reutilizables y artefactos.",
      },
      {
        prompt:
          "¿Qué servicio de Azure es una solución de base de datos relacional inteligente y totalmente gestionada?",
        answer: "Azure SQL Database.",
      },
      {
        prompt:
          "Azure Cosmos DB es un servicio de base de datos multimodelo distribuido globalmente. ¿Qué API es una de sus opciones para trabajar con datos de grafos?",
        answer: "La API Gremlin.",
      },
      {
        prompt:
          "El servicio de Azure que permite mapear una unidad de red desde ordenadores con Windows a Azure Storage se llama _____.",
        answer: "Azure Files (o Files service en una cuenta de almacenamiento)",
      },
      {
        prompt:
          "¿Cuál es el SLA (Acuerdo de Nivel de Servicio) de tiempo de actividad para Azure Machine Learning?",
        answer: "El SLA es del 99.9 por ciento de tiempo de actividad.",
      },
      {
        prompt:
          "Para los modelos de audio de Azure OpenAI, ¿qué tecnología se añadió en abril de 2025 para permitir el streaming de audio en tiempo real y baja latencia?",
        answer: "WebRTC.",
      },
      {
        prompt:
          "El modelo de generación de imágenes de última generación de OpenAI, disponible en Azure desde diciembre de 2025, se llama _____.",
        answer: "GPT-image-1.5",
      },
      {
        prompt:
          "¿Cuál es el primer DPU (Unidad de Procesamiento de Datos) interno de Microsoft, diseñado para acelerar las tareas de red y almacenamiento?",
        answer: "Azure Boost DPU.",
      },
      {
        prompt:
          "Azure Quantum Elements es un software para química computacional que combina IA, computación de alto rendimiento y _____.",
        answer: "procesadores cuánticos",
      },
      {
        prompt:
          "¿Qué lenguaje de programación cuántica desarrolló Microsoft para el desarrollo y simulación de algoritmos cuánticos?",
        answer: "Q# (pronunciado Q Sharp).",
      },
      {
        prompt:
          "¿Cuál fue una de las causas de una interrupción significativa de Azure el 29 de febrero de 2012?",
        answer:
          "Un código incorrecto para calcular las fechas del día bisiesto.",
      },
      {
        prompt:
          "Según se informa, ¿qué grupo de hacktivistas se atribuyó un ataque DDoS contra el Portal de Azure en junio de 2023?",
        answer: "Anonymous Sudan.",
      },
      {
        prompt:
          "El 29 de octubre de 2025, una interrupción global de Azure que afectó a Microsoft 365 y Xbox Live fue causada por una _____.",
        answer: "mala configuración de DNS",
      },
      {
        prompt: "Término: Azure Logic Apps",
        answer:
          "Definición: Un servicio en la nube que ayuda a automatizar flujos de trabajo e integrar aplicaciones, datos, servicios y sistemas en empresas u organizaciones.",
      },
      {
        prompt:
          "El servicio _____ proporciona un inventario de todos los agentes en una organización y una evaluación de riesgos como parte de la gestión de la postura de seguridad de datos (DSPM).",
        answer: "Microsoft Purview",
      },
      {
        prompt:
          "¿Qué es 'Agent Mode' en Microsoft 365 Copilot para aplicaciones como PowerPoint?",
        answer:
          "Es una capacidad que permite a Copilot crear, editar y formatear contenido de forma iterativa directamente dentro de la aplicación.",
      },
      {
        prompt:
          "¿Qué protocolo se utiliza para estandarizar cómo los agentes de IA, como los de Copilot Studio, interactúan con Dataverse?",
        answer: "El Protocolo de Contexto de Modelo (MCP) de Dataverse.",
      },
    ],
  },
  {
    id: "bases",
    name: "Bases",
    cards: [
      {
        prompt:
          "¿Qué determina la infraestructura crítica de una aplicación exitosa, decidiendo si puede escalar eficientemente o fallará bajo el peso de sus propios datos?",
        answer: "Una base de datos bien diseñada.",
      },
      {
        prompt:
          "¿Qué práctica de diseño de bases de datos se enfoca en estructurar los datos para reducir la redundancia y mejorar la integridad?",
        answer: "La normalización de la base de datos.",
      },
      {
        prompt:
          "Para acelerar las operaciones de recuperación de datos en una base de datos, se debe implementar una estrategia de _____ adecuada.",
        answer: "indexación (indexing)",
      },
      {
        prompt:
          "¿Qué práctica de diseño mejora la legibilidad y el mantenimiento del esquema de una base de datos mediante la estandarización de los nombres de los objetos?",
        answer: "El uso de convenciones de nomenclatura consistentes.",
      },
      {
        prompt:
          "El uso eficiente de recursos y la garantía de la integridad de los datos se logran a través de la _____ de los tipos de datos.",
        answer: "optimización",
      },
      {
        prompt:
          "¿Cómo se denomina el principio que mantiene la consistencia lógica entre tablas relacionadas en una base de datos?",
        answer: "Integridad referencial.",
      },
      {
        prompt:
          "El seguimiento de la evolución del esquema de una base de datos a lo largo del tiempo se gestiona mediante _____ y _____.",
        answer: "documentación y versionado",
      },
      {
        prompt:
          "La escritura de consultas eficientes desde el inicio es parte de la práctica de diseño de _____ y _____ de consultas.",
        answer: "rendimiento y diseño",
      },
      {
        prompt:
          "Según el Principio de Mínimo Privilegio en seguridad de bases de datos, ¿qué permisos se deben otorgar a los usuarios?",
        answer:
          "Únicamente los permisos mínimos necesarios para realizar sus funciones laborales.",
      },
      {
        prompt:
          "Para proteger los datos almacenados en la base de datos y los que se mueven a través de la red, se deben usar algoritmos de _____ fuertes.",
        answer: "cifrado (encriptación)",
      },
      {
        prompt:
          "¿Qué técnica se debe usar en el código de la aplicación para prevenir ataques de inyección SQL?",
        answer: "Consultas parametrizadas o sentencias preparadas.",
      },
      {
        prompt:
          "Para una seguridad robusta, se deben implementar políticas de contraseñas fuertes y habilitar la _____ para todos los usuarios de la base de datos.",
        answer: "autenticación multifactor (MFA)",
      },
      {
        prompt:
          "¿Qué herramienta es crucial para detectar comportamientos sospechosos e investigar incidentes de seguridad en una base de datos?",
        answer: "Los registros de auditoría (audit logs).",
      },
      {
        prompt: "¿Qué es la gestión de bases de datos (database management)?",
        answer:
          "El uso sistemático de tecnología y procesos para organizar, almacenar y recuperar datos de manera eficiente, garantizando su integridad, disponibilidad y seguridad.",
      },
      {
        prompt:
          "Un software especializado para interactuar con los datos de una base de datos se conoce como _____.",
        answer: "Sistema de Gestión de Bases de Datos (DBMS)",
      },
      {
        prompt:
          "Las bases de datos relacionales, o RDBMS, almacenan datos en _____ y _____ que forman tablas.",
        answer: "filas y columnas",
      },
      {
        prompt:
          "¿Qué se utiliza en las bases de datos relacionales para crear una relación entre dos o más tablas?",
        answer: "Una clave externa (foreign key).",
      },
      {
        prompt:
          "¿Qué tipo de base de datos almacena datos en documentos similares a objetos JSON?",
        answer: "Bases de datos de documentos.",
      },
      {
        prompt:
          "En las bases de datos de _____, cada registro de datos está representado por una clave única y un valor asociado.",
        answer: "clave-valor",
      },
      {
        prompt:
          "¿Qué tipo de base de datos NoSQL organiza los datos en columnas en lugar de filas y es útil para conjuntos de datos amplios y dispersos?",
        answer: "Almacenes de familias de columnas (o de columna ancha).",
      },
      {
        prompt:
          "Las bases de datos que almacenan información sobre personas, lugares y cosas en nodos, y las relaciones entre ellos en aristas, se llaman bases de datos de _____.",
        answer: "grafos",
      },
      {
        prompt: "Concepto: Cumplimiento de ACID.",
        answer:
          "Un conjunto de propiedades (Atomicidad, Consistencia, Aislamiento, Durabilidad) que garantizan la fiabilidad, consistencia e integridad de las transacciones de bases de datos.",
      },
      {
        prompt:
          "Debido a su esquema fijo, las bases de datos relacionales solo pueden almacenar datos _____.",
        answer: "estructurados",
      },
      {
        prompt: "¿Qué es una clave primaria (primary key)?",
        answer:
          "Una columna o un conjunto de columnas que identifica de forma única cada fila en una tabla.",
      },
      {
        prompt: "¿Qué es una clave externa (foreign key)?",
        answer:
          "Una columna o un conjunto de columnas en una tabla que hace referencia a la clave primaria de otra tabla, estableciendo una relación.",
      },
      {
        prompt:
          "Para que una tabla esté en la Primera Forma Normal (1NF), cada celda debe contener un solo valor, lo que se conoce como _____.",
        answer: "atomicidad",
      },
      {
        prompt:
          "La Segunda Forma Normal (2NF) requiere que una tabla esté en 1NF y que no tenga ninguna _____.",
        answer: "dependencia parcial",
      },
      {
        prompt:
          "Para que una tabla esté en la Tercera Forma Normal (3NF), debe estar en 2NF y no tener ninguna _____.",
        answer: "dependencia transitiva",
      },
      {
        prompt:
          "¿Qué tipo de índice en una base de datos determina el orden físico en que los registros de la tabla se almacenan en el disco?",
        answer: "Índice agrupado (clustered index).",
      },
      {
        prompt:
          "¿Cuántos índices agrupados (clustered indexes) puede tener una tabla?",
        answer:
          "Solo uno, porque los datos solo pueden estar ordenados físicamente de una manera.",
      },
      {
        prompt:
          "Un _____ es una estructura independiente de la tabla que contiene una copia de la columna indexada y un puntero hacia el registro real.",
        answer: "índice no agrupado (non-clustered index)",
      },
      {
        prompt:
          "¿Cuántos índices no agrupados (non-clustered indexes) puede tener una tabla en SQL Server?",
        answer: "Hasta 999.",
      },
      {
        prompt:
          "En SQL Server, la creación de una restricción de _____ crea automáticamente un índice agrupado en esa columna.",
        answer: "clave primaria (primary key)",
      },
      {
        prompt: "¿Qué es la persistencia políglota (Polyglot Persistence)?",
        answer:
          "Es un enfoque que utiliza el motor de base de datos más adecuado para cada microservicio o funcionalidad específica de una aplicación.",
      },
      {
        prompt:
          "El Teorema CAP postula que en un sistema distribuido solo se pueden garantizar plenamente dos de tres propiedades. ¿Cuáles son estas tres propiedades?",
        answer:
          "Consistencia (C), Disponibilidad (A) y Tolerancia a Particiones (P).",
      },
      {
        prompt:
          "En el contexto del Teorema CAP, ¿qué significa 'Consistencia'?",
        answer:
          "Que todos los clientes ven el mismo dato al mismo tiempo después de una escritura.",
      },
      {
        prompt:
          "En el contexto del Teorema CAP, ¿qué significa 'Disponibilidad'?",
        answer:
          "Que el sistema siempre responde a las solicitudes, incluso si algún nodo falla.",
      },
      {
        prompt:
          "En el contexto del Teorema CAP, ¿qué significa 'Tolerancia a Particiones'?",
        answer:
          "Que el sistema sigue funcionando a pesar de fallos en la comunicación de red entre nodos.",
      },
      {
        prompt:
          "Las bases de datos NoSQL a menudo priorizan la disponibilidad y la tolerancia a particiones, lo que lleva a un modelo de consistencia _____.",
        answer: "eventual",
      },
      {
        prompt:
          "¿Qué tipo de base de datos está optimizada para almacenar y consultar embeddings vectoriales utilizados en aplicaciones de LLM y redes neuronales?",
        answer: "Base de datos de vectores (vector database).",
      },
      {
        prompt:
          "¿Qué arquitectura de IA se habilita mediante bases de datos de vectores para reducir las alucinaciones al recuperar contexto relevante de una base de conocimientos?",
        answer: "RAG (Retrieval-Augmented Generation).",
      },
      {
        prompt:
          "PostgreSQL, tradicionalmente relacional, ha implementado el tipo de datos _____ para permitir consultas documentales con un rendimiento competitivo.",
        answer: "JSONB",
      },
      {
        prompt: "Un ejemplo de base de datos de documentos NoSQL es _____.",
        answer: "MongoDB",
      },
      {
        prompt: "Un ejemplo de base de datos de clave-valor NoSQL es _____.",
        answer: "Redis",
      },
      {
        prompt: "Un ejemplo de base de datos de columna ancha NoSQL es _____.",
        answer: "Apache Cassandra",
      },
      {
        prompt: "Un ejemplo de base de datos de grafos NoSQL es _____.",
        answer: "Neo4j",
      },
      {
        prompt:
          "El sublenguaje de SQL que se ocupa de definir la estructura de los objetos de la base de datos (tablas, vistas) se llama _____.",
        answer: "Lenguaje de Definición de Datos (DDL).",
      },
      {
        prompt:
          "¿Qué comando DDL se utiliza para crear una nueva tabla en una base de datos?",
        answer: "CREATE TABLE",
      },
      {
        prompt:
          "¿Qué comando DDL se utiliza para modificar la estructura de una tabla existente?",
        answer: "ALTER TABLE",
      },
      {
        prompt:
          "¿Qué comando DDL se utiliza para eliminar completamente una tabla, incluyendo su estructura y datos?",
        answer: "DROP TABLE",
      },
      {
        prompt:
          "El sublenguaje de SQL que permite a los usuarios manipular los datos (insertar, modificar, eliminar) se llama _____.",
        answer: "Lenguaje de Manipulación de Datos (DML).",
      },
      {
        prompt:
          "¿Qué comando DML se utiliza para agregar nuevos registros a una tabla?",
        answer: "INSERT INTO",
      },
      {
        prompt:
          "¿Qué comando DML se utiliza para modificar los valores de registros existentes?",
        answer: "UPDATE",
      },
      {
        prompt:
          "¿Qué comando DML se utiliza para eliminar registros de una tabla?",
        answer: "DELETE FROM",
      },
      {
        prompt:
          "El sublenguaje de SQL centrado exclusivamente en la lectura y recuperación de información se llama _____.",
        answer: "Lenguaje de Consulta de Datos (DQL).",
      },
      {
        prompt:
          "¿Cuál es el comando principal del DQL para recuperar datos de una base de datos?",
        answer: "SELECT",
      },
      {
        prompt:
          "El sublenguaje de SQL que permite controlar el acceso a los datos y los permisos de los usuarios se llama _____.",
        answer: "Lenguaje de Control de Datos (DCL).",
      },
      {
        prompt:
          "¿Qué comando DCL se utiliza para otorgar permisos a un usuario?",
        answer: "GRANT",
      },
      {
        prompt:
          "¿Qué comando DCL se utiliza para revocar permisos previamente concedidos a un usuario?",
        answer: "REVOKE",
      },
      {
        prompt:
          "El sublenguaje de SQL para la administración de transacciones se llama _____.",
        answer: "Lenguaje de Control de Transacciones (TCL).",
      },
      {
        prompt:
          "¿Qué comando TCL se utiliza para guardar permanentemente los cambios realizados en una transacción?",
        answer: "COMMIT",
      },
      {
        prompt:
          "¿Qué comando TCL se utiliza para deshacer las modificaciones desde el último COMMIT?",
        answer: "ROLLBACK",
      },
      {
        prompt: "¿Puede una clave primaria contener valores nulos?",
        answer:
          "No, una clave primaria no permite valores nulos para garantizar la identificación única de cada registro.",
      },
      {
        prompt: "¿Puede una clave externa contener valores duplicados?",
        answer:
          "Sí, una clave externa puede contener valores duplicados, ya que varias filas en una tabla pueden hacer referencia a la misma fila en otra tabla.",
      },
      {
        prompt: "¿Cuál es el propósito principal de una clave externa?",
        answer:
          "Establecer y mantener la integridad referencial entre tablas relacionadas.",
      },
      {
        prompt:
          "¿Qué sucede si se intenta insertar un valor en una clave externa que no existe en la clave primaria a la que hace referencia?",
        answer:
          "La operación falla debido a una violación de la restricción de integridad referencial.",
      },
      {
        prompt:
          "¿Qué tipo de DBMS organiza los datos en una estructura similar a un árbol con relaciones padre-hijo?",
        answer:
          "Sistema de Gestión de Bases de Datos Jerárquico (Hierarchical DBMS).",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de un índice agrupado (clustered index) para las búsquedas por rango?",
        answer:
          "Son extremadamente rápidas porque los registros relacionados están físicamente contiguos en el disco.",
      },
      {
        prompt:
          "El sobreuso de índices puede ralentizar las operaciones de _____, como INSERT, UPDATE y DELETE.",
        answer: "escritura",
      },
      {
        prompt:
          "Las bases de datos NoSQL son ideales para manejar datos no estructurados o _____ de manera eficiente.",
        answer: "semiestructurados",
      },
      {
        prompt:
          "Mientras que las bases de datos SQL escalan verticalmente, las bases de datos NoSQL están diseñadas para escalar _____.",
        answer: "horizontalmente",
      },
      {
        prompt:
          "¿Qué DBMS popular es un sistema de base de datos objeto-relacional (ORDBMS) de código abierto conocido por su robustez y cumplimiento de estándares SQL?",
        answer: "PostgreSQL.",
      },
      {
        prompt:
          "¿Qué DBMS popular es conocido por ser una base de datos NoSQL orientada a documentos que utiliza documentos similares a JSON?",
        answer: "MongoDB.",
      },
      {
        prompt:
          "¿Qué DBMS es un almacén de datos en memoria de código abierto utilizado a menudo como caché o agente de mensajes?",
        answer: "Redis.",
      },
      {
        prompt:
          "¿Qué DBMS es un motor de búsqueda y análisis distribuido de código abierto basado en Apache Lucene?",
        answer: "Elasticsearch.",
      },
      {
        prompt:
          "En una arquitectura de comercio electrónico híbrida, ¿qué tipo de base de datos sería ideal para gestionar pedidos y facturación donde la consistencia ACID es vital?",
        answer: "Una base de datos relacional como PostgreSQL.",
      },
      {
        prompt:
          "En una arquitectura de comercio electrónico híbrida, ¿qué tipo de base de datos sería ideal para el catálogo de productos con atributos variables?",
        answer: "Una base de datos de documentos como MongoDB.",
      },
      {
        prompt:
          "En una arquitectura de comercio electrónico híbrida, ¿qué tipo de base de datos sería ideal para un motor de recomendaciones basado en relaciones?",
        answer: "Una base de datos de grafos como Neo4j.",
      },
      {
        prompt:
          "¿Qué son los registros huérfanos (orphan records) en una base de datos relacional?",
        answer:
          "Son registros en una tabla secundaria cuya clave externa hace referencia a una clave primaria que ya no existe en la tabla principal.",
      },
      {
        prompt:
          "La Tercera Forma Normal (3NF) elimina las columnas que no dependen de la _____.",
        answer: "clave primaria",
      },
      {
        prompt:
          "En un índice no agrupado, ¿qué contiene la estructura del índice además de la columna indexada?",
        answer:
          "Un puntero o localizador de fila que apunta a la ubicación del registro real en la tabla.",
      },
      {
        prompt:
          "El problema de consulta N+1 ocurre cuando una aplicación realiza una consulta inicial para recuperar una lista de elementos y luego _____ consultas adicionales para obtener detalles de cada elemento.",
        answer: "N",
      },
      {
        prompt: "El lenguaje de consulta utilizado por MongoDB se llama _____.",
        answer: "MongoDB Query Language (MQL)",
      },
      {
        prompt:
          "MongoDB almacena datos en formato _____, que es una representación binaria de JSON.",
        answer: "BSON",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia entre los modelos de consistencia de las bases de datos relacionales y no relacionales?",
        answer:
          "Las relacionales garantizan consistencia estricta (ACID), mientras que las no relacionales a menudo optan por consistencia eventual.",
      },
      {
        prompt:
          "El comando SQL `TRUNCATE` borra todos los datos de una tabla pero mantiene su _____, a diferencia de `DROP` que la elimina por completo.",
        answer: "estructura",
      },
      {
        prompt:
          "¿Qué cláusula SQL se utiliza para filtrar filas antes de cualquier agrupación o agregación?",
        answer: "WHERE",
      },
      {
        prompt:
          "¿Qué cláusula SQL se utiliza para filtrar los resultados de un `GROUP BY` después de la agregación?",
        answer: "HAVING",
      },
      {
        prompt:
          "La virtualización de bases de datos abstrae la base de datos de su almacenamiento físico, permitiendo múltiples instancias _____ en el mismo hardware.",
        answer: "virtuales",
      },
      {
        prompt:
          "¿Qué estrategia de almacenamiento segmenta los datos en niveles según la frecuencia de uso y las necesidades de rendimiento?",
        answer: "Soluciones de almacenamiento por niveles (tiered storage).",
      },
      {
        prompt:
          "El uso de modelos de machine learning para predecir posibles fallos de la base de datos se conoce como _____.",
        answer: "análisis predictivo de fallos (predictive failure analytics)",
      },
      {
        prompt:
          "La combinación de bases de datos relacionales y no relacionales para abordar diversas necesidades de datos se conoce como modelos de bases de datos _____.",
        answer: "híbridos",
      },
      {
        prompt: "¿Qué es una vista indexada (Indexed View) en SQL Server?",
        answer:
          "Es una vista cuyos resultados se precalculan y almacenan físicamente, permitiendo una recuperación de datos más rápida.",
      },
      {
        prompt:
          "Al igual que una tabla, una vista indexada requiere un índice _____ único para poder materializar los datos.",
        answer: "agrupado (clustered)",
      },
      {
        prompt: "¿Cuál es la ventaja de rendimiento de una vista indexada?",
        answer:
          "Mejora drásticamente el rendimiento de las consultas al evitar el cálculo repetido de los resultados, ya que estos están pre-almacenados.",
      },
      {
        prompt:
          "Para evitar el `vendor lock-in`, es recomendable utilizar herramientas de base de datos que sean completamente de _____ y no `forks` propietarios.",
        answer: "código abierto (open source)",
      },
      {
        prompt:
          "Una base de datos que funciona directamente dentro de la aplicación sin requerir un proceso de servidor separado se considera _____.",
        answer: "sin servidor (serverless) o embebida",
      },
      {
        prompt:
          "SQLite es un ejemplo de una base de datos relacional _____ que almacena toda la base de datos en un único archivo físico.",
        answer: "sin servidor (serverless)",
      },
      {
        prompt:
          "La práctica de analizar los patrones de consulta de una aplicación para aplicar índices estratégicamente a columnas usadas en cláusulas WHERE, JOIN y ORDER BY se llama _____.",
        answer: "indexar con intención",
      },
      {
        prompt:
          "El proceso de organizar las columnas y tablas de una base de datos para minimizar la redundancia de datos se denomina _____.",
        answer: "normalización",
      },
      {
        prompt:
          "La Forma Normal de Boyce-Codd (BCNF) es una versión más estricta de la _____.",
        answer: "Tercera Forma Normal (3NF)",
      },
      {
        prompt:
          "En una base de datos NoSQL, el almacenamiento de datos como agrupaciones de pares clave-valor es la función de una base de datos _____.",
        answer: "clave-valor",
      },
      {
        prompt:
          "En una base de datos de grafos, las relaciones entre entidades se almacenan como _____.",
        answer: "aristas (edges)",
      },
      {
        prompt:
          "La capacidad de una base de datos para manejar grandes volúmenes de datos y altas cargas de tráfico mediante la adición de más servidores se conoce como _____.",
        answer: "escalabilidad horizontal",
      },
      {
        prompt:
          "La capacidad de una base de datos para manejar mayores cargas aumentando los recursos de un único servidor (CPU, RAM) se conoce como _____.",
        answer: "escalabilidad vertical",
      },
      {
        prompt:
          "La característica de bases de datos como Cassandra que permite la distribución de datos en varios centros de datos para resistir interrupciones regionales es su arquitectura _____.",
        answer: "descentralizada",
      },
      {
        prompt:
          "¿Qué término describe el conjunto de herramientas que incluye Elasticsearch, Logstash y Kibana para la ingesta, búsqueda y visualización de datos?",
        answer: "Elastic Stack (anteriormente ELK Stack).",
      },
      {
        prompt:
          "Una de las principales ventajas de usar convenciones de nomenclatura consistentes es que hace que el esquema sea _____, facilitando su comprensión.",
        answer: "autodocumentado",
      },
      {
        prompt:
          "El uso de un tipo de dato `INT` para una columna que solo almacenará valores booleanos (0 o 1) es un ejemplo de una mala práctica de _____.",
        answer: "optimización de tipos de datos",
      },
      {
        prompt:
          "¿Qué problema de rendimiento puede causar la fragmentación de índices?",
        answer:
          "Puede degradar severamente el rendimiento de las consultas al requerir más lecturas de página.",
      },
      {
        prompt:
          "En sistemas con muchas operaciones de escritura (OLTP), un número excesivo de índices puede _____ el rendimiento.",
        answer: "reducir o afectar negativamente",
      },
      {
        prompt:
          "En sistemas con muchas operaciones de lectura (OLAP), múltiples índices estratégicos pueden _____ significativamente el rendimiento.",
        answer: "mejorar o acelerar",
      },
      {
        prompt:
          "En el diseño de bases de datos, ¿por qué es una buena práctica usar sustantivos en singular para los nombres de las tablas?",
        answer:
          "Porque cada fila de la tabla representa una única instancia de esa entidad (p. ej., una fila en la tabla `Cliente` es un solo cliente).",
      },
      {
        prompt:
          "El uso de `snake_case` o `camelCase` para nombrar objetos de la base de datos es un ejemplo de una _____.",
        answer: "convención de nomenclatura",
      },
      {
        prompt: "¿Qué es un esquema de base de datos?",
        answer:
          "Es el plano o la estructura lógica de una base de datos que define cómo se organizan los datos, sus relaciones y las restricciones impuestas.",
      },
      {
        prompt:
          "La capacidad de una base de datos para soportar múltiples modelos de datos (como relacional, documental y de grafos) en un solo sistema se denomina _____.",
        answer: "multimodelo",
      },
      {
        prompt:
          "Cuando una consulta utiliza todas las columnas que necesita directamente desde un índice sin acceder a la tabla base, se dice que el índice _____ la consulta.",
        answer: "cubre (covering index)",
      },
    ],
  },
  {
    id: "big_data",
    name: "Big Data",
    cards: [
      {
        prompt:
          "¿Qué unidad de información digital se compone de un grupo de 8 bits?",
        answer: "Un byte (o un carácter).",
      },
      {
        prompt: "Definición de datos estructurados.",
        answer:
          "Datos organizados que siguen un formato específico, generalmente almacenados en bases de datos relacionales.",
      },
      {
        prompt:
          "¿Qué tipo de datos incluye texto, imágenes, videos y publicaciones en redes sociales que carecen de un formato rígido?",
        answer: "Datos no estructurados.",
      },
      {
        prompt: "¿Qué son los datos semiestructurados?",
        answer:
          "Datos que no cumplen con un esquema rígido pero contienen elementos organizativos como etiquetas o metadatos.",
      },
      {
        prompt:
          '¿Cuáles son las tres "V" fundamentales que caracterizan al Big Data?',
        answer: "Volumen, Velocidad y Variedad.",
      },
      {
        prompt: 'En el contexto de Big Data, ¿a qué se refiere la "Veracidad"?',
        answer:
          "A la calidad, confiabilidad y exactitud de los datos recopilados.",
      },
      {
        prompt:
          "¿Qué término describe la inconsistencia o fluctuaciones en la estructura y formato de los grandes volúmenes de datos?",
        answer: "Variabilidad.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia de almacenamiento entre un Data Warehouse y un Data Lake?",
        answer:
          "El Data Warehouse almacena datos estructurados, mientras que el Data Lake admite datos estructurados, semiestructurados y no estructurados.",
      },
      {
        prompt:
          "¿Qué ventaja ofrece un Data Lakehouse sobre un Data Lake tradicional respecto a la integridad de los datos?",
        answer:
          "El cumplimiento de las propiedades ACID (Atomicidad, Consistencia, Aislamiento y Durabilidad).",
      },
      {
        prompt:
          "¿Cómo se denomina la estructura jerárquica de almacenamiento que utiliza directorios, subdirectorios y protocolos como NFS o SMB?",
        answer: "File Storage (Almacenamiento de archivos).",
      },
      {
        prompt:
          "¿En qué tipo de almacenamiento los datos se dividen en trozos identificados por un ID único y se gestionan en discos separados?",
        answer: "Block Storage (Almacenamiento por bloques).",
      },
      {
        prompt:
          "¿Qué método de almacenamiento es ideal para datos no estructurados al tratarlos como unidades con ID único, atributos y metadatos?",
        answer: "Object Storage (Almacenamiento de objetos).",
      },
      {
        prompt:
          "¿Cuáles son los seis tipos de datos soportados por el formato JSON?",
        answer: "String, Number, Boolean, Array, Object y Null.",
      },
      {
        prompt:
          "¿Por qué el formato Parquet se considera un formato de almacenamiento columnar o híbrido?",
        answer:
          "Porque organiza los datos por columnas para optimizar lecturas y agregaciones, dividiéndolos en grupos de filas (Row Groups).",
      },
      {
        prompt:
          '¿Qué beneficio ofrece la compresión "Snappy" en los archivos Parquet?',
        answer:
          "Reduce los costes de almacenamiento y mejora la eficiencia de las operaciones de entrada/salida (I/O).",
      },
      {
        prompt: 'En el diseño interno de Parquet, ¿qué es un "Column Chunk"?',
        answer:
          "Un fragmento de los datos de una columna específica dentro de un grupo de filas (Row Group).",
      },
      {
        prompt:
          '¿Qué técnica de optimización en Spark permite reducir el número de archivos pequeños en Parquet sin realizar un "full shuffle"?',
        answer: "Coalesce.",
      },
      {
        prompt:
          "¿Qué función de codificación en Parquet almacena la longitud del prefijo de la entrada anterior más el sufijo actual?",
        answer: "Delta Strings (codificación incremental).",
      },
      {
        prompt:
          "En un archivo CSV, ¿qué propósito cumple la fila de encabezado (header row)?",
        answer:
          "Proporcionar etiquetas descriptivas para los datos contenidos en cada columna.",
      },
      {
        prompt:
          "¿Cuál es el lenguaje nativo en el que está escrito Apache Spark?",
        answer: "Scala.",
      },
      {
        prompt:
          "Según el estudio comparativo, ¿qué lenguaje demostró mejor rendimiento al procesar archivos CSV pequeños ($5$ MB)?",
        answer: "Python (con $6.71$ segundos).",
      },
      {
        prompt:
          "¿Qué lenguaje resultó ser más eficiente para operaciones complejas de ETL con joins de gran tamaño en Spark?",
        answer: "Scala (con $374.42$ segundos en la prueba de mayor carga).",
      },
      {
        prompt: "¿Qué es Apache Iceberg?",
        answer:
          "Un formato de tabla analítica abierto que permite gestionar grandes volúmenes de datos con transacciones ACID y evolución de esquema.",
      },
      {
        prompt: '¿Qué permite la "evolución de esquema" en Apache Iceberg?',
        answer:
          "Modificar la estructura de las tablas sin necesidad de reescribir todos los datos existentes.",
      },
      {
        prompt:
          "En la arquitectura de Iceberg, ¿qué contiene el directorio de metadatos (metadata)?",
        answer:
          "Información sobre el esquema de la tabla, sus lotes (batches), historial de cambios y transacciones.",
      },
      {
        prompt:
          "¿Para qué sirve el parámetro `overwrite-mode=dynamic` al escribir en Iceberg con Spark?",
        answer:
          "Para optimizar el proceso de actualización de datos minimizando el número de lotes que deben ser sobreescritos.",
      },
      {
        prompt: "¿Qué es un Dataset en Apache Spark?",
        answer:
          "Una colección distribuida de datos que ofrece tipado fuerte y los beneficios del motor de ejecución optimizado de Spark SQL.",
      },
      {
        prompt:
          "¿En qué lenguajes de programación está disponible la API de Dataset?",
        answer: "Scala y Java.",
      },
      {
        prompt: "Definición de DataFrame en Spark.",
        answer:
          "Un Dataset organizado en columnas con nombre, equivalente a una tabla en una base de datos relacional.",
      },
      {
        prompt:
          "¿Cuál es la propiedad de configuración de Hadoop para establecer la clave de acceso secreta de Amazon S3 en Spark?",
        answer: "fs.s3a.secret.key",
      },
      {
        prompt:
          '¿Qué comando de `sbt` se utiliza para crear un "fat jar" del cliente jspark?',
        answer: "sbt assembly",
      },
      {
        prompt:
          "¿Qué prefijo debe tener la URL JDBC para conectar jspark con Databricks/Spark?",
        answer: "jdbc:hive2://",
      },
      {
        prompt:
          '¿Qué comando "mágico" permite ejecutar sentencias SQL directamente en una celda de un notebook de PySpark?',
        answer: "%%sparksql",
      },
      {
        prompt: "¿Cuál es la función del conector BigQuery para Spark?",
        answer:
          "Permitir que el código de Spark cargue datos desde tablas de BigQuery y escriba los resultados de vuelta.",
      },
      {
        prompt:
          '¿Qué es una "Runtime Template" (plantilla de sesión) en Spark Serverless de Google Cloud?',
        answer:
          "Un archivo de configuración que contiene los parámetros para ejecutar código Spark en una sesión interactiva.",
      },
      {
        prompt:
          '¿Para qué sirve el "Persistent History Server" (PHS) en el ecosistema Dataproc?',
        answer:
          "Para permitir el acceso a los registros (logs) de las sesiones de Spark durante y después de su ejecución.",
      },
      {
        prompt:
          "¿Qué herramienta se utiliza para programar la ejecución de notebooks de Spark mediante Cloud Composer?",
        answer: "El Job Scheduler (basado en Apache Airflow).",
      },
      {
        prompt:
          "En el diseño de Parquet, ¿qué representan los valores R (Repetition levels)?",
        answer:
          "Indican en qué nivel de una estructura anidada se repite un valor.",
      },
      {
        prompt:
          "En el diseño de Parquet, ¿qué representan los valores D (Definition levels)?",
        answer:
          "Indican cuántos niveles de una estructura anidada opcional están realmente definidos (no son nulos).",
      },
      {
        prompt: '¿Qué es la "Evaluación Perezosa" (Lazy Evaluation) en Spark?',
        answer:
          "Estrategia donde las transformaciones no se ejecutan inmediatamente, sino que se planifican hasta que se invoca una acción.",
      },
      {
        prompt:
          '¿Qué permite la "Ejecución Adaptativa de Consultas" (Adaptive Query Execution - AQE)?',
        answer:
          "Optimizar el plan de ejecución de una consulta SQL en tiempo real basándose en las estadísticas de los datos intermedios.",
      },
      {
        prompt: '¿Cuál es el tamaño por defecto de un "Row Group" en Parquet?',
        answer: "$128$ MB.",
      },
      {
        prompt:
          "¿Qué codificación en Parquet es la más simple y almacena los valores uno tras otro?",
        answer: "PLAIN.",
      },
      {
        prompt:
          "¿Qué sucede con los valores nulos de una columna al ser guardados en formato Parquet?",
        answer: "No se almacenan físicamente, lo que ahorra espacio en disco.",
      },
      {
        prompt:
          "En Spark SQL, ¿cómo se representa un DataFrame en el lenguaje Scala?",
        answer: "Como un alias de tipo de `Dataset[Row]`.",
      },
      {
        prompt:
          "¿Qué extensión de JupyterLab permite explorar datasets de BigQuery y editar archivos de Cloud Storage?",
        answer:
          "La extensión de Dataproc (o JupyterLab extension for Google Cloud).",
      },
      {
        prompt:
          "¿Qué protocolo de acceso se utiliza para leer archivos desde S3 en Spark de forma optimizada?",
        answer: "s3a://.",
      },
      {
        prompt:
          "¿Qué comando se usa para iniciar JupyterLab en un entorno virtual de Python?",
        answer: "jupyter lab",
      },
      {
        prompt:
          "¿Qué rol de IAM permite a un usuario crear sesiones de notebooks interactivos en Dataproc?",
        answer: "Dataproc Editor (roles/dataproc.editor).",
      },
      {
        prompt:
          "¿Cuál es el tiempo máximo de inactividad permitido para una sesión de Spark Serverless?",
        answer: "336 horas (14 días).",
      },
      {
        prompt:
          '¿Qué permite el "Dynamic Partition Pruning" en el motor de Spark?',
        answer:
          "Evitar la lectura de particiones innecesarias en un join basándose en los resultados del filtrado de la otra tabla.",
      },
      {
        prompt:
          "En Parquet, ¿cuál es el tamaño por defecto de una página (page)?",
        answer: "$1$ MB.",
      },
      {
        prompt:
          "¿Qué tipo de codificación en Parquet utiliza enteros de longitud variable para almacenar números?",
        answer: "Delta Encoding.",
      },
      {
        prompt:
          "¿Qué técnica en CSV se utiliza si un valor contiene comillas dobles internamente?",
        answer:
          "Escapar la comilla usando una barra invertida (\\) antes de la misma.",
      },
      {
        prompt:
          "¿Qué componente de Spark gestiona los recursos y ejecuta las consultas en un entorno distribuido?",
        answer: "Spark Session.",
      },
      {
        prompt:
          "En el estudio de rendimiento, ¿cuál fue el tiempo de Scala para procesar el archivo CSV de $1.6$ GB?",
        answer: "$47.72$ segundos.",
      },
      {
        prompt:
          "¿Para qué sirve el parámetro `inferSchema=true` al leer un CSV en Spark?",
        answer:
          "Para que Spark analice automáticamente el contenido del archivo y determine el tipo de dato de cada columna.",
      },
      {
        prompt: "¿Qué es un clúster de Dataproc en Compute Engine?",
        answer:
          "Un conjunto de máquinas virtuales gestionadas que ejecutan Hadoop y Spark para procesamiento de datos.",
      },
      {
        prompt:
          "¿Qué significan las siglas PII, HIPAA y PCI en el contexto de seguridad de datos?",
        answer:
          "Regulaciones y estándares para proteger información personal identificable, datos de salud y datos de tarjetas de pago.",
      },
      {
        prompt:
          "¿Qué característica de Big Data se refiere al valor comercial que se puede extraer del análisis de grandes volúmenes?",
        answer: "Value (Valor).",
      },
      {
        prompt: "Diferencia entre `repartition()` y `coalesce()` en Spark.",
        answer:
          "`repartition()` realiza un shuffle completo para redistribuir datos, mientras que `coalesce()` reduce el número de particiones minimizando el shuffle.",
      },
      {
        prompt: '¿Qué es el "Catalyst Optimizer"?',
        answer:
          "El motor de optimización de consultas de Spark SQL que genera planes de ejecución eficientes.",
      },
      {
        prompt:
          "¿Qué formato de almacenamiento es mejor para realizar operaciones OLTP (inserción y actualización rápida)?",
        answer: "Almacenamiento basado en filas (Row-based storage).",
      },
      {
        prompt:
          "¿Qué formato de almacenamiento es mejor para operaciones OLAP (análisis y agregaciones)?",
        answer: "Almacenamiento basado en columnas (Columnar storage).",
      },
      {
        prompt:
          "En jspark, ¿cómo se definen las credenciales si no se usan argumentos de línea de comandos?",
        answer:
          "En el archivo de configuración `application.conf` dentro de la sección `credentials`.",
      },
      {
        prompt: "¿Qué permite la función `broadcast()` en un join de Spark?",
        answer:
          "Enviar una copia de un dataset pequeño a todos los nodos ejecutores para acelerar la unión con un dataset grande.",
      },
      {
        prompt: "¿Qué es una transacción ACID?",
        answer:
          "Un conjunto de propiedades que garantizan que las operaciones de base de datos se procesen de manera confiable.",
      },
      {
        prompt: "En Iceberg, ¿qué indica el archivo `.parquet.crc`?",
        answer:
          "Es un archivo de control de redundancia cíclica para verificar la integridad del archivo Parquet asociado.",
      },
      {
        prompt: '¿Qué es el "Metadata Layer" en un Data Lakehouse?',
        answer:
          "Una capa que gestiona transacciones y metadatos sobre archivos en almacenamiento de bajo coste, como S3 o ADLS.",
      },
      {
        prompt:
          "¿Cuál es la función del archivo `core-site.xml` en una configuración de Spark/Hadoop?",
        answer:
          "Almacenar configuraciones a nivel de sitio, incluyendo credenciales de sistemas de archivos externos.",
      },
      {
        prompt:
          "¿Qué herramienta permite virtualizar el entorno de Python para instalar la extensión de JupyterLab?",
        answer: "pipenv.",
      },
      {
        prompt: '¿Qué es un "Executor Core" en la configuración de Spark?',
        answer:
          "La unidad de procesamiento (CPU) asignada a un ejecutor para realizar tareas en paralelo.",
      },
      {
        prompt:
          '¿Cuál es el propósito del "Staging Bucket" en las plantillas de Dataproc Serverless?',
        answer:
          "Almacenar temporalmente archivos necesarios para la ejecución del workload en Cloud Storage.",
      },
      {
        prompt:
          "¿Qué sucede si no se especifica una cuenta de servicio en una plantilla de Spark Serverless?",
        answer:
          "Se utiliza por defecto la cuenta de servicio predeterminada de Compute Engine.",
      },
      {
        prompt: "En JSON, ¿cómo se representa un valor nulo?",
        answer: "Con la palabra clave `null`.",
      },
      {
        prompt:
          '¿Qué técnica de compresión en Parquet es conocida como "incremental encoding"?',
        answer: "Delta Strings.",
      },
      {
        prompt:
          "¿Qué significa que un DataFrame sea conceptualmente equivalente a una tabla en una base de datos relacional?",
        answer:
          "Que tiene una estructura definida por columnas con nombre y tipos de datos específicos.",
      },
      {
        prompt:
          "Según la documentación de Spark 4.1.1, ¿Python soporta la API de Dataset?",
        answer: "No, debido a su naturaleza dinámica.",
      },
      {
        prompt:
          "¿Qué comando de `gcloud` se usa para inicializar la configuración del proyecto y la región?",
        answer: "gcloud init",
      },
      {
        prompt:
          "¿Cuál es la versión mínima de Python requerida para instalar la extensión de JupyterLab de Dataproc?",
        answer: "Python 3.11 o superior.",
      },
    ],
  },
  {
    id: "clean_architecture",
    name: "Clean Architecture",
    cards: [
      {
        prompt:
          "¿Cuál es la regla primordial que hace funcionar la Arquitectura Limpia (Clean Architecture)?",
        answer:
          "La Regla de Dependencia: las dependencias del código fuente solo deben apuntar hacia adentro, hacia políticas de más alto nivel.",
      },
      {
        prompt:
          "En la Arquitectura Lambda, ¿cuál es la función de la capa de lote (batch layer)?",
        answer:
          "Calcular vistas (batch views) a partir de todo el conjunto de datos maestro, ofreciendo una visión completa y precisa de los datos.",
      },
      {
        prompt:
          "Según los principios SOLID, ¿qué establece el Principio de Responsabilidad Única (SRP)?",
        answer:
          "Un módulo de software debe tener una, y solo una, razón para cambiar, lo que significa que debe ser responsable ante un único actor.",
      },
      {
        prompt:
          "La Arquitectura Hexagonal también se conoce como el patrón de _____ y _____.",
        answer: "Puertos y Adaptadores (Ports and Adapters)",
      },
      {
        prompt:
          '¿Qué es la "inmutabilidad" en el contexto de un modelo de datos para Big Data?',
        answer:
          "Es la propiedad por la cual, una vez que se escribe una unidad de datos, nunca puede ser modificada; las actualizaciones se logran agregando nuevos datos con marca de tiempo.",
      },
      {
        prompt:
          "¿Qué establece el Principio de Inversión de Dependencias (DIP)?",
        answer:
          "El código que implementa políticas de alto nivel no debe depender del código que implementa detalles de bajo nivel; en su lugar, los detalles deben depender de las políticas.",
      },
      {
        prompt:
          "En la Arquitectura Lambda, ¿cuál es el propósito de la capa de servicio (serving layer)?",
        answer:
          "Indexar y exponer las vistas de lote (batch views) para que puedan ser consultadas con baja latencia.",
      },
      {
        prompt:
          "Un síntoma de la violación del Principio de Responsabilidad Única (SRP) es cuando dos actores diferentes dependen del mismo código, lo que puede llevar a _____ durante el desarrollo.",
        answer: "conflictos de fusión (merges)",
      },
      {
        prompt: "En una Arquitectura Hexagonal, ¿qué representa un 'puerto'?",
        answer:
          "Un 'puerto' es una interfaz que define cómo la lógica de dominio puede ser accedida o cómo puede interactuar con sistemas externos.",
      },
      {
        prompt:
          "¿Por qué la tolerancia a fallos humanos es la ventaja más importante del modelo de datos inmutable?",
        answer:
          "Porque si se escriben datos incorrectos, los datos buenos anteriores aún existen, lo que permite la recuperación simplemente eliminando los datos incorrectos y recalculando las vistas.",
      },
      {
        prompt:
          '¿Qué significa que una arquitectura "grite" su intención (Screaming Architecture)?',
        answer:
          "Significa que la estructura de paquetes y nombres de clases del sistema comunica claramente su propósito y los casos de uso que implementa.",
      },
      {
        prompt:
          "El paradigma de computación distribuida que se puede utilizar para implementar una capa de lote y que es inherentemente escalable se conoce como _____.",
        answer: "MapReduce",
      },
      {
        prompt:
          "Según el Principio Abierto/Cerrado (OCP), ¿cómo deben diseñarse los sistemas de software para que sean fáciles de cambiar?",
        answer:
          "Deben permitir que su comportamiento se cambie agregando nuevo código, en lugar de modificar el código existente.",
      },
      {
        prompt:
          "En la Arquitectura Limpia, ¿qué tipo de reglas de negocio se encuentran en la capa de Casos de Uso (Use Cases)?",
        answer:
          "Contiene reglas de negocio específicas de la aplicación que orquestan el flujo de datos hacia y desde las entidades.",
      },
      {
        prompt:
          '¿Qué es la "desnormalización" en el contexto de las bases de datos de la capa de servicio?',
        answer:
          "Es la técnica de almacenar información de forma redundante para evitar uniones (joins) en tiempo de consulta y así mejorar la latencia.",
      },
      {
        prompt:
          "¿Qué problema resuelve el Principio de Segregación de Interfaces (ISP)?",
        answer:
          "Evita que los clientes dependan de métodos que no utilizan, aconsejando la creación de interfaces más pequeñas y específicas.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia entre los datos y la información en el contexto de los sistemas de Big Data?",
        answer:
          "Los 'datos' son la información que no se puede derivar de nada más (los axiomas), mientras que la 'información' es la colección general de conocimiento.",
      },
      {
        prompt:
          "En la Arquitectura Limpia, los _____ son los objetos que encapsulan las reglas de negocio críticas para toda la empresa.",
        answer: "Entidades (Entities)",
      },
      {
        prompt:
          "¿Cuál es la función del procesamiento de flujos (stream processing) de 'un solo elemento a la vez' (one-at-a-time)?",
        answer:
          "Procesar los datos evento por evento a medida que llegan, lo que es ideal para baja latencia pero puede ser ineficiente.",
      },
      {
        prompt:
          "El Principio de Sustitución de Liskov (LSP) establece que los objetos de una superclase deben poder ser reemplazados por objetos de una _____ sin alterar la corrección del programa.",
        answer: "subclase",
      },
      {
        prompt:
          "En una Arquitectura Hexagonal, ¿qué representa un 'adaptador'?",
        answer:
          "Un 'adaptador' es una implementación concreta de un puerto que interactúa con un sistema externo, como una base de datos o una interfaz de usuario web.",
      },
      {
        prompt:
          "¿Qué es el procesamiento de flujos por 'micro-lotes' (micro-batch stream processing)?",
        answer:
          "Es un enfoque que procesa tuplas como lotes discretos, combinando la eficiencia del procesamiento por lotes con la baja latencia del procesamiento de flujos.",
      },
      {
        prompt:
          "En la Arquitectura Limpia, ¿dónde se ubican los frameworks y los drivers (por ejemplo, la base de datos, la UI web)?",
        answer:
          "Se ubican en el círculo más externo, ya que son detalles de bajo nivel de los que las políticas de alto nivel no deben depender.",
      },
      {
        prompt:
          "Al diseñar una capa de servicio, ¿por qué un índice de tipo 'clave a mapa ordenado' (key to a sorted map) es ideal para consultas de rangos de tiempo?",
        answer:
          "Porque todos los valores para un rango se almacenan secuencialmente en el disco, lo que hace que sea extremadamente barato leerlos todos a la vez.",
      },
      {
        prompt:
          "Una arquitectura de software debe ser agnóstica a la _____ de los cambios para evitar que el costo de desarrollo crezca desproporcionadamente.",
        answer: "forma (shape)",
      },
      {
        prompt:
          "Para hacer cumplir los límites de la arquitectura en Java, se puede usar el modificador de visibilidad _____ para limitar el acceso a clases dentro del mismo paquete.",
        answer: "package-private",
      },
      {
        prompt: '¿Qué es una "arquitectura de plugin"?',
        answer:
          "Es un patrón donde las reglas de negocio principales se mantienen separadas e independientes de componentes que son opcionales o que pueden tener múltiples implementaciones.",
      },
      {
        prompt:
          "En la implementación de la capa de persistencia, ¿qué ventaja ofrece el uso de interfaces de puerto estrechas (narrow port interfaces)?",
        answer:
          "Proporciona la flexibilidad de implementar un puerto de una manera y otro de otra, posiblemente con diferentes tecnologías de persistencia.",
      },
      {
        prompt:
          "El paradigma de programación que impone disciplina en la transferencia indirecta de control se llama _____.",
        answer:
          "Programación Orientada a Objetos (Object-Oriented Programming)",
      },
      {
        prompt:
          'En el contexto de los sistemas distribuidos, ¿qué es la "consistencia eventual" (eventual consistency)?',
        answer:
          "Es la propiedad de un sistema altamente disponible donde, una vez que termina una partición de red, el sistema eventualmente vuelve a un estado consistente.",
      },
      {
        prompt:
          "Según Robert C. Martin, ¿cuál es el único modo de ir rápido en el desarrollo de software?",
        answer:
          "Ir bien, lo que implica mantener el código y la arquitectura limpios y bien estructurados.",
      },
      {
        prompt:
          '¿Qué es la "normalización de URL" en el contexto de un flujo de trabajo de la capa de lote?',
        answer:
          "Es el proceso de convertir todas las URLs de los datos maestros a su forma canónica para asegurar la consistencia en los cálculos.",
      },
      {
        prompt:
          "El patrón _____ sirve para desacoplar comportamientos complejos o difíciles de probar en una parte que es fácilmente comprobable y otra que no lo es.",
        answer: "Humble Object",
      },
      {
        prompt: "En el paradigma MapReduce, ¿qué hace la función `map`?",
        answer:
          "Examina un registro a la vez y emite un par clave-valor intermedio.",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de desacoplar la lógica de dominio de la interfaz de usuario y la persistencia?",
        answer:
          "Permite que la lógica de dominio evolucione independientemente, haciendo el software más mantenible y adaptable a los cambios.",
      },
      {
        prompt: "En el paradigma MapReduce, ¿qué hace la función `reduce`?",
        answer:
          "Recibe una clave y todos los valores asociados a esa clave y los procesa para producir el resultado final.",
      },
      {
        prompt:
          "En la Arquitectura Limpia, el flujo de control y la dependencia del código fuente no siempre apuntan en la misma dirección gracias al principio de _____.",
        answer: "Inversión de Dependencias (Dependency Inversion)",
      },
      {
        prompt:
          '¿Qué son los "diagramas de tuberías" (pipe diagrams) en el contexto de la computación por lotes?',
        answer:
          "Son una forma de alto nivel para especificar computaciones sobre grandes cantidades de datos que pueden ser compiladas a una serie de trabajos MapReduce.",
      },
      {
        prompt:
          "¿Qué son las dependencias transitivas y por qué son una violación de un buen diseño?",
        answer:
          "Ocurren cuando una entidad depende de algo que no usa directamente; violan el principio de no depender de cosas que no son necesarias.",
      },
      {
        prompt:
          "La capacidad de un lenguaje orientado a objetos que permite que el mismo código funcione con diferentes tipos de objetos se denomina _____.",
        answer: "polimorfismo",
      },
      {
        prompt:
          "En un sistema de Big Data, el conjunto de datos maestro debe ser una fuente de verdad _____ y _____, conteniendo únicamente datos brutos.",
        answer: "inmutable y de solo adición (append-only)",
      },
      {
        prompt:
          "El patrón de diseño _____ establece una interfaz utilizada por los clientes e implementada por clases de servicio, sentando las bases para un futuro límite arquitectónico.",
        answer: "Strategy",
      },
      {
        prompt:
          "¿Cuál es el propósito del framework de serialización Thrift en un modelo de datos de Big Data?",
        answer:
          "Permite definir y hacer cumplir un esquema riguroso para los datos, generando código para leer, escribir y validar objetos que coincidan con el esquema.",
      },
      {
        prompt:
          "Un monolito, en términos de modo de desacoplamiento, es una estructura donde todos los componentes se ejecutan en el mismo espacio de direcciones y se comunican mediante _____.",
        answer: "llamadas a funciones simples",
      },
      {
        prompt:
          "El algoritmo _____ es un ejemplo de un algoritmo de aproximación para el conteo de elementos distintos que puede usarse para reducir el tamaño de las vistas de lote.",
        answer: "HyperLogLog",
      },
      {
        prompt:
          "¿Cuál es el objetivo principal al trazar límites (boundaries) en la arquitectura de software?",
        answer:
          "Separar los elementos de software y restringir el conocimiento entre ellos, permitiendo aplazar decisiones y proteger la lógica de negocio principal.",
      },
      {
        prompt:
          "¿Cuál es la consecuencia clave de la inmutabilidad de los datos en un sistema de Big Data?",
        answer:
          "Cada pieza de dato es verdadera a perpetuidad; una vez que un dato es verdadero, siempre lo será.",
      },
      {
        prompt:
          '¿Qué es la "denormalización de identificador de usuario" en un sistema de análisis web?',
        answer:
          "Es el proceso de consolidar múltiples identificadores de usuario que pertenecen a la misma persona en un único identificador canónico.",
      },
      {
        prompt:
          "El patrón _____ es un límite arquitectónico simple que sacrifica la inversión de dependencias, donde una clase expone todos los servicios como métodos.",
        answer: "Facade",
      },
      {
        prompt:
          "En el contexto del modelo basado en hechos (fact-based model), ¿qué son las 'propiedades'?",
        answer:
          "Son información sobre las entidades, como la edad, el género o la ubicación de un usuario.",
      },
      {
        prompt:
          "El paradigma de programación funcional se basa en la noción de _____, lo que significa que el valor de los símbolos no cambia.",
        answer: "inmutabilidad",
      },
      {
        prompt:
          "En un sistema de archivos distribuido como HDFS, ¿cómo se logra la tolerancia a fallos?",
        answer:
          "Los bloques de archivos se replican en múltiples nodos, por lo que los datos siguen estando disponibles incluso si una máquina falla.",
      },
      {
        prompt:
          "La programación estructurada demostró que todos los programas pueden construirse a partir de solo tres estructuras: secuencia, selección y _____.",
        answer: "iteración",
      },
      {
        prompt:
          "En la Arquitectura Lambda, ¿por qué es esencial tener un flujo de trabajo de recálculo puro, incluso si se utilizan optimizaciones incrementales?",
        answer:
          "Porque es necesario para reconstruir las vistas desde cero en caso de que se corrompan o si la lógica de cálculo cambia.",
      },
      {
        prompt:
          "La métrica de estabilidad de componentes 'Fan-in' mide el número de dependencias _____.",
        answer: "entrantes (clases externas que dependen de clases internas)",
      },
      {
        prompt:
          "¿Qué problema puede causar el uso de entidades de dominio directamente como modelos de entrada o salida en un caso de uso?",
        answer:
          "Puede crear un acoplamiento no deseado entre la lógica de dominio y los adaptadores externos, violando la separación de conceptos.",
      },
      {
        prompt:
          "La métrica de estabilidad de componentes 'Fan-out' mide el número de dependencias _____.",
        answer: "salientes (clases internas que dependen de clases externas)",
      },
      {
        prompt:
          "¿Qué es la estrategia de mapeo 'completa' (full mapping) entre capas?",
        answer:
          "Utiliza modelos de entrada y salida separados para cada caso de uso, proporcionando el máximo desacoplamiento entre las capas.",
      },
      {
        prompt:
          "El Principio de Dependencias Estables (SDP) establece que se debe depender en la dirección de la _____.",
        answer: "estabilidad",
      },
      {
        prompt:
          "¿Por qué es crucial que los datos que cruzan los límites de la Arquitectura Limpia sean estructuras de datos simples y aisladas?",
        answer:
          "Para evitar violar la Regla de Dependencia, ya que pasar estructuras complejas (como un 'row structure' de una base de datos) forzaría a un círculo interno a conocer algo de un círculo externo.",
      },
      {
        prompt:
          "Un ciclo en el grafo de dependencias de componentes puede fusionar efectivamente varios componentes en uno solo, causando el síndrome de 'la mañana siguiente' donde los desarrolladores _____.",
        answer: "se pisan unos a otros (stepping on each other's toes)",
      },
      {
        prompt:
          "El Principio de Abstracciones Estables (SAP) establece que un componente debe ser tan abstracto como _____.",
        answer: "estable",
      },
      {
        prompt:
          "En el contexto del firmware, la abstracción de hardware (HAL) sirve como una capa que aísla el software de los detalles específicos del _____, mejorando la portabilidad.",
        answer: "hardware",
      },
      {
        prompt:
          "Al diseñar un sistema, la arquitectura que se elige a menudo está fuertemente influenciada por la estructura _____ de la organización que lo desarrolla, un concepto relacionado con la Ley de Conway.",
        answer: "social",
      },
      {
        prompt:
          "¿Cuál es uno de los principales riesgos de basar la arquitectura de una aplicación en un framework?",
        answer:
          "El framework a menudo viola la Regla de Dependencia y se acopla fuertemente al núcleo del negocio, dificultando su posterior eliminación o cambio.",
      },
      {
        prompt:
          "La dificultad para realizar un cambio en el software debe ser proporcional al _____ del cambio, no a su forma.",
        answer: "alcance (scope)",
      },
      {
        prompt:
          "¿Qué es la falacia del desacoplamiento en las arquitecturas de microservicios?",
        answer:
          "Es la creencia errónea de que los servicios están fuertemente desacoplados, cuando en realidad a menudo están acoplados por datos o comportamiento.",
      },
      {
        prompt:
          "En JCascalog, un _____ es una función de Java que genera dinámicamente una subconsulta, permitiendo la composición y reutilización de lógica.",
        answer: "macro de predicado (predicate macro)",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre la validación de entrada y la validación de reglas de negocio en un caso de uso?",
        answer:
          "La validación de entrada verifica la sintaxis y el formato, mientras que la validación de reglas de negocio se ocupa de la lógica de dominio y el estado del modelo.",
      },
      {
        prompt:
          "El término 'gran bola de lodo' (big ball of mud) se usa para describir un sistema de software que carece de una _____ perceptible.",
        answer: "arquitectura",
      },
      {
        prompt:
          "En el contexto de la capa de velocidad (speed layer), ¿por qué las operaciones idempotentes, como agregar a un conjunto HyperLogLog, son importantes para la tolerancia a fallos?",
        answer:
          "Porque si una operación falla y se reintenta, ejecutarla varias veces tiene el mismo efecto que ejecutarla una sola vez, manteniendo la precisión del sistema.",
      },
    ],
  },
  {
    id: "devops",
    name: "Devops",
    cards: [
      {
        prompt:
          "¿Cuál es el objetivo principal de la metodología de la App de 12 Factores?",
        answer:
          "Abordar las complejidades de construir y mantener aplicaciones de software modernas en entornos de nube, impulsando la agilidad y escalabilidad.",
      },
      {
        prompt:
          "Según la App de 12 Factores, ¿cómo debe ser gestionado el código base de una aplicación?",
        answer:
          "Debe haber una única base de código rastreada en un control de versiones, que acompañe a múltiples despliegues diversificados.",
      },
      {
        prompt:
          "El principio de _____ de la App de 12 Factores requiere declarar y aislar explícitamente las dependencias del software.",
        answer: "Dependencias (Dependencies)",
      },
      {
        prompt:
          "¿Dónde debe almacenarse la configuración de una aplicación según el tercer factor de la App de 12 Factores?",
        answer:
          "La configuración debe almacenarse en el entorno (environment), por ejemplo, como variables de entorno.",
      },
      {
        prompt:
          "¿Cómo deben ser tratados los servicios de respaldo (backing services) como bases de datos o sistemas de mensajería según la App de 12 Factores?",
        answer:
          "Deben ser tratados como recursos adjuntos, permitiendo cambiarlos sin modificar el código de la aplicación.",
      },
      {
        prompt:
          "La metodología de la App de 12 Factores exige una separación estricta entre las etapas de _____, _____ y _____.",
        answer: "Compilación (Build), Lanzamiento (Release) y Ejecución (Run)",
      },
      {
        prompt:
          "De acuerdo con el sexto factor de la App de 12 Factores, ¿cómo debe ejecutarse la aplicación?",
        answer:
          "Como uno o más procesos sin estado (stateless) que no retienen datos entre ejecuciones.",
      },
      {
        prompt:
          "¿Qué principio de la App de 12 Factores establece que los servicios deben exportarse a través de la vinculación a puertos (port binding)?",
        answer: "El séptimo principio, Port Binding.",
      },
      {
        prompt:
          "¿Cómo se logra la concurrencia en una App de 12 Factores para manejar una mayor carga?",
        answer:
          "Escalando la aplicación horizontalmente mediante el modelo de procesos.",
      },
      {
        prompt:
          "¿Qué significa el principio de 'Desechabilidad' (Disposability) en la App de 12 Factores?",
        answer:
          "Significa que los procesos deben poder iniciarse rápidamente y apagarse de forma fiable para maximizar la robustez del sistema.",
      },
      {
        prompt:
          "Para evitar inconsistencias y errores específicos del entorno, ¿qué recomienda el principio de 'Paridad Dev/Prod'?",
        answer:
          "Mantener los entornos de desarrollo, preproducción (staging) y producción lo más similares posible.",
      },
      {
        prompt:
          "Según el factor 'Logs' de la App de 12 Factores, ¿cómo deben ser tratados los registros (logs)?",
        answer:
          "Como flujos de eventos (event streams), dirigiéndolos a un servicio de agregación centralizado en lugar de gestionarlos en archivos locales.",
      },
      {
        prompt:
          "¿Qué es un SBOM (Software Bill of Materials) en el contexto de la seguridad de la cadena de suministro de software?",
        answer:
          "Es un inventario formal de los componentes y dependencias que componen una aplicación de software moderna.",
      },
      {
        prompt: "¿Cuál es el objetivo principal de las herramientas FinOps?",
        answer:
          "Proporcionar visibilidad en tiempo real sobre el uso de recursos en la nube y sus costos asociados para optimizar el gasto sin sacrificar el rendimiento.",
      },
      {
        prompt:
          "Las herramientas FinOps autónomas, como Sedai, se diferencian de las tradicionales porque no solo ofrecen recomendaciones, sino que también _____.",
        answer:
          "actúan de forma autónoma para ajustar recursos y optimizar costos en tiempo real",
      },
      {
        prompt: "Concepto: Plataforma de Ingeniería (Platform Engineering)",
        answer:
          "Es un enfoque que se centra en crear plataformas internas para desarrolladores (IDPs) que simplifican el desarrollo de software proporcionando capacidades de autoservicio y automatizando operaciones de infraestructura.",
      },
      {
        prompt:
          "Uno de los beneficios clave de las Plataformas Internas para Desarrolladores (IDPs) es la reducción de la _____ en los desarrolladores al abstraer las complejidades de la infraestructura.",
        answer: "carga cognitiva (cognitive load)",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia en la estrategia de despliegue entre Blue-Green y Canary?",
        answer:
          "Blue-Green cambia todo el tráfico a un nuevo entorno de una vez, mientras que Canary lo desvía gradualmente a un pequeño subconjunto de usuarios.",
      },
      {
        prompt:
          "En una estrategia de despliegue Blue-Green, ¿qué representa el entorno 'azul' y qué representa el 'verde'?",
        answer:
          "El 'azul' representa la versión de producción actual y estable, mientras que el 'verde' es el nuevo entorno con la versión a liberar.",
      },
      {
        prompt:
          "¿Qué ventaja principal ofrece el despliegue Blue-Green en términos de reversión (rollback)?",
        answer:
          "Permite una reversión casi instantánea simplemente redirigiendo el tráfico de vuelta al entorno anterior (azul).",
      },
      {
        prompt:
          "¿Cuál es la principal desventaja del despliegue Blue-Green en términos de recursos?",
        answer:
          "Requiere el doble de infraestructura, ya que se deben mantener dos entornos de producción idénticos simultáneamente.",
      },
      {
        prompt:
          "La estrategia de despliegue _____ es ideal para identificar problemas potenciales antes de que afecten a todos los usuarios, al exponer los cambios a un pequeño porcentaje de ellos.",
        answer: "Canary",
      },
      {
        prompt:
          "¿Para qué tipo de aplicaciones es especialmente adecuada la estrategia Canary?",
        answer:
          "Para aplicaciones orientadas al consumidor donde los cambios en la experiencia del usuario pueden tener un gran impacto en el negocio.",
      },
      {
        prompt:
          "¿Qué herramienta de Kubernetes se especializa en estrategias de despliegue avanzadas como Blue-Green y Canary, extendiendo la funcionalidad de los Deployments nativos?",
        answer: "Argo Rollouts.",
      },
      {
        prompt: "Defina GitOps.",
        answer:
          "Es un marco operativo para Kubernetes que utiliza Git como la única fuente de verdad para la infraestructura declarativa y las aplicaciones.",
      },
      {
        prompt:
          "Herramientas como _____ y _____ son implementaciones populares del modelo GitOps para Kubernetes.",
        answer: "ArgoCD, Flux",
      },
      {
        prompt:
          "¿Qué significa que GitOps tenga capacidades de 'auto-sanación' (self-healing)?",
        answer:
          "El agente de GitOps detecta desviaciones (drift) entre el estado del clúster y el estado en Git, y revierte automáticamente los cambios manuales no autorizados.",
      },
      {
        prompt:
          "En Infraestructura como Código (IaC), ¿cuál es la principal diferencia entre Terraform y Crossplane en cuanto a su modelo operativo?",
        answer:
          "Terraform sigue un flujo de 'planificar y aplicar' que se ejecuta bajo demanda, mientras que Crossplane utiliza un modelo de reconciliación continua nativo de Kubernetes.",
      },
      {
        prompt:
          "¿En qué almacena Terraform el estado de la infraestructura que gestiona?",
        answer:
          "En un archivo de estado (state file), que puede ser local o remoto, y que mapea los recursos definidos con las instancias reales en la nube.",
      },
      {
        prompt:
          "¿Cómo permite Pulumi definir la infraestructura como código de una manera diferente a Terraform?",
        answer:
          "Permite usar lenguajes de programación de propósito general (como Python o TypeScript) en lugar de un lenguaje específico de dominio (HCL).",
      },
      {
        prompt:
          "Crossplane extiende Kubernetes para que actúe como un plano de control universal, definiendo los recursos de infraestructura como _____.",
        answer: "Recursos Personalizados (Custom Resources o CRDs)",
      },
      {
        prompt:
          "Una de las mejores prácticas para las pipelines de CI/CD en Kubernetes es escanear las imágenes de contenedor en busca de _____ antes de desplegarlas.",
        answer: "vulnerabilidades",
      },
      {
        prompt:
          "¿Por qué es una mala práctica usar etiquetas de imagen mutables como ':latest' en despliegues de producción de Kubernetes?",
        answer:
          "Porque la imagen real a la que apunta la etiqueta puede cambiar, lo que dificulta la reproducibilidad y las reversiones fiables.",
      },
      {
        prompt: "Concepto: Observabilidad",
        answer:
          "La capacidad de inferir el estado interno de un sistema a partir de sus salidas externas (telemetría), permitiendo responder preguntas sobre fallos desconocidos.",
      },
      {
        prompt:
          "¿Cuáles son los tres pilares de la telemetría en la observabilidad?",
        answer: "Métricas (Metrics), Registros (Logs) y Trazas (Traces).",
      },
      {
        prompt:
          "En observabilidad, las _____ proporcionan datos numéricos sobre el rendimiento (el 'qué'), los _____ proporcionan registros de eventos detallados (el 'porqué'), y las _____ rastrean flujos de peticiones (el 'dónde').",
        answer: "métricas, registros, trazas",
      },
      {
        prompt:
          "¿Qué estándar de código abierto se ha convertido en la norma universal para instrumentar aplicaciones y recopilar telemetría de forma agnóstica al proveedor?",
        answer: "OpenTelemetry.",
      },
      {
        prompt:
          "¿Cuál es la diferencia fundamental entre el balanceo de carga de Capa 4 (L4) y el de Capa 7 (L7)?",
        answer:
          "L4 opera en la capa de transporte (TCP/UDP) basándose en IP y puerto, mientras que L7 opera en la capa de aplicación (HTTP) y puede inspeccionar el contenido.",
      },
      {
        prompt:
          "El balanceo de carga de _____ es más rápido y consume menos CPU porque no inspecciona el contenido de los paquetes de datos.",
        answer: "Capa 4 (L4)",
      },
      {
        prompt:
          "¿En qué escenarios es ideal el uso de balanceo de carga de Capa 4 (L4)?",
        answer:
          "En escenarios de alto rendimiento donde la velocidad es crítica, como streaming de video, servidores de juegos o distribución de consultas de bases de datos.",
      },
      {
        prompt:
          "El balanceo de carga de Capa 7 (L7) permite tomar decisiones de enrutamiento inteligentes basadas en _____, _____ o cookies.",
        answer: "URLs, cabeceras HTTP",
      },
      {
        prompt:
          "¿Qué práctica de gestión de secretos moderna aboga por credenciales bajo demanda que expiran automáticamente?",
        answer: "Generación dinámica de secretos.",
      },
      {
        prompt:
          "Para minimizar la exposición de secretos, la práctica de 'remover a los humanos del ciclo' (remove humans from the loop) utiliza _____ para que los desarrolladores nunca vean las credenciales de producción.",
        answer:
          "inyección automatizada e intermediación de sesiones (session brokering)",
      },
      {
        prompt:
          "¿Qué implica el patrón de 'acceso justo a tiempo' (Just-in-Time Access) en la gestión de secretos?",
        answer:
          "Proporcionar acceso a un secreto solo cuando es necesario y revocarlo automáticamente cuando ya no se requiere.",
      },
      {
        prompt:
          "En el contexto de Kubernetes, ¿qué son los 'Naked Pods' y por qué su uso es riesgoso en producción?",
        answer:
          "Son Pods no gestionados por un controlador (como un Deployment). Si el nodo falla, el Pod desaparece y no se reprograma automáticamente.",
      },
      {
        prompt:
          "Para aplicaciones sin estado que deben estar siempre en ejecución, ¿qué objeto de Kubernetes es preferible usar en lugar de Pods directamente?",
        answer:
          "Un Deployment, que gestiona un ReplicaSet para asegurar el número deseado de Pods y maneja las actualizaciones.",
      },
      {
        prompt:
          "¿Qué objeto de Kubernetes es esencial para aplicaciones que requieren identificadores de red estables y almacenamiento persistente, como las bases de datos?",
        answer: "StatefulSet.",
      },
      {
        prompt:
          "Las _____ en Kubernetes proporcionan una forma de dividir los recursos del clúster entre múltiples usuarios o equipos, actuando como clústeres virtuales.",
        answer: "Namespaces (espacios de nombres)",
      },
      {
        prompt:
          "¿Para qué se utilizan las Políticas de Red (Network Policies) en Kubernetes?",
        answer:
          "Para controlar el flujo de tráfico entre grupos de pods y otras terminales de red, mejorando la seguridad al restringir la comunicación.",
      },
      {
        prompt:
          "La herramienta de código abierto _____ permite a los equipos de DevOps gestionar despliegues de Kubernetes, mientras que la herramienta _____ gestiona la configuración de la infraestructura subyacente.",
        answer: "ArgoCD, Terraform",
      },
      {
        prompt:
          "¿Qué es un Servicio 'headless' en Kubernetes y para qué se utiliza?",
        answer:
          "Es un servicio con `clusterIP: None`. En lugar de balancear la carga, devuelve las IPs de todos los pods individuales, útil para aplicaciones que gestionan sus propias conexiones.",
      },
      {
        prompt:
          "¿Qué componente del Plano de Control de Kubernetes es responsable de asignar los pods a los nodos basándose en la disponibilidad de recursos?",
        answer: "El Scheduler (kube-scheduler).",
      },
      {
        prompt:
          "El _____ actúa como el frontend del plano de control de Kubernetes, exponiendo la API de Kubernetes para gestionar el clúster.",
        answer: "API Server (kube-apiserver)",
      },
      {
        prompt:
          "¿Cuál es la función del Controller Manager (kube-controller-manager) en Kubernetes?",
        answer:
          "Ejecuta bucles de control que monitorean continuamente el estado del clúster y realizan ajustes para mantener el estado deseado.",
      },
      {
        prompt:
          "La base de datos clave-valor distribuida y altamente disponible que Kubernetes utiliza para almacenar todos los datos del clúster se llama _____.",
        answer: "etcd",
      },
      {
        prompt:
          "En Kubernetes, el _____ escala automáticamente el número de pods en un deployment basándose en métricas como la utilización de CPU.",
        answer: "Horizontal Pod Autoscaler (HPA)",
      },
      {
        prompt:
          "¿Qué es la Inyección de Sidecar (Sidecar Injection) en Kubernetes?",
        answer:
          "Es un patrón donde se inyecta un contenedor adicional (sidecar) en un Pod para extender o mejorar la funcionalidad del contenedor principal, como para logging o monitoreo.",
      },
      {
        prompt:
          "La práctica de CI/CD 'pull-based' (basada en extracción) utiliza un agente dentro del clúster de Kubernetes que _____ cambios desde el repositorio de control de versiones.",
        answer: "extrae (pulls)",
      },
      {
        prompt:
          "¿Qué es la 'deriva de configuración' (configuration drift) en el contexto de GitOps?",
        answer:
          "Es la discrepancia entre el estado real de la infraestructura y el estado deseado definido en el repositorio de Git.",
      },
      {
        prompt:
          "El enfoque 'Augmented FinOps' de CloudBolt combina IA, automatización de ciclo completo y despliegue multi-nube para un análisis de costos de TI completo, incluyendo _____.",
        answer: "Kubernetes",
      },
      {
        prompt:
          "¿Qué significa VEX (Vulnerability Exploitability eXchange) y cómo ayuda a reducir la fatiga de alertas?",
        answer:
          "Es un formato que indica si una vulnerabilidad conocida en un componente de software es realmente explotable en un producto específico, permitiendo filtrar falsos positivos.",
      },
      {
        prompt:
          "El framework _____ se centra en la integridad de la construcción y procedencia del software desde la perspectiva del productor.",
        answer: "SLSA (Supply-chain Levels for Software Artifacts)",
      },
      {
        prompt:
          "¿Qué framework complementa a SLSA centrándose en el consumo seguro de dependencias de código abierto por parte del consumidor?",
        answer: "S2C2F (Secure Supply Chain Consumption Framework)",
      },
      {
        prompt:
          "Una de las mejores prácticas de configuración de Kubernetes es escribir los manifiestos en _____ en lugar de JSON por su legibilidad para los humanos.",
        answer: "YAML",
      },
      {
        prompt:
          "Las etiquetas (labels) en Kubernetes son pares clave/valor que permiten organizar y seleccionar recursos. ¿Cómo se puede usar `kubectl` para eliminar temporalmente una etiqueta de un pod para depuración?",
        answer:
          "Usando el comando `kubectl label pod <nombre-pod> <etiqueta>-`.",
      },
      {
        prompt:
          "El objetivo de la metodología de la App de 12 Factores es crear aplicaciones _____ que sean adecuadas para el despliegue en entornos distribuidos y críticos.",
        answer: "escalables, mantenibles y resilientes",
      },
      {
        prompt:
          "¿Qué herramienta de FinOps está diseñada para optimizar los costos de contenedores de Kubernetes detallando los costos por clúster, namespace o pod?",
        answer: "Datadog.",
      },
      {
        prompt:
          "La herramienta Xosphere se especializa en la optimización de costos en AWS reemplazando automáticamente instancias bajo demanda por _____ cuando están disponibles a un precio razonable.",
        answer: "Instancias Spot de AWS",
      },
      {
        prompt:
          "CloudZero se describe como una herramienta de observabilidad de costos que permite desglosar los costos en métricas como costo por _____, costo por _____ o costo por _____.",
        answer: "despliegue, característica de producto, cliente",
      },
      {
        prompt:
          "En el contexto de la madurez de FinOps, se compara el proceso con el de un bebé que primero gatea, luego camina y finalmente corre. ¿Qué implica esto para una organización?",
        answer:
          "Que la adopción de FinOps es un proceso gradual y está bien estar en diferentes etapas de madurez en diferentes áreas.",
      },
      {
        prompt:
          "Argo Rollouts puede realizar despliegues canary básicos sin necesidad de una _____ para escenarios simples, lo que simplifica la configuración inicial.",
        answer: "malla de servicios (service mesh)",
      },
      {
        prompt:
          "Un beneficio clave de las Plataformas Internas para Desarrolladores (IDPs) es que permiten a los desarrolladores auto-servirse de recursos a través de interfaces estandarizadas, lo que se conoce como _____.",
        answer: "caminos dorados (golden paths)",
      },
      {
        prompt:
          "¿Qué desafío complejo de despliegue se simplifica a menudo con el despliegue canary al permitir cambios de esquema incrementales?",
        answer: "Migraciones de bases de datos.",
      },
      {
        prompt:
          "Una aplicación de 12 factores debe ser autocon-tenida y no depender de la inyección de un servidor web en tiempo de ejecución. En su lugar, debe vincularse a un puerto y _____.",
        answer: "escuchar las solicitudes entrantes",
      },
      {
        prompt:
          "Según las prácticas recomendadas de CI/CD para Kubernetes, el uso de etiquetas de imagen inmutables, como un SHA de commit, hace que los despliegues sean _____.",
        answer: "reproducibles",
      },
      {
        prompt:
          "En la gestión de secretos, ¿cuál es el propósito de los 'procedimientos de emergencia' (breakglass procedures)?",
        answer:
          "Configurar un acceso de emergencia que active alertas inmediatas, requiera autenticación multifactor y que las credenciales expiren automáticamente.",
      },
      {
        prompt:
          "Las regulaciones como la Orden Ejecutiva 14028 de EE.UU. y el _____ de la UE han impulsado la adopción de SBOMs a nivel mundial.",
        answer: "Acta de Ciberresiliencia (Cyber Resilience Act - CRA)",
      },
      {
        prompt:
          "¿Por qué es importante el principio de 'Paridad Dev/Prod' de la App de 12 Factores para reducir errores?",
        answer:
          "Reduce el riesgo de errores específicos del entorno al mantener los entornos de desarrollo y producción lo más similares posible.",
      },
      {
        prompt:
          "¿Qué herramienta de FinOps se enfoca en la gestión de costos en nubes híbridas y múltiples, ofreciendo una vista unificada de costos y uso?",
        answer: "CloudBolt.",
      },
      {
        prompt:
          "Uno de los principales beneficios de usar Kubernetes para CI/CD es su capacidad de realizar _____, que despliegan nuevas versiones de una aplicación de forma gradual y sin tiempo de inactividad.",
        answer: "actualizaciones continuas (rolling updates)",
      },
      {
        prompt:
          "¿Cómo se gestionan los procesos administrativos, como las migraciones de bases de datos, según la App de 12 Factores?",
        answer:
          "Deben ejecutarse como procesos únicos en el mismo entorno que la aplicación, utilizando el mismo código base y configuración.",
      },
      {
        prompt:
          "Para la observabilidad de microservicios, las trazas distribuidas son cruciales para identificar _____ y entender las dependencias entre servicios.",
        answer: "cuellos de botella de rendimiento",
      },
      {
        prompt:
          "En un balanceador de carga de Capa 7, el balanceador termina la conexión TCP del cliente y abre una _____ con el servidor de backend.",
        answer: "nueva conexión",
      },
      {
        prompt:
          "¿Qué herramienta de CI/CD, integrada en GitLab, utiliza un agente que se ejecuta en el clúster de Kubernetes para un flujo de trabajo basado en extracción (pull-based)?",
        answer: "El Agente de GitLab para Kubernetes.",
      },
      {
        prompt:
          "Además de la generación dinámica, ¿qué práctica de gestión de secretos busca minimizar las ventanas de exposición proporcionando acceso solo cuando es necesario?",
        answer: "Acceso justo a tiempo (Just-in-Time access).",
      },
      {
        prompt:
          "Plural se diferencia de otras plataformas de gestión de Kubernetes por su arquitectura basada en _____, que mejora la seguridad al no requerir acceso directo a los clústeres de carga de trabajo.",
        answer: "agentes",
      },
      {
        prompt:
          "El enfoque de FinOps se define como una práctica cultural que crea responsabilidad financiera mediante la colaboración entre los equipos de _____, _____ y _____.",
        answer: "ingeniería, finanzas y negocio",
      },
      {
        prompt:
          "¿Qué tecnología se utiliza comúnmente para lograr la 'Paridad Dev/Prod' al empaquetar una aplicación y sus dependencias juntas?",
        answer: "La contenedorización (por ejemplo, Docker).",
      },
      {
        prompt:
          "¿Qué tipo de pruebas en Kubernetes CI/CD implica simular fallos para probar la resiliencia del sistema?",
        answer: "Ingeniería del Caos (Chaos Engineering).",
      },
      {
        prompt:
          "La modernización de la App de 12 Factores ha llevado el principio de 'Dependencias' de simples archivos de manifiesto a la generación de _____ nativa en la compilación.",
        answer: "SBOM (Software Bill of Materials)",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de la estrategia de despliegue Canary en términos de validación de cambios?",
        answer:
          "Permite la validación en el mundo real con una exposición mínima del usuario, creando un sistema de alerta temprana.",
      },
      {
        prompt:
          "¿Qué componente de Kubernetes asegura que un pod específico, como un agente de registro, se ejecute en cada nodo de un clúster?",
        answer: "DaemonSet.",
      },
      {
        prompt:
          "En la gestión de secretos, la _____ automatizada de credenciales minimiza el impacto de una posible fuga.",
        answer: "rotación",
      },
      {
        prompt:
          "El concepto de 'Abstracción y automatización' en la ingeniería de plataformas tiene como objetivo simplificar procesos complejos para que los desarrolladores puedan centrarse en _____.",
        answer: "escribir código y resolver problemas de negocio",
      },
      {
        prompt:
          "En un flujo de trabajo de CI/CD para Kubernetes, ¿cuál es el rol de un Container Registry?",
        answer:
          "Almacenar y gestionar las diferentes versiones de las imágenes de contenedor construidas.",
      },
      {
        prompt:
          "¿Qué herramienta de IaC, al funcionar dentro de Kubernetes, elimina la necesidad de un archivo de estado separado al utilizar los CRDs del servidor de la API como fuente de verdad?",
        answer: "Crossplane.",
      },
      {
        prompt:
          "El principio de 'Procesos' de la App de 12 Factores establece que cualquier dato que necesite ser persistido debe almacenarse en un _____.",
        answer: "servicio de respaldo con estado (stateful backing service)",
      },
      {
        prompt:
          "¿Qué métrica de DevOps, afectada directamente por la estrategia de despliegue, mide el tiempo promedio para recuperarse de un fallo?",
        answer: "MTTR (Mean Time to Recovery).",
      },
    ],
  },
  {
    id: "distribuidos",
    name: "Distribuidos",
    cards: [
      {
        prompt:
          "¿Qué tres garantías establece el teorema CAP para los almacenes de datos distribuidos?",
        answer:
          "Consistencia (Consistency), Disponibilidad (Availability) y Tolerancia a particiones (Partition Tolerance).",
      },
      {
        prompt:
          "Según el teorema CAP, un sistema distribuido puede garantizar como máximo _____ de las tres propiedades (Consistencia, Disponibilidad, Tolerancia a particiones) simultáneamente.",
        answer: "dos",
      },
      {
        prompt:
          "¿Qué aspecto de los sistemas distribuidos aborda el teorema PACELC que el teorema CAP no considera?",
        answer:
          "El compromiso entre latencia y consistencia cuando no hay particiones de red (el caso 'Else').",
      },
      {
        prompt:
          "En el contexto de PACELC, si ocurre una partición (P), ¿entre qué dos propiedades debe elegir un sistema?",
        answer: "Debe elegir entre Disponibilidad (A) y Consistencia (C).",
      },
      {
        prompt:
          "En un sistema PA/EL según PACELC, como Dynamo o Cassandra, ¿qué se prioriza en ausencia de particiones?",
        answer: "Se prioriza la baja latencia (L) sobre la consistencia (C).",
      },
      {
        prompt:
          "Un sistema PC/EC según PACELC, como BigTable, siempre elegirá la _____ a costa de la disponibilidad y la latencia.",
        answer: "consistencia",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia de alcance entre el sharding y el particionamiento de bases de datos?",
        answer:
          "El sharding opera a través de múltiples bases de datos o servidores, mientras que el particionamiento ocurre dentro de una única base de datos.",
      },
      {
        prompt:
          "El sharding es una forma de particionamiento _____, distribuido a través de múltiples máquinas.",
        answer: "horizontal",
      },
      {
        prompt:
          "¿Qué estrategia de distribución de datos es ideal para aplicaciones a gran escala que requieren escalabilidad horizontal?",
        answer: "El sharding (fragmentación).",
      },
      {
        prompt: "Concepto: Particionamiento vertical.",
        answer:
          "Definición: Método que divide una tabla en múltiples tablas que contienen menos columnas.",
      },
      {
        prompt:
          "¿Cuál es el objetivo principal de Apache Kafka en una arquitectura de streaming?",
        answer:
          "Actuar como un transporte duradero y de alto rendimiento para flujos de eventos ordenados.",
      },
      {
        prompt:
          "¿Cuál es la principal fortaleza de Apache Flink en comparación con Apache Kafka?",
        answer:
          "Realizar cómputos con estado sobre datos en flujo, con baja latencia y semántica de procesamiento 'exactly-once'.",
      },
      {
        prompt:
          "La abstracción central en Apache Kafka es un(a) _____ particionado en disco, mientras que en Apache Flink es un grafo de operadores distribuido en memoria.",
        answer: "log de solo apéndice (append-only log)",
      },
      {
        prompt:
          "En Kafka, el orden de los mensajes solo se garantiza dentro de un(a) único/a _____.",
        answer: "partición",
      },
      {
        prompt:
          "Para lograr tolerancia a fallos en Apache Flink, el sistema utiliza _____ consistentes del estado del operador.",
        answer: "checkpoints (puntos de control) con snapshots",
      },
      {
        prompt:
          "En una arquitectura canónica de Flink y Kafka, ¿por qué es beneficioso que Kafka retenga los datos brutos?",
        answer:
          "Permite que el trabajo de Flink pueda reproducir el historial de datos cada vez que la lógica de procesamiento cambia.",
      },
      {
        prompt:
          "Concepto: Tiempo de evento (Event Time) en procesamiento de flujos.",
        answer:
          "Definición: Es la marca de tiempo en la que se generó un evento, asignada en el sistema de origen y contenida en la carga útil del evento.",
      },
      {
        prompt:
          "Concepto: Tiempo de procesamiento (Processing Time) en procesamiento de flujos.",
        answer:
          "Definición: Es el tiempo del reloj del sistema (wall-clock time) en la máquina que está procesando el evento.",
      },
      {
        prompt:
          "En Flink, ¿qué mecanismo se utiliza para manejar eventos desordenados y determinar cuándo una ventana de tiempo está completa?",
        answer: "Watermarks (marcas de agua).",
      },
      {
        prompt:
          "Un watermark con una marca de tiempo 'T' en un flujo de datos declara que no deberían llegar más eventos con una marca de tiempo _____ a 'T'.",
        answer: "anterior (más antigua que)",
      },
      {
        prompt:
          "En Flink, ¿qué estrategia de watermarking es adecuada para flujos donde los eventos pueden llegar con un retraso máximo conocido?",
        answer: "La estrategia de 'bounded out-of-orderness watermarks'.",
      },
      {
        prompt:
          "Al ajustar el retraso del watermark, un valor demasiado alto puede causar _____ en el procesamiento, mientras que uno demasiado bajo puede resultar en resultados incompletos.",
        answer: "mayor latencia",
      },
      {
        prompt:
          "¿Cuál es la función del 'checkpointing' en motores de procesamiento de flujos como Apache Flink?",
        answer:
          "Guardar periódicamente el estado de una aplicación para garantizar la tolerancia a fallos y la recuperación.",
      },
      {
        prompt:
          "En Flink, el mecanismo de checkpointing se basa en un algoritmo de snapshotting distribuido llamado _____.",
        answer: "Asynchronous Barrier Snapshotting",
      },
      {
        prompt:
          "¿Qué es un 'checkpoint barrier' en el mecanismo de checkpointing de Flink?",
        answer:
          "Es un registro especial que fluye a través del grafo de operadores para alinear los snapshots de estado en todos los operadores.",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja del checkpointing incremental sobre el checkpointing completo para estados grandes?",
        answer:
          "Reduce la cantidad de datos escritos en cada checkpoint al guardar solo los cambios desde el último checkpoint, lo que acelera el proceso.",
      },
      {
        prompt:
          "¿Qué backend de estado en Flink es más adecuado para manejar estados muy grandes que no caben en memoria?",
        answer: "El backend de estado EmbeddedRocksDBStateBackend.",
      },
      {
        prompt:
          "Los checkpoints _____ en Flink pausan momentáneamente el procesamiento para asegurar una consistencia fuerte, mientras que los checkpoints _____ permiten que el procesamiento continúe, siendo mejores para aplicaciones con baja latencia que toleran consistencia eventual.",
        answer: "alineados (aligned), no alineados (unaligned)",
      },
      {
        prompt:
          "Para lograr semántica 'exactly-once' de extremo a extremo entre Flink y Kafka, el 'sink' de Flink puede utilizar _____ de Kafka que se confirman al completarse un checkpoint.",
        answer: "transacciones de corta duración",
      },
      {
        prompt: "Concepto: Semántica 'At-most-once'.",
        answer:
          "Definición: Garantía de entrega donde un mensaje se entrega como máximo una vez; los mensajes pueden perderse en caso de fallo.",
      },
      {
        prompt: "Concepto: Semántica 'At-least-once'.",
        answer:
          "Definición: Garantía de entrega donde los mensajes pueden entregarse más de una vez, pero no se pierde ninguno.",
      },
      {
        prompt:
          "En Spark Structured Streaming, el directorio `_spark_metadata` es crucial para mantener la semántica 'exactly-once' cuando se escribe en qué tipo de 'sinks'?",
        answer: "En 'sinks' de archivos (file sinks).",
      },
      {
        prompt:
          "Un 'sink' _____ es aquel que puede recibir la misma escritura varias veces sin cambiar el resultado final, lo que es crucial para la semántica 'exactly-once'.",
        answer: "idempotente",
      },
      {
        prompt:
          "En Spark Structured Streaming, ¿qué son los 'Write-Ahead Logs' (WAL) y para qué se utilizan?",
        answer:
          "Son registros que capturan los datos recibidos antes de procesarlos para permitir la recuperación ante fallos sin pérdida de datos.",
      },
      {
        prompt:
          "Para lograr la semántica 'exactly-once' al escribir en Kafka, el productor debe habilitar la idempotencia y el consumidor debe gestionar los 'offsets' transaccionalmente. ¿Verdadero o falso y por qué?",
        answer:
          "Verdadero, la idempotencia del productor evita duplicados en reintentos, y las transacciones aseguran que el 'offset' y el resultado se confirmen atómicamente.",
      },
      {
        prompt:
          "Concepto: Backpressure (contrapresión) en sistemas distribuidos.",
        answer:
          "Definición: Una condición que ocurre cuando un sistema descendente no puede procesar el trabajo a la misma velocidad que lo recibe de un sistema ascendente, causando la acumulación de datos en búferes.",
      },
      {
        prompt:
          "En la UI web de Flink, un operador que está completamente sobrecargado por backpressure se muestra de color _____.",
        answer: "negro",
      },
      {
        prompt:
          "En la UI web de Flink, un operador que es el cuello de botella (completamente ocupado pero no bajo backpressure) se muestra de color _____.",
        answer: "rojo",
      },
      {
        prompt:
          "¿Cuál es una estrategia común para manejar el backpressure que implica que el consumidor envíe una señal al productor?",
        answer: "Ralentizar al productor (Slow down producer).",
      },
      {
        prompt:
          "Si los mensajes más recientes son más importantes que los antiguos, ¿qué estrategia de manejo de backpressure se puede aplicar a la cola de mensajes?",
        answer: "Descartar los mensajes existentes (Drop existing messages).",
      },
      {
        prompt:
          "La técnica de 'Reactive Streams' se basa en un control de flujo impulsado por la demanda, donde los suscriptores solicitan explícitamente datos a los publicadores. ¿Cómo se llama este mecanismo?",
        answer: "Backpressure.",
      },
      {
        prompt:
          "¿Qué es RocksDB y cuál es su principal caso de uso en motores de stream processing como Flink?",
        answer:
          "Es un almacén de clave-valor integrable de alto rendimiento que se utiliza como backend de estado para gestionar grandes cantidades de estado de operador localmente en disco.",
      },
      {
        prompt:
          "La arquitectura interna de RocksDB se basa en un diseño de árbol _____, optimizado para altas tasas de escritura.",
        answer: "log-structured merge-tree (LSM)",
      },
      {
        prompt:
          "En la arquitectura LSM de RocksDB, las escrituras recientes se almacenan en búferes en memoria llamados _____, antes de ser volcados a archivos inmutables en disco llamados SSTables.",
        answer: "MemTables",
      },
      {
        prompt:
          "El proceso en segundo plano en RocksDB que fusiona y organiza los archivos SSTables para mejorar el rendimiento de lectura y reducir el espacio en disco se llama _____.",
        answer: "compactación (compaction)",
      },
      {
        prompt:
          "En Flink, la integración con RocksDB permite el checkpointing _____, que es una característica clave de rendimiento en despliegues a gran escala.",
        answer: "incremental",
      },
      {
        prompt:
          "¿Qué son las 'Column Families' en RocksDB y para qué se utilizan?",
        answer:
          "Son espacios de nombres lógicos dentro de una base de datos RocksDB que permiten optimizar patrones de acceso y configuraciones de rendimiento para diferentes tipos de estado.",
      },
      {
        prompt:
          "Concepto: Data Skew (sesgo de datos) en sistemas distribuidos.",
        answer:
          "Definición: Una distribución desigual de datos o carga de trabajo entre los nodos de un sistema, lo que provoca que algunos nodos estén sobrecargados mientras otros están infrautilizados.",
      },
      {
        prompt: "¿Qué es la técnica de 'salting' para mitigar el data skew?",
        answer:
          "Consiste en añadir un prefijo aleatorio a las claves sesgadas para distribuir los datos de manera más uniforme entre las particiones.",
      },
      {
        prompt:
          "En un join distribuido donde una de las tablas es pequeña, ¿qué técnica se puede utilizar para evitar el 'shuffling' masivo de datos y mitigar el data skew?",
        answer: "Broadcast join.",
      },
      {
        prompt:
          "En Spark, ¿qué umbral configura el tamaño máximo de una tabla para que se realice un broadcast join automáticamente?",
        answer: "El umbral `spark.sql.autoBroadcastJoinThreshold`.",
      },
      {
        prompt: "Concepto: Idempotencia.",
        answer:
          "Definición: Es la propiedad de una operación por la cual si se realiza varias veces, el resultado es el mismo que si se realizara una sola vez.",
      },
      {
        prompt:
          "¿Por qué la idempotencia es crucial en sistemas de pago distribuidos?",
        answer:
          "Para evitar efectos no deseados como cobros duplicados o pagos múltiples si una solicitud se reintenta debido a fallos de red o del sistema.",
      },
      {
        prompt:
          "Un patrón común para implementar idempotencia a nivel de API es requerir un(a) _____ único/a en cada solicitud.",
        answer: "token o clave de idempotencia (idempotency key)",
      },
      {
        prompt:
          "¿Qué mecanismo de base de datos se puede utilizar para garantizar la idempotencia de las inserciones de forma atómica?",
        answer:
          "Una restricción de unicidad (UNIQUE constraint) sobre una clave de negocio o un token de idempotencia.",
      },
      {
        prompt:
          "En Kafka, configurar `acks=all` en el productor contribuye a la _____ al asegurar que el líder espera la confirmación de todas las réplicas 'in-sync'.",
        answer: "durabilidad y consistencia",
      },
      {
        prompt:
          "La métrica de 'consumer lag' en Kafka indica la diferencia de _____ entre el último mensaje producido en una partición y el último mensaje consumido por un grupo de consumidores.",
        answer: "offsets",
      },
      {
        prompt:
          "¿Cuál es el propósito del protocolo de 'two-phase commit' (2PC) utilizado en Flink?",
        answer:
          "Asegurar que los cambios en fuentes y 'sinks' transaccionales se confirmen atómicamente, logrando semántica 'exactly-once'.",
      },
      {
        prompt:
          "En una arquitectura push, ¿quién inicia la transferencia de datos?",
        answer: "El productor (o la fuente de datos).",
      },
      {
        prompt:
          "En una arquitectura pull, ¿quién inicia la transferencia de datos?",
        answer: "El consumidor (o el destino de los datos).",
      },
      {
        prompt:
          "¿Qué tipo de arquitectura (push o pull) es generalmente preferible para sistemas de baja latencia en tiempo real como chats o notificaciones?",
        answer: "Arquitectura push.",
      },
      {
        prompt:
          "Un modelo híbrido común combina una notificación _____ para alertar sobre un evento y una operación _____ para obtener los detalles completos de dicho evento.",
        answer: "push, pull",
      },
      {
        prompt:
          "En Flink, el parámetro `maxParallelism` se configura para permitir el _____ futuro de un trabajo utilizando el mismo 'savepoint'.",
        answer: "reescalado (scale-up)",
      },
      {
        prompt:
          "¿Cuál es la función del 'Write-Ahead Logging' (WAL) en RocksDB?",
        answer:
          "Garantizar la durabilidad de las escrituras al registrarlas en un log antes de aplicarlas en la MemTable en memoria.",
      },
      {
        prompt: "¿Qué es una 'hot key' en el contexto del data skew?",
        answer:
          "Es una clave de particionamiento que aparece con una frecuencia desproporcionadamente alta, causando que una partición o nodo reciba una carga de trabajo excesiva.",
      },
      {
        prompt:
          "El teorema CAP se aplica durante una partición de red, mientras que el teorema PACELC también considera el compromiso entre _____ y _____ durante la operación normal.",
        answer: "latencia (Latency), consistencia (Consistency)",
      },
      {
        prompt:
          "En el contexto de Reactive Streams, el método `Subscription.request(n)` es la forma en que el _____ señala su demanda de `n` elementos al _____.",
        answer: "suscriptor (subscriber), publicador (publisher)",
      },
      {
        prompt:
          "¿Cómo se llama el modelo de consistencia que garantiza que todas las lecturas verán la escritura más reciente de forma inmediata?",
        answer: "Consistencia fuerte (Strong Consistency) o linealizabilidad.",
      },
      {
        prompt: "Concepto: Consistencia eventual (Eventual Consistency).",
        answer:
          "Definición: Un modelo de consistencia que garantiza que, si no se realizan nuevas actualizaciones, todas las réplicas convergerán eventualmente al mismo estado.",
      },
      {
        prompt: "En Flink, ¿qué son las 'late events' (eventos tardíos)?",
        answer:
          "Son eventos que llegan después de que el watermark del sistema ya ha superado su marca de tiempo de evento.",
      },
      {
        prompt:
          "¿Qué ventaja principal ofrece un 'distributed lock' en un sistema con múltiples nodos?",
        answer:
          "Proporciona un mecanismo de exclusión mutua que es visible y respetado por todos los nodos, evitando condiciones de carrera en operaciones concurrentes.",
      },
      {
        prompt:
          "Para evitar la pérdida de datos en Kafka durante el mantenimiento de un bróker, se recomienda un factor de replicación de tres y configurar `min.insync.replicas` en _____.",
        answer: "2",
      },
      {
        prompt:
          "En un sistema de procesamiento de flujos, el 'windowing' es una técnica para dividir un flujo de datos ilimitado en _____ finitas sobre las cuales se pueden aplicar cómputos.",
        answer: "ventanas (buckets)",
      },
    ],
  },
  {
    id: "distribuido_bigdata",
    name: "Distribuido Bigdata",
    cards: [
      {
        prompt:
          "¿Qué arquitectura utiliza Hadoop para el almacenamiento y la computación distribuida?",
        answer:
          "Utiliza una arquitectura 'shared nothing' (nada compartido), donde cada nodo tiene su propia CPU, almacenamiento y memoria.",
      },
      {
        prompt:
          "En Hadoop, ¿qué componente se encarga del almacenamiento distribuido de datos?",
        answer:
          "El HDFS (Hadoop Distributed File System), que divide y almacena los datos en múltiples 'Data Nodes'.",
      },
      {
        prompt:
          "El componente de Hadoop responsable de la negociación de recursos y la distribución de código a los nodos de datos es _____.",
        answer: "YARN (Yet Another Resource Negotiator).",
      },
      {
        prompt:
          "Según el teorema CAP, ¿qué dos propiedades garantiza un sistema de base de datos CP durante una partición de red?",
        answer:
          "Consistencia (Consistency) y Tolerancia a la Partición (Partition Tolerance).",
      },
      {
        prompt:
          "¿Qué dos propiedades garantiza un sistema de base de datos AP, como Apache Cassandra, según el teorema CAP?",
        answer:
          "Disponibilidad (Availability) y Tolerancia a la Partición (Partition Tolerance).",
      },
      {
        prompt: "¿Cómo se clasifica MongoDB según el teorema CAP por defecto?",
        answer:
          "Se clasifica como un sistema CP (Consistencia y Tolerancia a la Partición).",
      },
      {
        prompt:
          "En Apache Cassandra, ¿qué fórmula se debe cumplir para lograr una consistencia fuerte en las operaciones?",
        answer:
          "La suma de los niveles de consistencia de lectura (R) y escritura (W) debe ser mayor que el factor de replicación (N), es decir, R + W > N.",
      },
      {
        prompt: "Término: Consistencia eventual (Eventual Consistency)",
        answer:
          "Definición: Un modelo de consistencia en sistemas distribuidos que garantiza que, si no se realizan nuevas actualizaciones, todas las réplicas eventualmente convergerán al mismo valor.",
      },
      {
        prompt:
          "En el contexto de bases de datos NoSQL, ¿qué es un modelo de datos de 'documento'?",
        answer:
          "Un modelo donde los datos se almacenan como documentos estructurados, típicamente en formato JSON o BSON, como en MongoDB.",
      },
      {
        prompt: "¿Qué modelo de datos utiliza Apache Cassandra y HBase?",
        answer:
          "Utilizan un modelo de datos de 'columna ancha' (wide-column), donde las filas pueden tener diferentes números de columnas.",
      },
      {
        prompt:
          "La arquitectura de Apache Cassandra se describe como _____, donde no hay un nodo maestro y todos los nodos son iguales.",
        answer: "peer-to-peer (entre pares)",
      },
      {
        prompt:
          "¿Qué arquitectura utiliza MongoDB para su replicación de datos?",
        answer:
          "Utiliza un modelo primario/secundario (primary/secondary), donde un nodo primario maneja todas las operaciones de escritura.",
      },
      {
        prompt:
          "En MongoDB, el proceso de distribuir grandes conjuntos de datos en múltiples máquinas se conoce como _____.",
        answer: "Sharding (fragmentación).",
      },
      {
        prompt:
          "¿Cuál base de datos, Cassandra o HBase, generalmente ofrece un mejor rendimiento en operaciones de escritura y por qué?",
        answer:
          "Cassandra, porque puede escribir datos en el 'commit log' y en la 'memtable' simultáneamente, mientras que HBase requiere pasos adicionales a través de ZooKeeper.",
      },
      {
        prompt:
          "¿Por qué HBase suele tener un mejor rendimiento de lectura que Cassandra?",
        answer:
          "Porque HBase escribe todos los datos en un único servidor (primario por región) y utiliza el HDFS con filtros bloom y cachés de bloques, acelerando la recuperación.",
      },
      {
        prompt: "Término: Procesamiento de flujos (Stream Processing)",
        answer:
          "Definición: Un sistema de procesamiento de datos diseñado para manejar flujos continuos de datos en tiempo real o casi real.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia entre el modelo de procesamiento de Apache Spark Streaming y Apache Flink?",
        answer:
          "Spark Streaming utiliza micro-lotes (micro-batching), mientras que Flink procesa los eventos uno por uno (true event-at-a-time).",
      },
      {
        prompt:
          "En el procesamiento de flujos, ¿qué significa 'stateful processing' (procesamiento con estado)?",
        answer:
          "Es la capacidad de un motor de streaming para recordar información (estado) a través de múltiples eventos para realizar operaciones como agregaciones o uniones.",
      },
      {
        prompt:
          "¿Qué mecanismo utilizan Flink y Spark para garantizar la tolerancia a fallos en el procesamiento con estado?",
        answer:
          "Utilizan 'checkpointing', que guarda periódicamente una instantánea del estado de la aplicación y su posición en las fuentes de entrada.",
      },
      {
        prompt:
          "El mecanismo en los sistemas de streaming que maneja situaciones donde los productores generan datos más rápido de lo que los consumidores pueden procesarlos se llama _____.",
        answer: "Backpressure (contrapresión).",
      },
      {
        prompt:
          "¿Qué garantía de entrega es el estándar de oro en el procesamiento de flujos, asegurando que cada evento se procesa solo una vez?",
        answer: "La semántica 'exactly-once' (exactamente una vez).",
      },
      {
        prompt:
          "En Apache Storm, ¿cuál es el nombre del componente que actúa como fuente de los flujos de datos en una topología?",
        answer: "Un 'Spout'.",
      },
      {
        prompt:
          "En una topología de Apache Storm, un _____ procesa los flujos de tuplas entrantes, realiza cálculos y puede emitir nuevas tuplas.",
        answer: "Bolt",
      },
      {
        prompt:
          "¿Para qué tipo de caso de uso es Apache Flink generalmente considerado superior a Apache Spark?",
        answer:
          "Para aplicaciones que requieren un procesamiento de flujos de latencia ultra baja (milisegundos) y un manejo de estado complejo.",
      },
      {
        prompt: "Término: Arquitectura de Kafka",
        answer:
          "Definición: Una plataforma de streaming de eventos distribuida basada en un 'commit log' (registro de confirmaciones) distribuido.",
      },
      {
        prompt:
          "En Kafka, ¿cómo se llaman los flujos de registros con nombre a los que los productores escriben y los consumidores leen?",
        answer: "Topics (temas).",
      },
      {
        prompt:
          "Para lograr escalabilidad y paralelismo, los 'topics' de Kafka se dividen en múltiples _____.",
        answer: "Partitions (particiones).",
      },
      {
        prompt:
          "En Kafka, el desacoplamiento de productores y consumidores permite que múltiples consumidores procesen datos de forma _____ sin impactarse entre sí.",
        answer: "independiente",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia arquitectónica entre Apache Kafka y Apache Pulsar en cuanto al almacenamiento?",
        answer:
          "Kafka acopla el servicio y el almacenamiento en los 'brokers', mientras que Pulsar los desacopla, usando Apache BookKeeper para el almacenamiento persistente.",
      },
      {
        prompt:
          "¿Qué sistema de mensajería tradicional implementa el protocolo AMQP 0-9-1 y opera con un sistema de entrega basado en 'push'?",
        answer: "RabbitMQ.",
      },
      {
        prompt:
          "En comparación con Kafka y Pulsar, ¿cuál es la principal limitación de RabbitMQ para casos de uso de 'event streaming' a gran escala?",
        answer:
          "RabbitMQ está diseñado para retener mensajes por un corto tiempo y carece de primitivas de sistemas distribuidos como el consumo paralelo ordenado.",
      },
      {
        prompt:
          "¿Qué servicio de coordinación distribuida utiliza Kafka para gestionar y coordinar los 'brokers' en versiones anteriores a KRaft?",
        answer: "Apache ZooKeeper.",
      },
      {
        prompt: "Término: Quorum (en sistemas distribuidos)",
        answer:
          "Definición: El número mínimo de servidores requeridos para que un servicio distribuido (como ZooKeeper) funcione y almacene datos de manera segura.",
      },
      {
        prompt:
          "¿Qué algoritmo de consenso utilizan etcd y Consul para garantizar la consistencia distribuida?",
        answer: "El algoritmo Raft.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia de enfoque entre Consul y etcd?",
        answer:
          "Consul ofrece un paquete completo con descubrimiento de servicios, chequeo de salud y soporte multi-datacenter, mientras que etcd se enfoca en ser un almacén clave-valor simple y confiable.",
      },
      {
        prompt:
          "¿Qué herramienta de coordinación es la base de datos de facto para los clústeres de Kubernetes?",
        answer: "etcd.",
      },
      {
        prompt:
          "La capacidad de Consul para descubrir servicios usando consultas estándar de DNS se logra a través de su _____ integrado.",
        answer: "interfaz DNS",
      },
      {
        prompt:
          "En la comparación entre HBase y Cassandra, ¿cuál depende de un sistema externo (HDFS) para sus capacidades de almacenamiento de datos?",
        answer: "HBase.",
      },
      {
        prompt:
          "El protocolo de comunicación peer-to-peer que utiliza Cassandra para que los nodos intercambien información sobre el estado del clúster se llama _____.",
        answer: "gossip protocol",
      },
      {
        prompt: "Término: Delta Lake",
        answer:
          "Definición: Una capa de almacenamiento de código abierto que aporta transacciones ACID, manejo escalable de metadatos y unifica el procesamiento de datos en streaming y por lotes a los data lakes.",
      },
      {
        prompt:
          "¿Qué plataforma de análisis unificado proporciona herramientas y servicios integrados sobre Delta Lake?",
        answer: "Databricks.",
      },
      {
        prompt:
          "Snowflake se describe como una base de datos de _____ (procesamiento masivo en paralelo) totalmente relacional y compatible con ACID.",
        answer: "MPP (Massively Parallel Processing)",
      },
      {
        prompt:
          "En la arquitectura de Snowflake, ¿cómo se logra la escalabilidad independiente de almacenamiento y cómputo?",
        answer:
          "El almacenamiento es centralizado en la nube, mientras que el cómputo se realiza en 'Virtual Warehouses' independientes que pueden escalarse por separado.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia en el modelo de procesamiento de datos entre Apache Hadoop (MapReduce) y Apache Spark?",
        answer:
          "Hadoop MapReduce escribe los resultados intermedios en disco, mientras que Spark aprovecha el cómputo en memoria, haciéndolo mucho más rápido para tareas iterativas.",
      },
      {
        prompt:
          "A diferencia de la arquitectura 'shared-disk' de Oracle RAC, la arquitectura 'shared-nothing' de Oracle Sharding proporciona _____ y aislamiento de fallos.",
        answer: "escalabilidad lineal",
      },
      {
        prompt:
          "¿Qué característica de Apache Flink le permite manejar estados de aplicación masivos de manera eficiente?",
        answer: "Su método de checkpointing asíncrono e incremental.",
      },
      {
        prompt:
          "El motor de búsqueda y análisis distribuido de código abierto construido sobre Apache Lucene, ideal para analítica de logs y búsqueda de texto completo, es _____.",
        answer: "Elasticsearch.",
      },
      {
        prompt:
          "Redis es un almacén de datos en memoria de tipo _____ diseñado para un acceso de muy baja latencia.",
        answer: "clave-valor (key-value)",
      },
      {
        prompt:
          "¿Cuál es el propósito principal de la 'frozen tier' en la arquitectura de Elasticsearch?",
        answer:
          "Optimizar la relación costo-rendimiento almacenando datos históricos en almacenamiento de objetos más económico, manteniéndolos consultables.",
      },
      {
        prompt:
          "En Spark Structured Streaming, para aplanar un campo JSON anidado como `company_info.name` a un campo de nivel superior `company_name`, ¿qué método se utiliza?",
        answer:
          "Se utiliza el método `select` especificando la ruta completa del campo anidado y un alias.",
      },
      {
        prompt:
          "Para realizar la deduplicación de datos en un DataFrame de Spark Streaming basado en la columna 'symbol', se usa el método _____.",
        answer: '`.dropDuplicates("symbol")`',
      },
      {
        prompt:
          "En Flink SQL, ¿cómo se realiza la deduplicación para obtener la primera fila por cada valor distinto en la columna 'symbol'?",
        answer:
          "Usando una subconsulta con la función de ventana `ROW_NUMBER()` particionada por 'symbol' y ordenada por 'proctime'.",
      },
      {
        prompt: "Término: Apache Ignite",
        answer:
          "Definición: Una plataforma de computación en memoria que ofrece un data grid, compute grid, y streaming grid, permitiendo escalar aplicaciones sin reemplazar las bases de datos existentes.",
      },
      {
        prompt:
          "Una de las características clave de Apache Ignite que lo diferencia de Spark es su capacidad para _____ en memoria.",
        answer: "compartir estado (share state)",
      },
      {
        prompt:
          "En la arquitectura 'shared-nothing', ¿cómo se evita que los recursos compartidos se conviertan en un cuello de botella?",
        answer:
          "Cada nodo es independiente y no comparte recursos como CPU, memoria o almacenamiento en disco, eliminando puntos únicos de fallo.",
      },
      {
        prompt:
          "La técnica fundamental para que cada nodo en una arquitectura 'shared-nothing' sea independiente es la _____ de datos.",
        answer: "partición o sharding",
      },
      {
        prompt:
          "¿Qué ventaja principal ofrece Apache Pulsar en entornos multi-tenant en comparación con Kafka?",
        answer:
          "Pulsar fue diseñado desde el principio con soporte para multi-tenancy, ofreciendo un fuerte aislamiento entre tenants.",
      },
      {
        prompt:
          "En Kafka Streams, un almacén de estado local generalmente está respaldado por _____ o mapas hash en memoria.",
        answer: "RocksDB",
      },
      {
        prompt:
          "¿Qué componente del ecosistema Hadoop contiene las bibliotecas y utilidades Java esenciales necesarias para los otros módulos?",
        answer: "Hadoop Common.",
      },
      {
        prompt:
          "El modelo de programación original para el procesamiento de datos en Hadoop, que consta de una fase Map y una fase Reduce, es _____.",
        answer: "MapReduce.",
      },
      {
        prompt: "¿Qué es la 'localidad de datos' (Data Locality) en Hadoop?",
        answer:
          "Es el principio de mover el cómputo a donde están los datos, en lugar de mover grandes volúmenes de datos a través de la red hacia el cómputo.",
      },
      {
        prompt:
          "En la arquitectura de Presto/Trino, ¿cuál es la función del nodo 'Coordinator'?",
        answer:
          "Recibir consultas SQL, analizarlas, planificar la ejecución distribuida y agregar los resultados finales de los nodos 'Worker'.",
      },
      {
        prompt:
          "La capacidad de Presto/Trino para consultar datos de múltiples fuentes diferentes dentro de una sola consulta se conoce como _____.",
        answer: "consultas federadas (federated queries)",
      },
      {
        prompt:
          "¿Qué sistema de almacenamiento de objetos especializado, desplegado como un único binario y con soporte nativo para la API S3, se enfoca en la simplicidad y el rendimiento?",
        answer: "MinIO.",
      },
      {
        prompt:
          "A diferencia de MinIO, ¿qué plataforma de almacenamiento unificada proporciona almacenamiento de bloques, archivos y objetos en un solo sistema?",
        answer: "Ceph.",
      },
      {
        prompt:
          "El principio de consenso distribuido que siguen algoritmos como Paxos y Raft, que requiere un _____ para confirmar un valor, es fundamental para su fiabilidad.",
        answer: "voto mayoritario del quórum (quorum majority vote)",
      },
      {
        prompt:
          "¿Cuál es la principal desventaja de la arquitectura de replicación activa-activa en bases de datos?",
        answer:
          "Las escrituras en múltiples réplicas pueden entrar en conflicto y causar problemas de consistencia de datos.",
      },
      {
        prompt: "Término: Kafka Connect",
        answer:
          "Definición: Un framework para construir y ejecutar productores y consumidores de datos reutilizables que conectan Kafka con otros sistemas como bases de datos, almacenes clave-valor y sistemas de búsqueda.",
      },
      {
        prompt:
          "¿Qué biblioteca de Kafka permite a los desarrolladores implementar aplicaciones cliente elásticas y escalables para el procesamiento de flujos?",
        answer: "Kafka Streams.",
      },
      {
        prompt:
          "En ZooKeeper, la estructura de datos que utiliza para la coordinación es un _____ jerárquico distribuido.",
        answer: "sistema de archivos (file system)",
      },
      {
        prompt:
          "Las unidades de datos en el sistema de archivos de ZooKeeper, análogas a los archivos y directorios, se denominan _____.",
        answer: "znodes",
      },
      {
        prompt:
          "¿Qué servicio gestionado de AWS es equivalente a Apache Hadoop para el procesamiento de big data?",
        answer: "AWS EMR (Elastic MapReduce).",
      },
      {
        prompt:
          "El servicio de Google Cloud que simplifica el procesamiento de datos tanto en tiempo real como por lotes, de manera serverless, es _____.",
        answer: "Google Cloud Dataflow.",
      },
      {
        prompt:
          "¿Qué servicio de Microsoft Azure está diseñado para analizar y procesar grandes volúmenes de datos en vivo de diversas fuentes?",
        answer: "Microsoft Azure Stream Analytics.",
      },
      {
        prompt: "En el contexto de Kafka, ¿qué son los ISR (In-Sync Replicas)?",
        answer:
          "Son el conjunto de réplicas que están completamente al día con el líder de una partición.",
      },
      {
        prompt:
          "El reemplazo de ZooKeeper en las arquitecturas modernas de Kafka, que utiliza el consenso Raft para la gestión de metadatos, se conoce como _____.",
        answer: "KRaft (Kafka Raft metadata mode).",
      },
      {
        prompt: "Para qué caso de uso se recomienda principalmente MongoDB?",
        answer:
          "Para casos de uso centrados en documentos con esquemas flexibles, que se benefician de la agilidad del desarrollador y una fuerte consistencia.",
      },
      {
        prompt: "¿Qué caso de uso es ideal para Apache Cassandra?",
        answer:
          "Cargas de trabajo con muchas escrituras, distribuidas globalmente y de alto rendimiento, donde la disponibilidad y la escalabilidad son críticas.",
      },
      {
        prompt:
          "La característica 'Tunable Consistency' de Cassandra permite a los usuarios seleccionar un _____, que establece cuántas réplicas deben confirmar una operación.",
        answer: "nivel de consistencia (consistency level)",
      },
      {
        prompt:
          "En la arquitectura de MongoDB, un grupo de instancias que mantienen el mismo conjunto de datos se denomina _____.",
        answer: "replica set (conjunto de réplicas)",
      },
      {
        prompt:
          "¿Qué es un 'failover' en el contexto de bases de datos como MongoDB?",
        answer:
          "Es el proceso automático por el cual, si un nodo primario falla, los nodos secundarios eligen un nuevo primario para continuar las operaciones.",
      },
      {
        prompt:
          "En Flink, el término _____ se refiere a la implementación de la infraestructura que gestiona cómo se almacena, accede y recupera el estado.",
        answer: "State Backend",
      },
      {
        prompt:
          "¿Por qué la capacidad de Apache Ignite para realizar 'joins' distribuidos entre cachés particionadas y replicadas es una característica destacada?",
        answer:
          "Porque permite realizar consultas SQL complejas sobre datos distribuidos de manera extremadamente rápida, aprovechando los índices en memoria.",
      },
      {
        prompt:
          "En el debate Hazelcast vs. Ignite, ¿cuál de los dos ofrece un soporte más rico y completo para consultas SQL, incluyendo joins distribuidos?",
        answer: "Apache Ignite.",
      },
      {
        prompt:
          "El enfoque de Apache Ignite para el almacenamiento de datos que ofrece tiempos de respuesta de microsegundos para datos calientes y ratios configurables de memoria a disco se describe como _____.",
        answer: "memory-first (la memoria primero)",
      },
      {
        prompt:
          "¿Qué plataforma de microservicios, ideal para crear topologías complejas de pipelines de datos, utiliza aplicaciones Spring Boot?",
        answer: "Spring Cloud Data Flow.",
      },
      {
        prompt:
          "El framework de procesamiento de flujos distribuido que crea aplicaciones con estado que pueden procesar datos en tiempo real de diversas fuentes, incluyendo Apache Kafka, es _____.",
        answer: "Apache Samza.",
      },
      {
        prompt:
          "En comparación con el procesamiento de flujos, el _____ es más adecuado para trabajos ETL (Extract, Transform, Load) a gran escala y de alta eficiencia.",
        answer: "procesamiento por lotes (batch processing)",
      },
      {
        prompt:
          "En un sistema distribuido, ¿por qué es importante un mecanismo de detección de 'deadlocks' (bloqueos mutuos)?",
        answer:
          "Porque permite identificar y resolver situaciones en las que dos o más procesos se bloquean mutuamente, esperando recursos que el otro posee.",
      },
      {
        prompt:
          "La capacidad de Apache Flink para integrar con gestores de recursos de clúster populares como Hadoop YARN, Apache Mesos y Kubernetes le proporciona una amplia _____.",
        answer: "integración (wide-ranging integration)",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de la arquitectura 'shared nothing' en términos de tolerancia a fallos?",
        answer:
          "La falla de un nodo no afecta a los otros, ya que no hay recursos compartidos que se conviertan en un punto único de fallo.",
      },
      {
        prompt:
          "A diferencia de Redis, que es principalmente un almacén clave-valor, ¿qué funcionalidad principal ofrece Elasticsearch?",
        answer:
          "Ofrece capacidades avanzadas de búsqueda de texto completo y análisis distribuido.",
      },
      {
        prompt:
          "En la arquitectura de HBase, ¿qué componente es responsable de coordinar y mantener el estado del clúster?",
        answer: "ZooKeeper.",
      },
      {
        prompt:
          "¿Qué es la 'replicación' en el contexto de bases de datos distribuidas?",
        answer:
          "Es el proceso de crear y mantener múltiples copias de los datos en diferentes nodos para garantizar la disponibilidad y la durabilidad.",
      },
      {
        prompt:
          "En el contexto de streaming, la diferencia entre 'event time' y 'processing time' es que el primero se basa en el momento en que _____ y el segundo cuando _____.",
        answer:
          "el evento ocurrió originalmente / el evento es procesado por el sistema",
      },
      {
        prompt:
          "¿Qué plataforma se describe como un 'DataOps platform' que ofrece CDC gestionado, pipelines de ETL y transformaciones de SQL en streaming?",
        answer: "Estuary Flow.",
      },
      {
        prompt:
          "El mecanismo en Kafka que permite el almacenamiento de datos a largo plazo mediante la eliminación o combinación de registros antiguos con la misma clave se conoce como _____.",
        answer: "log compaction (compactación de logs)",
      },
      {
        prompt:
          "En un clúster de Oracle RAC, ¿qué componente permite el acceso concurrente a los archivos de la base de datos desde todas las instancias?",
        answer: "Oracle Automatic Storage Management (ASM).",
      },
      {
        prompt:
          "¿Qué tecnología de Oracle permite la conmutación por error automática y transparente de las conexiones de aplicaciones activas a una instancia superviviente?",
        answer: "Application Continuity (AC).",
      },
    ],
  },
  {
    id: "gcp",
    name: "Gcp",
    cards: [
      {
        prompt:
          "¿Cuál era la cuota de mercado de Google Cloud en el tercer trimestre de 2025, según Synergy Research Group?",
        answer: "Google Cloud tenía una cuota de mercado del 13%.",
      },
      {
        prompt:
          "En GCP, Vertex AI es la plataforma unificada para construir, desplegar y gestionar modelos de _____, incluyendo la familia Gemini.",
        answer: "Inteligencia Artificial (IA) y aprendizaje automático (ML)",
      },
      {
        prompt: "Término: Google Kubernetes Engine (GKE)",
        answer:
          "Definición: Un servicio gestionado de GCP para desplegar, gestionar y escalar aplicaciones en contenedores utilizando Kubernetes.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia arquitectónica entre una VPC de Google Cloud y las VNet/VPC de Azure y AWS?",
        answer:
          "La VPC de Google Cloud es un recurso global que abarca múltiples regiones, mientras que en AWS y Azure son estrictamente regionales.",
      },
      {
        prompt:
          "¿Qué servicio de GCP proporciona máquinas virtuales (VM) bajo un modelo de Infraestructura como Servicio (IaaS)?",
        answer: "Compute Engine.",
      },
      {
        prompt:
          "El servicio de almacenamiento de objetos seguro, duradero y escalable en GCP se conoce como _____.",
        answer: "Cloud Storage",
      },
      {
        prompt:
          "¿Para qué se utiliza BigQuery en el ecosistema de Google Cloud?",
        answer:
          "Es un almacén de datos (data warehouse) serverless y totalmente gestionado que permite consultas SQL rápidas sobre grandes conjuntos de datos.",
      },
      {
        prompt: "Término: Cloud Spanner",
        answer:
          "Definición: Una base de datos relacional, distribuida globalmente y escalable horizontalmente que ofrece una consistencia sólida y alta disponibilidad.",
      },
      {
        prompt:
          "¿Qué dos tipos de descuentos por uso comprometido (CUDs) ofrece Google Cloud?",
        answer:
          "Ofrece CUDs basados en recursos (para vCPUs, memoria, etc.) y CUDs basados en gasto (un compromiso de gasto mínimo por hora).",
      },
      {
        prompt:
          "El servicio que permite a las VMs sin IP pública acceder a las APIs y servicios de Google de forma segura se llama _____.",
        answer: "Private Google Access (PGA)",
      },
      {
        prompt:
          "¿Qué herramienta de CI/CD nativa de GCP automatiza la creación, prueba y despliegue de aplicaciones?",
        answer: "Cloud Build.",
      },
      {
        prompt:
          "En el contexto de la seguridad de GCP, ¿qué gestiona Cloud Identity y qué gestiona IAM?",
        answer:
          "Cloud Identity gestiona la autenticación (quién eres), mientras que IAM gestiona la autorización (qué puedes hacer).",
      },
      {
        prompt: "Término: App Engine",
        answer:
          "Definición: Una plataforma como servicio (PaaS) totalmente gestionada para crear y desplegar aplicaciones web y backends de IoT escalables.",
      },
      {
        prompt:
          "¿Qué tres roles primitivos existen en GCP IAM y por qué se recomienda evitarlos en entornos de producción?",
        answer:
          "Propietario, Editor y Lector; se deben evitar porque son demasiado permisivos y no siguen el principio de mínimo privilegio.",
      },
      {
        prompt:
          "Para conectar una red on-premises a una VPC de Google Cloud con conexiones de fibra privadas de alta velocidad (10-100 Gbps), se utilizaría _____.",
        answer: "Dedicated Interconnect",
      },
      {
        prompt:
          'En el contexto de recuperación ante desastres de Cloud SQL, ¿qué es un "failover" completo?',
        answer:
          "Es un proceso que no solo promueve una réplica a primaria, sino que también recrea la arquitectura de DR completa, incluyendo una nueva instancia de standby y una réplica de lectura interregional.",
      },
      {
        prompt:
          "El conjunto de herramientas de observabilidad de GCP, anteriormente conocido como Stackdriver, ahora se llama la suite de _____.",
        answer: "Cloud Operations",
      },
      {
        prompt:
          "¿Qué servicio de GCP se utiliza para la detección de DDoS y como Web Application Firewall (WAF)?",
        answer: "Cloud Armor.",
      },
      {
        prompt:
          "El modelo de IA de Google para generación de video de alta calidad, anunciado en Next '25, se llama _____.",
        answer: "Veo 2",
      },
      {
        prompt: "Término: Cloud Run",
        answer:
          "Definición: Un entorno totalmente gestionado para ejecutar contenedores sin estado (stateless) que escalan automáticamente, incluso a cero.",
      },
      {
        prompt:
          "En el contexto de la facturación de GCP, ¿qué herramienta permite estimar costos antes de lanzar servicios?",
        answer: "La Calculadora de Precios de Google Cloud.",
      },
      {
        prompt:
          "La integración de _____ permite que los agentes de IA de SAP utilicen los modelos de lenguaje más avanzados de Google Cloud.",
        answer:
          "Gemini en el Generative AI Hub de SAP Business Technology Platform (BTP)",
      },
      {
        prompt: "¿Qué es Google Agentspace?",
        answer:
          "Es una plataforma que unifica el acceso a agentes y aplicaciones empresariales, incluyendo agentes de SAP, para agilizar la automatización de tareas.",
      },
      {
        prompt:
          "El protocolo que permite a los agentes de IA de diferentes plataformas intercambiar información y colaborar de forma segura se llama _____.",
        answer: "Agent2Agent (A2A)",
      },
      {
        prompt: "Término: AlloyDB",
        answer:
          "Definición: Un servicio de base de datos totalmente gestionado y compatible con PostgreSQL, diseñado para cargas de trabajo transaccionales y analíticas de alto rendimiento.",
      },
      {
        prompt:
          "Las máquinas virtuales optimizadas para memoria M4 de Google Cloud ofrecen hasta un 127% más de rendimiento para cargas de trabajo SAP en comparación con generaciones anteriores, con un TCO _____ mejor.",
        answer: "36%",
      },
      {
        prompt:
          "La suite _____ de GCP es una solución de IA conversacional pre-construida para transformar el servicio al cliente en centros de contacto, web y móvil.",
        answer: "Customer Engagement Suite",
      },
      {
        prompt:
          "¿Qué solución de seguridad de Google Cloud unifica la visibilidad, detección de amenazas y la experiencia de Mandiant en una única plataforma?",
        answer: "Google Unified Security.",
      },
      {
        prompt: "Término: Dataflow",
        answer:
          "Definición: Un servicio totalmente gestionado para ejecutar pipelines de procesamiento de datos en paralelo, tanto en modo batch como en streaming, utilizando Apache Beam.",
      },
      {
        prompt:
          "¿Cuál es el propósito del Agent Development Kit (ADK) de Google Cloud?",
        answer:
          "Es un framework de código abierto que simplifica la creación de sistemas multi-agente complejos, manteniendo un control preciso sobre su comportamiento.",
      },
      {
        prompt:
          "El hardware de aceleración de IA de diseño propio de Google, competidor de las GPU de Nvidia, se conoce como _____.",
        answer: "Tensor Processing Unit (TPU)",
      },
      {
        prompt:
          "La versión de TPU v7, también conocida como Ironwood, ofrece un rendimiento de _____ de FP8 denso, comparable a la GPU B200 de Nvidia.",
        answer: "4.6 petaFLOPS",
      },
      {
        prompt: "Término: Firestore",
        answer:
          "Definición: Una base de datos NoSQL flexible y escalable para desarrollo móvil, web y de servidores, que ofrece sincronización de datos en tiempo real.",
      },
      {
        prompt:
          "¿Qué es el Model Context Protocol (MCP) en el contexto de los agentes de IA de Google?",
        answer:
          "Es un protocolo que permite a los agentes de IA conectarse y utilizar de forma segura herramientas y servicios empresariales como Google Maps, BigQuery y APIs de terceros.",
      },
      {
        prompt:
          "GCP ofrece máquinas virtuales _____ que son de bajo costo y corta duración, ideales para cargas de trabajo tolerantes a fallos.",
        answer: "Preemptible o Spot VMs",
      },
      {
        prompt: "Término: Cloud DNS",
        answer:
          "Definición: Un servicio de sistema de nombres de dominio (DNS) de alto rendimiento, resistente y global que publica tus nombres de dominio en el DNS global.",
      },
      {
        prompt:
          "El servicio de GCP que proporciona repositorios de Git privados totalmente gestionados se llama _____.",
        answer: "Cloud Source Repositories",
      },
      {
        prompt:
          "Para el monitoreo en GCP, ¿cuál es la diferencia principal entre Cloud Monitoring y Cloud Logging?",
        answer:
          "Cloud Monitoring se centra en métricas de rendimiento y salud (datos numéricos de series temporales), mientras que Cloud Logging se centra en la recopilación y análisis de registros de eventos.",
      },
      {
        prompt: "Término: Cloud Functions (ahora parte de Cloud Run)",
        answer:
          "Definición: Una plataforma de cómputo serverless y basada en eventos para crear funciones de un solo propósito que responden a eventos en la nube.",
      },
      {
        prompt:
          "El servicio que ayuda a controlar el acceso a aplicaciones web y VMs basándose en la identidad del usuario y el contexto, sin necesidad de una VPN, es _____.",
        answer: "Identity-Aware Proxy (IAP)",
      },
      {
        prompt: "Término: Memorystore",
        answer:
          "Definición: Un servicio de base de datos en memoria totalmente gestionado para Redis y Memcached, que ofrece latencias de menos de un milisegundo.",
      },
      {
        prompt:
          "En 2025, el programa _____ ofrece a startups en etapa temprana hasta $350,000 en créditos de Google Cloud si su enfoque principal es la IA.",
        answer: "Google for Startups Cloud Program",
      },
      {
        prompt:
          "¿Qué servicio de GCP permite el descubrimiento y análisis de herramientas para mover aplicaciones a la nube?",
        answer: "Application Migration.",
      },
      {
        prompt: "Término: Security Command Center (SCC)",
        answer:
          "Definición: Una plataforma centralizada de gestión de seguridad y riesgos que ayuda a prevenir, detectar y responder a amenazas en los activos de Google Cloud.",
      },
      {
        prompt: "¿Cuál es el propósito de VPC Peering en Google Cloud?",
        answer:
          "Permite la conectividad de red privada a través de dos redes de VPC, independientemente de si pertenecen al mismo proyecto u organización.",
      },
      {
        prompt:
          "El modelo de texto a imagen de más alta calidad de Google, con capacidades mejoradas de generación e inpainting, se llama _____.",
        answer: "Imagen 3",
      },
      {
        prompt:
          "Para cargas de trabajo de VMware en Google Cloud, el servicio específico y gestionado es _____.",
        answer: "Google Cloud VMware Engine (GCVE)",
      },
      {
        prompt: "Término: Pub/Sub",
        answer:
          "Definición: Un servicio de mensajería asíncrona y escalable que permite la comunicación entre aplicaciones independientes.",
      },
      {
        prompt:
          "El modelo de IA de Google DeepMind que puede predecir la estructura e interacciones de las moléculas de la vida con alta precisión es _____.",
        answer: "AlphaFold 3",
      },
      {
        prompt:
          "Para automatizar el aprovisionamiento de infraestructura en GCP, una herramienta popular de Infraestructura como Código (IaC) es _____, que es compatible con la plataforma.",
        answer: "Terraform (o Cloud Deployment Manager)",
      },
      {
        prompt:
          "¿Qué servicio de GCP proporciona un proxy web seguro en la nube para proteger las cargas de trabajo?",
        answer: "Secure Web Proxy (SWP).",
      },
      {
        prompt:
          "El nuevo servicio _____ actúa como un centro de comando central para todo el panorama de aplicaciones, proporcionando información sobre despliegues, salud y optimización.",
        answer: "Cloud Hub",
      },
      {
        prompt: "Término: Filestore",
        answer:
          "Definición: Un servicio de almacenamiento de archivos gestionado y de alto rendimiento para aplicaciones que requieren una interfaz de sistema de archivos y un sistema de archivos compartido (NFS).",
      },
      {
        prompt:
          "Las nuevas VMs C4D de Google Cloud se basan en la 5ª generación de procesadores _____ y el chip Titanium de Google.",
        answer: "AMD EPYC",
      },
      {
        prompt: "Término: Dataproc",
        answer:
          "Definición: Un servicio rápido, fácil de usar y gestionado para ejecutar clústeres de Apache Spark y Apache Hadoop.",
      },
      {
        prompt:
          "El servicio _____ unifica datos distribuidos y automatiza la gestión y gobernanza para potenciar el análisis a escala.",
        answer: "Dataplex",
      },
      {
        prompt:
          "Para la migración de bases de datos a Google Cloud con un tiempo de inactividad mínimo, ¿qué servicio gestionado se debe utilizar?",
        answer: "Database Migration Service (DMS).",
      },
      {
        prompt: "¿Qué ofrece Cloud Key Management (Cloud KMS)?",
        answer:
          "Un servicio centralizado de gestión de claves de cifrado que se pueden utilizar para cifrar datos en reposo en los servicios de Google Cloud.",
      },
      {
        prompt:
          "El nuevo programa de partners de Google Cloud, que se implementará en 2026 y se centra en los resultados del cliente en lugar de los requisitos del programa, se llama _____.",
        answer: "Google Cloud Partner Network",
      },
      {
        prompt:
          "La nueva capacidad _____ en BigQuery permite a los usuarios especificar un punto de corte en el tiempo al recuperar características para el entrenamiento de modelos, previniendo la fuga de datos.",
        answer: "Point-in-Time Lookup",
      },
      {
        prompt: "¿Qué permite la función ML.GENERATE_TEXT en BigQuery?",
        answer:
          "Permite la generación y análisis de lenguaje natural directamente dentro de BigQuery, utilizando la integración con los modelos LLM de Vertex AI.",
      },
      {
        prompt: "Término: Vertex AI Search for commerce",
        answer:
          "Definición: Un producto que combina capacidades de búsqueda, navegación y recomendaciones personalizadas de alta calidad para aplicaciones de comercio electrónico.",
      },
      {
        prompt:
          "El modelo de IA de Google para la generación de audio y la comprensión, que puede crear voces personalizadas con solo 10 segundos de entrada de audio, se llama _____.",
        answer: "Chirp 3",
      },
      {
        prompt:
          "Para el desarrollo local sin conexión a la nube, GCP proporciona _____ que simulan el comportamiento de servicios como Pub/Sub y Firestore.",
        answer: "Emuladores de Cloud",
      },
      {
        prompt:
          "¿Qué es la arquitectura Zero-Trust (ZTA) mencionada como el nuevo estándar para la ciberseguridad en servicios financieros?",
        answer:
          'Es un modelo de seguridad que opera bajo la filosofía de "nunca confiar, siempre verificar", asumiendo que las amenazas pueden surgir desde cualquier lugar.',
      },
      {
        prompt:
          "El almacenamiento en bloque más grande y rápido en cualquier nube pública, con exabytes de almacenamiento, es _____.",
        answer: "Hyperdisk Exapools",
      },
      {
        prompt: "Término: Cloud Trace",
        answer:
          "Definición: Un sistema de seguimiento distribuido que recopila datos de latencia de las aplicaciones para ayudar a depurar problemas de rendimiento.",
      },
      {
        prompt:
          "El nuevo servicio de almacenamiento zonal de Cloud Storage con latencia de lectura y escritura aleatoria de <1ms se llama _____.",
        answer: "Rapid Storage",
      },
      {
        prompt:
          "¿Cuál es el beneficio de los roles de IAM predefinidos sobre los roles primitivos?",
        answer:
          "Los roles predefinidos ofrecen un control de acceso detallado y específico para cada servicio, alineándose con el principio de mínimo privilegio.",
      },
      {
        prompt:
          "La red troncal global de Google, que ha evolucionado para soportar la era de la IA, se llama _____, y en 2023 escaló a 13.1 Pb/s.",
        answer: "Jupiter",
      },
      {
        prompt:
          "¿Qué servicio proporciona conectividad de red privada desde un centro de datos a GCP a través de un proveedor de servicios de red certificado?",
        answer: "Partner Interconnect.",
      },
      {
        prompt:
          "El nuevo _____ en Looker permite a los usuarios de negocio realizar pronósticos y detección de anomalías utilizando lenguaje natural.",
        answer: "Code Interpreter for Conversational Analytics",
      },
      {
        prompt:
          "El modelo de IA de Google que es el primer modelo de texto a música listo para la empresa, transformando prompts en clips de 30 segundos, se llama _____.",
        answer: "Lyria",
      },
      {
        prompt: '¿Qué son los "sole-tenant nodes" en Compute Engine?',
        answer:
          "Son servidores físicos dedicados a alojar únicamente las VMs de un cliente específico, utilizados para cumplir con requisitos de seguridad, licencia o aislamiento.",
      },
      {
        prompt:
          "El servicio de GCP _____ ayuda a las organizaciones a cumplir con regulaciones específicas (como ITAR) al aplicar controles de seguridad y cumplimiento en cargas de trabajo sensibles.",
        answer: "Assured Workloads",
      },
      {
        prompt:
          "¿Qué nueva capacidad de GKE Autopilot, anunciada en Next '25, mejora el rendimiento?",
        answer:
          "Mejoras en la programación de pods, el tiempo de reacción al escalado y el ajuste de capacidad.",
      },
      {
        prompt: "Término: Cloud Deploy",
        answer:
          "Definición: Un servicio para gestionar y ejecutar la entrega continua de aplicaciones a Google Kubernetes Engine, permitiendo el control del proceso de despliegue.",
      },
      {
        prompt:
          "El agente de seguridad de Google Cloud que realiza investigaciones dinámicas en nombre de los usuarios para analizar el contexto de cada alerta se llama _____.",
        answer: "Alert triage agent",
      },
      {
        prompt: "¿Qué es la compatibilidad con MongoDB en Firestore?",
        answer:
          "Permite a los desarrolladores utilizar la portabilidad de la API de MongoDB mientras aprovechan las características de Firestore como la replicación multirregional y el SLA del 99.999%.",
      },
      {
        prompt:
          "El servicio _____ proporciona conexiones dedicadas de alta velocidad y baja latencia entre infraestructuras on-premises y Google Cloud.",
        answer: "Cloud Interconnect",
      },
      {
        prompt:
          "En BigQuery ML, ¿qué función se utiliza para realizar pronósticos de series temporales con modelos ARIMA_PLUS?",
        answer: "La función ML.EXPLAIN_FORECAST.",
      },
      {
        prompt:
          "El nuevo servicio _____ proporciona una caché fuertemente consistente que funciona con buckets regionales para acercar los datos a las GPU/TPU, reduciendo la latencia.",
        answer: "Anywhere Cache",
      },
      {
        prompt: "Término: Google Cloud VMware Engine",
        answer:
          "Definición: Un servicio totalmente gestionado que permite ejecutar cargas de trabajo de VMware de forma nativa en Google Cloud.",
      },
      {
        prompt: '¿Qué permite la función de "consultas federadas" en BigQuery?',
        answer:
          "Permite consultar datos que residen en fuentes externas (como Cloud SQL, Cloud Storage, AWS Glue) directamente desde BigQuery sin necesidad de cargarlos primero.",
      },
      {
        prompt:
          "La nueva _____ de Vertex AI proporciona visibilidad sobre el uso, el rendimiento, la latencia y ayuda a solucionar errores para las iniciativas de IA.",
        answer: "Vertex AI Dashboards",
      },
      {
        prompt:
          "¿Qué es GKE Autopilot en comparación con el modo estándar de GKE?",
        answer:
          "Autopilot es un modo de operación en el que GKE gestiona toda la infraestructura del clúster, incluyendo nodos y escalado, permitiendo a los usuarios centrarse solo en sus cargas de trabajo.",
      },
      {
        prompt:
          "El servicio que ofrece un sistema de archivos paralelo, totalmente gestionado y de alto rendimiento, basado en DDN EXAScaler, se llama _____.",
        answer: "Google Cloud Managed Lustre",
      },
      {
        prompt:
          "Para el control de acceso detallado a nivel de base de datos en Spanner, se utiliza _____, que va más allá de los roles de IAM a nivel de proyecto.",
        answer: "Fine-grained access control",
      },
      {
        prompt: "Término: Cloud Router",
        answer:
          "Definición: Un servicio totalmente gestionado que utiliza el Border Gateway Protocol (BGP) para anunciar rangos de direcciones IP entre una VPC y una red on-premises.",
      },
      {
        prompt: '¿Qué permite la función de "VPC Service Controls"?',
        answer:
          "Permite definir un perímetro de seguridad alrededor de los recursos de los servicios de Google Cloud para mitigar los riesgos de exfiltración de datos.",
      },
      {
        prompt:
          "La colaboración de Google Cloud con _____ permite que las cargas de trabajo de bases de datos Oracle se ejecuten de forma nativa en centros de datos de Google Cloud.",
        answer: "Oracle Cloud Infrastructure (OCI)",
      },
      {
        prompt: "Término: Looker",
        answer:
          "Definición: Una plataforma de inteligencia de negocios (BI) y análisis de datos que ayuda a explorar, visualizar y compartir información de manera consistente.",
      },
      {
        prompt:
          "¿Qué característica de Cloud SQL para PostgreSQL previene reinicios por falta de memoria al cancelar de forma proactiva las consultas que consumen demasiada memoria?",
        answer: "El Memory Agent.",
      },
      {
        prompt:
          "El nuevo _____, en versión preliminar, proporciona un enfoque visual de tipo lienzo para diseñar y modificar plantillas de aplicaciones.",
        answer: "Application Design Center",
      },
      {
        prompt: "Término: Cloud Composer",
        answer:
          "Definición: Un servicio de orquestación de flujos de trabajo totalmente gestionado, basado en Apache Airflow, para crear, programar y supervisar pipelines.",
      },
      {
        prompt: '¿Qué son los "Alias IPs" en el contexto de GKE?',
        answer:
          "Son rangos de IP secundarios asignados a una VM que permiten a GKE asignar direcciones IP a los pods desde un rango CIDR dentro de la VPC, mejorando la escalabilidad y la gestión de la red.",
      },
      {
        prompt:
          "El servicio _____ proporciona un inventario de los activos en la nube con historial, permitiendo exportar metadatos de recursos en un momento dado.",
        answer: "Cloud Asset Inventory",
      },
      {
        prompt: "¿Cuál es la función del GKE Inference Gateway?",
        answer:
          "Es una puerta de enlace que proporciona un balanceo de carga inteligente para servir modelos de IA a escala, optimizando el uso de recursos como las GPU.",
      },
      {
        prompt: "Término: Cloud Tasks",
        answer:
          "Definición: Un servicio totalmente gestionado que permite gestionar la ejecución de un gran número de tareas distribuidas de forma asíncrona.",
      },
      {
        prompt:
          "El servicio _____ permite ejecutar clústeres privados de GKE en hardware robusto desplegado en las instalaciones del cliente.",
        answer: "Google Distributed Cloud connected Appliance Service",
      },
      {
        prompt:
          "¿Qué mejora introduce el soporte para TLS 1.3 0-RTT en Cloud CDN?",
        answer:
          "Aumenta el rendimiento de la aplicación para las conexiones reanudadas al eliminar un viaje de ida y vuelta (round-trip) en el handshake de TLS.",
      },
      {
        prompt: "Término: Cloud VPN",
        answer:
          "Definición: Un servicio que crea túneles seguros sobre la internet pública entre una red local (on-premises) y la red VPC de Google Cloud usando el protocolo IPsec.",
      },
      {
        prompt: '¿Qué es la función "Object Contexts" en Google Cloud Storage?',
        answer:
          "Es una nueva característica que proporciona una base para el almacenamiento semántico, permitiendo integrar Gemini con objetos de GCS y enriquecerlos de forma inteligente.",
      },
      {
        prompt:
          "La tecnología _____ en la red de Google reduce los tiempos de mitigación de fallos de horas a minutos, mejorando la resiliencia.",
        answer: "Autonomous networking",
      },
      {
        prompt:
          "Para la analítica de datos, ¿qué servicio es ideal para la integración de datos de tipo ETL (Extract, Transform, Load) con una interfaz gráfica?",
        answer: "Cloud Data Fusion.",
      },
    ],
  },
  {
    id: "java_evolution",
    name: "Java Evolution",
    cards: [
      {
        prompt:
          "¿Cuál es el propósito de una operación agregada en el contexto de Java Streams?",
        answer:
          "Realizar una tarea en el stream como un todo en lugar de procesar elementos individuales secuencialmente.",
      },
      {
        prompt:
          "¿Qué característica de los streams indica que los elementos no se almacenan en memoria, sino que se procesan a medida que se recorren?",
        answer:
          "Los streams son estructuras de datos que procesan elementos expresando cálculos sobre ellos, no los almacenan.",
      },
      {
        prompt:
          "Diferencia fundamental entre colecciones y streams respecto a la mutabilidad.",
        answer:
          "Las colecciones son mutables (se pueden añadir/eliminar elementos), mientras que los streams son inmutables.",
      },
      {
        prompt: "¿Por qué un stream solo se puede usar una vez?",
        answer:
          "Porque una vez que se invoca una operación terminal, el stream se considera consumido y no puede ser reutilizado.",
      },
      {
        prompt: "Concepto: Ejecución perezosa (Lazy execution).",
        answer:
          "Las operaciones intermedias no se ejecutan hasta que se invoca una operación terminal en el pipeline del stream.",
      },
      {
        prompt:
          "¿Qué interfaz de Java **no** implementan los streams, lo que impide usarlos directamente en un bucle for-each?",
        answer: "La interfaz Iterable.",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre iteración externa e interna en Java?",
        answer:
          "La iteración externa usa iteradores explícitos, mientras que la interna es manejada implícitamente por la API de Streams.",
      },
      {
        prompt:
          "¿Qué interfaz define la funcionalidad básica ofrecida por todos los streams y extiende de AutoCloseable?",
        answer: "BaseStream.",
      },
      {
        prompt:
          "¿En qué casos es estrictamente necesario cerrar un stream de forma explícita?",
        answer:
          "Solo cuando el stream está respaldado por recursos externos, como un archivo.",
      },
      {
        prompt:
          "¿Qué garantiza que una operación en un stream secuencial ordenado sea determinista?",
        answer:
          "Que la ejecución produzca el mismo resultado siempre que se use la misma fuente de datos y el mismo pipeline.",
      },
      {
        prompt:
          "¿Qué métodos de las interfaces de stream crean streams infinitos?",
        answer: "Los métodos factoría generate() e iterate().",
      },
      {
        prompt:
          "¿Qué operación intermedia se debe usar para limitar el tamaño de un stream infinito antes de llamar a una operación terminal?",
        answer: "limit(maxSize).",
      },
      {
        prompt: "¿Cuál es la función del método factoría `Stream.empty()`?",
        answer: "Crear un stream que no contiene elementos.",
      },
      {
        prompt:
          "El método _____ de la clase Arrays permite crear un stream a partir de un array de objetos o primitivos.",
        answer: "stream()",
      },
      {
        prompt:
          "¿Qué excepción lanza `Stream.of(arg)` si el argumento pasado es nulo?",
        answer: "NullPointerException.",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre `IntStream.range(start, end)` e `IntStream.rangeClosed(start, end)`?",
        answer:
          "range() es exclusivo del límite superior, mientras que rangeClosed() es inclusivo.",
      },
      {
        prompt:
          "¿Qué método de la clase Random genera un stream infinito de valores double entre $0.0$ y $1.0$?",
        answer: "doubles().",
      },
      {
        prompt:
          "¿Qué operación intermedia transforma cada elemento del stream aplicando una función uno-a-uno?",
        answer: "map().",
      },
      {
        prompt: "¿Cuál es el propósito principal de la operación `flatMap`?",
        answer:
          "Transformar cada elemento en un stream y aplanar todos esos streams en uno solo.",
      },
      {
        prompt:
          "¿Qué diferencia a una operación terminal de una operación intermedia?",
        answer:
          "La operación terminal inicia el procesamiento, consume el stream y no devuelve otro stream.",
      },
      {
        prompt: "Concepto: Operación sin estado (Stateless operation).",
        answer:
          "Operación que procesa cada elemento de forma independiente, sin considerar elementos previos o futuros.",
      },
      {
        prompt: "Concepto: Operación con estado (Stateful operation).",
        answer:
          "Operación que requiere procesar múltiples elementos o el stream completo antes de producir un resultado (ej. sorted o distinct).",
      },
      {
        prompt:
          "¿Qué método de cortocircuito devuelve un subconjunto de elementos que cumplen un predicado, deteniéndose al primer fallo?",
        answer: "takeWhile().",
      },
      {
        prompt:
          "¿Qué garantiza la estabilidad de la operación `distinct()` en streams ordenados?",
        answer:
          "Garantiza que se conserve la primera aparición de un elemento duplicado según el orden de encuentro.",
      },
      {
        prompt: "¿Cuál es la función de `skip(n)` en un pipeline de stream?",
        answer:
          "Descartar los primeros $n$ elementos del stream y devolver un stream con el resto.",
      },
      {
        prompt:
          "¿Qué operación intermedia permite inspeccionar los elementos de un stream (por ejemplo, para depuración) sin alterarlos?",
        answer: "peek().",
      },
      {
        prompt:
          "¿Qué método de BaseStream se usa para obtener un stream que se ejecutará de forma secuencial?",
        answer: "sequential().",
      },
      {
        prompt:
          "Diferencia entre `anyMatch` y `allMatch` respecto a sus resultados.",
        answer:
          "anyMatch devuelve true si al menos un elemento cumple el predicado; allMatch requiere que todos lo cumplan.",
      },
      {
        prompt: "¿Qué devuelve la operación terminal `findAny()`?",
        answer:
          "Un Optional que describe algún elemento del stream, o un Optional vacío si el stream no tiene elementos.",
      },
      {
        prompt:
          "¿Por qué `findFirst()` puede ser más costoso que `findAny()` en streams paralelos?",
        answer:
          "Porque findFirst() debe respetar el orden de encuentro, mientras que findAny() puede devolver cualquier elemento encontrado primero.",
      },
      {
        prompt:
          "¿Qué operación terminal devuelve el número total de elementos procesados en el pipeline?",
        answer: "count().",
      },
      {
        prompt: "¿Qué devuelve `min(Comparator)` si el stream está vacío?",
        answer: "Un objeto Optional vacío.",
      },
      {
        prompt:
          "En la operación `reduce(identity, accumulator)`, ¿qué ocurre si el stream está vacío?",
        answer: "Se devuelve el valor de identidad proporcionado.",
      },
      {
        prompt:
          "¿Qué función cumple el 'combiner' en una operación de reducción paralela?",
        answer:
          "Fusionar los resultados parciales calculados por diferentes hilos en un único valor final.",
      },
      {
        prompt: "Concepto: Reducción mutable.",
        answer:
          "Operación que acumula los elementos del stream en un contenedor de resultados mutable, como un ArrayList o StringBuilder.",
      },
      {
        prompt:
          "¿Cuáles son los tres argumentos requeridos por el método `collect()`?",
        answer:
          "Un Supplier (proveedor), un Accumulator (acumulador) y un Combiner (combinador).",
      },
      {
        prompt:
          "¿Qué método de la interfaz Stream devuelve una lista inmutable de los elementos resultantes?",
        answer: "toList().",
      },
      {
        prompt:
          "¿Qué recolector de la clase Collectors organiza los elementos en un mapa basado en una clave booleana?",
        answer: "partitioningBy().",
      },
      {
        prompt: "¿Cuál es la función del recolector `joining()`?",
        answer:
          "Concatenar los elementos de tipo CharSequence en una sola cadena String.",
      },
      {
        prompt:
          "¿Qué recolector de Collectors devuelve un Map donde los valores son listas de elementos que comparten la misma clave?",
        answer: "groupingBy().",
      },
      {
        prompt:
          "¿Qué método de Collectors permite transformar el resultado de un recolector mediante una función finalizadora?",
        answer: "collectingAndThen().",
      },
      {
        prompt:
          "El método factoría de stream que acepta una semilla y una función para generar elementos ordenados es _____.",
        answer: "iterate()",
      },
      {
        prompt:
          "¿Qué método de las interfaces de stream numérico permite obtener un objeto que contiene conteo, suma, mínimo, máximo y promedio?",
        answer: "summaryStatistics().",
      },
      {
        prompt:
          '¿Qué significa que un parámetro de comportamiento de un stream sea "sin interferencia"?',
        answer:
          "Significa que no debe modificar la fuente de datos del stream durante el procesamiento del pipeline.",
      },
      {
        prompt:
          "¿Por qué las operaciones `map` y `filter` se consideran sin estado (stateless)?",
        answer:
          "Porque pueden procesar un elemento sin necesidad de conocer información sobre otros elementos del stream.",
      },
      {
        prompt:
          "¿Qué método de BaseStream se utiliza para habilitar el procesamiento en paralelo de un stream?",
        answer: "parallel().",
      },
      {
        prompt:
          '¿Qué operación intermedia de ordenación (`sorted`) se considera una operación con estado "pesada"?',
        answer:
          "Se considera pesada porque debe almacenar todos los elementos del stream antes de poder emitir el primero ordenado.",
      },
      {
        prompt:
          "¿Qué método de `IntStream` convierte los valores primitivos a sus respectivos objetos envolventes (Integer)?",
        answer: "boxed().",
      },
      {
        prompt:
          "¿Qué ocurre si se aplica la operación `count()` sobre un stream infinito?",
        answer: "La operación nunca terminará.",
      },
      {
        prompt: "¿Cuál es el tipo de retorno de `Collectors.counting()`?",
        answer: "Collector<T, ?, Long>.",
      },
      {
        prompt:
          "¿Qué método permite crear un stream a partir de un subrango específico de un array?",
        answer: "Arrays.stream(array, fromIndex, toIndex).",
      },
      {
        prompt:
          "¿Qué operación se prefiere para mejorar el rendimiento: `skip` antes de `map` o `map` antes de `skip`?",
        answer:
          "skip antes de map, para evitar transformaciones innecesarias en elementos que serán descartados.",
      },
      {
        prompt: "¿Cuál es la diferencia entre `map` y `mapMulti`?",
        answer:
          "map es una transformación 1-a-1, mientras que mapMulti es una transformación 1-a-muchos más eficiente que flatMap en ciertos casos.",
      },
      {
        prompt:
          "¿Qué método de Collectors se utiliza para agrupar elementos y contarlos simultáneamente?",
        answer: "groupingBy(classifier, counting()).",
      },
      {
        prompt:
          "¿Qué operación terminal permite realizar una acción en cada elemento respetando el orden de encuentro, incluso en paralelo?",
        answer: "forEachOrdered().",
      },
      {
        prompt:
          "¿Qué recolector se usa para encontrar el elemento máximo dentro de un grupo definido por `groupingBy`?",
        answer: "maxBy().",
      },
      {
        prompt:
          "¿Cómo se obtiene un stream de caracteres a partir de un String en Java?",
        answer:
          "Usando el método chars(), que devuelve un IntStream de los valores Unicode.",
      },
      {
        prompt:
          "¿Qué recolector de Collectors es equivalente a realizar una reducción de stream con un valor de identidad y un acumulador?",
        answer: "reducing().",
      },
      {
        prompt:
          "¿Qué método de `Files` permite buscar archivos en una jerarquía de directorios devolviendo un Stream de Paths?",
        answer: "find().",
      },
      {
        prompt:
          "¿Qué significa que una operación sea de cortocircuito (short-circuit)?",
        answer:
          "Que la operación puede producir un resultado o un stream finito sin procesar todos los elementos de la fuente.",
      },
      {
        prompt:
          "¿Qué recolector de Collectors permite aplanar streams resultantes de una transformación dentro de otro recolector?",
        answer: "flatMapping().",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre `groupingBy` y `groupingByConcurrent`?",
        answer:
          "groupingByConcurrent usa un mapa concurrente y es más eficiente para streams paralelos desordenados.",
      },
      {
        prompt:
          "¿Qué método de `Collectors` se usa para calcular el promedio de una propiedad numérica de los objetos en un stream?",
        answer: "averagingInt(), averagingLong() o averagingDouble().",
      },
      {
        prompt:
          "¿Qué recolector se utiliza para concatenar los resultados de un stream en una lista mutable específica (ej. LinkedList)?",
        answer: "toCollection(LinkedList::new).",
      },
      {
        prompt:
          "¿Qué operación terminal se usa para obtener un array de objetos `Object[]` a partir de un stream?",
        answer: "toArray().",
      },
      {
        prompt:
          "¿Por qué `unordered()` puede mejorar el rendimiento de `distinct()` en un stream paralelo?",
        answer:
          "Porque elimina la necesidad de mantener el orden de encuentro, reduciendo la sobrecarga de sincronización.",
      },
      {
        prompt:
          "¿Qué método de Collectors permite sumar valores numéricos derivados de los elementos del stream?",
        answer: "summingInt(), summingLong() o summingDouble().",
      },
      {
        prompt:
          "¿Qué interfaz funcional representa el acumulador en la operación `collect()` de tres argumentos?",
        answer: "BiConsumer<R, T>.",
      },
      {
        prompt:
          "¿Cuál es el valor de retorno de `Optional.orElse(defaultValue)` si el Optional contiene un valor?",
        answer: "El valor contenido en el Optional.",
      },
      {
        prompt:
          "¿Qué método de `Stream` permite combinar dos streams, concatenándolos?",
        answer: "Stream.concat(a, b).",
      },
      {
        prompt:
          "¿Qué método de stream numérico se utiliza para encontrar el valor máximo sin usar un comparador?",
        answer:
          "max() (devuelve un OptionalInt, OptionalLong o OptionalDouble).",
      },
      {
        prompt:
          "¿Qué recolector de Collectors es útil para realizar dos recolecciones diferentes sobre los mismos elementos y combinar sus resultados?",
        answer:
          "teeing() (mencionado como recolector avanzado en Java moderno).",
      },
      {
        prompt:
          "¿Qué garantiza que un stream paralelo sea determinista en sus resultados?",
        answer:
          "Que la fuente de datos esté ordenada y las operaciones respeten el orden de encuentro (encounter order).",
      },
      {
        prompt:
          "¿Qué método de BaseStream comprueba si el stream se ejecutará en paralelo?",
        answer: "isParallel().",
      },
      {
        prompt:
          "¿Qué interfaz funcional es el parámetro de la operación intermedia `filter()`?",
        answer: "Predicate<? super T>.",
      },
      {
        prompt:
          "¿Qué recolector de Collectors se usa para agrupar elementos y aplicar un filtro antes de la reducción?",
        answer: "filtering().",
      },
      {
        prompt:
          "En `Collectors.toMap`, ¿para qué sirve el tercer argumento (mergeFunction)?",
        answer:
          "Para resolver conflictos de colisión cuando dos elementos mapean a la misma clave.",
      },
      {
        prompt:
          "¿Qué método de `Stream` se utiliza para obtener una versión paralela de un stream secuencial?",
        answer: "parallel().",
      },
      {
        prompt:
          "¿Cómo se llama la propiedad de un acumulador en `reduce` que permite procesar elementos en cualquier par y luego combinarlos?",
        answer: "Asociatividad.",
      },
      {
        prompt:
          "¿Qué método de `Stream` devuelve el primer elemento encontrado en un stream, respetando el orden si existe?",
        answer: "findFirst().",
      },
    ],
  },
  {
    id: "kafka",
    name: "Kafka",
    cards: [
      {
        prompt:
          "¿Cuál es la función principal de la plataforma Apache Kafka según el repositorio oficial?",
        answer:
          "Funcionar como una plataforma de streaming distribuida que permite publicar, suscribir, almacenar y procesar flujos de eventos.",
      },
      {
        prompt:
          "¿Qué componente de Kafka se encarga de la comunicación de red del lado del cliente y del seguimiento de solicitudes?",
        answer:
          "El componente NetworkClient gestiona las conexiones, las solicitudes de tipo ClientRequest y las respuestas ClientResponse.",
      },
      {
        prompt:
          "En el contexto de la identificación de componentes, ¿qué estructura representa una instantánea inmutable de nodos, temas y particiones?",
        answer:
          "La clase Cluster proporciona una visión inmutable de la topología actual del clúster de Kafka.",
      },
      {
        prompt:
          "¿Qué identificador de 128 bits se utiliza para garantizar la unicidad de las referencias a temas en el sistema?",
        answer:
          "La clase Uuid proporciona identificadores universalmente únicos de 128 bits para metadatos como los IDs de temas.",
      },
      {
        prompt:
          "¿Cómo se define una TopicPartition en las estructuras de datos fundamentales de Kafka?",
        answer:
          "Es una pareja que vincula el nombre de un tema (topic) con un número de partición específico.",
      },
      {
        prompt:
          "Cloze: La interfaz administrativa de Kafka para realizar tareas de gestión de forma asíncrona y no bloqueante es ____.",
        answer: "Admin",
      },
      {
        prompt:
          "¿Qué clase centraliza la configuración del cliente administrativo, incluyendo parámetros de red y seguridad?",
        answer:
          "AdminClientConfig define y valida todos los ajustes necesarios para el funcionamiento del AdminClient.",
      },
      {
        prompt:
          "¿Qué mecanismo utiliza Kafka para permitir que los componentes reaccionen a cambios de configuración dinámicos sin reiniciar?",
        answer:
          "La interfaz Reconfigurable permite a los componentes validar y aplicar cambios de configuración en tiempo de ejecución.",
      },
      {
        prompt:
          "¿Qué funcionalidad permite el uso de clases ConfigProvider en el sistema de configuración de Kafka?",
        answer:
          "Permiten recuperar valores de configuración desde fuentes externas como variables de entorno o archivos de propiedades.",
      },
      {
        prompt:
          "¿Cuál es la jerarquía base para todas las excepciones de la API pública en Kafka?",
        answer:
          "La mayoría de las excepciones de la API pública extienden la clase ApiException.",
      },
      {
        prompt: "Concepto: RetriableException",
        answer:
          "Definición: Categoría de excepciones que indica errores transitorios los cuales podrían resolverse si la operación se reintenta tras un retardo.",
      },
      {
        prompt:
          "¿Qué interfaz en el lado del servidor gestiona las Listas de Control de Acceso (ACL) y la lógica de autorización personalizada?",
        answer:
          "La interfaz Authorizer define los métodos para gestionar ACLs y aplicar políticas de autorización de acceso.",
      },
      {
        prompt:
          "¿Qué política permite validar y aplicar reglas personalizadas durante la creación de temas en el broker?",
        answer:
          "La interfaz CreateTopicPolicy permite imponer restricciones operativas u organizativas en la creación de nuevos temas.",
      },
      {
        prompt:
          "¿Qué componente rastrea el ciclo de vida de las conexiones a cada nodo, aplicando retrocesos exponenciales en caso de desconexión?",
        answer:
          "ClusterConnectionStates gestiona el estado de conexión a los nodos y controla los reintentos de conexión.",
      },
      {
        prompt:
          "¿Para qué sirve la clase ApiVersions en la comunicación entre clientes y brokers?",
        answer:
          "Gestiona las versiones de la API soportadas por los nodos para asegurar la compatibilidad entre clientes y brokers.",
      },
      {
        prompt:
          "¿Qué optimización permite el FetchSessionHandler para las lecturas con gran abanico (fan-out)?",
        answer:
          "Gestiona sesiones de recuperación que permiten realizar peticiones de fetch incrementales para reducir la transferencia de datos redundantes.",
      },
      {
        prompt:
          "¿Qué anotación se utiliza para indicar que una API no ofrece garantías de compatibilidad entre versiones?",
        answer:
          "La anotación Unstable se utiliza para marcar componentes de la API cuya compatibilidad futura no está garantizada.",
      },
      {
        prompt:
          "¿Qué estructura de datos asocia un permiso a un principal en un recurso específico de Kafka?",
        answer:
          "La clase AclBinding vincula un patrón de recurso con una entrada de control de acceso (AccessControlEntry).",
      },
      {
        prompt:
          "¿Cómo gestiona Kafka la transferencia eficiente de datos a través de diferentes algoritmos de compresión?",
        answer:
          "Mediante la interfaz Compression, que abstrae algoritmos como GZIP, Snappy, LZ4 y ZSTD.",
      },
      {
        prompt:
          "¿Qué permiten los encabezados (headers) de mensaje en los registros de Kafka?",
        answer:
          "Permiten adjuntar metadatos de aplicación definidos por el usuario en pares clave-valor a cada registro individual.",
      },
      {
        prompt:
          "¿Cuál es el punto de entrada principal para inicializar y arrancar un servidor de Kafka?",
        answer:
          "El objeto Kafka en el núcleo del servidor es el encargado de parsear argumentos e iniciar el ciclo de vida del broker.",
      },
      {
        prompt:
          "¿Qué componente desacopla la E/S de red del procesamiento lógico de las solicitudes en el servidor?",
        answer:
          "El RequestChannel actúa como intermediario gestionando colas de peticiones y respuestas entre hilos de red y procesadores.",
      },
      {
        prompt:
          "¿Qué protocolo utiliza Kafka para la gestión de metadatos en despliegues que no dependen de ZooKeeper?",
        answer:
          "Kafka utiliza el protocolo de consenso KRaft (Raft Consensus Protocol) para la gestión robusta de metadatos.",
      },
      {
        prompt:
          "¿Cuál es la función del KafkaMetadataLog en la implementación de KRaft?",
        answer:
          "Gestiona el registro de metadatos replicado, encargándose de añadir registros, gestionar el límite superior (High Watermark) y realizar truncamientos.",
      },
      {
        prompt:
          "¿Qué clase encapsula todo el estado y la lógica de negocio de una partición de tema en el broker?",
        answer:
          "La clase Partition gestiona el estado de una partición individual, incluyendo la gestión del líder y de las réplicas sincronizadas (ISR).",
      },
      {
        prompt:
          "¿Qué significa el término 'High Watermark' (HW) en el contexto de la replicación de Kafka?",
        answer:
          "Es el desplazamiento (offset) más alto que ha sido replicado con éxito a la mayoría del quorum de réplicas.",
      },
      {
        prompt:
          "¿Qué objeto rastrea si una réplica está lo suficientemente actualizada para pertenecer al conjunto ISR?",
        answer:
          "La clase Replica rastrea el estado de recuperación (fetch) y calcula el tiempo de última sincronización para determinar su elegibilidad en el ISR.",
      },
      {
        prompt:
          "¿Qué componente del servidor se encarga de la persistencia física, recuperación y mantenimiento de los registros en disco?",
        answer:
          "El LogManager supervisa el ciclo de vida completo de los UnifiedLog, incluyendo la creación, carga y borrado de segmentos.",
      },
      {
        prompt:
          "Cloze: El archivo ____ permite al broker evitar procesos de recuperación costosos al iniciar tras un apagado controlado.",
        answer: ".kafka_cleanshutdown",
      },
      {
        prompt:
          "¿Qué componente coordina el estado de las transacciones atómicas que involucran múltiples particiones de temas?",
        answer:
          "El TransactionCoordinator gestiona el ciclo de vida de las transacciones y coordina la escritura de marcadores de transacción.",
      },
      {
        prompt:
          "¿Qué función cumple el TransactionStateManager dentro de la arquitectura de transacciones?",
        answer:
          "Se encarga de almacenar y gestionar de forma persistente los metadatos de estado asociados a cada ID transaccional.",
      },
      {
        prompt:
          "¿Qué mecanismo se utiliza para liberar registros adquiridos por un consumidor compartido si no se confirman a tiempo?",
        answer:
          "El AcquisitionLockTimeoutHandler libera los registros cuyo bloqueo de adquisición ha expirado para que puedan ser reasignados.",
      },
      {
        prompt:
          "¿Cuál es el propósito fundamental del marco de trabajo Kafka Connect?",
        answer:
          "Facilitar el movimiento de datos entre Kafka y otros sistemas externos mediante conectores de origen (source) y sumidero (sink).",
      },
      {
        prompt:
          "¿Qué interfaz actúa como coordinador central para gestionar el ciclo de vida de los conectores y sus tareas en Connect?",
        answer:
          "La interfaz Herder gestiona el inicio, parada, pausa y reinicio de conectores y tareas, así como las actualizaciones de configuración.",
      },
      {
        prompt:
          "¿Cómo se garantiza la persistencia de configuraciones y desplazamientos en un despliegue distribuido de Kafka Connect?",
        answer:
          "Connect utiliza temas compactos de Kafka como almacenamiento persistente a través de implementaciones como KafkaConfigBackingStore.",
      },
      {
        prompt:
          "¿Qué política por defecto impide que los conectores de Connect sobrescriban configuraciones de cliente a nivel de worker?",
        answer:
          "La política NoneConnectorClientConfigOverridePolicy es el comportamiento predeterminado que prohíbe cualquier sobrescritura.",
      },
      {
        prompt:
          "¿Cuál es la función del RetryWithToleranceOperator en la ejecución de tareas de Kafka Connect?",
        answer:
          "Permite continuar el procesamiento incluso si ocurren errores en transformaciones o conversiones individuales, según niveles de tolerancia configurables.",
      },
      {
        prompt:
          "¿Qué es una Dead Letter Queue (DLQ) en el contexto de Kafka Connect?",
        answer:
          "Es un tema de Kafka al que se redirigen los registros que no pueden ser procesados tras agotar los reintentos en un conector de sumidero.",
      },
      {
        prompt:
          "¿Qué abstracción de Kafka Streams representa un flujo de registros de cambios (changelog) donde cada registro es una actualización de una clave?",
        answer:
          "La interfaz KTable representa este tipo de flujo de datos estructurado como una tabla primaria.",
      },
      {
        prompt:
          "¿Cuál es la diferencia principal entre una KTable y una GlobalKTable en Kafka Streams?",
        answer:
          "La GlobalKTable se replica completamente en todas las instancias de la aplicación, eliminando la necesidad de re-particionar datos en las uniones.",
      },
      {
        prompt:
          "¿Qué interfaz de la API de procesador (PAPI) proporciona acceso a metadatos de flujo y permite programar puntuaciones periódicas?",
        answer:
          "ProcessorContext ofrece acceso al entorno de ejecución y permite interactuar con los almacenes de estado y programar tareas.",
      },
      {
        prompt:
          "¿Qué funcionalidad de Kafka Streams permite a aplicaciones externas consultar directamente los almacenes de estado internos?",
        answer:
          "La API de Consultas Interactivas (Interactive Queries) permite extraer datos de los almacenes de estado locales o globales.",
      },
      {
        prompt:
          "Cloze: La estrategia ____ controla si los resultados agregados en Streams se emiten en cada actualización o solo cuando se cierra la ventana de tiempo.",
        answer: "EmitStrategy",
      },
      {
        prompt:
          "¿Qué estructura de Kafka Streams rastrea el estado de procesamiento en las particiones para garantizar la consistencia en las consultas?",
        answer:
          "La clase Position rastrea los desplazamientos procesados por un almacén de estado.",
      },
      {
        prompt:
          "¿Qué herramienta de línea de comandos se utiliza para gestionar configuraciones de entidades como brokers, temas y usuarios?",
        answer:
          "kafka-configs.sh invoca la clase ConfigCommand para la gestión de configuraciones dinámicas.",
      },
      {
        prompt:
          "¿Cuál es el script base encargado de configurar el entorno de ejecución Java y el classpath para todas las herramientas de Kafka?",
        answer:
          "kafka-run-class.sh es el punto de entrada central para la ejecución de aplicaciones Java en Kafka.",
      },
      {
        prompt:
          "¿Qué utilidad permite realizar pruebas de rendimiento midiendo la latencia de extremo a extremo de los mensajes?",
        answer:
          "kafka-e2e-latency.sh mide el tiempo de ida y vuelta de los mensajes para evaluar la capacidad de respuesta del sistema.",
      },
      {
        prompt:
          "¿Qué herramienta se encarga de formatear directorios de almacenamiento e inicializar los metadatos para el modo KRaft?",
        answer:
          "kafka-storage.sh utiliza la clase StorageTool para preparar los directorios de registro y los metadatos del clúster.",
      },
      {
        prompt:
          "¿Qué componente captura el estado completo del clúster de metadatos en un punto temporal específico en KRaft?",
        answer:
          "MetadataImage es el agregado inmutable que representa la totalidad de la información del clúster en un momento dado.",
      },
      {
        prompt:
          "¿Cómo se aplican los cambios incrementales a la imagen de metadatos en el controlador de Kafka?",
        answer:
          "Los objetos MetadataDelta procesan registros ApiMessage para aplicar actualizaciones y generar una nueva MetadataImage inmutable.",
      },
      {
        prompt:
          "¿Qué gestor del controlador se encarga de rastrear la validez de las sesiones de los brokers y sus latidos (heartbeats)?",
        answer:
          "BrokerHeartbeatManager supervisa la vivacidad de los brokers y el estado de sus sesiones dentro del clúster.",
      },
      {
        prompt:
          "¿Qué interfaz define las políticas para decidir en qué brokers y directorios se colocarán las réplicas de una partición?",
        answer:
          "La interfaz ReplicaPlacer establece el contrato para las políticas de colocación de réplicas en el clúster.",
      },
      {
        prompt:
          "¿Qué estrategia de colocación distribuye las réplicas priorizando la tolerancia a fallos entre diferentes racks?",
        answer:
          "StripedReplicaPlacer distribuye las réplicas de forma aleatoria y equilibrada entre racks y brokers disponibles.",
      },
      {
        prompt: "Concepto: QuorumState",
        answer:
          "Definición: Componente que centraliza la lógica de la máquina de estados de un nodo Raft, definiendo roles como Líder, Candidato o Seguidor.",
      },
      {
        prompt:
          "¿Qué clase almacena de forma persistente el estado de elección (época, líder y voto) de un nodo Raft?",
        answer:
          "ElectionState encapsula la información crítica del consenso que debe ser recuperada tras un reinicio del nodo.",
      },
      {
        prompt:
          "¿Qué utilidad permite la comunicación asíncrona y no bloqueante mediante el intercambio de mensajes de protocolo Raft?",
        answer:
          "KafkaNetworkChannel gestiona el envío y la recepción de solicitudes Raft de forma asíncrona.",
      },
      {
        prompt:
          "¿Para qué sirve el BatchMemoryPool en la implementación de Raft?",
        answer:
          "Optimiza el uso de memoria mediante la asignación y reutilización de instancias de ByteBuffer de tamaño fijo.",
      },
      {
        prompt:
          "¿Qué componente gestiona la membresía y el reequilibrio (rebalance) de los grupos de consumidores en Kafka?",
        answer:
          "El GroupCoordinator coordina la asignación de particiones y rastrea los desplazamientos (offsets) confirmados de los grupos.",
      },
      {
        prompt:
          "¿Qué marco de trabajo permite construir coordinadores como máquinas de estado replicadas gestionadas por particiones de temas?",
        answer:
          "CoordinatorRuntime proporciona la infraestructura para el estado consistente, procesamiento asíncrono y reconstrucción de estado mediante reproducción de registros.",
      },
      {
        prompt:
          "¿Cuál es el propósito del OffsetMetadataManager dentro de la coordinación de grupos?",
        answer:
          "Gestionar exclusivamente los desplazamientos confirmados y transaccionales, incluyendo su persistencia y expiración.",
      },
      {
        prompt:
          "¿Qué estrategia de asignación distribuye particiones en rangos contiguos, priorizando la estabilidad de los miembros estáticos?",
        answer:
          "RangeAssignor asigna rangos contiguos de particiones a cada miembro para facilitar la co-partición.",
      },
      {
        prompt:
          "¿Qué garantiza el proceso de limpieza de registros (log cleaning) en Kafka?",
        answer:
          "Garantiza que el registro retenga al menos el último valor para cada clave de mensaje, compactando el espacio ocupado en disco.",
      },
      {
        prompt:
          "¿Cuál es la función del LeaderEpochFileCache en la replicación de datos?",
        answer:
          "Mantiene un historial persistente de los mapeos entre épocas de líder y offsets iniciales para permitir truncamientos de log precisos en los seguidores.",
      },
      {
        prompt:
          "¿Qué permite la funcionalidad de 'Tiered Storage' (almacenamiento por niveles) en Kafka?",
        answer:
          "Permite mover segmentos de log antiguos a sistemas de almacenamiento remoto más económicos, liberando espacio en disco local.",
      },
      {
        prompt:
          "¿Qué componente coordina las tareas de copia, expiración y seguimiento de offsets en el almacenamiento por niveles?",
        answer:
          "El RemoteLogManager actúa como coordinador central para todas las operaciones relacionadas con el almacenamiento remoto de registros.",
      },
      {
        prompt:
          "¿Cómo evita el sistema el agotamiento de recursos durante las operaciones de copia a almacenamiento remoto?",
        answer:
          "Mediante el RLMQuotaManager, que aplica límites de tasa de bytes para controlar el tráfico de red hacia el almacenamiento remoto.",
      },
      {
        prompt:
          "¿Qué utilidad del servidor permite limitar la tasa de operaciones para mantener la estabilidad del sistema bajo carga?",
        answer:
          "La clase Throttler introduce retardos dinámicos cuando la tasa de operaciones observada supera un límite deseado.",
      },
      {
        prompt:
          "¿Qué herramienta se utiliza en el desarrollo de Kafka para generar automáticamente código Java a partir de esquemas JSON?",
        answer:
          "MessageGenerator procesa especificaciones JSON para crear clases de datos de mensajes con lógica de serialización incluida.",
      },
      {
        prompt:
          "¿Cuál es el objetivo de utilizar micro-benchmarks JMH en el proyecto Kafka?",
        answer:
          "Evaluar las características de latencia y rendimiento de componentes críticos como ACLs, cachés y protocolos de red.",
      },
      {
        prompt:
          "Cloze: En el entorno de Kafka Streams, las operaciones de ventana utilizan un ____ para determinar si los datos tardíos aún pueden ser procesados.",
        answer: "grace period (periodo de gracia)",
      },
      {
        prompt:
          "¿Qué clase representa el estado de una réplica individual en términos de sus desplazamientos finales y tiempos de actualización?",
        answer:
          "ReplicaState encapsula la información crítica como el logEndOffset y el lastCaughtUpTimeMs.",
      },
      {
        prompt:
          "¿Qué proceso asegura que los registros de metadatos sensibles no se expongan en los logs del sistema?",
        answer:
          "La clase RecordRedactor se encarga de censurar información como contraseñas o material de claves antes de la escritura en logs.",
      },
      {
        prompt:
          "¿Qué mecanismo asíncrono utiliza Kafka para retrasar la respuesta a una solicitud hasta que se cumpla una condición o expire un tiempo?",
        answer:
          "El patrón de purgatorio (purgatory) gestiona operaciones diferidas como DelayedProduce o DelayedFetch.",
      },
      {
        prompt:
          "¿Qué objeto de Kafka Connect representa una unidad fundamental de movimiento de datos ejecutada por un worker?",
        answer:
          "Una Task (tarea) es la instancia de ejecución que procesa los registros de datos tras la instanciación de un conector.",
      },
      {
        prompt:
          "¿Cuál es la función de un Converter en el ecosistema de Kafka Connect?",
        answer:
          "Transformar los datos entre el formato interno estructurado de Connect y el formato de bytes serializados de Kafka.",
      },
      {
        prompt:
          "¿Cómo garantiza Kafka Connect la entrega de exactamente una vez en tareas de origen?",
        answer:
          "Mediante el uso de un productor transaccional que confirma atómicamente los registros de origen y sus desplazamientos correspondientes.",
      },
    ],
  },
  {
    id: "kafka2",
    name: "Kafka2",
    cards: [
      {
        prompt:
          "¿Cuáles son los tres objetivos fundamentales que se buscan en los sistemas de datos según Martin Kleppmann?",
        answer:
          "Fiabilidad (Reliability), escalabilidad (Scalability) y mantenibilidad (Maintainability).",
      },
      {
        prompt:
          "En el contexto de sistemas distribuidos, ¿qué es la replicación (replication)?",
        answer:
          "Es el proceso de mantener una copia de los mismos datos en múltiples máquinas conectadas a través de una red.",
      },
      {
        prompt:
          "La partición de datos, también conocida como _____, es una estrategia para distribuir una base de datos en múltiples máquinas.",
        answer: "sharding",
      },
      {
        prompt:
          "En sistemas de datos, un error que está correlacionado entre nodos y tiende a causar más fallos que los fallos de hardware no correlacionados se conoce como _____.",
        answer: "error sistemático (systematic error)",
      },
      {
        prompt:
          "¿Qué efecto profundo tiene el modelo de datos elegido en una aplicación?",
        answer:
          "Determina lo que el software puede y no puede hacer, afectando la simplicidad del código de la aplicación.",
      },
      {
        prompt:
          "¿Para qué tipo de estructura de datos es particularmente adecuado un modelo de datos de documento?",
        answer:
          "Para datos con una estructura similar a un documento o árbol (relaciones uno a muchos), donde todo el árbol se carga a la vez.",
      },
      {
        prompt:
          "¿Cuál es el propósito principal de un índice en una base de datos?",
        answer:
          "Actuar como una estructura de datos adicional que ayuda a encontrar eficientemente el valor de una clave particular.",
      },
      {
        prompt:
          "¿Cuál es la principal desventaja de mantener índices adicionales en una base de datos?",
        answer:
          "Incurre en una sobrecarga, especialmente en las escrituras, ya que el índice también debe actualizarse cada vez que se escriben datos.",
      },
      {
        prompt:
          "Un diseño de almacenamiento donde los valores de cada columna se almacenan juntos, en lugar de por filas, se llama _____.",
        answer: "almacenamiento orientado a columnas (column-oriented storage)",
      },
      {
        prompt:
          "¿Qué es la compatibilidad hacia adelante (forward compatibility) en la evolución de esquemas de datos?",
        answer:
          "Requiere que el código más antiguo ignore las adiciones realizadas por una versión más nueva del código, permitiendo la coexistencia.",
      },
      {
        prompt: "En Kafka, ¿qué es un bróker (broker)?",
        answer:
          "Es un servidor único en un clúster de Kafka que almacena datos de temas y sirve peticiones de productores y consumidores.",
      },
      {
        prompt:
          "¿Qué rol desempeña el líder de una partición (partition leader) en Kafka?",
        answer:
          "Es el único bróker responsable de gestionar todas las lecturas y escrituras para esa partición específica.",
      },
      {
        prompt:
          "¿Cuál es la función de las réplicas seguidoras (follower replicas) en Kafka?",
        answer:
          "Proporcionan redundancia copiando los mensajes del líder de la partición, permitiendo tomar el liderazgo si el líder falla.",
      },
      {
        prompt:
          "La herramienta de Kafka que consume mensajes de un clúster y los produce en otro se llama _____.",
        answer: "MirrorMaker",
      },
      {
        prompt:
          "En una replicación basada en líder, ¿cómo se añade un nuevo seguidor (follower)?",
        answer:
          "Copiando una instantánea (snapshot) de la base de datos del líder y luego solicitando todos los cambios de datos ocurridos desde la instantánea.",
      },
      {
        prompt:
          "¿Qué se entiende por 'retraso de replicación' (replication lag)?",
        answer:
          "Es el tiempo que tarda un cambio realizado en el líder en reflejarse en un seguidor en un sistema de replicación asíncrona.",
      },
      {
        prompt: "Concepto: Consistencia eventual (Eventual Consistency).",
        answer:
          "Definición: Una garantía de que, si no se realizan nuevas actualizaciones, todas las réplicas eventualmente convergerán al mismo valor.",
      },
      {
        prompt:
          "En la replicación multilíder, ¿cuál es el principal desafío que debe abordarse cuando los mismos datos se modifican simultáneamente en diferentes centros de datos?",
        answer:
          "La resolución de conflictos de escritura (write conflict resolution).",
      },
      {
        prompt:
          "En sistemas sin líder como Riak, los valores escritos simultáneamente que deben ser fusionados por el cliente se denominan _____.",
        answer: "hermanos (siblings)",
      },
      {
        prompt:
          "Cuando se particionan índices secundarios, ¿qué es un índice global (global index)?",
        answer:
          "Un índice que cubre datos de todas las particiones, y que a su vez debe ser particionado para evitar cuellos de botella.",
      },
      {
        prompt:
          "¿Qué significa la serializabilidad (serializability) en el contexto del aislamiento ACID?",
        answer:
          "Que el resultado de ejecutar transacciones concurrentes es el mismo que si se hubieran ejecutado en serie, una tras otra.",
      },
      {
        prompt:
          "La propiedad ACID que garantiza que una transacción se complete en su totalidad o no tenga ningún efecto se llama _____.",
        answer: "atomicidad (atomicity)",
      },
      {
        prompt:
          "¿Qué tipo de condición de carrera se previene con operaciones atómicas como 'comparar y establecer' (compare-and-set)?",
        answer:
          "Las actualizaciones perdidas (lost updates), donde dos clientes leen, modifican y escriben el mismo objeto simultáneamente.",
      },
      {
        prompt:
          "El problema de concurrencia donde una transacción lee algunos datos, otra transacción escribe datos que afectan a la primera, y la primera transacción es invalidada se llama _____.",
        answer: "sesgo de escritura (write skew)",
      },
      {
        prompt:
          "¿Cuál es la forma más simple de evitar problemas de concurrencia en transacciones?",
        answer:
          "Eliminar la concurrencia por completo ejecutando solo una transacción a la vez en serie (serial execution).",
      },
      {
        prompt:
          "El aislamiento de instantánea serializable (Serializable Snapshot Isolation - SSI) es una técnica de control de concurrencia _____.",
        answer: "optimista",
      },
      {
        prompt:
          "En un sistema distribuido, si envías una petición y no recibes respuesta, ¿por qué es imposible saber la causa exacta del fallo?",
        answer:
          "Porque no se puede distinguir si la petición se perdió, el nodo remoto está caído o la respuesta se perdió.",
      },
      {
        prompt:
          "Para medir el tiempo transcurrido (ej. timeouts) en un sistema distribuido, ¿qué tipo de reloj es generalmente seguro de usar?",
        answer:
          "Un reloj monotónico (monotonic clock), ya que no asume sincronización entre los relojes de diferentes nodos.",
      },
      {
        prompt:
          "La estrategia de resolución de conflictos que se basa en la marca de tiempo de un reloj local para decidir qué escritura conservar se llama _____ y es propensa a la pérdida de datos.",
        answer: "la última escritura gana (Last Write Wins - LWW)",
      },
      {
        prompt:
          "¿Qué garantía proporciona la linealizabilidad (linearizability) en un sistema distribuido?",
        answer:
          "Hace que el sistema parezca tener una sola copia de los datos, y que todas las operaciones sobre ella sean atómicas y se ejecuten en un orden bien definido.",
      },
      {
        prompt:
          "La difusión de orden total (total order broadcast) es un protocolo que garantiza que todos los nodos entreguen los mismos mensajes en el _____.",
        answer: "mismo orden",
      },
      {
        prompt:
          "El problema de conseguir que varios nodos se pongan de acuerdo sobre algo en un sistema distribuido se conoce como _____.",
        answer: "consenso (consensus)",
      },
      {
        prompt:
          "¿Cuál es el propósito del algoritmo de confirmación en dos fases (Two-Phase Commit - 2PC)?",
        answer:
          "Lograr la confirmación atómica de transacciones en múltiples nodos, asegurando que todos confirmen o todos aborten.",
      },
      {
        prompt:
          "Sistemas como ZooKeeper y etcd utilizan un algoritmo de _____ para replicar una pequeña cantidad de datos en todos los nodos.",
        answer:
          "difusión de orden total tolerante a fallos (fault-tolerant total order broadcast)",
      },
      {
        prompt:
          "¿Qué característica de ZooKeeper permite implementar un bloqueo distribuido (distributed lock)?",
        answer:
          "Sus operaciones atómicas linealizables, como 'comparar y establecer' (compare-and-set).",
      },
      {
        prompt: "En Kafka, ¿qué es un grupo de consumidores (consumer group)?",
        answer:
          "Un conjunto de consumidores que cooperan para consumir datos de un tema, donde cada partición es asignada a un solo consumidor del grupo.",
      },
      {
        prompt:
          "¿Cuál es el principal mecanismo de escalabilidad para el consumo de datos en Kafka?",
        answer:
          "Añadir más consumidores a un grupo de consumidores para distribuir la carga de las particiones.",
      },
      {
        prompt:
          "¿Qué sucede si se añaden más consumidores a un grupo que el número de particiones de un tema en Kafka?",
        answer:
          "Los consumidores adicionales permanecerán inactivos (idle) ya que no hay particiones disponibles para asignarles.",
      },
      {
        prompt:
          "En Kafka, el proceso de reasignar particiones entre los miembros de un grupo de consumidores se llama _____.",
        answer: "reequilibrio (rebalance)",
      },
      {
        prompt:
          "¿Qué ventaja ofrece la membresía de grupo estática (static group membership) en los consumidores de Kafka?",
        answer:
          "Evita un reequilibrio completo del grupo cuando un consumidor se reinicia, ya que se le reasignan las mismas particiones que tenía antes.",
      },
      {
        prompt:
          "En un consumidor de Kafka, el parámetro `fetch.min.bytes` controla la cantidad mínima de datos que el bróker debe tener antes de responder a una petición de obtención, reduciendo la carga en el _____ y el _____.",
        answer: "consumidor, bróker",
      },
      {
        prompt:
          "¿Qué sucede si un consumidor de Kafka no envía un 'heartbeat' al coordinador del grupo dentro del `session.timeout.ms`?",
        answer:
          "Se considera muerto y el coordinador del grupo inicia un reequilibrio para reasignar sus particiones a otros miembros.",
      },
      {
        prompt: "En Kafka, ¿qué es un 'offset' de consumidor?",
        answer:
          "Es un marcador que indica la posición del último mensaje que un consumidor ha procesado con éxito en una partición.",
      },
      {
        prompt:
          "Si `enable.auto.commit` está activado en un consumidor de Kafka, ¿cuándo se confirman los offsets?",
        answer:
          "Periódicamente en segundo plano, según el intervalo definido en `auto.commit.interval.ms`.",
      },
      {
        prompt:
          "¿Qué método de la API de consumidor de Kafka ofrece una confirmación de offset síncrona y bloqueante?",
        answer: "`commitSync()`",
      },
      {
        prompt:
          "¿Por qué es importante el orden correcto de las confirmaciones de offset al usar `commitAsync()` en Kafka?",
        answer:
          "Para evitar que una confirmación más antigua sobrescriba una más nueva en caso de reintentos, lo que podría causar más duplicados en un reequilibrio.",
      },
      {
        prompt:
          "¿Qué clase en la API de cliente de Kafka se utiliza para la gestión programática de temas, grupos de consumidores y configuraciones?",
        answer: "AdminClient",
      },
      {
        prompt:
          "¿Qué es una réplica sincronizada (In-Sync Replica - ISR) en Kafka?",
        answer:
          "Es una réplica que se mantiene al día con el líder de la partición y es elegible para convertirse en el nuevo líder si el actual falla.",
      },
      {
        prompt:
          "¿Cuál es el riesgo de habilitar `unclean.leader.election.enable` en Kafka?",
        answer:
          "Permite que una réplica no sincronizada se convierta en líder, lo que puede provocar la pérdida de mensajes.",
      },
      {
        prompt:
          "El parámetro de tema `min.insync.replicas` en Kafka especifica el número mínimo de réplicas que deben acusar recibo de una escritura para que esta se considere _____.",
        answer: "exitosa (successful)",
      },
      {
        prompt: "En un productor de Kafka, ¿qué significa configurar `acks=0`?",
        answer:
          "El productor no espera ninguna confirmación del bróker y asume que el mensaje se envió tan pronto como se escribe en el socket.",
      },
      {
        prompt: "En un productor de Kafka, ¿qué significa configurar `acks=1`?",
        answer:
          "El productor espera la confirmación solo del líder de la partición, sin esperar a las réplicas seguidoras.",
      },
      {
        prompt:
          "En un productor de Kafka, ¿qué significa configurar `acks=all`?",
        answer:
          "El productor espera la confirmación del líder después de que todas las réplicas sincronizadas (ISRs) hayan recibido el mensaje.",
      },
      {
        prompt:
          "Un error que puede resolverse intentando la misma operación de nuevo, como un fallo temporal de red, se conoce como _____.",
        answer: "error recuperable (retriable error)",
      },
      {
        prompt: "¿Qué problema resuelve el productor idempotente en Kafka?",
        answer:
          "Evita la duplicación de mensajes causada por reintentos del productor, asegurando que los mensajes se escriban exactamente una vez.",
      },
      {
        prompt:
          "La semántica de procesamiento exactamente una vez (exactly-once semantics) en Kafka se logra combinando un productor idempotente con _____.",
        answer: "transacciones (transactions)",
      },
      {
        prompt:
          "¿Qué es un 'productor zombi' en el contexto de las transacciones de Kafka?",
        answer:
          "Una instancia anterior de un productor que se creía fallida pero que intenta confirmar una transacción después de que una nueva instancia ya haya comenzado a trabajar.",
      },
      {
        prompt:
          "Para que un consumidor de Kafka solo lea mensajes de transacciones confirmadas, su `isolation.level` debe configurarse en _____.",
        answer: "read_committed",
      },
      {
        prompt: "¿Cuál es el propósito de Kafka Connect?",
        answer:
          "Facilitar la integración de datos, transmitiendo datos de manera fiable y escalable entre Kafka y otros sistemas como bases de datos o motores de búsqueda.",
      },
      {
        prompt:
          "En Kafka Connect, un conector que lee datos de un sistema externo y los escribe en Kafka se llama _____.",
        answer: "conector de origen (Source Connector)",
      },
      {
        prompt:
          "En Kafka Connect, un conector que lee datos de Kafka y los escribe en un sistema externo se llama _____.",
        answer: "conector de sumidero (Sink Connector)",
      },
      {
        prompt: "En Kafka, ¿cómo se logra la autenticación de clientes?",
        answer:
          "Mediante SASL (Simple Authentication and Security Layer) o mTLS/SSL.",
      },
      {
        prompt: "¿Qué son las ACLs (Access Control Lists) en Kafka?",
        answer:
          "Son reglas que definen qué permisos (leer, escribir, etc.) tiene un principal (usuario) sobre un recurso específico (tema, grupo).",
      },
      {
        prompt:
          "Una métrica JMX clave para la salud del clúster de Kafka, que debe ser cero en un clúster sano, es el número de _____.",
        answer: "particiones sub-replicadas (UnderReplicatedPartitions)",
      },
      {
        prompt: "¿Qué es una topología (topology) en Kafka Streams?",
        answer:
          "Es un grafo acíclico dirigido (DAG) de procesadores de flujo (nodos) y flujos (aristas) que define la lógica de procesamiento de la aplicación.",
      },
      {
        prompt:
          "La unidad básica de paralelismo en una aplicación de Kafka Streams es una _____.",
        answer: "tarea (task)",
      },
      {
        prompt:
          "La técnica de procesamiento por lotes que lee un conjunto de datos de entrada y produce un conjunto de datos de salida, sin responder a peticiones, se llama _____.",
        answer: "procesamiento por lotes (batch processing)",
      },
      {
        prompt:
          "Un sistema que consume y procesa eventos poco después de que ocurren, operando sobre datos ilimitados, se conoce como _____.",
        answer: "procesador de flujos (stream processor)",
      },
      {
        prompt:
          "En el procesamiento por lotes, ¿qué significa la 'materialización de estado intermedio'?",
        answer:
          "El proceso de escribir el resultado de una etapa del trabajo en un archivo temporal antes de que la siguiente etapa lo lea.",
      },
      {
        prompt:
          "La captura de cambios de datos (Change Data Capture - CDC) es el proceso de observar todos los cambios de datos en una base de datos y extraerlos en forma de _____.",
        answer: "flujo de eventos (stream of events)",
      },
      {
        prompt:
          "La filosofía de datos donde el registro de eventos es la fuente de verdad y la base de datos es una caché de su estado más reciente se resume en la frase: 'La verdad es el _____.'",
        answer: "registro (log)",
      },
      {
        prompt:
          "¿Qué ventaja principal ofrecen los eventos inmutables en un sistema de flujo de datos?",
        answer:
          "Facilitan la depuración y la auditoría, ya que capturan lo que realmente sucedió en un momento dado sin ser modificado.",
      },
      {
        prompt:
          "En el procesamiento de flujos, ¿cuál es la diferencia entre el tiempo del evento (event time) y el tiempo de procesamiento (processing time)?",
        answer:
          "El tiempo del evento es cuándo ocurrió el evento en el mundo real, mientras que el tiempo de procesamiento es cuándo es observado por el procesador.",
      },
      {
        prompt:
          "¿Qué es un evento 'rezagado' (straggler event) en el procesamiento de flujos?",
        answer:
          "Un evento que llega al procesador con un retraso significativo, después de que la ventana de tiempo a la que pertenece ya ha sido procesada.",
      },
      {
        prompt:
          "En el procesamiento de flujos, ¿qué tipo de unión (join) busca eventos relacionados de dos flujos que ocurren dentro de una ventana de tiempo?",
        answer: "Unión de flujo con flujo (stream-stream join).",
      },
      {
        prompt:
          "Una operación que puede ser reintentada múltiples veces sin cambiar el resultado más allá de la aplicación inicial se describe como _____.",
        answer: "idempotente (idempotent)",
      },
      {
        prompt:
          "Para asegurar la integridad de los datos, el proceso de verificar si los datos han sido corrompidos se conoce como _____.",
        answer: "auditoría (auditing)",
      },
      {
        prompt:
          "Debido a los riesgos de seguridad y privacidad, los datos personales se han descrito como un 'activo _____' o 'material peligroso'.",
        answer: "tóxico (toxic asset)",
      },
      {
        prompt:
          "En Kafka, ¿cuál es el sistema operativo recomendado para entornos de producción?",
        answer:
          "Linux, debido a su rendimiento y estabilidad para aplicaciones de servidor Java.",
      },
      {
        prompt:
          "El recolector de basura de Java recomendado para ejecutar Kafka, especialmente con grandes montones de memoria (heaps), es el _____.",
        answer: "Garbage-First Garbage Collector (G1GC)",
      },
      {
        prompt:
          "En la configuración de un productor de Kafka, `delivery.timeout.ms` establece un límite de tiempo superior para que un mensaje sea entregado, incluyendo _____ y _____.",
        answer: "reintentos, tiempo de espera de red",
      },
      {
        prompt: "¿Qué hace el parámetro `batch.size` en un productor de Kafka?",
        answer:
          "Controla la cantidad máxima de datos en bytes que el productor agrupará en un solo lote antes de enviarlo al bróker.",
      },
      {
        prompt:
          "¿Por qué es Avro un buen formato de serialización para un sistema de mensajería como Kafka?",
        answer:
          "Porque permite que el esquema evolucione de manera compatible, permitiendo que los consumidores lean mensajes con esquemas antiguos o nuevos.",
      },
      {
        prompt:
          "En Kafka, las cuotas (quotas) se pueden aplicar dinámicamente a clientes específicos para limitar su tasa de producción o consumo de _____.",
        answer: "bytes",
      },
      {
        prompt:
          "La interfaz `ConsumerRebalanceListener` en la API de consumidor de Kafka permite a una aplicación ejecutar código personalizado cuando las particiones son _____ o _____ de un consumidor.",
        answer:
          "asignadas (onPartitionsAssigned), revocadas (onPartitionsRevoked)",
      },
      {
        prompt:
          "Una elección de líder 'sucia' (unclean) en Kafka se refiere a la elección de un nuevo líder para una partición que _____ estaba en el conjunto de réplicas sincronizadas.",
        answer: "no",
      },
      {
        prompt:
          "¿Qué es una compactación de registro (log compaction) en Kafka?",
        answer:
          "Es una política de retención que asegura que Kafka retenga al menos la última actualización para cada clave de mensaje dentro de una partición.",
      },
      {
        prompt:
          "La métrica de JMX `RequestHandlerAvgIdlePercent` en un bróker de Kafka indica el porcentaje de tiempo que los hilos de manejo de peticiones están _____, siendo un indicador de la carga del bróker.",
        answer: "inactivos (idle)",
      },
      {
        prompt:
          "En un clúster de Kafka bien equilibrado, la métrica `LeaderCount` debería estar distribuida de manera _____ entre todos los brókeres.",
        answer: "uniforme",
      },
      {
        prompt:
          "Cuando un productor de Kafka recibe un error `LEADER_NOT_AVAILABLE`, ¿es este un error recuperable (retriable)?",
        answer:
          "Sí, porque el productor puede reintentar el envío después de que se elija un nuevo líder.",
      },
      {
        prompt: "¿Qué controla el parámetro de consumidor `auto.offset.reset`?",
        answer:
          "Define desde dónde comenzará a leer un consumidor cuando no tiene un offset inicial confirmado, con opciones como 'earliest' o 'latest'.",
      },
      {
        prompt:
          "¿Cuál es la función del particionador (partitioner) en un productor de Kafka?",
        answer:
          "Elegir la partición a la que se enviará un registro, generalmente basándose en la clave del registro para garantizar el orden por clave.",
      },
      {
        prompt:
          "El parámetro `max.in.flight.requests.per.connection` en un productor de Kafka, si se establece en un valor mayor que 1, puede romper el orden de los mensajes si hay _____, a menos que la idempotencia esté activada.",
        answer: "reintentos (retries)",
      },
      {
        prompt:
          "La herramienta `kafka-topics.sh` se utiliza para realizar operaciones de gestión de temas, como crear, modificar, eliminar y _____ información sobre ellos.",
        answer: "listar",
      },
      {
        prompt:
          "La herramienta `kafka-consumer-groups.sh` permite inspeccionar el estado de los grupos de consumidores, incluyendo el _____ por partición.",
        answer: "retraso (lag)",
      },
      {
        prompt:
          "Para asegurar que los mensajes de una partición se distribuyan entre diferentes racks de un centro de datos para una mayor disponibilidad, se debe configurar el parámetro `_____` en cada bróker.",
        answer: "broker.rack",
      },
      {
        prompt:
          "El mecanismo de autenticación SASL que utiliza un nombre de usuario y una contraseña en texto plano, y que no es seguro sin SSL/TLS, se llama _____.",
        answer: "PLAIN",
      },
      {
        prompt:
          "El mecanismo de autenticación SASL que utiliza un protocolo de desafío-respuesta para evitar enviar contraseñas en texto plano se llama _____.",
        answer: "SCRAM (Salted Challenge Response Authentication Mechanism)",
      },
      {
        prompt:
          "En Kafka, ¿qué permiso de ACL se requiere para que un productor escriba en un tema?",
        answer: "Topic:Write",
      },
      {
        prompt:
          "¿Qué es la elección de réplica preferida (preferred replica election) en Kafka?",
        answer:
          "Un proceso administrativo para restaurar el liderazgo de las particiones a sus réplicas preferidas originales, ayudando a reequilibrar la carga del clúster.",
      },
      {
        prompt:
          "La herramienta de línea de comandos `kafka-dump-log.sh` es útil para _____ e inspeccionar el contenido de los archivos de segmento de registro de Kafka.",
        answer: "depurar (debug)",
      },
      {
        prompt:
          "El almacenamiento en niveles (tiered storage) en Kafka permite mover segmentos de registro más antiguos a un almacenamiento de objetos más económico, mientras se mantiene una pequeña cantidad de datos en el almacenamiento local de _____ rendimiento.",
        answer: "alto",
      },
      {
        prompt:
          "En Kafka Streams, el estado local de una tarea (por ejemplo, para agregaciones o uniones) se almacena típicamente en una base de datos embebida como _____.",
        answer: "RocksDB",
      },
      {
        prompt:
          "Cuando una aplicación de Kafka Streams se reinicia, ¿cómo recupera su estado?",
        answer:
          "Restaurando el estado desde un changelog topic en Kafka, que contiene todos los cambios del estado local.",
      },
      {
        prompt: "¿Qué es una 'visión materializada' (materialized view)?",
        answer:
          "Un conjunto de datos derivado, como un índice o una tabla de agregados, que se mantiene actualizado a partir de un conjunto de datos primario.",
      },
      {
        prompt:
          "En arquitecturas de microservicios, la comunicación asíncrona a través de flujos de eventos es una alternativa a las llamadas síncronas de red como las API _____, promoviendo un acoplamiento más débil.",
        answer: "REST",
      },
      {
        prompt:
          "En el control de concurrencia, ¿qué es un 'fantasma' (phantom)?",
        answer:
          "Un tipo de condición de carrera donde una escritura en una transacción cambia el resultado de una consulta de rango en otra transacción.",
      },
      {
        prompt:
          "El bloqueo de dos fases (Two-Phase Locking - 2PL) es una técnica de control de concurrencia _____.",
        answer: "pesimista",
      },
      {
        prompt:
          "En un sistema distribuido, la suposición de que la red es fiable, la latencia es cero y el ancho de banda es infinito se conoce como las _____ de la computación distribuida.",
        answer: "falacias (fallacies)",
      },
      {
        prompt:
          "La API AdminClient de Kafka está diseñada para ser asíncrona, devolviendo objetos `_____` que se completan cuando la operación en el bróker finaliza.",
        answer: "Future",
      },
      {
        prompt:
          "¿Qué significa que el modelo de datos de un sistema es 'evolucionable' (evolvable)?",
        answer:
          "Que permite realizar cambios en el esquema de los datos (schema evolution) de forma compatible con versiones antiguas y nuevas del software.",
      },
      {
        prompt:
          "En Kafka, ¿cuál es el propósito de la configuración de cliente `client.dns.lookup`?",
        answer:
          "Controla cómo el cliente resuelve los nombres DNS, por ejemplo, para expandir un alias DNS a una lista completa de brókeres.",
      },
      {
        prompt:
          "El método `consumer.poll()` en la API de consumidor de Kafka no solo recupera registros, sino que también es responsable de mantener la sesión activa mediante el envío de _____ en segundo plano.",
        answer: "heartbeats",
      },
      {
        prompt:
          "En Kafka Connect, ¿cuál es la función de un convertidor (converter)?",
        answer:
          "Gestionar la serialización y deserialización de datos entre el formato del conector y el formato almacenado en Kafka (ej. JSON, Avro).",
      },
      {
        prompt:
          "Una arquitectura de replicación entre múltiples centros de datos donde un centro de datos es el principal y los otros son pasivos se llama _____.",
        answer: "activa-pasiva (active-passive)",
      },
      {
        prompt:
          "Una arquitectura de replicación donde cada centro de datos sirve tráfico de lectura y escritura y replica datos a los demás se llama _____.",
        answer: "activa-activa (active-active)",
      },
      {
        prompt:
          "¿Qué problema se debe evitar en la replicación activa-activa con más de dos centros de datos?",
        answer:
          "Bucles de replicación (replication loops), donde el mismo evento se replica indefinidamente entre los centros de datos.",
      },
      {
        prompt:
          "En Kafka, ¿qué son las transformaciones de mensaje único (Single Message Transformations - SMTs) en Kafka Connect?",
        answer:
          "Son operaciones ligeras que modifican mensajes individuales a medida que pasan por un conector, sin necesidad de un framework de procesamiento de flujos.",
      },
      {
        prompt:
          "¿Cuál es la función del nodo controlador (controller) en un clúster de Kafka?",
        answer:
          "Es un bróker elegido responsable de las tareas administrativas del clúster, como gestionar las elecciones de líderes de partición.",
      },
      {
        prompt:
          "En Kafka, la época del controlador (controller epoch) es un número que se incrementa cada vez que se elige un nuevo controlador para evitar el problema de _____.",
        answer: "cerebro dividido (split-brain)",
      },
    ],
  },
  {
    id: "modern_arch",
    name: "Modern Arch",
    cards: [
      {
        prompt:
          "¿Qué es una arquitectura monolítica según la descripción tradicional?",
        answer:
          "Un diseño de software donde una aplicación se construye como una única unidad con una base de código compartida y componentes integrados.",
      },
      {
        prompt:
          "En una arquitectura monolítica, ¿qué desafío principal surge al escalar la aplicación?",
        answer:
          "Requiere reproducir todo el sistema, lo cual es intensivo en recursos e ineficiente.",
      },
      {
        prompt: "¿Qué es la arquitectura de microservicios?",
        answer:
          "Un diseño que descompone una aplicación en servicios más pequeños e implementables que realizan funciones de negocio especializadas.",
      },
      {
        prompt:
          "¿Cuál es una ventaja clave de los microservicios en términos de escalabilidad?",
        answer:
          "Permite el escalado dirigido de servicios individuales de forma autónoma, optimizando el uso de recursos.",
      },
      {
        prompt:
          "Una desventaja de la arquitectura de microservicios es la complicación en la _____ y la integración del sistema.",
        answer: "comunicación entre servicios",
      },
      {
        prompt:
          "¿Para qué tipo de aplicaciones son más adecuadas las arquitecturas monolíticas?",
        answer:
          "Aplicaciones más pequeñas y sencillas donde la simplicidad de desarrollo y despliegue son prioritarias.",
      },
      {
        prompt:
          "¿Para qué tipo de aplicaciones son preferibles las arquitecturas de microservicios?",
        answer:
          "Sistemas grandes y complejos que requieren alta escalabilidad, flexibilidad y resiliencia.",
      },
      {
        prompt:
          "¿Qué principio de ingeniería de software aboga por dividir un sistema en secciones distintas y no superpuestas?",
        answer: "Separación de Intereses (Separation of Concerns - SoC).",
      },
      {
        prompt:
          "El principio _____ tiene como objetivo reducir la repetición de información y lógica en el desarrollo de software.",
        answer: "No te Repitas (Don't Repeat Yourself - DRY)",
      },
      {
        prompt:
          'Según la "Regla de Tres" para aplicar DRY, ¿cuándo se debe abstraer un fragmento de código?',
        answer:
          "Después de que se haya duplicado al menos dos veces, para evitar una abstracción prematura.",
      },
      {
        prompt: "¿Qué son los principios SOLID?",
        answer:
          "Un conjunto de cinco principios de diseño en programación orientada a objetos para crear software más comprensible, flexible y mantenible.",
      },
      {
        prompt:
          "En SOLID, ¿qué significa el Principio de Responsabilidad Única (SRP)?",
        answer:
          "Una clase debe tener una sola razón para cambiar, es decir, un solo trabajo.",
      },
      {
        prompt:
          "El Principio de Abierto/Cerrado (OCP) de SOLID establece que las entidades de software deben estar abiertas para la _____ pero cerradas para la _____.",
        answer: "extensión; modificación",
      },
      {
        prompt: "¿Qué garantiza el Principio de Sustitución de Liskov (LSP)?",
        answer:
          "Que los subtipos deben ser sustituibles por sus tipos base sin alterar la corrección del programa.",
      },
      {
        prompt:
          "El Principio de Segregación de Interfaces (ISP) de SOLID sugiere crear interfaces más _____ y _____ en lugar de una grande y de propósito general.",
        answer: "pequeñas; específicas",
      },
      {
        prompt:
          "¿Qué dicta el Principio de Inversión de Dependencias (DIP) de SOLID?",
        answer:
          "Los módulos de alto nivel no deben depender de los de bajo nivel; ambos deben depender de abstracciones.",
      },
      {
        prompt: "¿Qué es una arquitectura por capas (n-tier)?",
        answer:
          "Un patrón que organiza un sistema en capas horizontales, cada una con una responsabilidad específica, como la interfaz de usuario o la persistencia de datos.",
      },
      {
        prompt:
          "¿Cómo se restringe típicamente la comunicación en una arquitectura por capas estricta?",
        answer:
          "Una capa solo debe comunicarse con la capa inmediatamente inferior.",
      },
      {
        prompt: "¿Qué es la Arquitectura Orientada a Eventos (EDA)?",
        answer:
          "Un paradigma donde los componentes del sistema se comunican de forma asíncrona a través de la producción y consumo de eventos.",
      },
      {
        prompt:
          "Un ejemplo de uso de la Arquitectura Orientada a Eventos es el procesamiento de datos de IoT, donde los sensores publican datos como _____ a una plataforma central.",
        answer: "eventos",
      },
      {
        prompt:
          "¿Qué enfoque de diseño de software centra el proceso de desarrollo en una comprensión profunda del dominio del negocio?",
        answer: "Diseño Orientado al Dominio (Domain-Driven Design - DDD).",
      },
      {
        prompt: "En DDD, ¿qué es el Lenguaje Ubicuo?",
        answer:
          "Un lenguaje compartido que todos en el proyecto, tanto técnicos como expertos del dominio, utilizan para cerrar la brecha de comunicación.",
      },
      {
        prompt: "¿Qué es una arquitectura API-First?",
        answer:
          "Un enfoque de diseño que trata las APIs de la aplicación como el producto principal, comenzando el desarrollo con su diseño y documentación.",
      },
      {
        prompt:
          "La arquitectura _____ y nativa de la nube utiliza tecnologías como Docker y Kubernetes para crear aplicaciones resilientes, elásticas y fáciles de gestionar.",
        answer: "basada en contenedores",
      },
      {
        prompt:
          "¿Por qué es importante diseñar aplicaciones sin estado (stateless) en una arquitectura nativa de la nube?",
        answer:
          "Permite al orquestador escalar horizontalmente las instancias y reemplazar contenedores fallidos sin perder el contexto del usuario.",
      },
      {
        prompt: "¿Qué es la Infraestructura como Código (IaC)?",
        answer:
          "El uso de herramientas como Terraform para definir y gestionar la infraestructura de la nube en código, haciéndola reproducible y versionable.",
      },
      {
        prompt:
          "¿Cuál es el principio fundamental de la Arquitectura Limpia (Clean Architecture)?",
        answer:
          "La Regla de la Dependencia: las dependencias del código fuente solo pueden apuntar hacia adentro, hacia la lógica de negocio central.",
      },
      {
        prompt:
          "En la Arquitectura Limpia, ¿qué capa contiene las reglas de negocio de toda la empresa y las estructuras de datos?",
        answer: "La capa de Entidades (Entities).",
      },
      {
        prompt:
          "En la Arquitectura Limpia, la capa de _____ contiene las reglas de negocio específicas de la aplicación y orquesta el flujo de datos.",
        answer: "Casos de Uso (Use Cases)",
      },
      {
        prompt: "¿Qué es el patrón de arquitectura Serverless?",
        answer:
          "Un diseño nativo de la nube donde los desarrolladores despliegan código como funciones sin gestionar servidores, y el proveedor de la nube asigna recursos dinámicamente.",
      },
      {
        prompt:
          "¿Cuál es una desventaja común de la arquitectura Serverless relacionada con la latencia inicial?",
        answer:
          'El "arranque en frío" (cold start), que es un retraso durante la ejecución inicial de una función inactiva.',
      },
      {
        prompt:
          "El patrón _____ segrega las operaciones de lectura (Query) y escritura (Command) en modelos distintos para optimizar el rendimiento.",
        answer: "CQRS (Command Query Responsibility Segregation)",
      },
      {
        prompt:
          "¿Para qué tipo de sistemas es especialmente útil el patrón CQRS?",
        answer:
          "Sistemas con muchas lecturas (high-read), como dashboards o herramientas de informes, donde las lecturas superan ampliamente a las escrituras.",
      },
      {
        prompt:
          "¿Qué es la Arquitectura Hexagonal, también conocida como Puertos y Adaptadores?",
        answer:
          "Un patrón que aísla la lógica de negocio central de las preocupaciones externas (UI, base de datos) mediante el uso de puertos (interfaces) y adaptadores (implementaciones).",
      },
      {
        prompt:
          "¿Cuál es una ventaja clave de la Arquitectura Hexagonal en términos de pruebas?",
        answer:
          "Mejora la capacidad de prueba (testability) al permitir que la lógica de negocio central se pruebe de forma aislada de los detalles técnicos.",
      },
      {
        prompt:
          "La arquitectura basada en espacio (space-based) está diseñada para manejar alta carga eliminando la _____ como un cuello de botella.",
        answer: "base de datos central",
      },
      {
        prompt:
          "En la arquitectura basada en espacio, ¿qué son las Unidades de Procesamiento (Processing Units - PU)?",
        answer:
          "Unidades autónomas que contienen lógica de negocio, datos en memoria y, opcionalmente, mecanismos de mensajería o persistencia.",
      },
      {
        prompt:
          "El patrón de arquitectura Cliente-Servidor divide el trabajo entre el cliente, que maneja la _____, y el servidor, que gestiona los datos y la lógica de negocio.",
        answer: "interfaz de usuario",
      },
      {
        prompt:
          "¿Qué patrón previene fallos en cascada en sistemas distribuidos bloqueando temporalmente las solicitudes a servicios que fallan?",
        answer: "El patrón Cortocircuito (Circuit Breaker).",
      },
      {
        prompt:
          "La biblioteca Hystrix, desarrollada por Netflix, es un ejemplo de implementación del patrón _____.",
        answer: "Cortocircuito (Circuit Breaker)",
      },
      {
        prompt:
          "¿Qué patrón de arquitectura, también conocido como plug-in, consiste en un sistema central y módulos de extensión?",
        answer: "Arquitectura de micronúcleo (Microkernel).",
      },
      {
        prompt:
          "Un ejemplo de software que utiliza la arquitectura de micronúcleo es _____, que extiende su funcionalidad mediante temas y módulos.",
        answer: "WordPress o Drupal",
      },
      {
        prompt:
          "La arquitectura _____ descompone las tareas en una secuencia de pasos de procesamiento (filtros) conectados por canales (tuberías).",
        answer: "Tubería y Filtro (Pipe-Filter)",
      },
      {
        prompt:
          "Una ventaja de la arquitectura Tubería y Filtro es que los filtros pueden ejecutarse de forma _____, mejorando el rendimiento en sistemas multinúcleo.",
        answer: "concurrente",
      },
      {
        prompt: "¿Qué es la Arquitectura Orientada a Servicios (SOA)?",
        answer:
          "Un paradigma de diseño donde las aplicaciones se construyen para proporcionar servicios a otras aplicaciones a través de una red, utilizando protocolos de comunicación.",
      },
      {
        prompt:
          "Un componente clave en algunas implementaciones de SOA es el _____, que actúa como un centro de comunicación para gestionar el enrutamiento de mensajes entre servicios.",
        answer: "Bus de Servicios Empresariales (Enterprise Service Bus - ESB)",
      },
      {
        prompt:
          "¿Cuál es la diferencia fundamental entre monolítico y microservicios en cuanto a la integración de componentes?",
        answer:
          "En un monolito, los componentes están fuertemente acoplados en una sola unidad, mientras que en microservicios son servicios independientes y débilmente acoplados.",
      },
      {
        prompt: "¿Qué son los Micro-Frontends?",
        answer:
          "Un patrón arquitectónico que extiende el concepto de microservicios al desarrollo del frontend, dividiéndolo en aplicaciones más pequeñas e implementables de forma independiente.",
      },
      {
        prompt:
          "El principio de _____ en los micro-frontends asegura que si un micro-frontend falla, los demás continúan funcionando normalmente.",
        answer: "aislamiento de fallos (fault isolation)",
      },
      {
        prompt:
          "¿Qué tecnología ha surgido como el enfoque más popular para implementar micro-frontends debido a su flexibilidad en tiempo de ejecución y al intercambio inteligente de dependencias?",
        answer: "Module Federation.",
      },
      {
        prompt: "¿Cuándo NO se recomienda usar micro-frontends?",
        answer:
          "En equipos pequeños (<10 desarrolladores), cuando no se necesitan despliegues independientes o cuando la simplicidad importa más que la autonomía del equipo.",
      },
      {
        prompt: "¿Qué es un Data Mesh?",
        answer:
          "Un marco que descentraliza los datos dentro de una organización, permitiendo que diferentes grupos accedan, gestionen y analicen datos en modo de autoservicio.",
      },
      {
        prompt:
          "El principio de _____ en Data Mesh establece que cada equipo de dominio es responsable de gestionar sus propios datos.",
        answer: "propiedad del dominio (domain ownership)",
      },
      {
        prompt:
          'El principio de "Datos como Producto" en Data Mesh aborda el problema de la calidad de los datos y los silos de datos al tratar los datos analíticos como un producto para los consumidores.',
        answer:
          'Verdadero, su objetivo es hacer los datos descubribles, comprensibles, confiables y de alta calidad para sus "clientes".',
      },
      {
        prompt:
          "En Data Mesh, una plataforma de datos de _____ proporciona a los equipos de dominio las herramientas para gestionar datos de forma independiente.",
        answer: "autoservicio (self-serve)",
      },
      {
        prompt:
          "¿Qué es la gobernanza computacional federada en el contexto de Data Mesh?",
        answer:
          "Un principio que equilibra la autonomía del dominio con estándares globales para garantizar la interoperabilidad, seguridad y cumplimiento de los datos en toda la organización.",
      },
      {
        prompt:
          "¿Por qué la adopción ciega de tendencias arquitectónicas puede ser peligrosa?",
        answer:
          "Puede llevar a la sobreingeniería, a una falta de alineación con las necesidades del negocio y a brechas de habilidades en el equipo.",
      },
      {
        prompt:
          "En arquitecturas descentralizadas como los microservicios, ¿por qué tienden a aumentar los costos de infraestructura?",
        answer:
          "Debido a la mayor complejidad en el despliegue, la redundancia de recursos y el aumento del tráfico de red entre servicios.",
      },
      {
        prompt:
          "¿Cómo se comparan SOA y microservicios en términos de granularidad del servicio?",
        answer:
          "Los microservicios suelen ser de grano más fino, centrándose en una única capacidad de negocio, mientras que SOA puede tener servicios de grano más grueso que abarcan más funcionalidades.",
      },
      {
        prompt:
          "En una arquitectura de micronúcleo, ¿cómo se comunican los componentes plug-in con el sistema central?",
        answer:
          "A través de interfaces bien definidas, y el sistema central puede usar un registro de plug-ins para descubrirlos e interactuar con ellos.",
      },
      {
        prompt:
          "En el patrón Tubería y Filtro, el rendimiento de toda la arquitectura está limitado por el filtro más _____.",
        answer: "lento",
      },
      {
        prompt:
          "¿Qué es la consistencia eventual, una consideración en sistemas distribuidos como CQRS con bases de datos separadas?",
        answer:
          "Es un estado en el que los datos de lectura pueden no reflejar inmediatamente los cambios más recientes, resultando en datos obsoletos por un corto período.",
      },
      {
        prompt:
          "En la Arquitectura Limpia, los _____ actúan como un conjunto de convertidores, transformando datos entre el formato de los Casos de Uso y el de agencias externas como la base de datos.",
        answer: "Adaptadores de Interfaz (Interface Adapters)",
      },
      {
        prompt:
          "Para implementar la Inversión de Dependencias, a menudo se utilizan frameworks de _____.",
        answer: "Inyección de Dependencias (Dependency Injection - DI)",
      },
      {
        prompt: "¿Qué es un Sistema Autónomo (Self-Contained System - SCS)?",
        answer:
          "Una aplicación web autónoma que incluye la UI, la lógica y la persistencia, implementando un Bounded Context de DDD.",
      },
      {
        prompt:
          "¿Cuál es la forma de comunicación preferida entre Sistemas Autónomos (SCS) para mantener un bajo acoplamiento?",
        answer:
          "La integración en la interfaz de usuario (UI integration), por ejemplo, mediante transclusión.",
      },
      {
        prompt:
          "¿Cómo se relaciona un Sistema Autónomo (SCS) con los microservicios?",
        answer:
          "Un SCS es un tipo de microservicio más restrictivo y de grano más grueso; un SCS puede contener internamente múltiples microservicios por razones técnicas.",
      },
      {
        prompt:
          "En el patrón Maestro-Esclavo, ¿qué tipo de operaciones maneja la base de datos maestra?",
        answer: "Todas las operaciones de escritura.",
      },
      {
        prompt:
          "¿Qué tipo de operaciones manejan las bases de datos esclavas en el patrón Maestro-Esclavo?",
        answer: "Únicamente operaciones de lectura.",
      },
      {
        prompt: '¿Qué es un "Modulito" (Modulith)?',
        answer:
          "Un enfoque híbrido que combina elementos de arquitecturas monolíticas y de microservicios, manteniendo una estructura unificada pero con una fuerte modularidad interna.",
      },
      {
        prompt:
          "Una desventaja de la arquitectura por capas es que el flujo de datos a través de cada capa puede impactar negativamente en el _____.",
        answer: "rendimiento",
      },
      {
        prompt:
          "La arquitectura basada en espacio se inspira en el concepto de _____ del cómputo paralelo.",
        answer: "espacio de tuplas (tuple space)",
      },
      {
        prompt:
          "¿Qué ventaja ofrece la arquitectura Serverless en cuanto a costos?",
        answer:
          "Opera en un modelo de pago por uso, lo que puede llevar a ahorros significativos, especialmente para cargas de trabajo variables.",
      },
      {
        prompt:
          "Al combinar CQRS con Event Sourcing, el almacén de eventos se convierte en el modelo de _____ y la única fuente de verdad.",
        answer: "escritura (write model)",
      },
      {
        prompt:
          "¿Qué desafío de gestión de estado se presenta en los micro-frontends?",
        answer:
          "Sincronizar el estado entre diferentes micro-frontends que son desarrollados y desplegados de forma independiente.",
      },
      {
        prompt:
          "En el contexto de la nube, ¿qué son las sondas de preparación y actividad (readiness and liveness probes)?",
        answer:
          "Verificaciones de salud que aseguran que el tráfico solo se dirige a instancias de contenedores saludables y que las que fallan se reinician automáticamente.",
      },
      {
        prompt:
          "¿Cuál es el principal inconveniente de la arquitectura Cliente-Servidor en términos de fiabilidad?",
        answer:
          "El tiempo de inactividad del servidor puede interrumpir a todos los clientes, ya que es un punto único de fallo.",
      },
      {
        prompt:
          "La arquitectura de _____ permite el desarrollo, prueba y despliegue paralelo entre equipos de frontend y backend una vez que se define el contrato de la API.",
        answer: "API-First",
      },
      {
        prompt:
          "En la evolución de la arquitectura, el paso de monolitos a SOA representó un cambio hacia la _____ y la interoperabilidad de servicios.",
        answer: "reutilización",
      },
      {
        prompt:
          "La arquitectura de _____ se considera una extensión de los microservicios, reduciendo la granularidad del servicio a funciones individuales.",
        answer: "Serverless",
      },
      {
        prompt:
          "¿Qué patrón de diseño de SOA proporciona una interfaz unificada y de nivel superior a un conjunto de interfaces en un subsistema?",
        answer: "Fachada de Servicio (Service Facade).",
      },
      {
        prompt:
          "En Data Mesh, ¿cuál es el propósito de la gobernanza federada?",
        answer:
          "Establecer políticas y estándares globales que aseguren la interoperabilidad y seguridad de los datos, manteniendo al mismo tiempo la autonomía del dominio.",
      },
      {
        prompt:
          "La arquitectura Lambda combina el procesamiento por _____ y en _____ para manejar grandes volúmenes de datos.",
        answer: "lotes (batch); tiempo real (real-time)",
      },
      {
        prompt:
          "¿Cómo simplifica la arquitectura Kappa a la arquitectura Lambda?",
        answer:
          "Elimina la capa de procesamiento por lotes, centrándose únicamente en el procesamiento de flujos en tiempo real.",
      },
      {
        prompt:
          "La arquitectura Lambda es ideal para análisis de datos _____, mientras que Kappa se enfoca en el procesamiento en tiempo real.",
        answer: "históricos",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de un monolito en las primeras etapas de un proyecto?",
        answer:
          "Simplicidad en el desarrollo, pruebas y despliegue inicial debido a una única base de código.",
      },
      {
        prompt: "¿Qué es la arquitectura basada en celdas (cell-based)?",
        answer:
          "Un enfoque que descompone los servicios internamente en celdas y utiliza capas delgadas para enrutar el tráfico a la celda correcta, mejorando el aislamiento de fallos.",
      },
    ],
  },
  {
    id: "modern_data_stack",
    name: "Modern Data Stack",
    cards: [
      {
        prompt:
          "¿Qué proveedor de la nube se destaca por tener la gama más amplia de servicios y el mayor alcance global?",
        answer: "Amazon Web Services (AWS).",
      },
      {
        prompt:
          "¿En qué área sobresale Microsoft Azure en comparación con AWS y GCP?",
        answer:
          "En la integración empresarial y las configuraciones de nube híbrida, especialmente para ecosistemas de Microsoft.",
      },
      {
        prompt:
          "Google Cloud Platform (GCP) es reconocido como líder en qué campos específicos?",
        answer:
          "Análisis de datos, aprendizaje automático (ML) e inteligencia artificial (AI).",
      },
      {
        prompt:
          "En términos de rendimiento, ¿qué proveedor de la nube ofrece el rendimiento más consistente entre regiones debido a su extensa infraestructura global?",
        answer: "AWS.",
      },
      {
        prompt:
          "¿Para qué tipo de cargas de trabajo GCP a menudo ofrece un rendimiento superior?",
        answer: "Para cargas de trabajo de análisis de datos.",
      },
      {
        prompt: "El rendimiento de Azure es particularmente fuerte para _____.",
        answer: "aplicaciones y servicios centrados en Microsoft",
      },
      {
        prompt:
          "Entre AWS, Azure y GCP, ¿cuál ofrece los modelos de precios más complejos pero potencialmente más rentables?",
        answer:
          "AWS, con opciones como instancias reservadas, precios spot y descuentos por compromiso.",
      },
      {
        prompt:
          "¿Qué proveedor de la nube es a menudo la opción más barata para clientes empresariales que ya utilizan servicios de Microsoft?",
        answer: "Microsoft Azure.",
      },
      {
        prompt:
          "Además de las tarifas de servicio, ¿qué costos ocultos deben considerarse al estimar los gastos de la nube?",
        answer:
          "Costos de transferencia de datos (egreso), clases de almacenamiento premium y servicios de soporte.",
      },
      {
        prompt:
          "Al evaluar el costo total de propiedad de la nube, ¿qué costos relacionados con el personal deben tenerse en cuenta?",
        answer:
          "El costo de capacitar al personal y potencialmente contratar personal especializado en la nube.",
      },
      {
        prompt:
          "Una de las principales desventajas de AWS es que puede abrumar a los recién llegados con su gran cantidad de _____.",
        answer: "servicios y opciones",
      },
      {
        prompt:
          "Una ventaja clave de Azure es su fácil integración y migración para los servicios existentes de _____.",
        answer: "Microsoft",
      },
      {
        prompt:
          "Una debilidad de GCP en comparación con AWS y Azure es su catálogo de servicios más _____ y su limitado soporte para casos de uso empresariales tradicionales.",
        answer: "limitado",
      },
      {
        prompt: "Término: Apache Spark",
        answer:
          "Definición: Un motor de análisis unificado para el procesamiento de datos a gran escala, originalmente diseñado para análisis por lotes de alto rendimiento.",
      },
      {
        prompt: "Término: Apache Flink",
        answer:
          "Definición: Un motor de procesamiento distribuido que prioriza el flujo (stream-first) diseñado para manejar flujos de datos continuos e ilimitados con baja latencia.",
      },
      {
        prompt:
          "¿Cuál es la diferencia fundamental en el modelo de procesamiento entre Spark y Flink?",
        answer:
          "Spark utiliza un modelo de micro-lotes para el streaming, mientras que Flink implementa un verdadero procesamiento de flujo evento por evento.",
      },
      {
        prompt:
          "¿Qué framework, Spark o Flink, generalmente demuestra una latencia más baja en aplicaciones de streaming?",
        answer:
          "Flink, debido a su procesamiento evento por evento, a menudo logra latencias de milisegundos.",
      },
      {
        prompt:
          "¿Qué framework fue diseñado originalmente para el procesamiento por lotes y a menudo tiene una ventaja en esa área?",
        answer: "Apache Spark.",
      },
      {
        prompt: "¿Cómo trata Flink el procesamiento por lotes?",
        answer:
          "Lo trata como un caso especial del procesamiento de flujos, donde el flujo es limitado.",
      },
      {
        prompt:
          "En cuanto a la tolerancia a fallos, Spark utiliza un enfoque basado en _____ para reconstruir datos perdidos.",
        answer: "información de linaje (lineage)",
      },
      {
        prompt:
          "Flink utiliza un mecanismo de _____ distribuido para la tolerancia a fallos, lo que permite una rápida recuperación desde puntos de control periódicos.",
        answer: "instantáneas (snapshotting)",
      },
      {
        prompt:
          "¿Qué framework ofrece capacidades de ventanas (windowing) más avanzadas, como ventanas de tiempo de evento y de sesión?",
        answer: "Apache Flink.",
      },
      {
        prompt:
          "¿Para qué tipo de caso de uso se recomendaría elegir Apache Flink?",
        answer:
          "Procesamiento de flujos en tiempo real con latencia muy baja, como detección de fraudes o procesamiento complejo de eventos.",
      },
      {
        prompt: "¿En qué escenarios es Apache Spark a menudo la mejor opción?",
        answer:
          "Procesamiento por lotes de alto rendimiento, ETL y cuando se necesita una plataforma unificada para SQL, machine learning y grafos.",
      },
      {
        prompt:
          "La característica de Ejecución Adaptativa de Consultas (AQE) que optimiza los planes de consulta en tiempo de ejecución es una capacidad de _____.",
        answer: "Apache Spark",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia arquitectónica entre Kafka y RabbitMQ?",
        answer:
          "Kafka es un registro de confirmaciones distribuido (distributed commit log) para streaming de eventos, mientras que RabbitMQ es un agente de mensajes (message broker) tradicional.",
      },
      {
        prompt:
          "¿Qué sistema de mensajería utiliza un modelo 'pull' donde los consumidores extraen activamente los mensajes?",
        answer: "Apache Kafka.",
      },
      {
        prompt:
          "RabbitMQ utiliza un modelo '_____' donde el agente entrega mensajes a los consumidores.",
        answer: "push",
      },
      {
        prompt:
          "Si el objetivo principal es un historial duradero y la capacidad de reproducir eventos a gran escala, ¿qué tecnología es más adecuada?",
        answer:
          "Apache Kafka, debido a su retención de mensajes en disco y el seguimiento de offsets.",
      },
      {
        prompt:
          "Para enrutamiento complejo, colas de tareas y mensajería de baja latencia, ¿qué tecnología es la opción preferida?",
        answer: "RabbitMQ.",
      },
      {
        prompt:
          "En términos de rendimiento, ¿cuál de los dos, Kafka o RabbitMQ, generalmente ofrece un mayor rendimiento (throughput)?",
        answer:
          "Kafka, que puede manejar miles de millones de mensajes por segundo.",
      },
      {
        prompt:
          "El orden de los mensajes en Kafka está garantizado estrictamente dentro de una _____.",
        answer: "partición",
      },
      {
        prompt: "¿Qué es OLTP?",
        answer:
          "Procesamiento de Transacciones en Línea (Online Transaction Processing), optimizado para manejar un alto volumen de operaciones transaccionales simples en tiempo real.",
      },
      {
        prompt: "¿Qué es OLAP?",
        answer:
          "Procesamiento Analítico en Línea (Online Analytical Processing), optimizado para consultar y analizar grandes volúmenes de datos históricos.",
      },
      {
        prompt:
          "Los sistemas OLTP están optimizados para operaciones frecuentes de _____, mientras que los sistemas OLAP son de _____ intensivo.",
        answer: "escritura (insert, update, delete) / lectura",
      },
      {
        prompt:
          "¿Qué tipo de esquema de base de datos se usa típicamente en sistemas OLTP para garantizar la integridad de los datos?",
        answer: "Esquemas normalizados.",
      },
      {
        prompt:
          "¿Qué tipo de esquema de base de datos se utiliza en sistemas OLAP para acelerar las consultas de lectura?",
        answer:
          "Esquemas desnormalizados, como el esquema de estrella o copo de nieve.",
      },
      {
        prompt:
          "Procesar pagos con tarjeta de crédito o retiros en cajeros automáticos son ejemplos de casos de uso para sistemas _____.",
        answer: "OLTP",
      },
      {
        prompt:
          "Generar informes de ventas trimestrales o analizar tendencias de mercado son casos de uso típicos para sistemas _____.",
        answer: "OLAP",
      },
      {
        prompt:
          "¿Qué término describe la arquitectura que combina la flexibilidad de los data lakes con la fiabilidad y el rendimiento de los data warehouses?",
        answer: "Data Lakehouse.",
      },
      {
        prompt:
          "En una arquitectura de datos moderna, ¿qué significa 'schema-on-read'?",
        answer:
          "Permite cargar datos en su formato original y aplicar una estructura (esquema) solo cuando se leen para su análisis.",
      },
      {
        prompt:
          "Nombra un formato de tabla abierta que agrega transacciones ACID a los data lakes.",
        answer: "Delta Lake, Apache Iceberg o Apache Hudi.",
      },
      {
        prompt:
          "¿Cuál es el propósito de la Arquitectura Lambda en el procesamiento de datos?",
        answer:
          "Manejar el procesamiento de datos masivos utilizando una capa por lotes para datos históricos y una capa de velocidad para datos en tiempo real.",
      },
      {
        prompt:
          "¿Cómo simplifica la Arquitectura Kappa a la Arquitectura Lambda?",
        answer:
          "Elimina la capa por lotes, manejando tanto el procesamiento en tiempo real como el reprocesamiento histórico a través de una única ruta de streaming.",
      },
      {
        prompt:
          "En Kafka, ¿qué componente ha sido reemplazado por el protocolo KRaft?",
        answer: "Apache ZooKeeper.",
      },
      {
        prompt:
          "¿Cuál es uno de los principales beneficios de migrar de ZooKeeper a KRaft en Kafka?",
        answer:
          "Operaciones simplificadas, ya que elimina la necesidad de gestionar un sistema distribuido separado.",
      },
      {
        prompt: "¿Cómo mejora KRaft la escalabilidad del clúster de Kafka?",
        answer:
          "Permite un mayor número de particiones y brokers al eliminar el cuello de botella de metadatos que representaba ZooKeeper.",
      },
      {
        prompt:
          "En el modo KRaft, los metadatos del clúster de Kafka se almacenan como un _____ interno de Kafka.",
        answer: "tópico",
      },
      {
        prompt:
          "A partir de la versión 4.0, _____ se convierte en la única forma de ejecutar clústeres de Kafka.",
        answer: "KRaft",
      },
      {
        prompt: "¿Qué es una estrategia de multi-nube?",
        answer:
          "El uso de servicios de múltiples proveedores de nube para reducir la dependencia de un solo proveedor, mejorar la fiabilidad y optimizar las cargas de trabajo.",
      },
      {
        prompt:
          "¿Qué proveedor de la nube es ideal si una empresa está fuertemente invertida en el ecosistema de Microsoft?",
        answer: "Azure.",
      },
      {
        prompt:
          "¿Qué proveedor de la nube se recomienda para el desarrollo de aplicaciones nativas de la nube y el enfoque en análisis de datos y ML?",
        answer: "Google Cloud (GCP).",
      },
      {
        prompt:
          "El servicio de cómputo principal en AWS se llama _____, en Azure se llama Virtual Machines y en GCP se llama Compute Engine.",
        answer: "EC2 (Elastic Compute Cloud)",
      },
      {
        prompt:
          "El servicio de almacenamiento de objetos de AWS es S3, el de Azure es _____ y el de GCP es Cloud Storage.",
        answer: "Blob Storage",
      },
      {
        prompt:
          "Para bases de datos relacionales gestionadas, AWS ofrece RDS, Azure ofrece _____ y GCP ofrece Cloud SQL.",
        answer: "Azure SQL Database",
      },
      {
        prompt:
          "¿Qué servicio de AWS se especializa en ofrecer funciones sin servidor?",
        answer: "AWS Lambda.",
      },
      {
        prompt:
          "Azure Arc es el servicio de Microsoft Azure diseñado para gestionar entornos de _____.",
        answer: "nube híbrida y multinube",
      },
      {
        prompt:
          "Google Cloud Anthos permite a los usuarios construir y gestionar aplicaciones _____ en múltiples nubes y en las instalaciones.",
        answer: "basadas en contenedores (Kubernetes)",
      },
      {
        prompt:
          "Un beneficio clave de usar una arquitectura de lago de datos (data lake) de código abierto es evitar el '_____'.",
        answer: "vendor lock-in (dependencia del proveedor)",
      },
      {
        prompt:
          "En la arquitectura Medallion, la zona _____ contiene los datos crudos e inalterados tal como se ingirieron.",
        answer: "bronce",
      },
      {
        prompt:
          "La zona _____ en la arquitectura Medallion contiene datos que han sido limpiados, filtrados y enriquecidos.",
        answer: "plata",
      },
      {
        prompt:
          "Los datos en la zona _____ de la arquitectura Medallion están altamente agregados y listos para el consumo por parte de analistas de negocio y herramientas de BI.",
        answer: "oro",
      },
      {
        prompt:
          "¿Qué herramienta de orquestación de flujos de trabajo de código abierto es popular para definir, programar y monitorear flujos de trabajo como DAGs (Grafos Acíclicos Dirigidos)?",
        answer: "Apache Airflow.",
      },
      {
        prompt:
          "¿Qué formato de archivo columnar es comúnmente utilizado en los data lakes para un rendimiento analítico eficiente?",
        answer: "Apache Parquet o Apache ORC.",
      },
      {
        prompt:
          "¿Cuál es el principal desafío de una arquitectura ETL tradicional en términos de agilidad?",
        answer:
          "La falta de comunicación entre equipos y los largos tiempos de entrega para nuevas solicitudes de datos debido a su flujo rígido.",
      },
      {
        prompt:
          "La arquitectura de datos moderna colapsa silos de datos al unificar el almacenamiento de datos crudos y transformados en un _____.",
        answer: "cloud data lake",
      },
      {
        prompt:
          "Una característica clave de la arquitectura de datos moderna es el '_____', que permite a los equipos acceder y analizar datos por sí mismos.",
        answer: "autoservicio (self-serve)",
      },
      {
        prompt:
          "¿Por qué la arquitectura de datos moderna es generalmente más rentable que las arquitecturas ETL tradicionales?",
        answer:
          "Reduce la sobrecarga de gestión de datos al no requerir ETL y movimiento de datos, y los modelos de pago por uso son comunes.",
      },
      {
        prompt:
          "Para soportar agentes de IA, los sistemas de datos necesitan proporcionar señales en tiempo real, memoria a corto plazo y _____.",
        answer: "contexto histórico",
      },
      {
        prompt:
          "En una pila de datos moderna para IA, ¿qué rol cumplen Kafka y Flink?",
        answer:
          "Forman el sistema nervioso en tiempo real, proporcionando y procesando eventos en vivo para que los agentes perciban su entorno.",
      },
      {
        prompt:
          "En un sistema de procesamiento de datos, la capacidad de manejar contrapresión (backpressure) es crucial para evitar que el sistema se sobrecargue. ¿Qué framework, Flink o Spark, es conocido por su mejor manejo de la contrapresión?",
        answer: "Apache Flink.",
      },
      {
        prompt:
          "Una de las principales ventajas de Kafka es su alta _____, lo que lo hace ideal para procesar grandes volúmenes de datos de sensores o feeds de redes sociales.",
        answer: "capacidad de procesamiento (throughput)",
      },
      {
        prompt:
          "En el contexto de la nube, ¿cuál es el propósito de una 'VPC' (Virtual Private Cloud)?",
        answer:
          "Proporcionar una sección lógicamente aislada de la nube pública donde se pueden lanzar recursos en una red virtual definida por el usuario.",
      },
      {
        prompt:
          "¿Qué significa 'ACID' en el contexto de las transacciones de bases de datos?",
        answer:
          "Atomicidad, Consistencia, Aislamiento (Isolation) y Durabilidad.",
      },
      {
        prompt:
          "Los formatos de tabla de lakehouse como Delta Lake, Iceberg y Hudi aportan propiedades _____ a los data lakes.",
        answer: "ACID",
      },
      {
        prompt:
          "Si una organización necesita la selección de servicios más amplia y una infraestructura madura para escalar globalmente, ¿qué proveedor de nube debería elegir?",
        answer: "AWS.",
      },
      {
        prompt: "¿Qué es la 'computación sin servidor' (serverless computing)?",
        answer:
          "Un modelo de ejecución en la nube donde el proveedor de la nube gestiona dinámicamente la asignación de recursos de máquina, y los precios se basan en el número real de recursos consumidos por una aplicación.",
      },
      {
        prompt:
          "Para el almacenamiento de archivos distribuidos, HDFS es la opción tradicional de Hadoop, mientras que _____ y _____ son alternativas modernas de almacenamiento de objetos de código abierto.",
        answer: "MinIO / Ceph",
      },
      {
        prompt: "¿Qué es un 'catálogo de datos' en un data lake?",
        answer:
          "Una herramienta que ayuda a los usuarios a encontrar, comprender y gobernar los datos, previniendo que el lago se convierta en un 'pantano de datos'.",
      },
      {
        prompt:
          "Nombra una herramienta de catálogo de datos de código abierto que se enfoca en el descubrimiento de datos y la experiencia del usuario.",
        answer: "Amundsen (de Lyft).",
      },
      {
        prompt:
          "DataHub, de LinkedIn, es una plataforma de metadatos moderna que utiliza _____ para actualizaciones de metadatos casi en tiempo real.",
        answer: "streaming (a menudo a través de Kafka)",
      },
      {
        prompt:
          "La idea de que diferentes equipos de negocio deben poseer sus propios datos como un producto se conoce como _____.",
        answer: "Data Mesh",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia entre las instancias spot y las instancias reservadas en AWS?",
        answer:
          "Las instancias spot ofrecen grandes descuentos sobre la capacidad de cómputo no utilizada pero pueden ser interrumpidas, mientras que las instancias reservadas ofrecen descuentos a cambio de un compromiso a largo plazo (1 o 3 años).",
      },
      {
        prompt:
          "En el procesamiento de flujos, el 'exactamente una vez' (exactly-once) es una semántica de procesamiento que garantiza que cada evento se procese _____, incluso en caso de fallos.",
        answer: "una sola vez",
      },
      {
        prompt:
          "¿Qué framework, Flink o Spark, es generalmente considerado más fuerte en proporcionar garantías de 'exactamente una vez' a nivel de operador?",
        answer: "Apache Flink.",
      },
      {
        prompt:
          "El desacoplamiento del almacenamiento y el cómputo en una arquitectura de data lake permite que cada uno _____ de forma independiente.",
        answer: "escale",
      },
      {
        prompt:
          "Una de las desventajas de RabbitMQ en comparación con Kafka es que escalar horizontalmente puede ser más _____.",
        answer: "complejo",
      },
      {
        prompt:
          "El enfoque de 'micro-lotes' de Spark para el streaming puede introducir una _____ más alta en comparación con el verdadero procesamiento de flujos de Flink.",
        answer: "latencia",
      },
      {
        prompt:
          "Para las cargas de trabajo de IA/ML, ¿qué proveedor de la nube es a menudo la mejor opción gracias a su infraestructura AI-first y herramientas como Vertex AI y TensorFlow?",
        answer: "Google Cloud Platform (GCP).",
      },
      {
        prompt: "Término: Instancias de Máquinas Virtuales",
        answer:
          "Definición: Recursos de cómputo escalables que emulan un ordenador físico, ofrecidos por proveedores de la nube como AWS EC2, Azure VMs o Google Compute Engine.",
      },
      {
        prompt:
          "El servicio Azure DevOps es una oferta de Microsoft para implementar prácticas de _____ a lo largo del ciclo de vida del desarrollo de software.",
        answer: "DevOps",
      },
      {
        prompt: "Término: Kubernetes (K8s)",
        answer:
          "Definición: Un sistema de orquestación de contenedores de código abierto para automatizar la implementación, el escalado y la gestión de aplicaciones en contenedores.",
      },
      {
        prompt:
          "Los tres grandes proveedores de la nube ofrecen servicios gestionados de Kubernetes: AWS tiene EKS, Azure tiene _____ y GCP tiene GKE.",
        answer: "AKS (Azure Kubernetes Service)",
      },
      {
        prompt:
          "En Flink, el soporte de primera clase para el procesamiento de flujos con estado (stateful stream processing) le permite manejar _____ de manera eficiente.",
        answer: "cálculos complejos a lo largo del tiempo",
      },
      {
        prompt: "En Kafka, ¿qué son los 'offsets'?",
        answer:
          "Un puntero que un grupo de consumidores mantiene para rastrear qué mensajes ha procesado en una partición.",
      },
      {
        prompt:
          "¿Cuál es el propósito de un 'balanceador de carga' (load balancer) en una arquitectura de nube?",
        answer:
          "Distribuir el tráfico de red o de aplicaciones entrante entre múltiples servidores para garantizar que ningún servidor se sobrecargue.",
      },
      {
        prompt:
          "El modelo de precios 'pay-as-you-go' (pago por uso) es común en la nube y significa que los usuarios solo pagan por _____.",
        answer: "los recursos que consumen",
      },
      {
        prompt:
          "Una de las desventajas de GCP es que tiene una cuota de mercado más pequeña y una comunidad empresarial menos extensa en comparación con _____.",
        answer: "AWS y Azure",
      },
      {
        prompt:
          "¿Qué es la 'persistencia de mensajes' en un sistema de mensajería?",
        answer:
          "La capacidad del sistema para almacenar mensajes en un almacenamiento no volátil (como un disco) para que no se pierdan si el sistema se reinicia o falla.",
      },
      {
        prompt:
          "¿Qué sistema, Kafka o RabbitMQ, ofrece una mayor durabilidad de los mensajes por diseño?",
        answer:
          "Kafka, porque escribe los mensajes en el disco de forma predeterminada.",
      },
      {
        prompt:
          "El concepto de 'zonas de disponibilidad' en la nube se refiere a _____.",
        answer:
          "uno o más centros de datos discretos con energía, redes y refrigeración redundantes dentro de una región",
      },
      {
        prompt:
          "¿Qué servicio de base de datos de GCP es conocido por su escalabilidad global y fuerte consistencia?",
        answer: "Cloud Spanner.",
      },
      {
        prompt: "En el contexto de ETL, ¿qué significa la 'T' (Transformar)?",
        answer:
          "Aplicar reglas de negocio, limpiar, enriquecer o agregar los datos extraídos antes de cargarlos en el sistema de destino.",
      },
      {
        prompt:
          "En un sistema de procesamiento de datos, ¿qué es un 'pipeline'?",
        answer:
          "Una secuencia de pasos de procesamiento de datos conectados, donde la salida de un elemento es la entrada del siguiente.",
      },
      {
        prompt:
          "La biblioteca MLlib es el componente de _____ de Apache Spark.",
        answer: "aprendizaje automático (machine learning)",
      },
      {
        prompt:
          "Para cumplir con las regulaciones de soberanía de datos, las organizaciones a menudo deben asegurarse de que los datos se almacenen y procesen dentro de una _____ específica.",
        answer: "región geográfica",
      },
    ],
  },
  {
    id: "modern_dist_java",
    name: "Modern Dist Java",
    cards: [
      {
        prompt:
          "En el contexto del teorema CAP, ¿qué garantiza la 'Consistencia' (C)?",
        answer:
          "Garantiza que cada lectura recibe la escritura más reciente o un error, asegurando que todos los nodos vean los mismos datos al mismo tiempo.",
      },
      {
        prompt: "En el teorema CAP, ¿qué significa 'Disponibilidad' (A)?",
        answer:
          "Asegura que cada solicitud reciba una respuesta, sin garantizar que contenga la versión más reciente de la información.",
      },
      {
        prompt:
          "Según el teorema CAP, ¿qué es la 'Tolerancia a Particiones' (P)?",
        answer:
          "Es la capacidad del sistema para continuar operando a pesar de fallos de comunicación de red arbitrarios entre nodos.",
      },
      {
        prompt:
          "El teorema CAP establece que un sistema distribuido solo puede satisfacer simultáneamente dos de estas tres garantías: _____, Disponibilidad y Tolerancia a Particiones.",
        answer: "Consistencia",
      },
      {
        prompt:
          "¿Qué dos garantías debe elegir un sistema distribuido en presencia de una partición de red, según el teorema CAP?",
        answer:
          "Debe elegir entre una consistencia perfecta (CP) o una disponibilidad del 100% (AP).",
      },
      {
        prompt:
          "En el acrónimo ACID, ¿qué principio asegura que todos los componentes de una transacción se traten como una sola acción, completándose todos o ninguno?",
        answer: "Atomicidad (Atomicity).",
      },
      {
        prompt:
          "¿Qué propiedad ACID garantiza que una transacción debe seguir las reglas y restricciones definidas de la base de datos, como las restricciones y los disparadores?",
        answer: "Consistencia (Consistency).",
      },
      {
        prompt:
          "La propiedad ACID de _____ asegura que la ejecución concurrente de transacciones resulta en un estado del sistema que se obtendría si las transacciones se ejecutaran en serie.",
        answer: "Aislamiento (Isolation).",
      },
      {
        prompt:
          "¿Qué propiedad ACID garantiza que una vez que una transacción se ha confirmado, persistirá y no se deshará para acomodar conflictos con otras operaciones?",
        answer: "Durabilidad (Durability).",
      },
      {
        prompt:
          "¿Cuál es la diferencia fundamental entre la 'Consistencia' en ACID y la 'Consistencia' en el teorema CAP?",
        answer:
          "La consistencia ACID se centra en las reglas y restricciones de la base de datos, mientras que la consistencia CAP asegura que todas las réplicas de datos tengan el mismo valor al mismo tiempo.",
      },
      {
        prompt:
          "¿Qué es un 'Dirty Read' (lectura sucia) en el contexto de las transacciones de base de datos?",
        answer:
          "Ocurre cuando una transacción lee datos que han sido modificados por otra transacción concurrente que aún no ha sido confirmada (commit).",
      },
      {
        prompt:
          "Describe la anomalía de concurrencia conocida como 'Non-repeatable Read' (lectura no repetible).",
        answer:
          "Ocurre cuando una transacción vuelve a leer una fila y encuentra que ha sido modificada por otra transacción concurrente que ya se ha confirmado.",
      },
      {
        prompt: "¿Qué es una 'Phantom Read' (lectura fantasma)?",
        answer:
          "Ocurre cuando una transacción vuelve a ejecutar una consulta de rango y encuentra que han aparecido nuevas filas 'fantasma' insertadas por otra transacción confirmada.",
      },
      {
        prompt:
          "El nivel de aislamiento _____ previene las lecturas sucias, pero permite lecturas no repetibles y lecturas fantasma.",
        answer: "Read Committed (Lectura Confirmada).",
      },
      {
        prompt:
          "¿Qué nivel de aislamiento de transacciones previene tanto las lecturas sucias como las no repetibles, pero todavía puede permitir lecturas fantasma?",
        answer: "Repeatable Read (Lectura Repetible).",
      },
      {
        prompt:
          "¿Cuál es el nivel de aislamiento más estricto en una base de datos SQL que previene las lecturas sucias, no repetibles y fantasma?",
        answer: "Serializable.",
      },
      {
        prompt:
          "Compara el escalado vertical (típico de SQL) con el escalado horizontal (típico de NoSQL).",
        answer:
          "El escalado vertical implica añadir más recursos (CPU, RAM) a un único servidor, mientras que el escalado horizontal distribuye la carga entre múltiples servidores.",
      },
      {
        prompt:
          "En el diseño de bases de datos, ¿cuál es la diferencia principal entre 'sharding' y 'partitioning'?",
        answer:
          "El 'sharding' distribuye los datos entre diferentes servidores de bases de datos, mientras que el 'partitioning' divide una tabla en piezas más pequeñas dentro de la misma instancia de base de datos.",
      },
      {
        prompt:
          "En una arquitectura de replicación de base de datos, ¿cuál es el patrón más común y cómo funciona?",
        answer:
          "El patrón Líder-Seguidor (Master-Slave), donde un nodo (líder) maneja todas las escrituras y las replica a varios nodos seguidores.",
      },
      {
        prompt:
          "Diferencia entre la replicación síncrona y asíncrona en bases de datos.",
        answer:
          "En la replicación síncrona, el líder espera la confirmación de los seguidores antes de confirmar, mientras que en la asíncrona, el líder confirma inmediatamente y los seguidores se ponen al día más tarde.",
      },
      {
        prompt:
          "En el contexto de microservicios, ¿qué problema resuelve el patrón Saga?",
        answer:
          "Resuelve el problema de mantener la consistencia de los datos en transacciones distribuidas que abarcan múltiples servicios, cada uno con su propia base de datos.",
      },
      {
        prompt:
          "Describe la implementación del patrón Saga mediante 'Orquestación'.",
        answer:
          "Un servicio 'orquestador' central gestiona toda la secuencia de la transacción, indicando a cada servicio participante qué hacer y cuándo.",
      },
      {
        prompt:
          "Describe la implementación del patrón Saga mediante 'Coreografía'.",
        answer:
          "Los servicios se comunican publicando y suscribiéndose a eventos, reaccionando de forma independiente a los cambios de estado sin un controlador central.",
      },
      {
        prompt:
          "Si un paso en una transacción distribuida bajo el patrón Saga falla, ¿qué mecanismo se utiliza para deshacer los pasos anteriores exitosos?",
        answer:
          "Se ejecutan 'transacciones de compensación' para revertir los cambios realizados por las transacciones locales previas.",
      },
      {
        prompt:
          "¿Cuál es el propósito del patrón 'Circuit Breaker' (Interruptor de circuito) en una arquitectura de microservicios?",
        answer:
          "Detecta cuándo un servicio dependiente está fallando y 'abre el circuito' para evitar más solicitudes, permitiendo que el servicio se recupere.",
      },
      {
        prompt:
          "En arquitecturas de microservicios, un _____ actúa como el único punto de entrada para el tráfico externo, manejando el enrutamiento y la autenticación.",
        answer: "API Gateway.",
      },
      {
        prompt:
          "¿Qué es un 'Service Mesh' (malla de servicios) como Istio y qué tipo de tráfico gestiona principalmente?",
        answer:
          "Es una capa de infraestructura que gestiona el tráfico interno 'este-oeste' entre servicios mediante proxies sidecar, sin modificar el código de la aplicación.",
      },
      {
        prompt:
          "Compara REST con gRPC en términos de serialización y transporte.",
        answer:
          "REST utiliza típicamente JSON (texto) sobre HTTP/1.1, mientras que gRPC usa Protocol Buffers (binario) sobre HTTP/2, siendo más eficiente.",
      },
      {
        prompt: "¿Qué problema de las API REST resuelve GraphQL?",
        answer:
          "Resuelve los problemas de 'over-fetching' (recibir más datos de los necesarios) y 'under-fetching' (necesitar múltiples solicitudes) al permitir a los clientes solicitar exactamente los datos que necesitan.",
      },
      {
        prompt:
          "¿Qué es el 'Hashing Consistente' y por qué es superior al hashing basado en módulo para distribuir datos entre nodos?",
        answer:
          "Es una técnica que mapea claves y nodos a un 'anillo'. Minimiza la redistribución de datos cuando se añaden o eliminan nodos, a diferencia del hashing por módulo que requiere un remapeo masivo.",
      },
      {
        prompt: "En Apache Kafka, ¿qué es un 'Topic' y qué es una 'Partition'?",
        answer:
          "Un 'Topic' es un canal lógico que organiza mensajes, y una 'Partition' es una subdivisión de un topic que permite el procesamiento paralelo.",
      },
      {
        prompt:
          "En Kafka, ¿cuál es el rol del bróker 'Líder' para una partición específica?",
        answer:
          "El bróker Líder es responsable de gestionar todas las lecturas y escrituras para esa partición.",
      },
      {
        prompt:
          "¿Qué es un 'Consumer Group' en Kafka y cómo permite el paralelismo?",
        answer:
          "Es un grupo de consumidores que comparten la carga de trabajo de procesar mensajes de las particiones de un topic, donde cada partición es asignada a un solo consumidor del grupo.",
      },
      {
        prompt:
          "En Kafka, ¿cómo se puede garantizar el orden de procesamiento de los mensajes?",
        answer:
          "Se puede garantizar el orden de los mensajes que comparten la misma clave, ya que todos los mensajes con la misma clave se envían a la misma partición.",
      },
      {
        prompt:
          "¿Cuál es el propósito principal del Garbage Collector G1 (Garbage-First) en Java?",
        answer:
          "Está diseñado para ofrecer tiempos de pausa predecibles al dividir el heap en regiones y priorizar la recolección de las que contienen más basura.",
      },
      {
        prompt:
          "El recolector de basura _____ en Java está diseñado para latencias extremadamente bajas, con tiempos de pausa de menos de un milisegundo, independientemente del tamaño del heap.",
        answer: "ZGC (Z Garbage Collector).",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de los recolectores de basura de baja latencia como ZGC y Shenandoah en comparación con G1?",
        answer:
          "Realizan la mayor parte de su trabajo, incluida la evacuación de objetos, de forma concurrente con los hilos de la aplicación, minimizando las pausas de 'stop-the-world'.",
      },
      {
        prompt:
          "En Java, ¿qué son los 'Virtual Threads' (Proyecto Loom) y qué tipo de aplicaciones se benefician más de ellos?",
        answer:
          "Son hilos ligeros gestionados por la JVM, no por el SO, que permiten escalar masivamente aplicaciones con muchas tareas bloqueantes de E/S (I/O-bound).",
      },
      {
        prompt:
          "¿Se deben agrupar (pool) los Virtual Threads en Java de la misma manera que los platform threads?",
        answer:
          "No, son tan baratos de crear que no se deben agrupar; se recomienda crear uno nuevo por cada tarea.",
      },
      {
        prompt:
          "En el Modelo de Memoria de Java (JMM), ¿qué define la relación 'happens-before'?",
        answer:
          "Define un orden parcial de las acciones de memoria, garantizando que las escrituras de una acción son visibles para las lecturas de otra acción que ocurre después.",
      },
      {
        prompt:
          "Una escritura en una variable `volatile` en Java _____ cada lectura subsecuente de esa misma variable.",
        answer: "happens-before (sucede antes que).",
      },
      {
        prompt:
          "¿Qué problema de concurrencia principal resuelve el uso de la palabra clave `volatile` en Java?",
        answer:
          "Resuelve el problema de la visibilidad, asegurando que los cambios en una variable realizados por un hilo sean inmediatamente visibles para otros hilos.",
      },
      {
        prompt:
          "En PostgreSQL, ¿cuál es la diferencia entre `EXPLAIN` y `EXPLAIN ANALYZE`?",
        answer:
          "`EXPLAIN` muestra el plan de ejecución estimado, mientras que `EXPLAIN ANALYZE` ejecuta la consulta y muestra el plan junto con los tiempos de ejecución y recuentos de filas reales.",
      },
      {
        prompt:
          "En un plan de consulta de PostgreSQL, ¿qué suele indicar un 'Sequential Scan' en una tabla grande?",
        answer:
          "Generalmente indica la falta de un índice útil que podría acelerar la consulta.",
      },
      {
        prompt:
          "En Redis, ¿cuáles son las dos opciones principales de persistencia y en qué se diferencian?",
        answer:
          "RDB (snapshotting) guarda instantáneas del dataset a intervalos, mientras que AOF (Append-Only File) registra cada operación de escritura.",
      },
      {
        prompt:
          "¿Qué es la 'consistencia eventual' (eventual consistency) en sistemas distribuidos?",
        answer:
          "Es una garantía de que, si no se realizan nuevas actualizaciones, todas las réplicas convergerán eventualmente al mismo valor, aunque puedan estar temporalmente inconsistentes.",
      },
      {
        prompt:
          "El framework _____ es el estándar actual en Java para implementar patrones de resiliencia como Circuit Breaker, Rate Limiter y Retry.",
        answer: "Resilience4j.",
      },
      {
        prompt:
          "¿Qué es una base de datos de tipo 'document store' (almacén de documentos) y da un ejemplo?",
        answer:
          "Es una base de datos NoSQL que almacena datos en documentos (como JSON o BSON), donde un documento contiene toda la información de un objeto. Un ejemplo es MongoDB.",
      },
      {
        prompt:
          "¿Qué es una base de datos 'key-value store' (almacén clave-valor) y cuál es su principal ventaja de rendimiento?",
        answer:
          "Es una base de datos NoSQL que almacena datos como una colección de pares clave-valor, ofreciendo lecturas y escrituras muy rápidas, generalmente en tiempo O(1).",
      },
      {
        prompt:
          "¿Qué es una base de datos de tipo 'wide column store' (almacén de columnas anchas) como Apache Cassandra?",
        answer:
          "Organiza los datos en columnas en lugar de filas, permitiendo un almacenamiento y acceso muy eficiente para consultas que solo necesitan un subconjunto de columnas.",
      },
      {
        prompt:
          "¿Cuál es la principal desventaja de la arquitectura de Saga basada en coreografía en términos de gestión?",
        answer:
          "A medida que aumenta el número de microservicios, puede volverse difícil de gestionar y rastrear las dependencias y el flujo de la transacción global.",
      },
      {
        prompt:
          "¿Cuándo es más adecuado usar Virtual Threads en Java en lugar de Platform Threads?",
        answer:
          "Son ideales para tareas con alta concurrencia y operaciones de E/S bloqueantes (como llamadas a red o acceso a base de datos), donde la mayor parte del tiempo el hilo está esperando.",
      },
      {
        prompt:
          "¿En qué situaciones no se recomiendan los Virtual Threads y es preferible usar Platform Threads?",
        answer:
          "No son recomendables para tareas intensivas en CPU (CPU-bound) o cuando se utiliza código nativo pesado, ya que no ofrecen ventajas de rendimiento en esos casos.",
      },
      {
        prompt:
          "¿Qué es una 'shard key' y cuál es su función en una base de datos fragmentada (sharded)?",
        answer:
          "Es una clave o identificador que determina a qué shard (base de datos) pertenece un registro específico, permitiendo enrutar las consultas al servidor correcto.",
      },
      {
        prompt:
          "En el contexto de la programación funcional en Java, ¿qué es una 'Functional Interface'?",
        answer:
          "Es una interfaz que tiene un único método abstracto, lo que permite que sea implementada mediante una expresión lambda.",
      },
      {
        prompt:
          "Resilience4j se basa en el principio de composición de funciones, que es el equivalente al patrón _____ en la Programación Orientada a Objetos.",
        answer: "Decorator.",
      },
      {
        prompt:
          "La herramienta `EXPLAIN` de PostgreSQL estima el 'costo', que es una unidad arbitraria que el optimizador usa para representar el _____ estimado para ejecutar un paso.",
        answer: "tiempo y los recursos.",
      },
      {
        prompt:
          "En Kafka, el número de _____ controla el paralelismo de los consumidores y, por lo tanto, la escalabilidad de la lectura.",
        answer: "particiones.",
      },
      {
        prompt:
          "¿Por qué los sistemas distribuidos a menudo prefieren la mensajería asíncrona sobre las llamadas RPC síncronas?",
        answer:
          "Porque la mensajería asíncrona desacopla a los productores de los consumidores, mejorando la resiliencia y permitiendo un escalado más flexible.",
      },
      {
        prompt: "¿Qué es la semántica 'Exactly-Once' (EOS) en Apache Kafka?",
        answer:
          "Es una garantía de que un mensaje se procesa exactamente una vez, evitando duplicados y pérdidas, lograda a través de productores idempotentes y la API transaccional.",
      },
      {
        prompt:
          "¿Cuál es la función de ZooKeeper en una arquitectura de Apache Kafka?",
        answer:
          "Coordina y gestiona los brókeres y clústeres de Kafka, asegurando la tolerancia a fallos y las elecciones de líder para las particiones.",
      },
      {
        prompt:
          "En el contexto de Java 25, ¿cuál es el propósito de la Foreign Function & Memory (FFM) API?",
        answer:
          "Proporciona acceso seguro a código y datos gestionados fuera de la JVM, como la invocación de código nativo (C, C++) y el acceso a memoria fuera del heap.",
      },
      {
        prompt:
          "Las `Scoped Values` en Java 25 son una alternativa a `ThreadLocal` especialmente útil en el contexto de _____, ya que tienen menor sobrecarga de memoria y rendimiento.",
        answer: "Virtual Threads.",
      },
      {
        prompt:
          "En una arquitectura de microservicios, ¿cómo un Service Mesh como Istio mejora la seguridad sin modificar el código de la aplicación?",
        answer:
          "Gestiona la encriptación mTLS, la autenticación y la autorización a través de los proxies sidecar que se ejecutan junto a cada servicio.",
      },
      {
        prompt:
          "Diferencia entre una base de datos NoSQL de tipo 'document' y una de tipo 'key-value'.",
        answer:
          "Un almacén clave-valor trata el valor como un blob opaco, mientras que un almacén de documentos permite consultar y estructurar el contenido del valor (el documento).",
      },
      {
        prompt:
          "¿Qué es el 'back pressure' (contrapresión) en sistemas asíncronos con colas de mensajes?",
        answer:
          "Es un mecanismo para evitar que un servicio se sobrecargue, limitando el tamaño de la cola o rechazando nuevas solicitudes cuando el sistema está saturado.",
      },
      {
        prompt:
          "En el contexto de replicación de bases de datos, ¿cuál es el principal riesgo de la replicación asíncrona?",
        answer:
          "El riesgo de lecturas obsoletas ('stale reads'), ya que los seguidores pueden no estar completamente sincronizados con el líder en el momento de la lectura.",
      },
      {
        prompt:
          "¿Qué tipo de bases de datos son más adecuadas para transacciones de varias filas donde la integridad de los datos es crítica?",
        answer:
          "Las bases de datos SQL (relacionales), debido a sus fuertes garantías ACID.",
      },
      {
        prompt:
          "¿Para qué tipo de datos son más adecuadas las bases de datos NoSQL?",
        answer:
          "Son mejores para datos no estructurados o semi-estructurados, como documentos, JSON, o para aplicaciones que requieren alta escalabilidad horizontal y flexibilidad de esquema.",
      },
      {
        prompt:
          "¿Qué es la 'Idempotencia' en el diseño de sistemas y por qué es importante, por ejemplo, para los productores de Kafka?",
        answer:
          "Es la propiedad por la cual una operación puede aplicarse múltiples veces sin cambiar el resultado más allá de la aplicación inicial. En Kafka, evita duplicados durante los reintentos.",
      },
      {
        prompt:
          "El recolector de basura Shenandoah en Java es similar a ZGC en su enfoque de baja latencia, pero fue desarrollado principalmente por _____.",
        answer: "Red Hat.",
      },
      {
        prompt:
          "En una arquitectura de microservicios, ¿qué es 'Service Discovery' (descubrimiento de servicios) y por qué es necesario?",
        answer:
          "Es un mecanismo que permite a los servicios localizar y comunicarse entre sí dinámicamente, necesario porque las ubicaciones (IP, puerto) de las instancias de servicio pueden cambiar.",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de un `Service Mesh` sobre la implementación de la lógica de comunicación (reintentos, timeouts) dentro de cada microservicio?",
        answer:
          "Externaliza estas funcionalidades de la lógica de negocio, permitiendo que se gestionen de manera uniforme y centralizada sin modificar el código de la aplicación.",
      },
      {
        prompt:
          "¿Cuál es la compensación o 'trade-off' de los recolectores de basura de baja latencia como ZGC y Shenandoah en comparación con los recolectores orientados al rendimiento (throughput)?",
        answer:
          "Generalmente incurren en una mayor sobrecarga de CPU y un mayor consumo de memoria para lograr pausas mínimas.",
      },
      {
        prompt:
          "En Java, ¿qué es la 'Structured Concurrency' (concurrencia estructurada) y cómo se relaciona con los Virtual Threads?",
        answer:
          "Es un enfoque para gestionar tareas concurrentes como una sola unidad de trabajo, simplificando el manejo de errores y el ciclo de vida, y es facilitado por la naturaleza ligera de los Virtual Threads.",
      },
      {
        prompt:
          "En el contexto de Kafka, ¿qué es el conjunto 'In-Sync Replica' (ISR)?",
        answer:
          "Es el conjunto de réplicas seguidoras que están completamente al día con el líder de una partición, y solo una de ellas puede ser elegida como nuevo líder en caso de fallo.",
      },
      {
        prompt:
          "¿Cómo se implementa el patrón 'Fallback' en un sistema resiliente?",
        answer:
          "Proporciona una respuesta alternativa o un servicio degradado cuando el servicio principal no está disponible, por ejemplo, devolviendo datos de una caché o un valor predeterminado.",
      },
      {
        prompt:
          "En el diseño de sistemas, ¿por qué es importante elegir una 'shard key' adecuada?",
        answer:
          "Una mala elección de la clave puede llevar a una distribución desigual de los datos ('hot spots'), sobrecargando algunos shards mientras otros están infrautilizados.",
      },
      {
        prompt:
          "¿Qué es la 'denormalización' en el diseño de bases de datos y cuándo se utiliza?",
        answer:
          "Es el proceso de añadir datos redundantes a una o más tablas para optimizar el rendimiento de las lecturas, evitando costosos 'joins', comúnmente usado en sistemas NoSQL.",
      },
      {
        prompt:
          "¿Qué es el 'partition pruning' (poda de particiones) en una base de datos particionada?",
        answer:
          "Es una optimización de consultas donde el motor de la base de datos escanea solo las particiones relevantes para la consulta, ignorando las demás y mejorando el rendimiento.",
      },
      {
        prompt:
          "En Java, ¿qué significa que un Virtual Thread se 'pinne' (pinning) a un platform thread?",
        answer:
          "Ocurre cuando un Virtual Thread ejecuta código (como un bloque `synchronized` antiguo o código nativo) que no puede ser desmontado del hilo portador del SO, impidiendo que otros Virtual Threads lo usen.",
      },
    ],
  },
  {
    id: "modern_microservices",
    name: "Modern Microservices",
    cards: [
      {
        prompt:
          "¿Qué patrón arquitectónico propone un componente del lado del servidor para cada aplicación de front-end, mejorando así la experiencia del usuario?",
        answer: "El patrón Back-End for Front-End (BFF).",
      },
      {
        prompt:
          "El patrón Back-End for Front-End (BFF) es una variante del patrón _____ _____.",
        answer: "API Gateway.",
      },
      {
        prompt:
          "¿Cuál es uno de los objetivos principales del patrón BFF en cuanto a la obtención de datos?",
        answer:
          "Evitar la sobrecarga de obtención de datos (over-fetching) y el exceso de solicitudes (over-requesting) en el lado del cliente.",
      },
      {
        prompt:
          "En una arquitectura BFF, el equipo responsable de la interfaz de usuario también debería supervisar el _____.",
        answer: "BFF.",
      },
      {
        prompt:
          "¿Bajo qué circunstancia principal se debe evitar el uso del patrón BFF?",
        answer:
          "Cuando se tiene una única interfaz para comunicarse con los servicios de back-end.",
      },
      {
        prompt: "¿Qué beneficio de seguridad clave ofrece la capa BFF?",
        answer:
          "Puede ocultar información sensible de los servicios de back-end antes de enviar la respuesta a los clientes.",
      },
      {
        prompt:
          "¿Qué protocolo de API puede lograr una latencia hasta 10 veces menor que REST en cargas de trabajo de IA en producción?",
        answer: "gRPC.",
      },
      {
        prompt:
          "¿Para qué escenario es ideal GraphQL, especialmente en aplicaciones de IA?",
        answer:
          "Para la agregación de datos complejos, como en paneles de control de Machine Learning.",
      },
      {
        prompt:
          "¿Por qué REST sigue siendo una opción viable para APIs públicas a gran escala, como las de OpenAI?",
        answer:
          "Por su amplio soporte en el ecosistema y ciclos de desarrollo más rápidos, no por limitaciones del protocolo.",
      },
      {
        prompt:
          "En GraphQL, ¿qué funcionalidad se debe deshabilitar en producción para evitar la exposición de esquemas sensibles?",
        answer: "La introspección.",
      },
      {
        prompt:
          "¿Qué estándar de autenticación es agnóstico al protocolo y se recomienda para REST, GraphQL y gRPC?",
        answer: "OAuth 2.0.",
      },
      {
        prompt:
          "En la arquitectura de RabbitMQ, los _____ reciben mensajes de los productores y los enrutan según reglas y atributos.",
        answer: "Exchanges (Intercambios).",
      },
      {
        prompt:
          "En RabbitMQ, las colas (queues) almacenan mensajes hasta que son consumidos y están conectadas a los exchanges mediante _____.",
        answer: "Bindings (Enlaces).",
      },
      {
        prompt:
          "Entre Kafka y RabbitMQ, ¿cuál ofrece un rendimiento (throughput) significativamente mayor, capaz de manejar millones de mensajes por segundo?",
        answer: "Apache Kafka.",
      },
      {
        prompt:
          "¿En qué condición RabbitMQ puede lograr una latencia de extremo a extremo más baja que Kafka?",
        answer:
          "Únicamente con volúmenes de mensajes (throughput) significativamente más bajos.",
      },
      {
        prompt:
          "¿Qué sistema es más adecuado para el procesamiento y análisis de datos en tiempo real y la agregación de logs a gran escala?",
        answer: "Apache Kafka.",
      },
      {
        prompt:
          "El costo por byte escrito tiende a ser menor en Kafka debido a su diseño eficiente, lo que lo convierte en una opción más _____.",
        answer: "rentable (cost-efficient).",
      },
      {
        prompt:
          "Según el Richardson Maturity Model, el Nivel 3, el más alto de madurez para una API REST, se conoce como _____.",
        answer: "Hypermedia Controls (HATEOAS).",
      },
      {
        prompt:
          "Una API REST en el Nivel 0 del Richardson Maturity Model utiliza HTTP meramente como transporte para llamadas a procedimientos remotos, un estilo conocido como _____.",
        answer: "The Swamp of POX (Plain Old XML/JSON).",
      },
      {
        prompt:
          "¿Qué nivel del Richardson Maturity Model introduce el uso correcto de los verbos HTTP (GET, POST, PUT, DELETE) y los códigos de estado?",
        answer: "Nivel 2: HTTP Verbs.",
      },
      {
        prompt:
          "¿Qué herramienta de código abierto es un estándar de facto para implementar Change Data Capture (CDC) basado en logs de transacciones?",
        answer: "Debezium.",
      },
      {
        prompt:
          "El método más eficiente de Change Data Capture (CDC), que lee directamente los logs de transacciones de la base de datos, se conoce como CDC _____.",
        answer: "basado en logs (log-based).",
      },
      {
        prompt:
          "¿Qué protocolo de mensajería es extremadamente ligero (encabezado de 2 bytes) y está optimizado para dispositivos IoT en redes poco fiables?",
        answer: "MQTT (Message Queuing Telemetry Transport).",
      },
      {
        prompt:
          "Para asegurar la fiabilidad en la recepción de webhooks, ¿qué propiedad debe tener un consumidor para manejar reintentos y mensajes duplicados sin problemas?",
        answer: "Idempotencia.",
      },
      {
        prompt:
          "La práctica recomendada para procesar un webhook es: verificar la firma, _____ el mensaje para procesamiento asíncrono y devolver inmediatamente una respuesta 2xx.",
        answer: "encolar (enqueue).",
      },
      {
        prompt:
          "¿Cuál es uno de los principales desafíos al implementar el patrón BFF?",
        answer:
          "La duplicación de lógica de negocio entre los diferentes BFFs si no se gestiona correctamente.",
      },
      {
        prompt:
          "El tráfico de comunicación que va desde un cliente externo hacia los microservicios internos se denomina tráfico _____.",
        answer: "Norte-Sur (North-South).",
      },
      {
        prompt:
          "El tráfico de comunicación interna entre diferentes microservicios se denomina tráfico _____.",
        answer: "Este-Oeste (East-West).",
      },
      {
        prompt:
          "¿Qué componente de arquitectura gestiona principalmente el tráfico Norte-Sur, actuando como punto de entrada único?",
        answer: "Un API Gateway.",
      },
      {
        prompt:
          "¿Qué componente de arquitectura gestiona principalmente el tráfico Este-Oeste, controlando la comunicación entre servicios?",
        answer: "Una malla de servicios (Service Mesh).",
      },
      {
        prompt:
          "Debido a su naturaleza binaria y al uso de HTTP/2, gRPC consume hasta un 40% menos de CPU y un 30% menos de memoria que _____ para cargas de trabajo equivalentes.",
        answer: "REST.",
      },
      {
        prompt:
          "En Kafka, el orden de los mensajes está garantizado dentro de una única _____, pero no entre ellas.",
        answer: "partición.",
      },
      {
        prompt:
          'El modelo arquitectónico de RabbitMQ se describe como "broker complejo, consumidor simple", mientras que Kafka sigue un modelo de "_____ _____ , _____ _____."',
        answer: "broker simple, consumidor inteligente.",
      },
      {
        prompt:
          "¿Qué componente en un ecosistema de Kafka actúa como un repositorio central para esquemas de mensajes, garantizando la compatibilidad de datos?",
        answer: "El Schema Registry.",
      },
      {
        prompt:
          "El protocolo _____ proporciona un canal de comunicación unidireccional donde el servidor puede empujar actualizaciones al cliente sobre HTTP estándar.",
        answer: "Server-Sent Events (SSE).",
      },
      {
        prompt:
          "A diferencia de SSE, el protocolo _____ establece un canal de comunicación bidireccional y full-dúplex entre cliente y servidor.",
        answer: "WebSocket.",
      },
      {
        prompt:
          "¿Qué desventaja tiene el patrón BFF en términos de esfuerzo de desarrollo y mantenimiento?",
        answer:
          "Incrementa los costos y la complejidad al tener que mantener múltiples backends.",
      },
      {
        prompt:
          "¿Qué patrón de diseño de software se recomienda usar junto con Kafka para definir y desacoplar microservicios basados en dominios de negocio?",
        answer: "Domain-Driven Design (DDD).",
      },
      {
        prompt:
          "En Domain-Driven Design (DDD), un _____ _____ define los límites de un modelo de dominio particular dentro del sistema.",
        answer: "Contexto Delimitado (Bounded Context).",
      },
      {
        prompt:
          "La capa que traduce entre diferentes modelos de dominio en contextos delimitados para prevenir la corrupción de un modelo por otro se llama _____ _____ _____.",
        answer: "Capa Anticorrupción (Anti-Corruption Layer).",
      },
      {
        prompt:
          "Para verificar la autenticidad de un webhook, se debe validar una _____ criptográfica (comúnmente HMAC) incluida en la solicitud.",
        answer: "firma.",
      },
      {
        prompt:
          "Una estrategia de reintento para webhooks fallidos que incrementa el tiempo de espera entre cada intento se conoce como _____ _____.",
        answer: "retroceso exponencial (exponential backoff).",
      },
      {
        prompt:
          "Para protegerse contra ataques de repetición (replay attacks) en webhooks, se debe verificar una _____ y rechazar mensajes que sean demasiado antiguos.",
        answer: "marca de tiempo (timestamp).",
      },
      {
        prompt:
          "Un _____ es un servidor que actúa como un proxy inverso, recibiendo solicitudes de clientes y reenviándolas a los microservicios apropiados.",
        answer: "API Gateway.",
      },
      {
        prompt:
          "¿Verdadero o Falso? Un API Gateway y una Malla de Servicios son mutuamente excluyentes y no pueden coexistir en la misma arquitectura.",
        answer:
          "Falso, pueden coexistir; el API Gateway maneja el tráfico externo y la Malla de Servicios el interno.",
      },
      {
        prompt: "Término: Serialización en gRPC.",
        answer:
          "Definición: Es el proceso de convertir datos estructurados a un formato binario eficiente utilizando Protocol Buffers (protobuf) para la transmisión.",
      },
      {
        prompt:
          "El uso de _____ _____ en Kafka Connect permite realizar transformaciones ligeras de datos directamente en el pipeline sin necesidad de un procesador de streams externo.",
        answer: "Single Message Transforms (SMTs).",
      },
      {
        prompt:
          "En un Schema Registry, el nivel de compatibilidad _____ permite que los consumidores nuevos puedan leer datos escritos con esquemas antiguos.",
        answer: "BACKWARD.",
      },
      {
        prompt:
          "En un Schema Registry, el nivel de compatibilidad _____ permite que los consumidores antiguos puedan leer datos escritos con esquemas nuevos.",
        answer: "FORWARD.",
      },
      {
        prompt:
          "La práctica de capturar y poner en cola eventos de webhook que fallan repetidamente en una _____ _____ _____ (DLQ) permite su análisis y reprocesamiento posterior.",
        answer: "cola de mensajes fallidos (dead-letter queue).",
      },
      {
        prompt:
          "A diferencia de REST, que utiliza HTTP/1.1, gRPC aprovecha _____ para obtener un mayor rendimiento a través de características como el multiplexado de flujos.",
        answer: "HTTP/2.",
      },
      {
        prompt:
          "¿Qué limitación de REST soluciona GraphQL al permitir que el cliente solicite exactamente los campos de datos que necesita?",
        answer:
          "El sobre-abastecimiento (over-fetching) y el sub-abastecimiento (under-fetching) de datos.",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de Kafka sobre los sistemas de mensajería tradicionales en términos de datos históricos?",
        answer:
          "La capacidad de almacenar flujos de eventos de forma duradera y permitir que los consumidores los reprocesen desde cualquier punto en el tiempo.",
      },
      {
        prompt: "En el patrón BFF, ¿qué son los DTO (Data Transfer Objects)?",
        answer:
          "Son clases utilizadas para transferir datos entre las capas de la aplicación, adaptando la información de los microservicios al formato que necesita el cliente específico.",
      },
      {
        prompt:
          "Una de las principales ventajas de una Malla de Servicios (Service Mesh) es la _____ integrada, que proporciona métricas, registros y trazas de forma nativa.",
        answer: "observabilidad.",
      },
      {
        prompt:
          "¿Qué mecanismo de seguridad, a menudo gestionado por una Malla de Servicios, garantiza que toda la comunicación entre servicios esté cifrada?",
        answer: "mTLS (mutual TLS).",
      },
      {
        prompt:
          "El patrón en el que un servicio publica un evento sin saber quién lo consumirá, permitiendo una comunicación asíncrona y desacoplada, se conoce como _____.",
        answer: "Publicación/Suscripción (Publish/Subscribe).",
      },
      {
        prompt:
          "¿Por qué el CDC (Change Data Capture) basado en logs tiene un impacto mínimo en la base de datos de producción en comparación con el basado en consultas?",
        answer:
          "Porque lee el log de transacciones de forma pasiva en lugar de ejecutar consultas adicionales contra las tablas de datos.",
      },
      {
        prompt:
          'En el contexto de webhooks, ¿qué significa la recomendación "Acknowledge Fast, Process Async"?',
        answer:
          "Significa responder inmediatamente con un código de éxito (2xx) y realizar el procesamiento real de los datos en un trabajo de fondo (asíncrono).",
      },
      {
        prompt:
          "¿Cuál es la función principal de un broker en protocolos como MQTT o RabbitMQ?",
        answer:
          "Actúa como un intermediario que recibe mensajes de los publicadores y los distribuye a los suscriptores interesados.",
      },
      {
        prompt:
          "El protocolo AMQP, implementado por RabbitMQ, define la semántica de los servicios del lado del servidor y un _____ _____ _____ común para la comunicación.",
        answer: "protocolo a nivel de cable (wire-level protocol).",
      },
      {
        prompt:
          "Kafka fue diseñado para ser un sistema de _____ _____ distribuido, no solo una cola de mensajes tradicional.",
        answer: "registro de transacciones (commit log).",
      },
      {
        prompt:
          "¿Qué ventaja ofrece Kafka para la resiliencia de los consumidores?",
        answer:
          "Si un consumidor falla, puede reanudar el procesamiento desde el último offset confirmado sin perder datos.",
      },
      {
        prompt:
          "En el desarrollo de microservicios, la práctica de empaquetar y desplegar cada servicio de forma independiente se ve facilitada por tecnologías como _____.",
        answer: "Contenedores (ej. Docker).",
      },
      {
        prompt:
          "En una arquitectura de microservicios, ¿por qué es crucial la descentralización de la gestión de datos?",
        answer:
          "Para asegurar que cada microservicio sea autónomo y pueda evolucionar independientemente, gestionando su propia base de datos.",
      },
      {
        prompt:
          "¿Qué principio de REST dicta que cada solicitud del cliente debe contener toda la información necesaria para ser procesada, sin que el servidor almacene estado del cliente?",
        answer: "Stateless (Sin estado).",
      },
      {
        prompt:
          "En una API RESTful, el principio de _____ _____ permite que las respuestas del servidor sean almacenadas en caché por el cliente para mejorar el rendimiento.",
        answer: "Cacheable.",
      },
      {
        prompt:
          "¿Qué componente de una Malla de Servicios se despliega junto a cada instancia de microservicio para interceptar todo el tráfico de red?",
        answer: "Un proxy sidecar (como Envoy).",
      },
      {
        prompt:
          "La parte de la Malla de Servicios que gestiona y configura los proxies sidecar se conoce como el _____ _____.",
        answer: "Plano de Control (Control Plane).",
      },
      {
        prompt:
          '¿Qué es la "semántica de entrega exactamente una vez" (exactly-once semantics) en Kafka Connect?',
        answer:
          "Es una garantía de que cada registro se procesa y se escribe en el sistema de destino exactamente una vez, incluso en caso de fallos.",
      },
      {
        prompt:
          "En Kafka Connect, un _____ _____ se utiliza para capturar registros problemáticos que no se pueden procesar, evitando que el pipeline se detenga.",
        answer: "Dead-Letter Queue (DLQ).",
      },
      {
        prompt:
          "En el contexto de las bases de datos, ¿qué operaciones captura un sistema de CDC?",
        answer:
          "Captura las operaciones de inserción (INSERT), actualización (UPDATE) y eliminación (DELETE) a nivel de fila.",
      },
      {
        prompt:
          "¿Cuál es una de las principales ventajas de usar gRPC para la comunicación interna entre microservicios?",
        answer:
          "Su alto rendimiento, baja latencia y el uso de contratos de API fuertemente tipados a través de Protocol Buffers.",
      },
      {
        prompt:
          "En el patrón BFF, ¿por qué es beneficioso que el BFF y la UI sean mantenidos por el mismo equipo?",
        answer:
          "Facilita la adaptación de la API a los requisitos de la UI y simplifica la coordinación de los despliegues.",
      },
      {
        prompt:
          "Un _____ _____ puede actuar como un agregador de solicitudes, reduciendo la cantidad de llamadas de red que un cliente debe hacer a múltiples microservicios.",
        answer: "API Gateway o un BFF.",
      },
      {
        prompt:
          "¿Qué significa que Kafka proporciona persistencia de mensajes?",
        answer:
          "Que los mensajes se almacenan en disco de forma duradera y no se eliminan después de ser consumidos, a menos que se configure una política de retención.",
      },
      {
        prompt:
          "En RabbitMQ, un exchange de tipo _____ envía una copia del mensaje a todas las colas que están enlazadas a él.",
        answer: "fanout.",
      },
      {
        prompt:
          "En RabbitMQ, un exchange de tipo _____ enruta mensajes a colas basándose en una coincidencia exacta de la clave de enrutamiento (routing key).",
        answer: "direct.",
      },
      {
        prompt:
          "En RabbitMQ, un exchange de tipo _____ enruta mensajes a colas basándose en la coincidencia de patrones en la clave de enrutamiento.",
        answer: "topic.",
      },
      {
        prompt:
          "¿Cuál es un inconveniente del CDC basado en triggers en comparación con el basado en logs?",
        answer:
          "Añade una carga adicional a la base de datos de producción y puede complicar las modificaciones del esquema.",
      },
      {
        prompt:
          "El atributo _____ en un DTO de .NET con System.Text.Json se puede usar para evitar que una propiedad se serialice y se envíe al cliente.",
        answer: "[JsonIgnore].",
      },
      {
        prompt:
          "Un beneficio clave del patrón BFF es la mejora de la _____ y la _____ del equipo de desarrollo del cliente.",
        answer: "autonomía y agilidad.",
      },
      {
        prompt:
          "La principal diferencia funcional entre SSE y WebSockets es que SSE es _____, mientras que WebSockets es _____.",
        answer: "unidireccional, bidireccional.",
      },
      {
        prompt: "Término: Richardson Maturity Model - Nivel 1.",
        answer:
          "Definición: Introduce el concepto de recursos, donde se utilizan URIs individuales para diferentes entidades (ej. /users, /products).",
      },
      {
        prompt:
          "¿Qué es la limitación de tasa (rate limiting) en el contexto de una API?",
        answer:
          "Es una estrategia para controlar la cantidad de solicitudes que un cliente puede hacer a una API en un período de tiempo determinado.",
      },
      {
        prompt:
          "La capacidad de Kafka para _____ _____ es crucial para casos de uso como la reconstrucción de estado o la corrección de errores en consumidores.",
        answer: "reproducir mensajes (message replay).",
      },
      {
        prompt:
          "Una Malla de Servicios puede implementar automáticamente características de resiliencia como reintentos, timeouts y _____ _____.",
        answer: "interruptores de circuito (circuit breakers).",
      },
      {
        prompt:
          "¿Cuál es la principal desventaja de la comunicación directa cliente-a-microservicio en una arquitectura grande?",
        answer:
          "El cliente se acopla fuertemente a los endpoints internos, lo que dificulta la evolución de los microservicios.",
      },
      {
        prompt:
          "El patrón BFF ayuda a optimizar el rendimiento para clientes con restricciones, como aplicaciones móviles, al proporcionar _____ más ligeros y específicos.",
        answer: "payloads (cargas útiles).",
      },
      {
        prompt:
          "En la comunicación asíncrona, ¿qué papel juega una cola de mensajes en el desacoplamiento de servicios?",
        answer:
          "Permite que el productor envíe un mensaje sin esperar a que el consumidor esté disponible para procesarlo, eliminando la dependencia temporal.",
      },
      {
        prompt:
          '¿Por qué el factor "experiencia del equipo" es a menudo decisivo al elegir un protocolo de API como REST, gRPC o GraphQL?',
        answer:
          "Porque un equipo puede ser más productivo con una tecnología que conoce bien, incluso si otra es teóricamente de mayor rendimiento.",
      },
      {
        prompt: "Término: gRPC Streaming.",
        answer:
          "Definición: Una característica de gRPC que permite la transmisión continua de datos en una o ambas direcciones (cliente-servidor) sobre una única conexión HTTP/2.",
      },
      {
        prompt:
          "Una API REST madura (Nivel 3) proporciona enlaces en sus respuestas que guían al cliente sobre las siguientes acciones posibles. Esto se conoce como _____.",
        answer: "HATEOAS (Hypermedia as the Engine of Application State).",
      },
      {
        prompt:
          "Para la comunicación interna de alto rendimiento entre servicios en un entorno políglota, _____ es a menudo la opción recomendada.",
        answer: "gRPC.",
      },
      {
        prompt:
          "Para una API pública que necesita máxima compatibilidad y facilidad de uso para desarrolladores de terceros, _____ es a menudo la opción recomendada.",
        answer: "REST.",
      },
      {
        prompt:
          "En el patrón BFF, cada BFF está estrechamente _____ a una experiencia de usuario particular.",
        answer: "vinculado (entangled/connected).",
      },
      {
        prompt:
          "Una de las ventajas del patrón BFF es que el BFF y la UI representan una única _____ de despliegue.",
        answer: "unidad.",
      },
      {
        prompt:
          "En gRPC, los _____ _____ se utilizan para definir la estructura de los mensajes y los servicios de forma independiente del lenguaje.",
        answer: "Protocol Buffers (protobuf).",
      },
      {
        prompt:
          "El proceso de validar una firma HMAC en un webhook implica recalcular el hash del cuerpo de la solicitud usando un _____ _____ y compararlo con el valor de la cabecera.",
        answer: "secreto compartido (shared secret).",
      },
      {
        prompt:
          "¿Qué herramienta de Kafka Connect permite la integración de bases de datos relacionales capturando cambios en tiempo real?",
        answer: "Conectores de CDC como Debezium.",
      },
      {
        prompt:
          "El principio de _____ de _____ en el diseño de microservicios aboga por desacoplar las aplicaciones de front-end y back-end.",
        answer: "separación de intereses (separation of concerns).",
      },
      {
        prompt:
          "En el contexto de Kafka, ¿qué son los Conectores (Connectors)?",
        answer:
          "Son componentes listos para usar que ayudan a mover datos de forma fiable entre Kafka y otros sistemas como bases de datos o almacenes de objetos.",
      },
      {
        prompt:
          "La biblioteca _____ en Kafka permite construir aplicaciones y microservicios de procesamiento de flujos en tiempo real.",
        answer: "Kafka Streams.",
      },
      {
        prompt:
          "Para evitar la duplicación de código en el patrón BFF, una buena práctica es extraer la lógica común a _____ compartidas.",
        answer: "librerías.",
      },
      {
        prompt:
          "Un desafío del patrón BFF es la gestión de la _____ y la _____ de múltiples backends.",
        answer: "escalabilidad y el rendimiento.",
      },
      {
        prompt:
          'El protocolo WebSocket inicia su comunicación con un "apretón de manos" (handshake) que actualiza una conexión _____ a una conexión WebSocket.',
        answer: "HTTP.",
      },
      {
        prompt:
          "La _____ de esquemas en Kafka Connect es crucial para mantener la consistencia y compatibilidad de los datos a medida que los formatos evolucionan.",
        answer: "evolución.",
      },
      {
        prompt: "Término: Kafka Topic.",
        answer:
          "Definición: Una categoría o nombre de feed al que se publican los registros (mensajes) en Kafka.",
      },
      {
        prompt:
          "En Kafka, los consumidores leen de los topics en grupos. Cada partición de un topic es asignada a exactamente un consumidor dentro de un _____ _____.",
        answer: "grupo de consumidores (consumer group).",
      },
      {
        prompt:
          "¿Cuál es la principal función de un balanceador de carga (Load Balancer) en una arquitectura de microservicios?",
        answer:
          "Distribuir el tráfico de red entrante de manera uniforme entre múltiples instancias de un servicio para mejorar la fiabilidad y escalabilidad.",
      },
      {
        prompt:
          "La práctica de implementar cambios en una nueva versión de un servicio a un pequeño subconjunto de usuarios antes de un despliegue completo se llama _____ _____.",
        answer: "despliegue canario (canary release).",
      },
      {
        prompt:
          '¿Qué es un "descubrimiento de servicios" (service discovery) en un entorno de microservicios?',
        answer:
          "Es el proceso mediante el cual los servicios se localizan y se comunican entre sí dinámicamente sin necesidad de direcciones IP codificadas.",
      },
      {
        prompt:
          "El patrón de _____ _____ consiste en tener una base de datos por servicio, lo que refuerza la autonomía y el desacoplamiento.",
        answer: "base de datos por servicio (database per service).",
      },
      {
        prompt:
          "En REST, ¿qué verbo HTTP es idempotente y se utiliza para crear o reemplazar un recurso en una URI conocida?",
        answer: "PUT.",
      },
      {
        prompt:
          "En REST, ¿qué verbo HTTP se utiliza para aplicar modificaciones parciales a un recurso?",
        answer: "PATCH.",
      },
      {
        prompt:
          "En REST, el verbo HTTP _____ se utiliza para enviar datos a un recurso para su procesamiento, como la creación de una nueva entidad.",
        answer: "POST.",
      },
      {
        prompt: "Término: Idempotencia en HTTP.",
        answer:
          "Definición: Una operación es idempotente si realizarla múltiples veces produce el mismo resultado que realizarla una sola vez (ej. GET, PUT, DELETE).",
      },
      {
        prompt:
          "¿Por qué es importante el versionado de APIs en una arquitectura de microservicios?",
        answer:
          "Para permitir que las APIs evolucionen sin romper la compatibilidad con los clientes que dependen de versiones anteriores.",
      },
      {
        prompt: 'En el contexto de Kafka, ¿qué es un "offset"?',
        answer:
          "Es un identificador único y secuencial que Kafka asigna a cada registro dentro de una partición, indicando su posición.",
      },
      {
        prompt:
          "La replicación en Kafka asegura la _____ _____ y la _____ de los datos al mantener copias de las particiones en múltiples brokers.",
        answer: "tolerancia a fallos y la durabilidad.",
      },
      {
        prompt:
          "En Domain-Driven Design (DDD), el _____ _____ es el lenguaje compartido entre los desarrolladores y los expertos del dominio para describir el negocio.",
        answer: "lenguaje ubicuo (ubiquitous language).",
      },
      {
        prompt:
          "El patrón BFF permite a cada equipo de front-end _____ de forma independiente, ya que controlan su propio servicio de back-end.",
        answer: "evolucionar o iterar.",
      },
      {
        prompt:
          "La comunicación entre un BFF y los microservicios aguas abajo (downstream) es un ejemplo de tráfico _____.",
        answer: "Este-Oeste (East-West).",
      },
      {
        prompt:
          "Un beneficio de la Malla de Servicios es la aplicación de políticas de seguridad y comunicación de forma _____ sin modificar el código del microservicio.",
        answer: "transparente.",
      },
      {
        prompt:
          "La principal desventaja del protocolo WebSocket es su _____ en comparación con HTTP, ya que no se beneficia de la infraestructura web estándar como cachés.",
        answer: "complejidad.",
      },
      {
        prompt:
          "¿Qué tecnología es más adecuada para un panel de control que necesita agregar datos de múltiples modelos de IA y ofrecer actualizaciones en tiempo real a través de suscripciones?",
        answer: "GraphQL.",
      },
      {
        prompt:
          "Para asegurar que un consumidor de webhook no procese un evento dos veces, este debe almacenar el _____ _____ de cada evento recibido.",
        answer: "ID de entrega (delivery ID).",
      },
      {
        prompt:
          '¿Qué es el "Principio de Responsabilidad Única" (Single Responsibility Principle) y cómo se aplica a los microservicios?',
        answer:
          "Establece que un componente debe tener una única razón para cambiar; en microservicios, significa que cada servicio debe enfocarse en una capacidad de negocio específica.",
      },
      {
        prompt:
          "El uso de _____ _____ en una API GraphQL permite a los clientes descubrir el esquema disponible, lo cual debe ser desactivado en entornos de producción por seguridad.",
        answer: "introspección de esquema (schema introspection).",
      },
      {
        prompt:
          "La principal ventaja de Kafka en términos de escalabilidad es su capacidad para escalar horizontalmente añadiendo más _____ al clúster.",
        answer: "brokers.",
      },
      {
        prompt: "Término: Kafka Consumer Lag.",
        answer:
          "Definición: Es la diferencia entre el último offset producido en una partición y el último offset consumido por un grupo de consumidores.",
      },
      {
        prompt:
          "En el contexto de la seguridad de API, _____ _____ 2.0 es el estándar de la industria para la delegación de autorización.",
        answer: "OAuth.",
      },
      {
        prompt:
          "El patrón _____ _____ utiliza un servicio dedicado para la autenticación y autorización, emitiendo tokens que los microservicios pueden validar.",
        answer: "Token de Seguridad (Security Token).",
      },
      {
        prompt:
          "A diferencia de REST, GraphQL expone un único _____ para todas las consultas y mutaciones.",
        answer: "endpoint.",
      },
      {
        prompt:
          "En GraphQL, las operaciones que modifican datos del lado del servidor se llaman _____.",
        answer: "mutaciones (mutations).",
      },
      {
        prompt:
          "En GraphQL, las operaciones que leen o recuperan datos se llaman _____.",
        answer: "consultas (queries).",
      },
      {
        prompt:
          "La comunicación en gRPC es _____ por defecto, lo que significa que el cliente espera una respuesta del servidor antes de continuar.",
        answer: "síncrona (request-response).",
      },
      {
        prompt:
          "En Kafka, una política de _____ define cuánto tiempo se conservan los mensajes en un topic antes de ser eliminados.",
        answer: "retención (retention policy).",
      },
      {
        prompt:
          "El desacoplamiento que ofrece el patrón BFF permite que los equipos de front-end y back-end trabajen en _____, mejorando la velocidad de desarrollo.",
        answer: "paralelo.",
      },
      {
        prompt:
          "Cuando una API Gateway realiza la terminación SSL, se encarga del cifrado y descifrado _____, liberando a los microservicios de esa tarea.",
        answer: "TLS/SSL.",
      },
      {
        prompt:
          "El patrón de _____ _____ centraliza la lógica de enrutamiento, composición y traducción de protocolos en un único punto de entrada.",
        answer: "API Gateway.",
      },
      {
        prompt:
          "La capacidad de una API de ser auto-descriptiva, donde las respuestas contienen enlaces a acciones relacionadas, es el núcleo del principio _____.",
        answer: "HATEOAS.",
      },
      {
        prompt:
          "El uso de _____ _____ en Kafka Connect permite la validación automática de esquemas y la gestión de la evolución del esquema.",
        answer: "Schema Registry.",
      },
      {
        prompt:
          "En el patrón de saga, una _____ _____ se utiliza para revertir las operaciones de una transacción distribuida que ha fallado.",
        answer: "transacción de compensación (compensating transaction).",
      },
      {
        prompt:
          "¿Cuál es un caso de uso común para Apache Kafka en el diseño de sistemas?",
        answer:
          "Actuar como un bus de eventos central para la comunicación asíncrona entre microservicios.",
      },
      {
        prompt:
          "Una de las desventajas del patrón BFF es que puede convertirse en un _____ _____ _____ si no se diseña e implementa correctamente.",
        answer: "cuello de botella (bottleneck).",
      },
      {
        prompt:
          "Para la comunicación en tiempo real en una aplicación de chat, _____ sería una opción de protocolo más adecuada que SSE.",
        answer: "WebSockets.",
      },
      {
        prompt:
          "Para notificaciones de noticias en vivo o un feed de redes sociales, el protocolo _____ es una opción eficiente y simple para empujar datos del servidor al cliente.",
        answer: "Server-Sent Events (SSE).",
      },
      {
        prompt:
          "El patrón API Gateway puede simplificar la arquitectura para los clientes, pero puede convertirse en un _____ si no se gestiona bien.",
        answer: "monolito.",
      },
      {
        prompt: "Término: Contrato de API.",
        answer:
          "Definición: Una especificación formal (como OpenAPI o un archivo .proto) que define cómo los clientes deben interactuar con una API, incluyendo endpoints, métodos y estructuras de datos.",
      },
      {
        prompt:
          "¿Cuál es una ventaja de usar un formato de serialización binario como Protocol Buffers sobre JSON?",
        answer:
          "Es más compacto y rápido de analizar, lo que resulta en un menor uso de ancho de banda y menor latencia.",
      },
      {
        prompt:
          "En una arquitectura de microservicios, el patrón _____ _____ se utiliza para agregar los resultados de múltiples llamadas a servicios en una única respuesta.",
        answer: "Agregación de Servicios (Service Aggregation).",
      },
      {
        prompt:
          "El uso de la replicación de colas en RabbitMQ, conocida como _____ _____, proporciona alta disponibilidad para los mensajes.",
        answer: "colas espejadas (mirrored queues).",
      },
      {
        prompt:
          "Kafka Connect, Kafka Streams y ksqlDB son componentes del _____ _____ de Kafka.",
        answer: "ecosistema de procesamiento de flujos (stream processing).",
      },
      {
        prompt:
          "En Domain-Driven Design, el uso de eventos para comunicar cambios entre contextos delimitados promueve un _____ acoplamiento.",
        answer: "bajo.",
      },
      {
        prompt:
          "Una de las principales responsabilidades de un API Gateway es la _____ de solicitudes, que implica verificar la identidad del cliente.",
        answer: "autenticación.",
      },
      {
        prompt:
          "Una Malla de Servicios facilita la implementación de pruebas _____ al permitir el enrutamiento de tráfico basado en porcentajes a diferentes versiones de un servicio.",
        answer: "A/B.",
      },
      {
        prompt:
          "El propósito del patrón BFF es _____ las aplicaciones de front-end de los servicios de back-end.",
        answer: "desacoplar.",
      },
      {
        prompt:
          "¿Qué ventaja tiene el patrón BFF para los equipos que trabajan en diferentes partes de una aplicación?",
        answer:
          "Permite la responsabilidad compartida del equipo, ya que los equipos de front-end y back-end pueden trabajar de forma más aislada.",
      },
    ],
  },
  {
    id: "observabilidad",
    name: "Observabilidad",
    cards: [
      {
        prompt:
          "¿Cuál es la diferencia fundamental entre monitorización y observabilidad?",
        answer:
          "La monitorización es reactiva y busca problemas conocidos en un sistema, mientras que la observabilidad es proactiva y permite hacer preguntas arbitrarias sobre el comportamiento del sistema para descubrir problemas desconocidos.",
      },
      {
        prompt:
          "Los tres pilares de la observabilidad son las métricas, los logs y _____.",
        answer: "las trazas (traces).",
      },
      {
        prompt:
          "¿Qué tipo de pregunta responde principalmente el pilar de 'métricas' en la observabilidad?",
        answer:
          "Responde a la pregunta de 'qué' está mal, indicando síntomas a través de datos numéricos agregados a lo largo del tiempo.",
      },
      {
        prompt:
          "¿Qué tipo de pregunta responde principalmente el pilar de 'logs' en la observabilidad?",
        answer:
          "Responde a la pregunta de 'por qué' ocurrió un evento, proporcionando un registro detallado y con marca de tiempo de eventos discretos.",
      },
      {
        prompt:
          "¿Qué tipo de pregunta responde principalmente el pilar de 'trazas' (traces) en la observabilidad?",
        answer:
          "Responde a la pregunta de 'dónde' ocurrió un problema, mostrando el flujo de una solicitud a través de múltiples servicios en un sistema distribuido.",
      },
      {
        prompt: "Término: Perfilado Continuo (Continuous Profiling)",
        answer:
          "Es una técnica de observabilidad que recopila continuamente datos a nivel de código sobre el consumo de recursos (CPU, memoria) para identificar cuellos de botella en el rendimiento de la aplicación.",
      },
      {
        prompt: "¿Qué es un SLI (Service Level Indicator)?",
        answer:
          "Es una medida cuantitativa de algún aspecto del nivel de servicio proporcionado, como la latencia de solicitud o la tasa de errores.",
      },
      {
        prompt: "¿Qué es un SLO (Service Level Objective)?",
        answer:
          "Es un objetivo para el valor de un SLI a lo largo del tiempo, que define el umbral de fiabilidad deseado para un servicio.",
      },
      {
        prompt: "¿Qué es un SLA (Service Level Agreement)?",
        answer:
          "Es un contrato con los usuarios que incluye consecuencias explícitas (generalmente financieras) si no se cumplen los SLOs.",
      },
      {
        prompt:
          "El presupuesto de error (error budget) se deriva directamente del _____.",
        answer: "SLO (Service Level Objective).",
      },
      {
        prompt:
          "Las cuatro 'Señales Doradas' (Golden Signals) de la monitorización de SRE de Google son Latencia, Tráfico, Errores y _____.",
        answer: "Saturación.",
      },
      {
        prompt:
          "En el contexto de las 'Señales Doradas', ¿a qué se refiere la 'Latencia'?",
        answer: "Al tiempo que tarda un servicio en responder a una solicitud.",
      },
      {
        prompt:
          "En el contexto de las 'Señales Doradas', ¿a qué se refiere el 'Tráfico'?",
        answer:
          "A la cantidad de demanda que se ejerce sobre el sistema, medida comúnmente en solicitudes por segundo.",
      },
      {
        prompt:
          "En el contexto de las 'Señales Doradas', ¿a qué se refiere la 'Saturación'?",
        answer:
          "Mide cuán 'lleno' está un servicio, indicando la utilización de sus recursos más limitados (CPU, memoria, etc.).",
      },
      {
        prompt:
          "El método de monitorización RED, utilizado para servicios, se compone de Tasa (Rate), Errores (Errors) y _____.",
        answer: "Duración (Duration).",
      },
      {
        prompt: "Término: Alta Cardinalidad",
        answer:
          "Se refiere a la propiedad de los datos donde una columna o atributo (como un ID de usuario o un ID de solicitud) tiene un gran número de valores únicos, lo que puede aumentar los costos de almacenamiento y la latencia de las consultas.",
      },
      {
        prompt:
          "¿Cuál es uno de los principales impulsores del aumento de la cardinalidad en las arquitecturas nativas de la nube?",
        answer:
          "El uso de microservicios y contenedores, donde cada instancia efímera (pod, contenedor) genera series temporales únicas.",
      },
      {
        prompt: "En el trazado distribuido, ¿qué es un 'span'?",
        answer:
          "Un 'span' representa una única operación o unidad de trabajo dentro de una traza, con un nombre, una hora de inicio y una de finalización.",
      },
      {
        prompt: "En el trazado distribuido, ¿qué es una 'traza' (trace)?",
        answer:
          "Una 'traza' es la visualización del recorrido completo de una solicitud a medida que pasa a través de los diferentes servicios de un sistema distribuido, compuesta por uno o más spans.",
      },
      {
        prompt: "Término: Propagación de contexto (Context Propagation)",
        answer:
          "Es el mecanismo por el cual los identificadores de traza y span se pasan de un servicio a otro (generalmente a través de encabezados HTTP) para mantener la continuidad de una traza distribuida.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia entre el muestreo basado en la cabecera (head-based) y el muestreo basado en la cola (tail-based)?",
        answer:
          "El muestreo 'head-based' toma la decisión de muestrear al inicio de la traza, mientras que el 'tail-based' espera a que la traza se complete para tomar una decisión más informada.",
      },
      {
        prompt:
          "¿Cuál es una ventaja clave del muestreo basado en la cola (tail-based)?",
        answer:
          "Permite capturar de manera fiable trazas 'interesantes', como aquellas con errores o alta latencia, ya que la decisión se toma con la información completa de la traza.",
      },
      {
        prompt:
          "¿Cuál es un desafío principal del muestreo basado en la cola (tail-based)?",
        answer:
          "Requiere infraestructura adicional para almacenar temporalmente todos los spans de una traza antes de tomar la decisión de muestreo, lo que aumenta la complejidad y el costo.",
      },
      {
        prompt: "¿Qué es OpenTelemetry (OTel)?",
        answer:
          "Es un estándar y un conjunto de herramientas de código abierto para la instrumentación, generación, recolección y exportación de datos de telemetría (métricas, logs y trazas).",
      },
      {
        prompt:
          "OpenTelemetry proporciona un backend de observabilidad completo. ¿Verdadero o Falso y por qué?",
        answer:
          "Falso. OpenTelemetry es un estándar y una especificación para la recolección de datos, pero no proporciona un backend para almacenar o visualizar esos datos; debe integrarse con uno.",
      },
      {
        prompt:
          "El pipeline de un Colector de OpenTelemetry se compone de tres tipos de componentes: receptores (receivers), procesadores (processors) y _____.",
        answer: "exportadores (exporters).",
      },
      {
        prompt:
          "¿Cuál es la función de un 'receptor' (receiver) en el Colector de OpenTelemetry?",
        answer:
          "Es el punto de entrada de los datos de telemetría al colector, escuchando datos en formatos como OTLP, Jaeger o Prometheus.",
      },
      {
        prompt:
          "¿Cuál es la función de un 'procesador' (processor) en el Colector de OpenTelemetry?",
        answer:
          "Modifica los datos de telemetría antes de la exportación, realizando tareas como el procesamiento por lotes (batching), filtrado, muestreo o adición de atributos.",
      },
      {
        prompt:
          "¿Cuál es la función de un 'exportador' (exporter) en el Colector de OpenTelemetry?",
        answer:
          "Envía los datos de telemetría a uno o más backends o destinos, como Grafana Tempo, Datadog o un endpoint OTLP genérico.",
      },
      {
        prompt:
          "En un despliegue a gran escala con OpenTelemetry, ¿cuál es el propósito del patrón 'agente-gateway'?",
        answer:
          "El 'agente' (un colector ligero local) recopila telemetría de la aplicación, y el 'gateway' (un colector centralizado) se encarga del procesamiento pesado como el muestreo de cola y el enrutamiento a múltiples backends.",
      },
      {
        prompt: "Término: eBPF (extended Berkeley Packet Filter)",
        answer:
          "Es una tecnología del kernel de Linux que permite ejecutar programas en un entorno aislado dentro del kernel, utilizada para redes, seguridad y observabilidad de bajo overhead sin modificar el código de la aplicación.",
      },
      {
        prompt:
          "¿Qué componente del stack de Grafana se utiliza principalmente para la ingesta y consulta de logs?",
        answer: "Grafana Loki.",
      },
      {
        prompt:
          "¿Qué componente del stack de Grafana se utiliza principalmente para el almacenamiento y consulta de trazas distribuidas?",
        answer: "Grafana Tempo.",
      },
      {
        prompt:
          "¿Qué componente del stack de Grafana se utiliza como backend de métricas escalable y compatible con Prometheus?",
        answer: "Grafana Mimir.",
      },
      {
        prompt:
          "¿Qué componente del stack de Grafana se utiliza para el perfilado continuo?",
        answer: "Grafana Pyroscope.",
      },
      {
        prompt:
          "¿Cuál es la principal estrategia de Grafana Tempo para reducir los costos de almacenamiento de trazas?",
        answer:
          "Evita la indexación pesada de spans y depende de la correlación con logs y métricas (a través de Trace IDs) para encontrar trazas.",
      },
      {
        prompt:
          "El lenguaje de consulta utilizado por Grafana Loki para buscar en los logs se llama _____.",
        answer: "LogQL.",
      },
      {
        prompt: "¿Qué es Grafana Alloy?",
        answer:
          "Es una distribución del Colector de OpenTelemetry mantenida por Grafana, diseñada para ser un agente de telemetría flexible.",
      },
      {
        prompt:
          "Prometheus utiliza un modelo de recolección de métricas basado en _____ (pull) en lugar de _____ (push).",
        answer: "extracción (pull), empuje (push).",
      },
      {
        prompt:
          "El lenguaje de consulta utilizado por Prometheus para consultar métricas de series temporales se llama _____.",
        answer: "PromQL (Prometheus Query Language).",
      },
      {
        prompt:
          "¿Por qué Prometheus por sí solo no se considera una solución completa de observabilidad?",
        answer:
          "Porque se enfoca exclusivamente en métricas y requiere sistemas separados para logs (como Loki) y trazas (como Jaeger o Tempo).",
      },
      {
        prompt:
          "En Kubernetes, la herramienta _____ se utiliza para generar métricas sobre el estado de varios objetos como deployments, pods y servicios.",
        answer: "kube-state-metrics.",
      },
      {
        prompt:
          "Según un informe de New Relic, ¿cuál fue el principal desafío citado por las organizaciones de servicios financieros para lograr la observabilidad de pila completa?",
        answer:
          "Demasiadas herramientas de monitorización y datos aislados (siloed data).",
      },
      {
        prompt: "Término: Tasa de consumo (Burn Rate)",
        answer:
          "Es una métrica utilizada en las alertas de SLO que mide la velocidad a la que se consume el presupuesto de error en relación con el período del SLO.",
      },
      {
        prompt:
          "¿Por qué alertar sobre la tasa de consumo (burn rate) es a menudo más efectivo que alertar sobre un umbral de error simple?",
        answer:
          "Porque puede detectar problemas significativos más rápidamente y con mayor precisión, incluso si son breves, al contextualizar el gasto del presupuesto de error en un período de tiempo.",
      },
      {
        prompt: "Término: Métricas P99 (percentil 99)",
        answer:
          "Representa el valor de latencia por debajo del cual se encuentra el 99% de las solicitudes, destacando la experiencia del peor caso para la mayoría de los usuarios y exponiendo los valores atípicos de la cola larga.",
      },
      {
        prompt:
          "¿Qué problema común en los entornos de ejecución con recolección de basura (como Java) puede causar picos en la latencia P99?",
        answer:
          "Las pausas periódicas del recolector de basura (garbage collection), que detienen la ejecución normal de la aplicación para liberar memoria.",
      },
      {
        prompt: "Término: Observability-Driven Development (ODD)",
        answer:
          "Es un enfoque de desarrollo de software que integra la instrumentación y la observabilidad en las primeras etapas del ciclo de vida, utilizando pruebas basadas en trazas.",
      },
      {
        prompt: "¿Cómo se relaciona ODD con TDD (Test-Driven Development)?",
        answer:
          "Mientras que TDD se centra en la corrección funcional (el código hace lo que se supone que debe hacer), ODD se enfoca en el comportamiento observable (se puede verificar cómo lo hace en producción).",
      },
      {
        prompt: "Técnica: Filtrado de Atributos (Attribute Filtering)",
        answer:
          "Una técnica de control de costos en el Colector de OpenTelemetry que elimina atributos innecesarios de logs, métricas y spans para reducir el tamaño de la carga útil (payload).",
      },
      {
        prompt:
          "¿Cómo se puede utilizar el Colector de OpenTelemetry para evitar que datos sensibles (PII) lleguen a los backends de observabilidad?",
        answer:
          "Usando el procesador de atributos (`attributes processor`) para eliminar, enmascarar o aplicar un hash a los campos que contienen datos sensibles antes de exportarlos.",
      },
      {
        prompt: "¿Qué es ClickHouse en el contexto de la observabilidad?",
        answer:
          "Es una base de datos columnar de código abierto optimizada para cargas de trabajo analíticas, que maneja eficientemente datos de alta cardinalidad y alta granularidad, a diferencia de las bases de datos de series temporales tradicionales.",
      },
      {
        prompt:
          "El lenguaje de consulta propio de New Relic, similar a SQL, se llama _____.",
        answer: "NRQL (New Relic Query Language).",
      },
      {
        prompt:
          "Datadog ahora admite la ingesta de datos de OpenTelemetry, aunque algunas de sus características avanzadas funcionan mejor con su _____.",
        answer: "agente nativo (Datadog Agent).",
      },
      {
        prompt:
          "En el modelo de costo de ClickHouse, ¿cuál es la principal ventaja de usar una base de datos unificada sobre un stack federado (como Loki, Mimir, Tempo)?",
        answer:
          "Reduce la duplicación de datos y metadatos, utiliza un único almacén con alta compresión y permite consultas con un solo lenguaje (SQL), simplificando la operación.",
      },
      {
        prompt:
          "En el contexto del trazado distribuido, ¿qué es la instrumentación automática?",
        answer:
          "Es el proceso de capturar telemetría de frameworks y librerías comunes sin necesidad de modificar el código de la aplicación, generalmente a través de agentes o librerías que se adjuntan en tiempo de ejecución.",
      },
      {
        prompt:
          "Una estrategia para manejar servicios de bajo tráfico en las alertas de SLO es generar _____ para compensar la falta de señal de los usuarios reales.",
        answer: "tráfico artificial (synthetic traffic).",
      },
      {
        prompt: "Término: AIOps",
        answer:
          "Se refiere a la aplicación de la inteligencia artificial y el aprendizaje automático a las operaciones de TI, utilizada en observabilidad para la detección de anomalías, reducción de ruido de alertas y análisis automatizado de la causa raíz.",
      },
      {
        prompt: "¿Qué es la correlación de señales en observabilidad?",
        answer:
          "Es el proceso de vincular diferentes tipos de telemetría (métricas, logs, trazas) para un incidente específico, permitiendo navegar desde un pico de métrica a los logs y trazas relevantes.",
      },
      {
        prompt:
          "Para asegurar la correlación, los registros de logs deben enriquecerse con el _____ y el _____ de la traza activa.",
        answer: "TraceId, SpanId.",
      },
      {
        prompt: "Término: Políticas de retención de datos",
        answer:
          "Son reglas que definen cuánto tiempo se almacenan los datos de telemetría, a menudo en diferentes niveles de almacenamiento (caliente, tibio, frío) para equilibrar el costo y la accesibilidad.",
      },
      {
        prompt:
          "Un procesador del Colector OTel que agrupa múltiples spans, métricas o logs en una sola solicitud para mejorar la eficiencia se llama procesador de _____.",
        answer: "lotes (batch processor).",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de utilizar OpenTelemetry en lugar de agentes propietarios de un proveedor?",
        answer:
          "Evita el 'vendor lock-in' (dependencia del proveedor), permitiendo cambiar de backend de observabilidad sin tener que reinstrumentar las aplicaciones.",
      },
      {
        prompt:
          "La métrica `p50` es otro nombre para la _____, que representa el punto medio de un conjunto de datos.",
        answer: "mediana.",
      },
      {
        prompt:
          "Si la latencia p50 de un servicio es de 20 ms y la p99 es de 800 ms, ¿qué indica esta gran diferencia?",
        answer:
          "Indica que la mayoría de las solicitudes son rápidas, pero hay un pequeño porcentaje de solicitudes extremadamente lentas (una 'cola larga'), lo que sugiere problemas de rendimiento en casos específicos.",
      },
      {
        prompt:
          "¿Cuál es el propósito del componente `query-frontend` en arquitecturas escalables como la de Grafana Mimir?",
        answer:
          "Divide las consultas grandes en partes más pequeñas, gestiona una cola de consultas y almacena en caché los resultados para reducir la carga en los backends.",
      },
      {
        prompt:
          "En el contexto de Loki, los logs se agrupan en 'chunks' comprimidos que se almacenan en un _____.",
        answer: "almacenamiento de objetos (object storage).",
      },
      {
        prompt:
          "En el contexto de OpenTelemetry, ¿qué es la instrumentación manual?",
        answer:
          "Es el acto de agregar código explícitamente a una aplicación para crear spans, registrar eventos o emitir métricas, proporcionando un control detallado sobre la telemetría.",
      },
      {
        prompt:
          "Los 'span events' en OpenTelemetry se utilizan para registrar _____.",
        answer:
          "ocurrencias con marca de tiempo dentro de un span, proporcionando contexto adicional sobre el trabajo realizado.",
      },
      {
        prompt:
          "Datadog ofrece una característica llamada 'muestreo adaptativo' (adaptive sampling) que ajusta dinámicamente las tasas de muestreo para capturar trazas relevantes mientras se mantiene dentro de un _____.",
        answer: "presupuesto de ingesta mensual.",
      },
      {
        prompt:
          "En el stack federado de OSS, Loki, Mimir y Tempo escalan de forma independiente, lo que sigue el principio de _____.",
        answer: "divide y vencerás (divide and conquer).",
      },
      {
        prompt:
          "Una de las estrategias técnicas para reducir los costos de observabilidad es eliminar o truncar los _____ en los logs de producción.",
        answer: "stack traces (trazas de pila).",
      },
      {
        prompt:
          "El tipo de span 'CONSUMER' en OpenTelemetry se utiliza para representar operaciones asíncronas de _____.",
        answer:
          "recepción y procesamiento de mensajes (por ejemplo, desde una cola como Kafka o RabbitMQ).",
      },
      {
        prompt:
          "En Grafana, las _____ se utilizan para crear dashboards dinámicos que pueden filtrar datos entre diferentes entornos, clústeres o servicios.",
        answer: "variables de plantilla (template variables).",
      },
      {
        prompt: "Término: Muestreo probabilístico (Probabilistic Sampling)",
        answer:
          "Una estrategia de muestreo de cabecera (head-based) que decide aleatoriamente si se captura una traza basándose en un porcentaje predefinido.",
      },
      {
        prompt:
          "Un desafío para lograr la observabilidad en Kubernetes es la naturaleza _____ de los pods y contenedores, lo que significa que su estado desaparece rápidamente si no se captura.",
        answer: "efímera.",
      },
      {
        prompt:
          "En Datadog, las 'métricas de trazas' se calculan a partir del 100% del tráfico, a diferencia de los datos de trazas que pueden ser muestreados. ¿Por qué es esto importante?",
        answer:
          "Porque permite crear alertas y SLOs precisos y fiables basados en tasas de solicitud, errores y latencia, sin ser afectados por el muestreo.",
      },
      {
        prompt:
          "Término: Instrumentación sin código (Codeless Instrumentation)",
        answer:
          "Se refiere a la capacidad de recopilar telemetría de aplicaciones sin modificar su código fuente, a menudo utilizando tecnologías como eBPF.",
      },
      {
        prompt:
          "El exporter `loadbalancing` del Colector de OpenTelemetry se utiliza para distribuir la carga de telemetría entre múltiples instancias de _____.",
        answer:
          "colectores de backend o de siguiente nivel (por ejemplo, un pool de colectores de muestreo de cola).",
      },
      {
        prompt:
          "Cuando una traza distribuida cruza los límites de la aplicación (por ejemplo, del frontend web al backend), se está realizando un trazado _____.",
        answer: "de extremo a extremo (end-to-end).",
      },
      {
        prompt: "¿Qué es un 'pipeline de telemetría'?",
        answer:
          "Es un sistema, a menudo implementado con herramientas como el Colector de OpenTelemetry, que procesa y enruta datos de telemetría desde las fuentes hasta los destinos, permitiendo el control centralizado de los datos.",
      },
      {
        prompt: "¿Qué es una métrica de tipo 'histograma'?",
        answer:
          "Es una métrica que rastrea la distribución de un conjunto de mediciones, agrupándolas en cubos (buckets) configurables, útil para calcular percentiles como p95 o p99.",
      },
      {
        prompt:
          "Un modelo de precios común en las plataformas de observabilidad que puede llevar a costos inesperados es el precio por _____.",
        answer: "GB de ingesta.",
      },
      {
        prompt:
          "La integración de Grafana k6 (pruebas de carga) con Grafana Pyroscope (perfilado) permite a los desarrolladores identificar cuellos de botella de rendimiento de código bajo _____.",
        answer: "tráfico simulado.",
      },
      {
        prompt:
          "En OTel, el procesador `spanmetrics` se utiliza para generar métricas (como latencia y recuentos) directamente a partir de los datos de _____.",
        answer: "trazas (spans).",
      },
      {
        prompt:
          "El 'Control Plane' de Chronosphere es una característica que permite analizar y transformar los datos de telemetría _____ de que se almacenen y facturen.",
        answer: "antes.",
      },
      {
        prompt:
          "¿Qué es la 'fatiga de alertas' (alert fatigue) y cómo ayuda AIOps a reducirla?",
        answer:
          "Es la desensibilización a las alertas debido a un alto volumen de notificaciones. AIOps ayuda agrupando alertas relacionadas en un solo incidente y reduciendo el ruido.",
      },
      {
        prompt:
          "En el contexto de la observabilidad, ¿qué significa 'correlación de la causa raíz'?",
        answer:
          "Es el proceso de identificar el evento o cambio subyacente que desencadenó una serie de fallos o degradaciones del rendimiento, a menudo analizando señales correlacionadas en el tiempo.",
      },
      {
        prompt:
          "La herramienta _____ es un backend de trazado distribuido de código abierto que a menudo se usa junto con Prometheus y Grafana.",
        answer: "Jaeger.",
      },
      {
        prompt:
          "La técnica de muestreo de trazas `TraceState` permite tomar decisiones de muestreo basadas en _____.",
        answer:
          "un estado personalizado propagado a través de los servicios dentro de la traza.",
      },
      {
        prompt:
          "¿Cuál es el propósito del componente `compactor` en sistemas como Grafana Tempo?",
        answer:
          "Optimiza los bloques de datos en el almacenamiento de objetos, combina bloques pequeños en otros más grandes y aplica las políticas de retención para eliminar datos antiguos.",
      },
      {
        prompt:
          "El uso de la métrica `otelcol_exporter_queue_size` es importante para monitorizar el Colector de OpenTelemetry porque un tamaño de cola en constante crecimiento indica que _____.",
        answer:
          "el backend no puede procesar los datos a la velocidad a la que se envían, lo que puede llevar a la pérdida de datos.",
      },
      {
        prompt: "Término: Logging estructurado",
        answer:
          "Es la práctica de escribir logs en un formato consistente y predecible (como JSON), lo que facilita su análisis y consulta por máquinas.",
      },
      {
        prompt:
          "En el contexto de TDD, el ciclo se conoce como 'Rojo-Verde-Refactorizar'. ¿Qué sucede en la fase 'Roja'?",
        answer:
          "Se escribe una prueba automatizada que falla porque la funcionalidad correspondiente aún no se ha implementado.",
      },
      {
        prompt:
          "En BDD, los escenarios a menudo se escriben en un lenguaje estructurado de lenguaje natural llamado Gherkin, usando las palabras clave _____, _____ y _____.",
        answer: "Dado (Given), Cuando (When), Entonces (Then).",
      },
      {
        prompt:
          "En la evaluación de Autoscope, se utilizó una variante del Z-score basada en la mediana y la _____ para una detección de anomalías más robusta en duraciones de spans.",
        answer:
          "desviación absoluta mediana (MAD - Median Absolute Deviation).",
      },
      {
        prompt:
          "¿Por qué es importante evitar métricas con etiquetas de alta cardinalidad como 'user_id' o 'request_id'?",
        answer:
          "Porque cada combinación única de etiquetas crea una nueva serie temporal, lo que provoca un crecimiento exponencial del almacenamiento y una ralentización de las consultas.",
      },
      {
        prompt: "¿Qué es un 'pipeline de logs'?",
        answer:
          "Es un proceso que ingiere, procesa (parsea, enriquece, filtra) y enruta los datos de logs desde su origen hasta su destino final de almacenamiento o análisis.",
      },
      {
        prompt:
          "El lenguaje de consulta NRQL de New Relic es un ejemplo de un lenguaje de consulta _____ para datos de observabilidad.",
        answer: "similar a SQL.",
      },
      {
        prompt:
          "¿Qué es la 'rehidratación' de datos en el contexto de las plataformas SaaS de observabilidad?",
        answer:
          "Es el proceso, a menudo costoso, de mover datos desde un almacenamiento frío/archivado a un almacenamiento caliente para poder consultarlos, incurriendo en tarifas adicionales.",
      },
      {
        prompt:
          "La tecnología _____ permite a herramientas como Grafana Beyla generar métricas y trazas sin instrumentación de código al observar llamadas del sistema a nivel del kernel.",
        answer: "eBPF.",
      },
      {
        prompt:
          "¿Cuál es una de las principales desventajas del stack ELK (Elasticsearch, Logstash, Kibana) para la gestión de logs?",
        answer:
          "Requiere una alta experiencia técnica para su gestión, escalado y mantenimiento, y puede consumir muchos recursos.",
      },
      {
        prompt:
          "En una política de presupuesto de errores, si un servicio consume su presupuesto mensual rápidamente, ¿qué acción podría desencadenarse?",
        answer:
          "Se podría congelar el lanzamiento de nuevas funcionalidades hasta que se restablezca la fiabilidad del servicio.",
      },
      {
        prompt:
          "¿Cuál es el propósito del componente `distributor` en arquitecturas como las de Loki y Tempo?",
        answer:
          "Recibe los datos entrantes (logs o spans), los valida y los reenvía a los `ingesters` para su procesamiento y almacenamiento.",
      },
      {
        prompt:
          "En el procesador de muestreo de cola de OTel, el parámetro `decision_wait` controla _____.",
        answer:
          "el tiempo que el colector espera desde que recibe el primer span de una traza antes de tomar una decisión de muestreo.",
      },
      {
        prompt:
          "Una de las políticas de muestreo de cola permite muestrear trazas basándose en la presencia de un código de estado específico, como los errores de la serie 5xx. Esta política se llama _____.",
        answer: "status_code.",
      },
      {
        prompt:
          "El formato estándar para la propagación de contexto de trazas definido por el W3C se llama _____.",
        answer: "W3C Trace Context (y utiliza encabezados como `traceparent`).",
      },
      {
        prompt:
          "Término: Observabilidad del frontend (o RUM - Real User Monitoring)",
        answer:
          "Es la práctica de capturar telemetría (interacciones, tiempos de carga, errores de JavaScript) directamente desde el navegador del usuario final para entender su experiencia real.",
      },
      {
        prompt:
          "Herramientas como _____ se utilizan para la observabilidad del frontend y se integran en el ecosistema de Grafana.",
        answer: "Grafana Faro.",
      },
      {
        prompt:
          "En el contexto de la seguridad, ¿cómo puede ayudar la observabilidad?",
        answer:
          "Puede ayudar a detectar actividades inusuales, proporcionar pistas para la investigación de incidentes y ofrecer registros de auditoría para el cumplimiento normativo.",
      },
      {
        prompt:
          "¿Qué significa que una plataforma de observabilidad es 'nativa de OpenTelemetry'?",
        answer:
          "Significa que está diseñada desde su núcleo para utilizar el estándar OpenTelemetry para la ingesta y el procesamiento de datos, en lugar de simplemente tener un conector o adaptador.",
      },
      {
        prompt: "Término: Muestreo de nivel de span (Span-level sampling)",
        answer:
          "Una técnica avanzada de muestreo donde se toman decisiones de retención para spans individuales dentro de una traza, en lugar de para la traza completa, permitiendo una reducción de datos más granular.",
      },
      {
        prompt: "¿Cuál es el riesgo de un muestreo demasiado agresivo?",
        answer:
          "Se corre el riesgo de perder trazas o datos cruciales para diagnosticar problemas intermitentes o poco frecuentes.",
      },
      {
        prompt:
          "En los sistemas distribuidos, un _____ se utiliza para asegurar que las solicitudes se distribuyan de manera uniforme entre múltiples instancias de un servicio o colector.",
        answer: "balanceador de carga (load balancer).",
      },
      {
        prompt:
          "¿Por qué es importante la 'instrumentación estandarizada' para la observabilidad?",
        answer:
          "Asegura que los datos de telemetría se recopilen de manera consistente en todos los servicios, lo que facilita la correlación y el análisis de los datos.",
      },
      {
        prompt:
          "La capacidad de Grafana de crear un enlace desde un punto de datos en un panel de métricas a una consulta de logs pre-poblada en Loki es un ejemplo de _____.",
        answer: "correlación de datos (o navegación contextual).",
      },
      {
        prompt:
          "¿Qué problema resuelve la federación de colectores de OpenTelemetry en un entorno distribuido globalmente?",
        answer:
          "Permite la agregación y el procesamiento de telemetría a nivel regional antes de enviarla a un colector central, reduciendo la latencia y el tráfico de red transregional.",
      },
      {
        prompt:
          "La persistencia de logs es un desafío en entornos de contenedores porque los logs dentro de un contenedor se pierden cuando este _____.",
        answer: "es destruido o falla.",
      },
      {
        prompt:
          "En el contexto de costos de observabilidad, el precio 'por host' o 'por contenedor' penaliza a las arquitecturas que utilizan la _____.",
        answer: "escalabilidad horizontal.",
      },
      {
        prompt:
          "La compresión y el almacenamiento en niveles (tiered storage) son dos estrategias para reducir los costos de _____ de los datos de observabilidad.",
        answer: "retención y almacenamiento.",
      },
      {
        prompt:
          "¿Qué es la observabilidad empresarial (business observability)?",
        answer:
          "Es la práctica de integrar datos de negocio (como ingresos, carritos de compra abandonados) con los datos de telemetría para entender el impacto del rendimiento del sistema en los resultados de negocio.",
      },
      {
        prompt:
          "El procesador `cumulativetodelta` del Colector de OTel se utiliza para convertir métricas acumulativas, como un contador que siempre aumenta, en métricas _____.",
        answer: "delta (que muestran el cambio desde la última medición).",
      },
      {
        prompt: "Término: Datos de telemetría",
        answer:
          "Es la información generada por un sistema para proporcionar visibilidad sobre su estado interno, incluyendo principalmente métricas, logs, trazas y perfiles.",
      },
    ],
  },
  {
    id: "patrones",
    name: "Patrones",
    cards: [
      {
        prompt: "¿Qué es la arquitectura de microservicios?",
        answer:
          "Es un enfoque de diseño donde una aplicación se construye como un conjunto de servicios pequeños e implementables de forma independiente, cada uno ejecutándose en su propio proceso y comunicándose a través de mecanismos ligeros.",
      },
      {
        prompt: "¿Cuál es el propósito principal del patrón API Gateway?",
        answer:
          "Actuar como un único punto de entrada para todos los clientes, enrutando las solicitudes al microservicio apropiado en el backend y manejando preocupaciones transversales.",
      },
      {
        prompt:
          "Un ejemplo del mundo real del patrón API Gateway es _____ de Netflix.",
        answer: "Zuul",
      },
      {
        prompt:
          "¿En qué se diferencia el patrón Backends for Frontends (BFF) del patrón API Gateway?",
        answer:
          "En el patrón BFF se crean backends separados y personalizados para cada tipo de frontend (web, móvil, etc.), en lugar de una única puerta de enlace para todos.",
      },
      {
        prompt:
          "¿Cómo gestiona el patrón Saga las transacciones distribuidas en microservicios?",
        answer:
          "Divide una transacción global en una serie de transacciones locales coordinadas, utilizando transacciones compensatorias para deshacer los pasos si uno falla.",
      },
      {
        prompt:
          "En el patrón Saga, la estrategia de _____ utiliza un servicio central para indicar a cada participante qué hacer a continuación.",
        answer: "orquestación",
      },
      {
        prompt:
          "En el patrón Saga, la estrategia de _____ se basa en que cada servicio publique eventos que otros servicios escuchan y a los que reaccionan en cadena.",
        answer: "coreografía",
      },
      {
        prompt: "¿Qué son las transacciones compensatorias en el patrón Saga?",
        answer:
          "Son operaciones que revierten el efecto de un paso completado previamente en una saga cuando un paso posterior falla.",
      },
      {
        prompt:
          "¿Qué principio de consistencia de datos habilitan las Sagas en los microservicios?",
        answer: "Consistencia eventual.",
      },
      {
        prompt:
          "¿Qué significa el patrón 'Database per Service' (Base de datos por servicio)?",
        answer:
          "Cada microservicio posee y gestiona su propia base de datos, y otros servicios no pueden acceder directamente a ella.",
      },
      {
        prompt:
          "¿Qué es la 'Persistencia Políglota' (Polyglot Persistence) en el contexto de microservicios?",
        answer:
          "Es el uso de diferentes tipos de tecnologías de bases de datos para diferentes microservicios, eligiendo la mejor opción para las necesidades de cada servicio.",
      },
      {
        prompt: "¿Cuál es la función del patrón Sidecar?",
        answer:
          "Adjuntar un proceso o servicio auxiliar a un servicio principal para proporcionar capacidades comunes (como logging o monitoreo) sin sobrecargar el código del servicio principal.",
      },
      {
        prompt:
          "En Kubernetes, el patrón Sidecar se utiliza comúnmente para inyectar un proxy _____ como parte de una malla de servicios (service mesh) como Istio.",
        answer: "Envoy",
      },
      {
        prompt:
          "¿Qué significa el principio de 'Smart Endpoints, Dumb Pipes' (Extremos inteligentes, tuberías tontas)?",
        answer:
          "Significa que la lógica de negocio y el procesamiento deben residir en los microservicios (los extremos), mientras que los canales de comunicación (las tuberías) deben ser simples y sin lógica compleja.",
      },
      {
        prompt:
          "¿Cómo ayuda el patrón 'Consumer-Driven Contracts' (CDC) a evitar rupturas entre microservicios?",
        answer:
          "Permite que los consumidores de una API definan sus expectativas en un contrato, que el proveedor utiliza para verificar que los cambios no romperán la integración.",
      },
      {
        prompt:
          "¿Cuál es el propósito del patrón Strangler Fig (Higuera Estranguladora)?",
        answer:
          "Permitir la migración gradual de un sistema monolítico a microservicios, reemplazando incrementalmente partes del sistema antiguo hasta que pueda ser retirado.",
      },
      {
        prompt:
          "¿Cómo funciona la estrategia de despliegue 'Shadow Deployment' (Despliegue en Sombra)?",
        answer:
          "Se duplica el tráfico de producción y se envía a una nueva versión del servicio en paralelo con la antigua, sin que la respuesta de la nueva versión afecte al usuario, para probarla bajo carga real.",
      },
      {
        prompt:
          "¿Por qué es preferible que los microservicios sean 'stateless' (sin estado)?",
        answer:
          "Porque simplifica el escalado horizontal y la resiliencia; cualquier instancia puede manejar cualquier solicitud sin depender del estado de interacciones previas.",
      },
      {
        prompt:
          "En un servicio sin estado, ¿dónde se suele almacenar el estado necesario (como los datos de sesión)?",
        answer:
          "En un almacenamiento externo, como una base de datos o una caché, o se pasa en cada solicitud (por ejemplo, a través de tokens).",
      },
      {
        prompt: "¿Qué es el patrón Circuit Breaker (Interruptor de circuito)?",
        answer:
          "Es un patrón que evita que un servicio intente llamar continuamente a un servicio que está fallando, abriendo el 'circuito' para fallar rápidamente y darle tiempo al servicio defectuoso para recuperarse.",
      },
      {
        prompt: "¿Cuáles son los tres estados de un Circuit Breaker?",
        answer: "Cerrado (Closed), Abierto (Open) y Semiabierto (Half-Open).",
      },
      {
        prompt:
          "En el patrón Circuit Breaker, el estado _____ permite que un número limitado de solicitudes de prueba pasen para verificar si el servicio se ha recuperado.",
        answer: "Semiabierto (Half-Open)",
      },
      {
        prompt: "¿Qué problema resuelve el patrón Bulkhead (Mamparo)?",
        answer:
          "Aísla los elementos de una aplicación en pools, de modo que si uno falla, los demás pueden seguir funcionando, evitando fallos en cascada.",
      },
      {
        prompt: "¿Cuándo se debe utilizar el patrón Retry (Reintento)?",
        answer:
          "Cuando una operación falla temporalmente debido a errores transitorios, como tiempos de espera de red o indisponibilidad breve del servicio.",
      },
      {
        prompt:
          "Una operación que puede reintentarse de forma segura sin causar efectos secundarios múltiples se conoce como una operación _____.",
        answer: "idempotente",
      },
      {
        prompt:
          "¿Qué es el patrón CQRS (Command Query Responsibility Segregation)?",
        answer:
          "Es un patrón que segrega las operaciones que modifican datos (comandos) de las que leen datos (consultas), utilizando a menudo modelos de datos y almacenes diferentes para cada una.",
      },
      {
        prompt: "¿Qué es el patrón Event Sourcing (Fuente de eventos)?",
        answer:
          "Es un patrón en el que el estado de una entidad de negocio se almacena como una secuencia de eventos ordenados en el tiempo, en lugar de solo el estado actual.",
      },
      {
        prompt:
          "¿Cómo se obtiene el estado actual de una entidad en el patrón Event Sourcing?",
        answer:
          "Se obtiene reproduciendo ('replaying') toda la secuencia de eventos que han afectado a esa entidad desde su creación.",
      },
      {
        prompt: "¿Qué es el Sharding de Datos (Fragmentación de Datos)?",
        answer:
          "Es el proceso de dividir una base de datos en múltiples piezas más pequeñas (shards), donde cada una contiene un subconjunto de los datos, para mejorar la escalabilidad y el rendimiento.",
      },
      {
        prompt:
          "El principio de diseño de software que aboga por evitar la duplicación de lógica se conoce como _____.",
        answer: "DRY (Don't Repeat Yourself - No te repitas)",
      },
      {
        prompt:
          "El principio de diseño de software que establece que 'no vas a necesitarlo' para evitar la implementación de funcionalidades especulativas es _____.",
        answer: "YAGNI (You Aren't Gonna Need It)",
      },
      {
        prompt:
          "¿A qué se refiere el principio KISS en el desarrollo de software?",
        answer:
          "Significa 'Keep It Simple, Stupid' (Mantenlo estúpidamente simple), y aboga por evitar la complejidad innecesaria en las soluciones.",
      },
      {
        prompt:
          "¿Cuál es la primera de las 'Ocho Falacias de la Computación Distribuida'?",
        answer: "La red es fiable.",
      },
      {
        prompt:
          "¿Cuál es la segunda de las 'Ocho Falacias de la Computación Distribuida'?",
        answer: "La latencia es cero.",
      },
      {
        prompt:
          "¿Cuál es la tercera de las 'Ocho Falacias de la Computación Distribuida'?",
        answer: "El ancho de banda es infinito.",
      },
      {
        prompt:
          "¿Cuál es la cuarta de las 'Ocho Falacias de la Computación Distribuida'?",
        answer: "La red es segura.",
      },
      {
        prompt:
          "¿Cuál es la quinta de las 'Ocho Falacias de la Computación Distribuida'?",
        answer: "La topología no cambia.",
      },
      {
        prompt:
          "¿Cuál es la sexta de las 'Ocho Falacias de la Computación Distribuida'?",
        answer: "Hay un solo administrador.",
      },
      {
        prompt:
          "¿Cuál es la séptima de las 'Ocho Falacias de la Computación Distribuida'?",
        answer: "El coste de transporte es cero.",
      },
      {
        prompt:
          "¿Cuál es la octava de las 'Ocho Falacias de la Computación Distribuida'?",
        answer: "La red es homogénea.",
      },
      {
        prompt:
          "El algoritmo de consenso _____ está diseñado para ser más comprensible que Paxos y se utiliza en sistemas como etcd (usado por Kubernetes).",
        answer: "Raft",
      },
      {
        prompt:
          "¿Cuáles son los tres subproblemas en los que Raft descompone el problema del consenso?",
        answer:
          "Elección de líder (leader election), replicación de registros (log replication) y seguridad (safety).",
      },
      {
        prompt:
          "¿Cómo resuelve Raft el problema de los 'split votes' (votos divididos) durante la elección de un líder?",
        answer:
          "Utiliza un tiempo de espera de elección aleatorio (randomized election timeout) para que los servidores no se conviertan en candidatos al mismo tiempo.",
      },
      {
        prompt:
          "En Raft, ¿quién es responsable de gestionar el registro replicado y aceptar las entradas de los clientes?",
        answer: "El líder (leader).",
      },
      {
        prompt:
          "Una entrada de registro en Raft se considera 'committed' (confirmada) una vez que el líder la ha replicado en una _____ de los servidores.",
        answer: "mayoría",
      },
      {
        prompt: "¿Qué problema resuelve el patrón Transactional Outbox?",
        answer:
          "El problema de la 'doble escritura' (dual-write), donde se necesita actualizar una base de datos y enviar un mensaje a un bróker de forma atómica.",
      },
      {
        prompt: "¿Cómo funciona el patrón Transactional Outbox?",
        answer:
          "Almacena los eventos/mensajes en una tabla 'outbox' dentro de la misma transacción de base de datos que los datos de negocio, y un proceso separado los publica posteriormente.",
      },
      {
        prompt: "La primera 'S' en los principios SOLID representa el _____.",
        answer:
          "Principio de Responsabilidad Única (Single Responsibility Principle)",
      },
      {
        prompt: "La 'O' en los principios SOLID representa el _____.",
        answer: "Principio de Abierto/Cerrado (Open/Closed Principle)",
      },
      {
        prompt: "La 'L' en los principios SOLID representa el _____.",
        answer:
          "Principio de Sustitución de Liskov (Liskov Substitution Principle)",
      },
      {
        prompt: "La 'I' en los principios SOLID representa el _____.",
        answer:
          "Principio de Segregación de la Interfaz (Interface Segregation Principle)",
      },
      {
        prompt: "La 'D' en los principios SOLID representa el _____.",
        answer:
          "Principio de Inversión de Dependencia (Dependency Inversion Principle)",
      },
      {
        prompt:
          "¿Qué es una 'máquina de estados replicada' (replicated state machine)?",
        answer:
          "Es un enfoque en sistemas distribuidos donde máquinas de estado en varios servidores calculan copias idénticas del mismo estado para lograr tolerancia a fallos.",
      },
      {
        prompt:
          "El protocolo _____ es un protocolo de compromiso atómico que coordina si todos los participantes de una transacción distribuida deben confirmar (commit) o abortar (abort).",
        answer: "de dos fases (Two-Phase Commit - 2PC)",
      },
      {
        prompt:
          "¿Cuál es la principal desventaja del protocolo de compromiso de dos fases (2PC)?",
        answer:
          "Es un protocolo bloqueante; si el coordinador falla, los participantes pueden quedar bloqueados y sin poder resolver la transacción hasta que se recupere.",
      },
      {
        prompt: "¿Qué es el patrón Materialized View (Vista Materializada)?",
        answer:
          "Es una estrategia para mejorar el rendimiento de las consultas generando vistas de datos precalculadas y almacenadas físicamente, que se actualizan periódicamente.",
      },
      {
        prompt:
          "¿Cuál es la principal contrapartida del uso de vistas materializadas?",
        answer:
          "Los datos pueden estar desactualizados (stale) hasta el próximo refresco y requieren espacio de almacenamiento adicional.",
      },
      {
        prompt:
          "El protocolo _____ se utiliza en sistemas distribuidos para la diseminación de información, detección de fallos y mantenimiento de la membresía del clúster de forma descentralizada.",
        answer: "Gossip",
      },
      {
        prompt:
          "Sistemas como Apache Cassandra, Consul y Amazon Dynamo utilizan el protocolo _____ para la detección de fallos y el seguimiento de la membresía de nodos.",
        answer: "Gossip",
      },
      {
        prompt:
          "¿Qué es la arquitectura de Cero Confianza (Zero Trust Architecture - ZTA)?",
        answer:
          "Es un marco de ciberseguridad basado en el principio de 'nunca confiar, siempre verificar', tratando cada solicitud de acceso como no confiable por defecto.",
      },
      {
        prompt:
          "El principio de _____ en la arquitectura de Cero Confianza asegura que a los usuarios y dispositivos se les concede solo el acceso mínimo necesario para sus tareas.",
        answer: "privilegio mínimo (least privilege)",
      },
      {
        prompt:
          "La _____ es una técnica clave en la Arquitectura de Cero Confianza para restringir el acceso a recursos específicos y limitar el movimiento lateral de un atacante.",
        answer: "micro-segmentación",
      },
      {
        prompt: "¿En qué se diferencia el handshake de TLS 1.3 del de TLS 1.2?",
        answer:
          "TLS 1.3 reduce el handshake a un solo viaje de ida y vuelta (1-RTT) en comparación con los dos de TLS 1.2, haciéndolo más rápido y seguro.",
      },
      {
        prompt:
          "TLS 1.3 introduce una característica de reanudación de sesión llamada _____ que permite a los clientes enviar datos cifrados inmediatamente al reconectarse a un servidor conocido.",
        answer: "0-RTT (Zero Round-Trip Time)",
      },
      {
        prompt:
          "El desarrollo guiado por pruebas (Test-Driven Development - TDD) sigue un ciclo repetitivo de tres pasos conocido como _____.",
        answer: "Rojo - Verde - Refactorizar (Red - Green - Refactor)",
      },
      {
        prompt: "En el contexto de TDD, ¿qué representa el paso 'Rojo'?",
        answer:
          "Escribir una prueba que falla porque la funcionalidad correspondiente aún no ha sido implementada.",
      },
      {
        prompt: "En el contexto de TDD, ¿qué representa el paso 'Verde'?",
        answer:
          "Escribir la cantidad mínima de código funcional necesario para que la prueba que fallaba ahora pase.",
      },
      {
        prompt:
          "En el contexto de TDD, ¿qué representa el paso 'Refactorizar'?",
        answer:
          "Mejorar la estructura del código recién escrito y del existente sin cambiar su comportamiento externo.",
      },
      {
        prompt: "¿Qué es el patrón Ambassador?",
        answer:
          "Es un patrón de contenedor que actúa como un proxy, donde todas las interacciones de un contenedor de aplicación con el mundo exterior pasan a través del contenedor embajador.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia entre el patrón Sidecar y el patrón Ambassador?",
        answer:
          "Un Sidecar mejora un contenedor principal, mientras que un Ambassador actúa como un intermediario obligatorio para la comunicación externa del contenedor principal.",
      },
      {
        prompt:
          "¿Qué es la Arquitectura Orientada a Eventos (Event-Driven Architecture - EDA)?",
        answer:
          "Es un paradigma de arquitectura de software que promueve la producción, detección, consumo y reacción a eventos de forma asíncrona.",
      },
      {
        prompt:
          "¿Qué tipo de consistencia es inevitable en sistemas distribuidos a gran escala, donde los cambios en un servicio se propagan a otros con el tiempo?",
        answer: "Consistencia eventual (Eventual Consistency).",
      },
      {
        prompt:
          "Dentro de un sistema eventualmente consistente, el _____ es un componente que debe ser siempre internamente consistente para tomar decisiones fiables.",
        answer: "agregado (aggregate)",
      },
      {
        prompt:
          "¿Qué problema puede ocurrir si se implementa el patrón de reintento sin un mecanismo de protección como un interruptor de circuito?",
        answer:
          "Puede exacerbar los fallos al aumentar la carga sobre un servicio que ya está fallando, creando una 'tormenta de reintentos'.",
      },
      {
        prompt:
          "En una arquitectura basada en eventos, ¿qué tipo de mensaje se debe usar si un servicio publicador espera que algo específico suceda en otro servicio?",
        answer:
          "Debe enviar una solicitud asíncrona como un comando (command), en lugar de simplemente publicar un evento.",
      },
      {
        prompt:
          "¿Qué es el 'Principio de Responsabilidad Única' (Single Responsibility Principle)?",
        answer:
          "Establece que una clase debe tener una, y solo una, razón para cambiar, lo que significa que debe tener una sola responsabilidad.",
      },
      {
        prompt:
          "¿Qué es el 'Principio de Abierto/Cerrado' (Open/Closed Principle)?",
        answer:
          "Establece que las entidades de software (clases, módulos, funciones, etc.) deben estar abiertas a la extensión, pero cerradas a la modificación.",
      },
      {
        prompt:
          "¿Qué es el 'Principio de Inversión de Dependencia' (Dependency Inversion Principle)?",
        answer:
          "Establece que los módulos de alto nivel no deben depender de los módulos de bajo nivel; ambos deben depender de abstracciones.",
      },
      {
        prompt: "¿Cuál es el propósito del patrón Timeout (Tiempo de espera)?",
        answer:
          "Evitar que un servicio espere indefinidamente una respuesta de otro, permitiendo que falle rápidamente para no bloquear recursos.",
      },
      {
        prompt:
          "El patrón _____ se utiliza para aislar fallos, mientras que el patrón _____ se utiliza para prevenir fallos en cascada al detener las llamadas a un servicio que falla repetidamente.",
        answer: "Bulkhead (Mamparo), Circuit Breaker (Interruptor de circuito)",
      },
      {
        prompt:
          "¿Por qué la idempotencia es una consideración importante al implementar el patrón de reintento?",
        answer:
          "Para asegurar que reintentar una operación no cause efectos secundarios no deseados, como duplicar un cargo en una transacción de pago.",
      },
      {
        prompt:
          "¿Qué es un 'aggregate' en el contexto de Domain-Driven Design (DDD)?",
        answer:
          "Es un clúster de objetos de dominio (entidades y objetos de valor) que pueden ser tratados como una sola unidad, sirviendo como un límite de consistencia transaccional.",
      },
      {
        prompt:
          "Una de las falacias de la computación distribuida es asumir que el coste de transporte es cero. ¿Qué costes reales implica?",
        answer:
          "Implica costes financieros (hardware, cloud), así como costes de recursos computacionales (CPU, memoria) para serialización y deserialización de datos.",
      },
      {
        prompt:
          "¿Cómo mitiga el patrón API Gateway la falacia de que 'la red es segura'?",
        answer:
          "Puede centralizar la aplicación de políticas de seguridad como la autenticación, autorización y limitación de velocidad (rate limiting) antes de que las solicitudes lleguen a los servicios internos.",
      },
      {
        prompt:
          "¿Qué significa el término 'atomicidad' en el contexto de las transacciones de bases de datos?",
        answer:
          "Es la propiedad que garantiza que una transacción se trata como una única unidad de trabajo, que se completa en su totalidad o no se realiza en absoluto.",
      },
      {
        prompt:
          "El patrón Transactional Outbox ayuda a lograr la atomicidad entre una escritura en la base de datos y la publicación de un evento a un ____.",
        answer: "bróker de mensajes (message broker)",
      },
      {
        prompt:
          "En el patrón Saga, la coreografía puede volverse difícil de gestionar a medida que aumenta el número de ____.",
        answer: "microservicios o participantes",
      },
      {
        prompt:
          "¿Qué desafío de diseño introduce el patrón 'Database per Service'?",
        answer:
          "La implementación de consultas que necesitan unir datos de múltiples servicios se vuelve más compleja, ya que no se pueden usar joins de base de datos directos.",
      },
      {
        prompt:
          "El patrón _____ es útil para modernizar aplicaciones heredadas, mientras que el patrón _____ es para probar nuevas versiones de servicios con tráfico de producción real sin afectar a los usuarios.",
        answer: "Strangler Fig, Shadow Deployment",
      },
      {
        prompt:
          "En el patrón Raft, si un líder se aísla por una partición de red, ¿qué sucede con el resto de los nodos?",
        answer:
          "Los nodos restantes en la partición mayoritaria detectarán la falta de heartbeats y elegirán un nuevo líder.",
      },
      {
        prompt:
          "¿Qué es el 'coste de acarreo' (cost of carry) de una característica presuntiva según el principio YAGNI?",
        answer:
          "Es la complejidad añadida al código por una característica no utilizada, que dificulta y encarece la modificación y el desarrollo de otras características.",
      },
      {
        prompt: "¿Por qué el refactoring no viola el principio YAGNI?",
        answer:
          "Porque el refactoring no añade nuevas capacidades, sino que mejora la estructura del código existente para que sea más fácil de modificar en el futuro.",
      },
      {
        prompt:
          "La comunicación entre microservicios puede ser síncrona (ej. RESTful HTTP) o asíncrona (ej. _____).",
        answer: "colas de mensajes o sistemas pub/sub",
      },
      {
        prompt:
          "¿Cuál es la función de una capa proxy en la implementación del patrón Strangler Fig?",
        answer:
          "Interceptar las solicitudes entrantes y enrutarlas ya sea al sistema monolítico antiguo o a los nuevos microservicios, según la funcionalidad migrada.",
      },
      {
        prompt:
          "El patrón _____ combina los patrones CQRS y Event Sourcing para actualizar vistas de solo lectura en respuesta a eventos.",
        answer: "Materialized View (Vista Materializada)",
      },
      {
        prompt:
          "¿Cuál es un riesgo de seguridad al no considerar la falacia 'La red es segura'?",
        answer:
          "Exponer los sistemas a ataques como man-in-the-middle, espionaje de datos (eavesdropping) o inyección de paquetes maliciosos.",
      },
      {
        prompt:
          "En el patrón de mensajería asíncrona, ¿el servicio que publica un evento espera una respuesta inmediata?",
        answer:
          "No, el servicio publica el evento y continúa con su trabajo sin esperar una respuesta, desacoplando así los servicios.",
      },
    ],
  },
  {
    id: "practices",
    name: "Practices",
    cards: [
      {
        prompt:
          "¿Cuál es el valor por defecto de la propiedad `spring.jpa.hibernate.ddl-auto` para una base de datos embebida en Spring Boot?",
        answer:
          "El valor por defecto es `create-drop`, lo que significa que el esquema se crea al inicio y se elimina al cierre.",
      },
      {
        prompt:
          "¿Cuál es el valor por defecto de la propiedad `spring.jpa.hibernate.ddl-auto` para una base de datos no embebida en Spring Boot?",
        answer:
          "El valor por defecto es `none`, lo que significa que no se realizan cambios automáticos en el esquema.",
      },
      {
        prompt:
          "¿Cómo detecta Spring Boot si una base de datos es embebida para establecer el valor por defecto de `ddl-auto`?",
        answer:
          "Lo detecta observando el tipo de `Connection`: `hsqldb`, `h2` y `derby` se consideran embebidas.",
      },
      {
        prompt:
          "Para ejecutar automáticamente migraciones de base de datos con Liquibase al iniciar una aplicación Spring Boot, ¿qué dependencia se debe agregar al classpath?",
        answer:
          "Se debe agregar la dependencia `spring-boot-starter-liquibase`.",
      },
      {
        prompt:
          'En el patrón de caché "Cache-Aside" (Lazy Loading), ¿qué componente es responsable de gestionar el caché?',
        answer:
          "La aplicación es responsable de verificar el caché primero, y si falla, consultar la base de datos y actualizar el caché.",
      },
      {
        prompt:
          'Una de las desventajas del patrón de caché "Cache-Aside" es que las solicitudes iniciales sufren una latencia más alta. ¿Por qué ocurre esto?',
        answer:
          "Ocurre debido al overhead de un fallo de caché (cache miss), que requiere una consulta a la base de datos.",
      },
      {
        prompt:
          "En el patrón de caché _____, los datos se escriben simultáneamente en el caché y en la base de datos.",
        answer: "Write-Through",
      },
      {
        prompt:
          '¿Cuál es la principal desventaja del patrón de caché "Write-Through"?',
        answer:
          "Aumenta la latencia de escritura porque deben completarse dos operaciones de escritura (caché y BD) antes de la confirmación.",
      },
      {
        prompt:
          "El patrón de caché que ofrece el mayor rendimiento de escritura, ideal para cargas de trabajo pesadas, es _____.",
        answer: "Write-Back (Write-Behind)",
      },
      {
        prompt:
          '¿Cuál es el principal riesgo asociado con el patrón de caché "Write-Back" (Write-Behind)?',
        answer:
          "El riesgo de pérdida de datos si el caché falla antes de que la actualización se haya persistido en la base de datos.",
      },
      {
        prompt:
          "¿Qué patrón arquitectónico se adopta para desacoplar la lógica de escritura intensiva de las interfaces de lectura intensiva, permitiendo una alta concurrencia?",
        answer:
          "Se adoptan los patrones CQRS (Command Query Responsibility Segregation) y Event Sourcing.",
      },
      {
        prompt:
          "¿Qué técnica de sistemas distribuidos asigna objetos de datos y nodos a una posición en una estructura de anillo virtual para minimizar el remapeo de claves cuando cambia el número de nodos?",
        answer: "El hashing consistente (Consistent Hashing).",
      },
      {
        prompt:
          "En Hibernate, ¿qué anotación se utiliza para marcar un atributo que debe ser poblado con la marca de tiempo actual de la JVM solo durante la inserción de la entidad?",
        answer: "La anotación `@CreationTimestamp`.",
      },
      {
        prompt:
          "Hibernate soporta cuatro estrategias de herencia para entidades. Nombra dos de ellas.",
        answer:
          "Single table, Joined table, Table per class, y MappedSuperclass.",
      },
      {
        prompt:
          "En la estrategia de herencia `SINGLE_TABLE` de Hibernate, ¿qué se utiliza para diferenciar entre las distintas subclases en la única tabla?",
        answer: "Se utiliza una columna discriminadora.",
      },
      {
        prompt:
          "La estrategia de herencia de Hibernate donde la herencia es visible solo en el modelo de dominio y no se refleja en el esquema de la base de datos se implementa con la anotación _____.",
        answer: "`@MappedSuperclass`",
      },
      {
        prompt:
          "¿Cuál es la principal desventaja de rendimiento de la estrategia de herencia `TABLE_PER_CLASS` en consultas polimórficas?",
        answer:
          "Requiere ejecutar una consulta `UNION` sobre todas las tablas de las subclases, lo cual puede ser ineficiente.",
      },
      {
        prompt:
          'En una asociación bidireccional `@OneToMany`, ¿qué atributo se utiliza en el lado "uno" para indicar que el otro lado es el propietario de la relación?',
        answer: "El atributo `mappedBy`.",
      },
      {
        prompt:
          "Para asegurar que al eliminar una entidad padre también se eliminen sus entidades hijas huérfanas en una colección, ¿qué atributo se debe configurar en la anotación `@OneToMany`?",
        answer: "Se debe configurar `orphanRemoval = true`.",
      },
      {
        prompt: "En JPA y Hibernate, ¿qué es el bloqueo optimista?",
        answer:
          "Es una estrategia de concurrencia que asume que los conflictos son raros y verifica si ha habido modificaciones por otra transacción antes de confirmar, usualmente mediante una columna de versión.",
      },
      {
        prompt:
          "¿Qué anotación se utiliza en un atributo de entidad para implementar el bloqueo optimista basado en versión en JPA?",
        answer: "La anotación `@Version`.",
      },
      {
        prompt:
          "¿Qué es el bloqueo pesimista en el contexto de bases de datos?",
        answer:
          "Es una estrategia donde se bloquea un recurso de datos (como una fila) cuando se lee, impidiendo que otras transacciones lo modifiquen hasta que la transacción actual lo libere.",
      },
      {
        prompt:
          "¿Para qué se utiliza la estrategia de generación de identificadores `SEQUENCE` en Hibernate?",
        answer:
          "Indica que se debe usar una secuencia de la base de datos para obtener los valores de la clave primaria.",
      },
      {
        prompt:
          "La estrategia de generación de identificadores `IDENTITY` tiene una desventaja importante en Hibernate. ¿Cuál es?",
        answer:
          "Deshabilita el procesamiento por lotes (batching) de JDBC para las sentencias `INSERT`.",
      },
      {
        prompt:
          "En HQL/JPQL, ¿qué cláusula se utiliza para cargar de forma anticipada (eagerly) una asociación junto con la entidad propietaria en una sola consulta?",
        answer: "La cláusula `JOIN FETCH`.",
      },
      {
        prompt:
          'El problema de rendimiento conocido como "N+1 query issue" ocurre comúnmente con las asociaciones de carga _____.',
        answer: "LAZY (perezosa)",
      },
      {
        prompt:
          "¿Qué interfaz de Hibernate se utiliza para implementar un tipo de dato personalizado que mapea una clase Java a una o más columnas de la base de datos?",
        answer: "La interfaz `UserType` o `CompositeUserType`.",
      },
      {
        prompt:
          "Para convertir automáticamente entre un tipo de atributo de entidad y un tipo de columna de base de datos, se puede implementar la interfaz _____ de Jakarta Persistence y usar la anotación `@Convert`.",
        answer: "`AttributeConverter`",
      },
      {
        prompt:
          "En Hibernate, ¿qué hace la anotación `@DynamicUpdate` en una entidad?",
        answer:
          "Hace que la sentencia SQL `UPDATE` generada por Hibernate incluya únicamente las columnas que han sido modificadas.",
      },
      {
        prompt:
          "¿Cuál es el propósito de la caché de segundo nivel (L2 Cache) en Hibernate?",
        answer:
          "Almacenar datos de entidades en un caché compartido por múltiples sesiones para reducir los accesos a la base de datos.",
      },
      {
        prompt:
          "Nombra una de las cuatro estrategias de concurrencia de caché de segundo nivel en Hibernate.",
        answer:
          "Las estrategias son: `READ_ONLY`, `READ_WRITE`, `NONSTRICT_READ_WRITE`, y `TRANSACTIONAL`.",
      },
      {
        prompt:
          "La estrategia de concurrencia de caché `TRANSACTIONAL` en Hibernate proporciona un nivel de aislamiento de transacción _____.",
        answer: "Serializable",
      },
      {
        prompt:
          "¿Para qué se utiliza la caché de consultas (Query Cache) en Hibernate?",
        answer:
          "Almacena los resultados de las consultas, incluyendo los identificadores de las entidades, para que ejecuciones posteriores de la misma consulta con los mismos parámetros puedan servirse desde el caché.",
      },
      {
        prompt:
          "En una aplicación de microservicios, el patrón _____ consiste en persistir el estado de un agregado como una secuencia de eventos inmutables.",
        answer: "Event Sourcing",
      },
      {
        prompt:
          "Según el teorema CAP, un sistema distribuido solo puede garantizar dos de las siguientes tres propiedades en presencia de una partición de red: consistencia, disponibilidad y _____.",
        answer: "Tolerancia a particiones (Partition Tolerance)",
      },
      {
        prompt:
          "El teorema PACELC extiende el teorema CAP. ¿Qué elección describe para el caso en que no hay partición de red (la 'E' de 'Else')?",
        answer: "Describe la elección entre Latencia (L) y Consistencia (C).",
      },
      {
        prompt:
          "El modelo de consistencia _____ garantiza que si no se realizan nuevas actualizaciones, todas las réplicas de un dato convergerán eventualmente al mismo valor.",
        answer: "Eventual (Eventual Consistency)",
      },
      {
        prompt:
          "¿Qué tipo de middleware, como PgBouncer o ProxySQL, se utiliza para gestionar las conexiones a la base de datos, optimizar consultas y proteger los servidores backend de la sobrecarga?",
        answer: "Un proxy de base de datos (database proxy).",
      },
      {
        prompt:
          "En el contexto de la agrupación de conexiones de PostgreSQL con PgBouncer, ¿qué es el modo de agrupación por transacción (transaction pooling)?",
        answer:
          "Un modo en el que una conexión al servidor de base de datos se devuelve al pool solo cuando el cliente completa una transacción (commit o rollback).",
      },
      {
        prompt: "Término: Sharding (Fragmentación)",
        answer:
          "Definición: Es una técnica de particionamiento horizontal de la base de datos que distribuye las filas de una tabla grande en múltiples servidores o bases de datos.",
      },
      {
        prompt:
          "En Hibernate, ¿cuál es el propósito de la anotación `@NaturalId`?",
        answer:
          "Marca un atributo o un conjunto de atributos como un identificador de negocio único y mutable, permitiendo una carga de entidades más eficiente por este identificador.",
      },
      {
        prompt: "¿Qué hace el método `entityManager.flush()` en JPA?",
        answer:
          "Sincroniza el contexto de persistencia con la base de datos subyacente, ejecutando las sentencias SQL para las operaciones encoladas (INSERT, UPDATE, DELETE).",
      },
      {
        prompt:
          "Un objeto entidad en JPA/Hibernate puede estar en uno de tres estados: nuevo/transitorio, persistente y _____.",
        answer: "Separado (detached)",
      },
      {
        prompt:
          "¿Qué método de JPA se utiliza para re-asociar una entidad en estado separado (detached) con el contexto de persistencia actual?",
        answer: "El método `merge()`.",
      },
      {
        prompt: "En HQL, la función `treat()` se utiliza para _____.",
        answer:
          "Reducir (downcast) el tipo de una variable de identificación en una jerarquía de herencia para acceder a los atributos de una subclase específica.",
      },
      {
        prompt:
          "¿Cuál es la diferencia fundamental en el modelo de datos entre MongoDB y Oracle?",
        answer:
          "MongoDB utiliza un modelo de documentos flexible (BSON/JSON) sin esquema, mientras que Oracle utiliza un modelo relacional rígido basado en tablas con esquemas fijos.",
      },
      {
        prompt:
          "En Hibernate Envers, ¿qué estrategia de auditoría almacena una revisión de inicio y una de fin para cada registro de auditoría, mejorando el rendimiento de las consultas?",
        answer: "La estrategia `ValidityAuditStrategy`.",
      },
      {
        prompt:
          "Para realizar operaciones de actualización o eliminación masivas en HQL o JPQL, ¿qué método de la interfaz `Query` se debe invocar?",
        answer: "El método `executeUpdate()`.",
      },
      {
        prompt:
          "En Hibernate, ¿qué hace la anotación `@OrderBy` cuando se aplica a una colección?",
        answer:
          "Especifica una cláusula `ORDER BY` de SQL para ordenar los elementos de la colección cuando se carga desde la base de datos.",
      },
      {
        prompt:
          "La anotación `@OrderColumn` en una colección de tipo `List` en Hibernate se utiliza para _____.",
        answer:
          "Persistir el índice de la lista en una columna dedicada de la base de datos, manteniendo el orden de la colección.",
      },
      {
        prompt:
          "Para manejar una asociación donde la clave foránea podría apuntar a un registro inexistente sin lanzar una excepción, Hibernate provee la anotación _____.",
        answer: "`@NotFound`",
      },
      {
        prompt:
          "Cuando se usa `@NotFound(action = NotFoundAction.IGNORE)` en una asociación `@ManyToOne`, ¿cómo trata Hibernate una clave foránea rota?",
        answer:
          "Trata la asociación como `null` en lugar de lanzar una excepción `FetchNotFoundException`.",
      },
      {
        prompt:
          "En Hibernate, ¿para qué se utiliza la anotación `@SQLRestriction` en una entidad o colección?",
        answer:
          "Para añadir una cláusula `WHERE` de SQL permanente a todas las consultas de carga para esa entidad o colección, útil para implementaciones de borrado lógico (soft delete).",
      },
      {
        prompt: "¿Qué es un `Embeddable` (o Componente) en JPA/Hibernate?",
        answer:
          "Es una clase cuyos atributos se mapean a columnas de la tabla de la entidad propietaria, permitiendo agrupar y reutilizar un conjunto de propiedades.",
      },
      {
        prompt:
          "Para mapear una clase `Embeddable` dentro de una entidad, se utiliza la anotación _____ en el atributo de la entidad.",
        answer: "`@Embedded`",
      },
      {
        prompt:
          "Si una entidad contiene múltiples instancias del mismo tipo `Embeddable`, ¿cómo se pueden anular los nombres de las columnas para evitar colisiones?",
        answer:
          "Se utiliza la anotación `@AttributeOverride` (o `@AttributeOverrides`) en cada atributo `@Embedded`.",
      },
      {
        prompt:
          "En HQL/JPQL, la función `type(p)` se utiliza en una consulta polimórfica para _____.",
        answer:
          "Restringir los resultados a entidades de un tipo específico dentro de una jerarquía de herencia.",
      },
      {
        prompt:
          "En el contexto multitenant de Hibernate, ¿qué anotación se utiliza en un campo de una entidad para indicar que almacenará el identificador del tenant?",
        answer: "La anotación `@TenantId`.",
      },
      {
        prompt:
          "Hibernate ofrece la capacidad de generar el metamodelo estático de JPA para su uso en Criteria API de tipo seguro. ¿Qué artefacto de Maven proporciona el procesador de anotaciones para esto?",
        answer: "El artefacto `org.hibernate.orm:hibernate-processor`.",
      },
      {
        prompt:
          "¿Qué optimizador de generador de secuencias de Hibernate es altamente recomendado para reducir los viajes de ida y vuelta a la base de datos al insertar múltiples entidades?",
        answer: "Los optimizadores `pooled` y `pooled-lo`.",
      },
      {
        prompt:
          "Al ejecutar una consulta nativa en JPA, ¿qué se debe hacer si la consulta devuelve columnas que no se mapean directamente a los campos de la entidad?",
        answer:
          "Se debe usar un `@SqlResultSetMapping` para definir cómo mapear las columnas del resultado a entidades o DTOs.",
      },
      {
        prompt:
          "¿Qué hace la propiedad de configuración de Hibernate `hibernate.format_sql` cuando se establece en `true`?",
        answer:
          "Formatea e indenta el SQL que se registra en la consola, haciéndolo más legible.",
      },
      {
        prompt:
          "La anotación `@Subselect` de Hibernate permite mapear una entidad a una consulta SQL inmutable, convirtiéndola en una entidad de solo _____.",
        answer: "Lectura (read-only)",
      },
      {
        prompt: "En Hibernate, ¿qué representa la interfaz `Session`?",
        answer:
          "Representa la interfaz principal para la interacción con la base de datos, gestionando el ciclo de vida de las entidades y las transacciones.",
      },
      {
        prompt:
          "La interfaz `EntityManager` de JPA es una abstracción estándar, mientras que la interfaz `Session` es la API nativa de _____.",
        answer: "Hibernate",
      },
      {
        prompt:
          "¿Cómo se puede obtener la `Session` nativa de Hibernate a partir de una instancia de `EntityManager` de JPA?",
        answer: "Usando el método `entityManager.unwrap(Session.class)`.",
      },
      {
        prompt:
          "En una asociación `@ManyToMany`, Hibernate por defecto crea una tabla de unión. ¿Qué anotación se utiliza para personalizar el nombre de esta tabla y sus columnas de clave foránea?",
        answer: "La anotación `@JoinTable`.",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre `CascadeType.PERSIST` y `CascadeType.MERGE`?",
        answer:
          "`PERSIST` propaga la operación de persistir a las entidades asociadas, mientras que `MERGE` propaga la operación de fusionar estados separados (detached).",
      },
      {
        prompt:
          'En el contexto de Oracle RAC, ¿qué significa la arquitectura "shared-everything"?',
        answer:
          "Significa que todos los nodos del clúster acceden al mismo conjunto de archivos de base de datos almacenados en un almacenamiento compartido.",
      },
      {
        prompt:
          "Para mejorar el rendimiento al procesar grandes conjuntos de resultados en Hibernate sin agotar la memoria, se puede usar `Session.scroll()` que aprovecha los _____ del lado del servidor.",
        answer: "Cursores (server-side cursors)",
      },
      {
        prompt:
          "En el contexto de colecciones en Hibernate, ¿qué semántica de colección se considera ineficiente para operaciones de actualización y eliminación, pudiendo llevar a eliminar y reinsertar todos los elementos?",
        answer:
          "La semántica de bolsa (bag), típicamente implementada con `java.util.List` sin un `@OrderColumn`.",
      },
      {
        prompt:
          "La anotación de Hibernate `@Immutable` en un atributo de entidad indica que _____.",
        answer:
          "Cualquier cambio en el valor de ese atributo será ignorado durante la detección de cambios (dirty checking) y no se persistirá.",
      },
      {
        prompt: "En Hibernate, ¿cuál es el propósito de un `Interceptor`?",
        answer:
          "Permite a la aplicación inspeccionar y/o manipular las propiedades de una entidad antes de que sea guardada, actualizada, eliminada o cargada.",
      },
      {
        prompt:
          "Para implementar un identificador compuesto en una entidad JPA, se puede usar la anotación `@EmbeddedId` o la anotación _____ junto con una clase de clave primaria.",
        answer: "`@IdClass`",
      },
      {
        prompt:
          "La propiedad de configuración `hibernate.jdbc.batch_size` controla el número máximo de sentencias que Hibernate agrupará antes de ejecutar el lote. ¿Qué valor la deshabilita?",
        answer: "Un valor de cero o un número negativo.",
      },
      {
        prompt: "En JPQL/HQL, ¿cómo se puede paginar un resultado de consulta?",
        answer:
          "Usando los métodos `setFirstResult()` para el desplazamiento y `setMaxResults()` para el límite de registros a devolver.",
      },
      {
        prompt:
          "La anotación `@ColumnDefault` en un atributo de entidad permite a Hibernate _____.",
        answer:
          "Generar la cláusula `DEFAULT` en la definición DDL de la columna, pero no afecta las sentencias `INSERT` a menos que se use `@DynamicInsert`.",
      },
      {
        prompt:
          "Para generar un valor en la base de datos tanto en inserciones como en actualizaciones (ej. una columna `last_modified`), ¿qué anotación de Hibernate es más apropiada que `@ColumnDefault`?",
        answer:
          "La anotación `@Generated` (o las más específicas `@UpdateTimestamp`).",
      },
      {
        prompt:
          '¿Qué es una "conversación" en el contexto de los patrones transaccionales de Hibernate?',
        answer:
          "Es una transacción a nivel de aplicación que abarca múltiples solicitudes de usuario y transacciones de base de datos, manteniendo el estado entre ellas.",
      },
      {
        prompt:
          "¿Qué opción de `OptimisticLockType` en Hibernate reduce el riesgo de excepciones de bloqueo al incluir solo las columnas modificadas en la cláusula `WHERE` del `UPDATE`?",
        answer: "La opción `OptimisticLockType.DIRTY`.",
      },
      {
        prompt:
          "En una consulta de Criterios (Criteria Query) de JPA, ¿qué representa el objeto `Root<T>`?",
        answer:
          "Representa una entidad raíz en la cláusula `FROM`, desde la cual se navega para acceder a los atributos de la entidad.",
      },
      {
        prompt:
          "En Hibernate, el modo de flush `AUTO` (por defecto) activa un flush antes de la ejecución de una consulta. ¿Por qué es esto necesario?",
        answer:
          "Para asegurar que la consulta opere sobre los datos más actuales, incluyendo los cambios pendientes en el contexto de persistencia.",
      },
      {
        prompt:
          '¿Qué es la "mejora de bytecode" (bytecode enhancement) en Hibernate?',
        answer:
          "Es un proceso en tiempo de compilación o carga que modifica el bytecode de las clases de entidad para implementar características como la carga perezosa de atributos básicos y el seguimiento de cambios eficiente (dirty tracking).",
      },
      {
        prompt:
          "La anotación `@Nationalized` en un atributo `String` indica a Hibernate que debe mapearlo a un tipo de columna de base de datos que soporte juegos de caracteres nacionalizados, como _____.",
        answer: "`NVARCHAR` o `NCLOB`",
      },
      {
        prompt:
          "¿Qué estrategia de `FetchMode` en Hibernate puede causar un producto cartesiano si se usa en múltiples asociaciones de tipo colección en una sola consulta?",
        answer: "La estrategia `FetchMode.JOIN`.",
      },
      {
        prompt:
          "La estrategia `FetchMode.SUBSELECT` en Hibernate es útil para evitar el problema N+1 en colecciones cargadas de forma perezosa. ¿Cómo funciona?",
        answer:
          "Ejecuta una segunda consulta SQL usando un `SUBSELECT` para recuperar todas las colecciones asociadas para todas las entidades cargadas en la consulta original.",
      },
      {
        prompt: "¿Qué representa un `EntityGraph` en JPA?",
        answer:
          "Define una plantilla para buscar un grafo de objetos, especificando qué asociaciones y atributos básicos deben ser cargados de forma anticipada (eager).",
      },
      {
        prompt:
          "Al usar un `EntityGraph`, ¿cuál es la diferencia entre un `fetch graph` y un `load graph`?",
        answer:
          "Un `fetch graph` trata los atributos especificados como EAGER y el resto como LAZY, mientras que un `load graph` trata los especificados como EAGER y el resto mantiene su configuración de carga estática.",
      },
      {
        prompt: "En HQL, ¿qué hace la función `coalesce(arg1, arg2, ...)`?",
        answer:
          "Devuelve el primer argumento que no es nulo de la lista de argumentos proporcionada.",
      },
      {
        prompt:
          'El concepto de "Polyglot Architecture" (Arquitectura Políglota) se refiere a la idea de construir sistemas utilizando múltiples _____ para elegir la mejor herramienta para cada tarea específica.',
        answer:
          "Tecnologías (incluyendo lenguajes de programación, bases de datos, etc.)",
      },
      {
        prompt: "En Hibernate, ¿qué son los `Dialect`?",
        answer:
          "Son clases que representan la variante específica de SQL de una base de datos, permitiendo a Hibernate generar SQL optimizado y compatible para ese motor.",
      },
      {
        prompt:
          "La anotación `@ManyToAny` de Hibernate se utiliza para emular una asociación de tipo _____ cuando las entidades objetivo pueden ser de múltiples tipos diferentes.",
        answer: "`@OneToMany`",
      },
      {
        prompt:
          "¿Qué tipo de excepción de JDBC indica una violación de alguna forma de restricción de integridad de la base de datos?",
        answer: "La excepción `ConstraintViolationException`.",
      },
      {
        prompt:
          "En Hibernate, ¿qué es un `DetachedCriteria` (ahora obsoleto) o una `SelectionSpecification`?",
        answer:
          "Es una forma de construir una consulta de manera programática y ejecutarla en una `Session` diferente de donde fue creada.",
      },
      {
        prompt:
          "La anotación `@Filter` de Hibernate permite definir cláusulas de filtro dinámicas que pueden ser habilitadas o deshabilitadas por sesión. ¿Cuál es su principal ventaja sobre `@SQLRestriction`?",
        answer:
          "Su principal ventaja es que los criterios de filtrado pueden ser parametrizados y personalizados en tiempo de ejecución.",
      },
      {
        prompt:
          "No es posible combinar la anotación de colección `@Filter` con la anotación `@Cache`. ¿Por qué existe esta limitación?",
        answer:
          "Porque la caché de segundo nivel almacena colecciones completas, y si se almacenara una colección filtrada (un subconjunto), otras sesiones la obtendrían incorrectamente sin el filtro activado.",
      },
      {
        prompt:
          "Para especificar que una consulta HQL/JPQL debe usar un tiempo de espera, se puede usar la sugerencia (hint) estándar de JPA _____.",
        answer: "`jakarta.persistence.query.timeout`",
      },
      {
        prompt:
          "En HQL, ¿qué operador se utiliza para verificar si un valor es igual a otro, tratando los valores nulos como iguales entre sí?",
        answer: "El operador `is not distinct from`.",
      },
      {
        prompt:
          "La anotación `@SoftDelete` de Hibernate simplifica la implementación del borrado lógico. ¿Qué hace internamente?",
        answer:
          "Combina una columna indicadora de borrado con una anotación `@SQLRestriction` para filtrar los registros marcados como eliminados.",
      },
      {
        prompt: "¿Qué es la arquitectura Oracle RAC?",
        answer:
          "Es una arquitectura de base de datos en clúster que permite que múltiples servidores accedan a una única base de datos compartida, proporcionando alta disponibilidad y escalabilidad.",
      },
      {
        prompt:
          "En Hibernate, la anotación `@Formula` permite definir un atributo de entidad de solo lectura cuyo valor se calcula mediante una expresión SQL. ¿Cuándo se evalúa esta expresión?",
        answer:
          "La expresión se evalúa cada vez que la entidad es recuperada de la base de datos.",
      },
      {
        prompt:
          "Para persistir colecciones de tipos básicos o embeddables, se utiliza la anotación _____.",
        answer: "`@ElementCollection`",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre `Query#getResultList()` y `Query#getSingleResult()` en JPA?",
        answer:
          "`getResultList()` devuelve una lista de resultados (posiblemente vacía), mientras que `getSingleResult()` espera exactamente un resultado y lanza una excepción si no hay ninguno o hay más de uno.",
      },
      {
        prompt:
          "En Hibernate, ¿para qué se utiliza la clase `Configuration` en el bootstrapping nativo (legacy)?",
        answer:
          "Se utilizaba para especificar las clases de entidad, los archivos de mapeo XML y las propiedades de configuración para construir un `SessionFactory`.",
      },
      {
        prompt: "¿Qué es una Consulta de Criterios (Criteria Query) en JPA?",
        answer:
          "Es una API programática y de tipo seguro para construir consultas de forma dinámica, como alternativa a escribir cadenas de texto JPQL.",
      },
      {
        prompt:
          "El modelo de consistencia _____ es el más fuerte, garantizando que cada operación de lectura devuelva el valor de la escritura más reciente.",
        answer: "Fuerte (Strong Consistency)",
      },
      {
        prompt: "En HQL, la cláusula `WITH` se utiliza para definir _____.",
        answer:
          "Expresiones de Tabla Comunes (Common Table Expressions o CTEs), que pueden ser recursivas.",
      },
    ],
  },
  {
    id: "rabbitmq",
    name: "Rabbitmq",
    cards: [
      {
        prompt:
          "¿Cuál es la abstracción arquitectónica central de Apache Kafka?",
        answer:
          "Un registro de confirmaciones (commit log) replicado y tolerante a fallos.",
      },
      {
        prompt:
          "¿Qué protocolo está diseñado para implementar RabbitMQ, proporcionando un enrutamiento de mensajes flexible y sofisticado?",
        answer: "El Protocolo Avanzado de Puesta en Cola de Mensajes (AMQP).",
      },
      {
        prompt: "¿Para qué tipo de entornos fue concebido principalmente NATS?",
        answer:
          "Entornos de computación nativos de la nube y de borde (edge computing) que demandan alta velocidad y simplicidad operativa.",
      },
      {
        prompt:
          'En la comparación entre Kafka, RabbitMQ y NATS, ¿cuál es descrito como una "plataforma de streaming distribuida"?',
        answer: "Apache Kafka.",
      },
      {
        prompt:
          "RabbitMQ opera como un intermediario inteligente, mientras que Kafka sigue un paradigma de _____, donde el consumidor es el inteligente.",
        answer: "intermediario tonto (dumb broker)",
      },
      {
        prompt:
          "A diferencia de Kafka que siempre es una plataforma de streaming duradera, NATS puede actuar como un bus de mensajes de latencia ultrabaja para comunicación _____ y como una plataforma de streaming duradera.",
        answer: "transitoria",
      },
      {
        prompt:
          "¿Cómo logra el entorno de ejecución de Erlang en RabbitMQ distribuir el trabajo entre todos los núcleos de CPU disponibles sin configuración manual?",
        answer:
          "Siempre que el número de colas, conexiones y canales exceda el número de núcleos.",
      },
      {
        prompt:
          'Término: Arquitectura de "nada compartido" (Shared-nothing) en Erlang.',
        answer:
          "Definición: Un modelo de procesos ligeros aislados que mejora la tolerancia a fallos, conteniendo el fallo de una conexión individual.",
      },
      {
        prompt:
          '¿Qué tipo de recolección de basura utiliza Erlang para minimizar las pausas globales de "detener el mundo" (stop-the-world) en RabbitMQ?',
        answer: "Recolección de basura por proceso.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia a nivel de protocolo entre AMQP 0-9-1 y AMQP 1.0?",
        answer:
          "AMQP 0-9-1 es un protocolo a nivel de aplicación que prescribe el comportamiento del bróker, mientras que AMQP 1.0 es un protocolo a nivel de transporte con menos requisitos semánticos.",
      },
      {
        prompt:
          "¿Cuántos procesos de Erlang requería el plugin de AMQP 1.0 en RabbitMQ 3.13 por sesión, en comparación con la implementación nativa en la versión 4.0?",
        answer:
          "Aproximadamente 15 procesos en la versión 3.13, reducido a un solo proceso en la versión 4.0.",
      },
      {
        prompt:
          "¿Qué mecanismo de control de flujo utiliza AMQP 0-9-1, que opera a nivel de canal?",
        answer: "El mecanismo de prefetch `basic.qos`.",
      },
      {
        prompt:
          "En AMQP 1.0, el control de flujo se implementa a nivel de enlace (link-level) a través de un sistema basado en _____, donde el receptor concede permiso al emisor para enviar mensajes.",
        answer: "créditos",
      },
      {
        prompt:
          "¿Qué tipo de exchange especializado en RabbitMQ utiliza un hash de la clave de enrutamiento para seleccionar exactamente una cola, asegurando el ordenamiento causal?",
        answer: "El Exchange de Hash Consistente (Consistent Hash Exchange).",
      },
      {
        prompt:
          "¿Qué sistema de almacenamiento de metadatos reemplazó a Mnesia en la serie RabbitMQ 4.x?",
        answer: "Khepri.",
      },
      {
        prompt:
          "¿Cuál era la principal debilidad de Mnesia como almacén de metadatos en RabbitMQ que llevaba a escenarios de cerebro dividido (split-brain)?",
        answer:
          "Su recuperación de fallos durante particiones de red, que asumía que se podían descartar datos de un lado de la partición.",
      },
      {
        prompt:
          "En entornos de contenedores como Kubernetes, ¿por qué se desaconseja usar un umbral de memoria relativo (`vm_memory_high_watermark`) para RabbitMQ?",
        answer: "Porque la detección de memoria puede ser poco fiable.",
      },
      {
        prompt:
          "¿Cuál es la práctica común para configurar el `disk_free_limit` en RabbitMQ en relación con la RAM total?",
        answer:
          "Establecerlo en 2.0 veces la RAM total para asegurar que el bróker pueda volcar toda su memoria a disco.",
      },
      {
        prompt:
          "En el modelo de datos de RabbitMQ, los mensajes son _____ (se eliminan después del consumo), mientras que en Kafka, el consumo es no destructivo a través del seguimiento de desplazamientos (offsets).",
        answer: "destructivos",
      },
      {
        prompt:
          "Tanto RabbitMQ 4.x (con Quorum Queues/Khepri) como Apache Kafka (con KRaft) utilizan _____ como su protocolo de alta disponibilidad (HA) para el consenso.",
        answer: "Raft",
      },
      {
        prompt:
          "¿Qué información, además de los metadatos, no se replica por defecto en todos los nodos de un clúster de RabbitMQ?",
        answer:
          "Las colas de mensajes, que residen en un solo nodo por defecto.",
      },
      {
        prompt:
          "¿Qué deben compartir dos nodos de RabbitMQ para poder comunicarse y formar un clúster?",
        answer: "El mismo secreto compartido llamado la cookie de Erlang.",
      },
      {
        prompt:
          "¿Qué permisos de archivo (en notación UNIX) debe tener el archivo de la cookie de Erlang por seguridad?",
        answer:
          "Debe ser accesible solo por el propietario (por ejemplo, permisos `600`).",
      },
      {
        prompt:
          "Cuando una herramienta CLI como `rabbitmqctl` falla la autenticación, una de las sugerencias comunes es un desajuste en el nombre de host o que la _____ no está configurada correctamente.",
        answer: "cookie",
      },
      {
        prompt:
          "¿Por qué se recomienda encarecidamente un número impar de nodos en un clúster de RabbitMQ?",
        answer:
          "Porque características como las colas de quórum requieren un consenso entre los miembros del clúster, lo cual necesita una mayoría clara.",
      },
      {
        prompt:
          "Durante un reinicio progresivo de un clúster, ¿qué comando de `rabbitmq-diagnostics` es adecuado como sondeo de salud porque no espera que un nodo esté completamente arrancado y sincronizado?",
        answer: "El comando `rabbitmq-diagnostics ping`.",
      },
      {
        prompt:
          "El plugin de _____ permite transmitir mensajes entre brókeres de RabbitMQ que pueden estar en diferentes dominios administrativos, versiones o centros de datos.",
        answer: "Federation",
      },
      {
        prompt:
          "¿Qué característica clave del plugin de Federation lo hace adecuado para redes de área amplia (WAN)?",
        answer:
          "Su comunicación es totalmente asíncrona y tolera bien la conectividad intermitente.",
      },
      {
        prompt:
          "Para configurar Federation en RabbitMQ, primero se deben definir uno o más _____ y luego se deben declarar una o más políticas que coincidan con los exchanges o colas a federar.",
        answer: "upstreams",
      },
      {
        prompt:
          "El modelo de entrega de mensajes de RabbitMQ es `push-based`, donde los mensajes se entregan a los consumidores a medida que están disponibles, a diferencia del modelo `pull-based` de Kafka. Verdadero o Falso?",
        answer: "Verdadero.",
      },
      {
        prompt:
          "En una comparación de rendimiento, Kafka generalmente ofrece mayor _____, mientras que RabbitMQ tiene menor _____ para mensajes individuales.",
        answer: "rendimiento (throughput) / latencia (latency)",
      },
      {
        prompt:
          "¿Qué característica de la UI de gestión de RabbitMQ permite exportar toda la configuración de tiempo de ejecución y topología (pero no los mensajes)?",
        answer: "La función de exportación/importación de topología.",
      },
      {
        prompt:
          "¿Qué componente de Prometheus está diseñado para escenarios donde el modelo de extracción (pull) no es factible, como en trabajos por lotes de corta duración?",
        answer: "El Pushgateway.",
      },
      {
        prompt: "Métrica de Canal RabbitMQ: `Unacknowledged message count`",
        answer:
          "Definición: El número de mensajes en tránsito, que ya han sido entregados a la aplicación consumidora pero aún no han sido confirmados (acknowledged).",
      },
      {
        prompt: "Métrica de Canal RabbitMQ: `Consumer prefetch`",
        answer:
          "Definición: El número máximo de mensajes en tránsito (no confirmados) para cada suscripción de consumidor.",
      },
      {
        prompt: "Métrica de Cola RabbitMQ: `Queue length`",
        answer:
          "Definición: El número total de mensajes en la cola, incluidos los mensajes no confirmados (unacknowledged).",
      },
      {
        prompt:
          "¿Qué archivo se genera cuando RabbitMQ se bloquea (crashea) y es crucial para la investigación post-mortem?",
        answer: "El archivo de volcado de memoria `erl_crash.dump`.",
      },
      {
        prompt:
          "¿Qué acción protectora toma RabbitMQ cuando su uso de memoria alcanza la `memory watermark`?",
        answer:
          "Activa una alarma de memoria, lo que bloquea a los publicadores y detiene el flujo de mensajes en el clúster.",
      },
      {
        prompt:
          "El valor por defecto de `vm_memory_high_watermark` en versiones antiguas de RabbitMQ era 0.4 (40%). ¿Por qué se consideró aumentarlo en la versión 4.0?",
        answer:
          "Porque el valor de 0.4 se consideraba demasiado conservador y un desperdicio de los recursos del sistema con las mejoras en Erlang y RabbitMQ.",
      },
      {
        prompt:
          "La arquitectura moderna de RabbitMQ aprovecha las colas de quórum con consenso _____ para una mayor fiabilidad.",
        answer: "Raft",
      },
      {
        prompt:
          "¿Qué dos elementos se replican automáticamente en todos los nodos de un clúster de RabbitMQ?",
        answer: "Hosts virtuales, exchanges, usuarios y permisos.",
      },
      {
        prompt: "¿Cuál es el propósito de un `Erlang cookie` en RabbitMQ?",
        answer:
          "Autenticar la comunicación entre los nodos del clúster y entre los nodos y las herramientas de línea de comandos (CLI).",
      },
      {
        prompt:
          "¿Qué comando de `rabbitmqctl` se utiliza para otorgar permisos a un usuario en un host virtual específico?",
        answer: "El comando `set_permissions`.",
      },
      {
        prompt:
          "Si un consumidor recibe un mensaje pero se desconecta antes de confirmarlo (acknowledging), ¿qué hará RabbitMQ con ese mensaje?",
        answer:
          "Lo considerará no entregado y lo volverá a entregar al siguiente consumidor suscrito disponible.",
      },
      {
        prompt:
          "Para que un mensaje sea persistente y sobreviva a un reinicio del bróker en RabbitMQ, ¿qué tres condiciones deben cumplirse?",
        answer:
          "Debe tener su modo de entrega establecido en 2 (persistente), ser publicado en un exchange duradero y llegar a una cola duradera.",
      },
      {
        prompt:
          "¿Qué significa poner un canal de RabbitMQ en modo de confirmación (confirm mode)?",
        answer:
          "Significa que el bróker confirmará la recepción de los mensajes publicados en ese canal, permitiendo al publicador verificar la entrega.",
      },
      {
        prompt:
          "Un nodo de RabbitMQ que almacena todos los metadatos (colas, exchanges, etc.) solo en RAM se llama un nodo _____, mientras que uno que también los guarda en disco se llama un nodo _____.",
        answer: "RAM / disco",
      },
      {
        prompt:
          "¿En qué escenario de uso es particularmente beneficioso usar nodos RAM en un clúster de RabbitMQ?",
        answer:
          "En escenarios con un uso intensivo de RPC, donde se crean y destruyen cientos de colas de respuesta por segundo.",
      },
      {
        prompt:
          "¿Qué argumento de declaración de cola se utiliza para crear una cola reflejada (mirrored queue) en todas las nodos del clúster?",
        answer: "El argumento `x-ha-policy` con el valor `all`.",
      },
      {
        prompt:
          "¿Qué herramienta se puede utilizar como balanceador de carga para distribuir conexiones de clientes entre los nodos de un clúster de RabbitMQ?",
        answer: "HAProxy.",
      },
      {
        prompt:
          "¿Qué componente del runtime de Erlang es responsable de resolver los nombres de los nodos en un host a un puerto de comunicación entre nodos?",
        answer: "epmd (Erlang Port Mapper Daemon).",
      },
      {
        prompt:
          "Por defecto, el runtime de Erlang iniciará un _____ por cada núcleo de CPU que detecte para asignar trabajo a los hilos del kernel.",
        answer: "planificador (scheduler)",
      },
      {
        prompt:
          "¿Qué significa el término `poison pill` en el contexto de las colas de mensajes?",
        answer:
          "Un mensaje que causa que un consumidor se bloquee o falle repetidamente, impidiendo el procesamiento de mensajes posteriores en la cola.",
      },
      {
        prompt:
          "En el control de flujo de AMQP 1.0, el campo _____ en la trama de flujo (flow frame) informa al consumidor cuántos mensajes están disponibles en la cola.",
        answer: "available",
      },
      {
        prompt:
          "Dentro de una conexión AMQP 1.0, un cliente puede iniciar múltiples _____, que son análogas a los canales en AMQP 0.9.1.",
        answer: "sesiones (sessions)",
      },
      {
        prompt:
          "¿Cuál es la principal filosofía arquitectónica de RabbitMQ en contraste con Kafka?",
        answer:
          "RabbitMQ es un bróker de mensajes versátil para distribución fiable de tareas y enrutamiento complejo, mientras que Kafka es un registro distribuido para streaming de datos masivos.",
      },
      {
        prompt:
          "¿Qué modo de consumo utilizan las `streams` de RabbitMQ que las diferencia de las colas tradicionales?",
        answer:
          "Permiten un consumo repetible (lecturas repetibles), similar al modelo de Kafka.",
      },
      {
        prompt:
          "Para filtrar mensajes en un `stream` de RabbitMQ del lado del servidor, se puede utilizar un filtro _____, mientras que del lado del cliente se puede aplicar un _____.",
        answer: "Bloom / post-filtro (postFilter)",
      },
      {
        prompt:
          "En las expresiones de filtro AMQP para streams de RabbitMQ, los campos no cualificados por defecto se refieren a las _____.",
        answer: "propiedades de la aplicación (application properties)",
      },
      {
        prompt:
          "¿Qué tres operadores lógicos son totalmente compatibles con las expresiones de filtro AMQP de RabbitMQ?",
        answer: "AND, OR, y NOT.",
      },
      {
        prompt:
          "¿Qué tipo de predicado lógico, que utiliza los comodines '%' y '_', es compatible con los filtros de stream de RabbitMQ?",
        answer: "El predicado `LIKE`.",
      },
      {
        prompt:
          "¿Qué efecto tiene configurar `+MMscs 1024` como argumento de la VM de Erlang para RabbitMQ?",
        answer:
          "Pre-asigna un bloque contiguo de memoria de 1 GiB al iniciar el nodo para reducir la fragmentación y la latencia de asignación.",
      },
      {
        prompt:
          "El límite por defecto del número de procesos de Erlang en un nodo RabbitMQ es de aproximadamente 1 millón. ¿Mediante qué variable de entorno se puede ajustar este límite?",
        answer: "`RABBITMQ_MAX_NUMBER_OF_PROCESSES`.",
      },
      {
        prompt:
          "En la salida de herramientas como `top`, ¿cómo se contabilizará típicamente el tiempo que los planificadores de Erlang pasan en espera activa (busy waiting)?",
        answer: "Como tiempo del sistema (system time).",
      },
      {
        prompt:
          "¿Qué es un `split-brain` en el contexto de sistemas distribuidos como RabbitMQ?",
        answer:
          "Es una condición en la que un sistema redundante (maestro/réplica) se divide debido a una falla de comunicación, y ambas partes creen que son el maestro al mismo tiempo.",
      },
      {
        prompt:
          "En RabbitMQ, ¿qué componente es responsable de registrar todos los datos que no son mensajes, como usuarios, permisos y definiciones de exchanges y colas?",
        answer: "El almacén de metadatos (metadata store).",
      },
      {
        prompt:
          "El patrón de desacoplamiento donde un mensaje se publica y el publicador no espera una respuesta se conoce como ____.",
        answer: "dispara y olvida (fire-and-forget)",
      },
      {
        prompt:
          "En un clúster de RabbitMQ, la declaración de un exchange o cola en un nodo hace que sus metadatos se repliquen y sean visibles desde _____ los nodos del clúster.",
        answer: "todos",
      },
      {
        prompt:
          "El patrón de Remote Procedure Call (RPC) sobre RabbitMQ requiere un mecanismo para que el servidor envíe una respuesta de vuelta al cliente. ¿Cómo se logra esto típicamente?",
        answer:
          "El cliente crea una cola de respuesta temporal y exclusiva, y pasa su nombre en la propiedad `reply_to` del mensaje de solicitud.",
      },
      {
        prompt: "Término: Exchange de tipo `fanout` en RabbitMQ.",
        answer:
          "Definición: Un exchange que enruta una copia de cada mensaje recibido a todas las colas que están vinculadas a él, ignorando la clave de enrutamiento.",
      },
      {
        prompt: "Término: Exchange de tipo `topic` en RabbitMQ.",
        answer:
          "Definición: Un exchange que enruta mensajes a colas basándose en una coincidencia de patrones entre la clave de enrutamiento del mensaje y el patrón de vinculación de la cola.",
      },
      {
        prompt:
          "¿Qué comando de la línea de comandos de RabbitMQ te permite ver el estado de los enlaces de federación en un nodo?",
        answer: "`rabbitmqctl federation_status`",
      },
      {
        prompt:
          "¿Qué sucede con un mensaje publicado en un exchange si no hay ninguna cola vinculada que coincida con su clave de enrutamiento?",
        answer: "El mensaje es descartado (desaparece).",
      },
      {
        prompt:
          "La UI de gestión de RabbitMQ se volverá más lenta a medida que aumente el número de conexiones, canales y colas debido a la sobrecarga de _____, filtrado y paginación de los resultados.",
        answer: "agregación",
      },
      {
        prompt:
          "¿Cuál es un efecto secundario desafortunado de la agregación de métricas de todos los nodos en la UI de gestión durante una partición de red?",
        answer:
          "La agregación puede expirar (timeout), haciendo que falten datos cruciales para diagnosticar el impacto de la partición.",
      },
      {
        prompt:
          "¿A qué se debe la mejora significativa de rendimiento de AMQP 1.0 nativo en RabbitMQ 4.0 en comparación con el antiguo enfoque de plugin?",
        answer:
          "Reduce la sobrecarga de ~15 procesos de Erlang a 1 por sesión, disminuyendo drásticamente el uso de memoria y CPU.",
      },
      {
        prompt:
          "El mecanismo de control de flujo basado en créditos de AMQP 1.0 permite que las aplicaciones consumidoras ajusten dinámicamente cuántos mensajes están dispuestas a recibir de colas específicas. ¿Qué tipo de mecanismo es este?",
        answer: 'Un mecanismo "pull-based".',
      },
      {
        prompt: '¿Qué significa que el consumo en RabbitMQ es "destructivo"?',
        answer:
          "Que una vez que un mensaje es consumido y confirmado por un consumidor, se elimina permanentemente de la cola.",
      },
      {
        prompt:
          "El consumo en Kafka es no destructivo y permite la relectura de mensajes. ¿Cómo logra esto un consumidor?",
        answer:
          "Haciendo un seguimiento de su posición en el registro (log) mediante un puntero llamado offset.",
      },
      {
        prompt:
          "Mientras que Kafka garantiza el orden de los mensajes por _____, RabbitMQ lo garantiza por _____.",
        answer: "partición / cola",
      },
      {
        prompt: "Término: Quorum Queues en RabbitMQ.",
        answer:
          "Definición: Un tipo de cola replicada moderna que utiliza el protocolo Raft para enfocarse en la seguridad de los datos y la alta disponibilidad.",
      },
      {
        prompt:
          "En una topología de clúster de RabbitMQ, ¿qué datos son replicados en todos los nodos por defecto?",
        answer:
          "Todos los datos y estados requeridos para la operación del bróker, como usuarios, vhosts, permisos, exchanges y políticas, con la excepción de los mensajes en las colas.",
      },
      {
        prompt:
          "Si el archivo de la cookie de Erlang se coloca incorrectamente o su valor no coincide entre nodos, ¿qué error de distribución de Erlang es probable que ocurra?",
        answer:
          "Un error de autenticación, a menudo con el mensaje `TCP connection succeeded but Erlang distribution failed`.",
      },
      {
        prompt:
          "En el plugin Federation de RabbitMQ, los enlaces pueden ser unidireccionales o bidireccionales y se configuran mediante _____ que definen cómo conectarse a otros nodos.",
        answer: "upstreams",
      },
      {
        prompt:
          "A diferencia de un clúster que requiere enlaces LAN fiables, el plugin _____ de RabbitMQ está diseñado para ser amigable con la WAN y tolerar conectividad intermitente.",
        answer: "Federation",
      },
      {
        prompt: "¿Qué son los `feature flags` en RabbitMQ?",
        answer:
          "Permiten a RabbitMQ coordinar cómo se despliegan las nuevas características introducidas durante y después de una actualización.",
      },
      {
        prompt:
          "Si la tasa de mensajes entrantes a una cola de RabbitMQ es consistentemente más alta que la tasa de mensajes salientes, ¿qué problema indica esto?",
        answer:
          "Que no hay consumidores conectados a la cola o que los consumidores no pueden mantener el ritmo de la carga.",
      },
      {
        prompt:
          "RabbitMQ utiliza el runtime de Erlang, que tiene un límite en el número de procesos ligeros. ¿Qué puede requerir un ajuste de este límite?",
        answer:
          "Un número particularmente alto de conexiones concurrentes o un número muy grande de colas.",
      },
      {
        prompt:
          "¿Qué opción de configuración del runtime de Erlang deshabilita la espera activa especulativa para reducir el uso de CPU en sistemas con recursos limitados?",
        answer: "`+sbwt none`.",
      },
    ],
  },
  {
    id: "spark2",
    name: "Spark2",
    cards: [
      {
        prompt: "¿Qué es Apache Spark?",
        answer:
          "Un motor de computación unificado y un conjunto de librerías para el procesamiento de datos en paralelo en clústeres de computadoras.",
      },
      {
        prompt: "¿Qué es un RDD (Resilient Distributed Dataset)?",
        answer:
          "Una colección de elementos distribuida, tolerante a fallos, que puede ser operada en paralelo.",
      },
      {
        prompt:
          "¿Cuáles son los dos tipos principales de operaciones en los RDDs?",
        answer: "Transformaciones y acciones.",
      },
      {
        prompt:
          "En Spark, una transformación que devuelve un nuevo RDD con un elemento por cada elemento de entrada es _____.",
        answer: "map()",
      },
      {
        prompt: "¿Qué hace la transformación `filter()` en un RDD?",
        answer:
          "Devuelve un nuevo RDD que contiene solo los elementos del RDD original que cumplen una condición.",
      },
      {
        prompt: "¿Cuál es la diferencia entre `map()` y `flatMap()`?",
        answer:
          "`flatMap()` puede producir múltiples elementos de salida por cada elemento de entrada, mientras que `map()` produce solo uno.",
      },
      {
        prompt: "¿Cuál es el propósito de una 'acción' en Spark?",
        answer:
          "Desencadenar el cálculo en un RDD y devolver un resultado al programa driver o escribirlo en un almacenamiento externo.",
      },
      {
        prompt:
          "¿Qué hace el método `persist()` o `cache()` en un RDD o DataFrame?",
        answer:
          "Solicita a Spark que mantenga el conjunto de datos en memoria (o en disco) a través de las operaciones para un acceso más rápido.",
      },
      {
        prompt: "Concepto: Pair RDD",
        answer:
          "Definición: Un RDD que contiene tuplas clave-valor, lo que permite operaciones especiales como `reduceByKey()` y `join()`.",
      },
      {
        prompt: "¿Qué hace la transformación `reduceByKey()` en un pair RDD?",
        answer:
          "Agrega los valores para cada clave usando una función asociativa y conmutativa.",
      },
      {
        prompt:
          "¿Cuál es la diferencia de rendimiento clave entre `reduceByKey` y `groupByKey`?",
        answer:
          "`reduceByKey` realiza una agregación parcial en cada nodo trabajador antes del 'shuffle', mientras que `groupByKey` transfiere todos los valores para una clave a un solo nodo.",
      },
      {
        prompt: "¿Qué es un 'schema' en el contexto de un DataFrame de Spark?",
        answer:
          "Una estructura que define los nombres de las columnas y sus tipos de datos.",
      },
      {
        prompt:
          "El principal punto de entrada para la funcionalidad de DataFrame y SQL en Spark 2.0 y superior es el objeto _____.",
        answer: "SparkSession",
      },
      {
        prompt:
          "¿Cómo se crea una vista temporal a partir de un DataFrame para poder consultarla con SQL?",
        answer: 'Usando el método `createOrReplaceTempView("nombre_vista")`.',
      },
      {
        prompt:
          "¿Cuáles son los dos tipos de transformaciones en Spark Streaming (DStreams)?",
        answer:
          "Transformaciones sin estado (stateless) y con estado (stateful).",
      },
      {
        prompt:
          "Un DStream (Discretized Stream) es una secuencia de _____ que llegan a lo largo del tiempo.",
        answer: "RDDs",
      },
      {
        prompt: "¿Cuál es el propósito del 'checkpointing' en Spark Streaming?",
        answer:
          "Guardar periódicamente el estado en un sistema de archivos fiable para permitir la recuperación tras un fallo del driver.",
      },
      {
        prompt: "Concepto: Transformación sin estado (Stateless)",
        answer:
          "Definición: Una transformación en streaming donde el procesamiento de cada lote no depende de los datos de lotes anteriores (ej: `map()`, `filter()`).",
      },
      {
        prompt: "Concepto: Transformación con estado (Stateful)",
        answer:
          "Definición: Una transformación en streaming que utiliza datos o estado intermedio de lotes anteriores para generar los resultados del lote actual (ej: `updateStateByKey()`).",
      },
      {
        prompt:
          "¿Qué función se utiliza para realizar operaciones sobre un intervalo de tiempo deslizante en un DStream?",
        answer: "La transformación `window()`.",
      },
      {
        prompt:
          "En MLlib, ¿qué objeto representa un punto de datos para algoritmos de aprendizaje supervisado, conteniendo características y una etiqueta?",
        answer: "Un objeto `LabeledPoint`.",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre un vector denso y un vector disperso (sparse) en MLlib?",
        answer:
          "Un vector denso almacena todos sus valores, mientras que un vector disperso almacena solo los valores no nulos y sus índices.",
      },
      {
        prompt: "¿Para qué se utiliza una variable de 'broadcast' en Spark?",
        answer:
          "Para enviar eficientemente una variable grande de solo lectura a todos los nodos de trabajo para su uso en una o más operaciones de Spark.",
      },
      {
        prompt: "¿Para qué se utiliza un 'acumulador' (accumulator) en Spark?",
        answer:
          "Para agregar valores de los nodos de trabajo de vuelta al programa driver de forma eficiente y tolerante a fallos, como contadores o sumas.",
      },
      {
        prompt:
          "¿En qué tipo de operación de Spark se deben usar los acumuladores para un conteo fiable y de valor absoluto?",
        answer:
          "Deben usarse dentro de una acción, como `foreach()`, para garantizar que la actualización de cada tarea se aplique solo una vez.",
      },
      {
        prompt:
          "¿Qué hace `coalesce()` y en qué se diferencia de `repartition()`?",
        answer:
          "`coalesce()` reduce el número de particiones y evita un 'shuffle' completo, mientras que `repartition()` puede aumentar o disminuir las particiones e siempre incurre en un 'shuffle' completo.",
      },
      {
        prompt: "¿Qué es una UDF (User-Defined Function) en Spark?",
        answer:
          "Una función creada por el usuario que se puede registrar y utilizar en consultas de Spark SQL o con DataFrames para realizar transformaciones personalizadas.",
      },
      {
        prompt: "¿Cuál es el propósito del optimizador Catalyst en Spark SQL?",
        answer:
          "Traducir las consultas de DataFrames, Datasets y SQL a un plan de ejecución físico optimizado que se ejecuta sobre RDDs.",
      },
      {
        prompt:
          "¿Qué es un 'cross-join' (o producto cartesiano) y por qué debe usarse con precaución?",
        answer:
          "Es una unión que combina cada fila de la tabla izquierda con cada fila de la tabla derecha, lo que puede provocar una explosión en el número de filas del resultado.",
      },
      {
        prompt:
          'Mencione dos de las seis fuentes de datos "centrales" soportadas por Spark.',
        answer: "CSV, JSON, Parquet, ORC, JDBC y archivos de texto.",
      },
      {
        prompt:
          "¿Para qué se utiliza la opción `inferSchema` al leer fuentes de datos como CSV?",
        answer:
          "Para que Spark analice automáticamente los datos y deduzca los tipos de datos de cada columna.",
      },
      {
        prompt:
          "¿Qué es el formato de archivo Parquet y por qué es popular en el ecosistema de big data?",
        answer:
          "Es un formato de almacenamiento columnar que es eficiente para consultas analíticas porque puede leer solo las columnas necesarias.",
      },
      {
        prompt: "En Structured Streaming, ¿qué es un 'output sink'?",
        answer:
          "Es el destino donde se escriben los resultados de una consulta de streaming, como un sistema de archivos, Kafka o una tabla en memoria.",
      },
      {
        prompt:
          "¿Qué significa el modo de salida 'complete' en Structured Streaming?",
        answer:
          "Que en cada disparo (trigger), se reescribe toda la tabla de resultados actualizada en el 'sink'.",
      },
      {
        prompt: "En Structured Streaming, ¿qué es un 'trigger' (disparador)?",
        answer:
          "Define cuándo se procesan los datos y se actualizan los resultados, por ejemplo, cada cierto intervalo de tiempo o tan pronto como lleguen nuevos datos.",
      },
      {
        prompt:
          "¿Qué es el 'event time' en el procesamiento de flujos y por qué es importante?",
        answer:
          "Es la marca de tiempo en la que ocurrió el evento en el sistema de origen, y es crucial para manejar datos desordenados o tardíos correctamente.",
      },
      {
        prompt:
          "¿Qué permite hacer la operación `mapGroupsWithState` en Structured Streaming?",
        answer:
          "Mantener y actualizar un estado arbitrario definido por el usuario para cada grupo (clave) en un flujo de datos.",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre aprendizaje supervisado y no supervisado?",
        answer:
          "El aprendizaje supervisado utiliza datos con etiquetas históricas para entrenar un modelo, mientras que el no supervisado encuentra patrones en datos sin etiquetas.",
      },
      {
        prompt:
          "En MLlib, el proceso de convertir datos brutos a una forma numérica adecuada para los algoritmos se llama _____.",
        answer: "ingeniería de características (feature engineering)",
      },
      {
        prompt: "¿Qué es un 'Pipeline' de Spark en el contexto de MLlib?",
        answer:
          "Una secuencia de etapas (Transformers y Estimators) que se ejecutan en orden para formar un flujo de trabajo de aprendizaje automático.",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre un `Transformer` y un `Estimator` en MLlib?",
        answer:
          "Un `Transformer` convierte un DataFrame en otro, mientras que un `Estimator` se ajusta (entrena) a un DataFrame para producir un `Transformer`.",
      },
      {
        prompt:
          "¿Para qué se utiliza el algoritmo PageRank en el análisis de grafos?",
        answer:
          "Para medir la importancia relativa de cada nodo (vértice) dentro de un grafo.",
      },
      {
        prompt:
          "¿Qué dos componentes se necesitan para crear un objeto GraphFrame?",
        answer:
          "Un DataFrame de vértices ('vertices') y un DataFrame de aristas ('edges').",
      },
      {
        prompt:
          "En la arquitectura de clúster de Spark, ¿cuál es el rol del 'programa driver'?",
        answer:
          "Aloja el objeto `SparkContext`, declara las transformaciones y acciones, y coordina la ejecución en los 'executors'.",
      },
      {
        prompt: "¿Cuál es el rol de un 'executor' en un clúster de Spark?",
        answer:
          "Es un proceso que se ejecuta en un nodo de trabajo, responsable de ejecutar las tareas y mantener los datos en memoria o en disco.",
      },
      {
        prompt:
          "Nombra dos gestores de clústeres sobre los que Spark puede ejecutarse.",
        answer: "Standalone, Apache Mesos y Hadoop YARN.",
      },
      {
        prompt: "¿Cuál es el propósito del script `spark-submit`?",
        answer: "Enviar una aplicación Spark para su ejecución en un clúster.",
      },
      {
        prompt: "¿Qué es un 'DAG' (Directed Acyclic Graph) en Spark?",
        answer:
          "Es un grafo de las operaciones (RDDs y sus transformaciones) que Spark construye. Las acciones desencadenan la ejecución de este grafo.",
      },
      {
        prompt: "¿Qué es una 'etapa' (stage) en el plan de ejecución de Spark?",
        answer:
          "Un conjunto de tareas que se pueden ejecutar en paralelo sin necesidad de una reorganización de datos ('shuffle').",
      },
      {
        prompt: "¿Qué es una 'tarea' (task) en Spark?",
        answer:
          "Es la unidad de trabajo más pequeña que se envía a un 'executor' para ser ejecutada, generalmente operando sobre una partición de datos.",
      },
      {
        prompt:
          "La operación `leftOuterJoin` combina dos RDDs de pares por clave, pero mantiene todas las claves de ¿cuál RDD?",
        answer: "Del RDD izquierdo (el que invoca la operación).",
      },
      {
        prompt:
          "¿Cuál es el propósito de la transformación `partitionBy` en un pair RDD?",
        answer:
          "Reparticionar el RDD según un particionador específico, como `HashPartitioner`, lo que puede optimizar operaciones futuras basadas en clave.",
      },
      {
        prompt:
          "Para crear un RDD clave-valor (pair RDD) a partir de un RDD regular en Python, la función `map` debe devolver un RDD compuesto de _____.",
        answer: "tuplas",
      },
      {
        prompt: "¿Qué es el objeto `SparkContext`?",
        answer:
          "Es el punto de entrada principal a la funcionalidad de Spark y representa la conexión con un clúster de Spark.",
      },
      {
        prompt:
          "¿Para qué se utiliza el método `SparkContext.wholeTextFiles()`?",
        answer:
          "Para leer un directorio que contiene múltiples archivos de texto pequeños y devolver un RDD de pares donde la clave es la ruta del archivo.",
      },
      {
        prompt: "¿Qué es un SequenceFile en el ecosistema Hadoop?",
        answer:
          "Un formato de archivo plano que consiste en pares binarios clave-valor.",
      },
      {
        prompt:
          "Spark SQL puede conectarse a una instalación existente de Hive colocando qué archivo de configuración en el directorio `conf` de Spark?",
        answer: "El archivo `hive-site.xml`.",
      },
      {
        prompt:
          "En Spark SQL, un `Row` object permite el acceso a las columnas por número de columna y, en Python, también por _____.",
        answer: "nombre de columna (ej: `row.column_name`)",
      },
      {
        prompt:
          "¿Cuál es el propósito de la operación `updateStateByKey` en DStreams?",
        answer:
          "Mantener y actualizar un estado para cada clave a lo largo del tiempo en un DStream de pares clave-valor.",
      },
      {
        prompt: "¿Qué hace un transformador `HashingTF` en MLlib?",
        answer:
          "Mapea una secuencia de términos (palabras) a un vector de características de frecuencia de términos con un tamaño fijo.",
      },
      {
        prompt: "¿Qué hace el método `pipe()` en un RDD?",
        answer:
          "Permite canalizar elementos del RDD a un proceso de sistema externo (como un script de R o Perl) que se ejecuta en cada partición.",
      },
      {
        prompt:
          "¿Qué hace la acción `collect()`, y cuál es un problema potencial al usarla?",
        answer:
          "Recupera todos los elementos del conjunto de datos como un array en el programa driver, lo que puede causar un error de memoria si el conjunto de datos es muy grande.",
      },
      {
        prompt:
          "¿Qué método permite obtener una muestra aleatoria de filas de un DataFrame?",
        answer: "El método `sample()`.",
      },
      {
        prompt:
          "Al trabajar con datos numéricos en un DataFrame, ¿qué función calcula la correlación entre dos columnas?",
        answer: "La función `corr()`.",
      },
      {
        prompt: "¿Qué hace la operación `pivot` en un DataFrame?",
        answer:
          "Convierte una fila en una columna, agregando valores según una función para cada nueva columna.",
      },
      {
        prompt:
          "En Spark SQL, una diferencia clave entre una tabla y una vista es que las vistas son básicamente _____ que se pueden consultar con SQL.",
        answer: "DataFrames",
      },
      {
        prompt: "¿Qué significa que una subconsulta sea 'correlacionada'?",
        answer:
          "Significa que la subconsulta interna utiliza información del ámbito externo de la consulta.",
      },
      {
        prompt: "¿Cuál es el propósito del método `checkpoint()` en un RDD?",
        answer:
          "Marca el RDD para ser guardado en un archivo en un almacenamiento fiable, truncando su linaje para acortar la cadena de dependencias.",
      },
      {
        prompt:
          "En un despliegue sobre YARN, ¿cuáles son los dos modos de despliegue para una aplicación Spark?",
        answer: "Modo clúster (cluster mode) y modo cliente (client mode).",
      },
      {
        prompt:
          "¿Qué es un 'servicio de shuffle externo' y qué beneficio proporciona?",
        answer:
          "Permite almacenar los bloques de 'shuffle' fuera de los 'executors', de modo que los resultados del 'shuffle' estén disponibles incluso si los 'executors' son eliminados.",
      },
      {
        prompt:
          "¿Cuál es una causa común de un error `OutOfMemoryError` en el driver de Spark?",
        answer: "Recolectar demasiados datos en el driver usando `collect()`.",
      },
      {
        prompt:
          "¿Cuál es la ventaja del procesamiento de flujos sobre trabajos por lotes repetidos para actualizar resultados?",
        answer:
          "El procesamiento de flujos puede ser más eficiente al incrementalizar el cálculo, procesando solo los datos nuevos en lugar de volver a escanear todo el conjunto de datos.",
      },
      {
        prompt:
          "En MLlib, ¿cuál es un caso de uso común para los algoritmos de 'recomendación'?",
        answer:
          "Sugerir productos o ítems a los usuarios basándose en sus preferencias explícitas (calificaciones) o implícitas (comportamiento).",
      },
      {
        prompt:
          "¿Cuál es un caso de uso común para los algoritmos de 'clustering'?",
        answer:
          "La segmentación de usuarios, agrupándolos según atributos o comportamientos compartidos.",
      },
      {
        prompt: "En MLlib, ¿qué hace un transformador `Normalizer`?",
        answer:
          "Escala los vectores de características individuales para que tengan una norma unitaria (por defecto, la norma L2).",
      },
      {
        prompt:
          "¿Cuál es el propósito de `SQLTransformer` en una Pipeline de ML?",
        answer:
          "Permite aplicar una transformación definida por el usuario mediante una consulta SQL sobre los datos de entrada.",
      },
      {
        prompt:
          "¿Cuál es el propósito de la 'indexación' de características categóricas en aprendizaje automático?",
        answer:
          "Convertir una variable categórica (como una cadena de texto) en una variable numérica que los algoritmos puedan utilizar.",
      },
      {
        prompt:
          "En el algoritmo ALS para recomendación, ¿qué es la 'estrategia de arranque en frío' (cold-start strategy)?",
        answer:
          "Define cómo manejar las predicciones para usuarios o ítems que no estaban presentes en el conjunto de entrenamiento.",
      },
      {
        prompt:
          "¿Qué identifica el algoritmo `connectedComponents` en GraphFrames?",
        answer:
          "Los subgrafos en los que cualquier par de nodos está conectado entre sí por caminos.",
      },
      {
        prompt:
          "El método `cache()` en un DataFrame es un atajo para usar `persist()` con ¿qué nivel de almacenamiento?",
        answer: "MEMORY_AND_DISK.",
      },
      {
        prompt: "¿Qué es la 'evaluación perezosa' (lazy evaluation) en Spark?",
        answer:
          "Es el principio por el cual Spark no ejecuta las transformaciones hasta que se invoca una acción, lo que le permite optimizar el plan de ejecución.",
      },
      {
        prompt:
          "Almacenar en caché objetos serializados (`MEMORY_ONLY_SER`) puede reducir sustancialmente el tiempo dedicado a _____ en la JVM.",
        answer: "la recolección de basura (garbage collection)",
      },
      {
        prompt:
          "¿Cuál es el propósito de la transformación `window` en Spark Streaming?",
        answer:
          "Permite aplicar transformaciones sobre una ventana deslizante de datos, agrupando eventos que ocurren dentro de un intervalo de tiempo.",
      },
      {
        prompt:
          "El algoritmo k-means es un tipo de algoritmo de aprendizaje _____.",
        answer: "no supervisado (clustering)",
      },
      {
        prompt:
          "¿Qué hace la función `explode` en Spark SQL y en la API de DataFrame?",
        answer:
          "Crea una nueva fila por cada elemento en un array o mapa de una columna.",
      },
      {
        prompt:
          "¿Cuál es el propósito de la clase `StorageLevel` al persistir un RDD?",
        answer:
          "Permite especificar cómo se debe almacenar el RDD, por ejemplo, solo en memoria, en memoria y disco, serializado, etc.",
      },
      {
        prompt: "¿Qué hace la acción `collectAsMap()` en un pair RDD?",
        answer:
          "Devuelve los pares clave-valor del RDD como un mapa al programa driver.",
      },
      {
        prompt:
          "En la API estructurada, ¿cómo se añade una nueva columna a un DataFrame?",
        answer:
          'Usando el método `withColumn("nuevo_nombre", expresion_columna)`.',
      },
      {
        prompt: "¿Qué hace la transformación `orderBy()` (o `sort()`)?",
        answer:
          "Devuelve un nuevo DataFrame con las filas ordenadas por una o más columnas especificadas.",
      },
      {
        prompt:
          "¿Para qué se utiliza la función `avg` en una agregación de DataFrame?",
        answer:
          "Para calcular el promedio (media) de los valores en una columna.",
      },
      {
        prompt: "¿Cuál es el propósito de un 'equi-join'?",
        answer:
          "Es el tipo de unión más común, donde las filas se combinan si los valores de las claves especificadas en ambos conjuntos de datos son iguales.",
      },
      {
        prompt: "¿Qué hace el modo de salida 'append' en Structured Streaming?",
        answer:
          "Solo las nuevas filas añadidas a la tabla de resultados desde el último disparo se escriben en el 'sink'.",
      },
      {
        prompt:
          "Un _____ define los nombres de las columnas y los tipos de un DataFrame.",
        answer: "esquema (schema)",
      },
      {
        prompt:
          "¿Cuál es la diferencia clave entre un DataFrame y un Dataset en Spark?",
        answer:
          "Los Datasets proporcionan seguridad de tipos en tiempo de compilación (type-safety) y una vista orientada a objetos de los datos, mientras que los DataFrames no.",
      },
      {
        prompt:
          "Para crear una función definida por el usuario (UDF) en PySpark, se importa `udf` desde ¿qué módulo?",
        answer: "pyspark.sql.functions",
      },
      {
        prompt:
          "¿Qué transformación se utiliza para convertir un RDD en un DataFrame?",
        answer: "El método `toDF()`.",
      },
      {
        prompt:
          "En Spark Streaming, la tolerancia a fallos se logra recalculando el estado a partir del _____ de los RDDs.",
        answer: "linaje (lineage)",
      },
      {
        prompt:
          "En MLlib, el problema que resuelve la regresión logística es un problema de _____.",
        answer: "clasificación",
      },
    ],
  },
  {
    id: "spark_kafka_kubernetes",
    name: "Spark Kafka Kubernetes",
    cards: [
      {
        prompt:
          "¿Qué comando se utiliza para solucionar el problema de arranque de Liberica NIK en macOS Catalina y versiones posteriores?",
        answer:
          "Se ejecuta `sudo xattr -r -d com.apple.quarantine path/to/graalvm/folder/`.",
      },
      {
        prompt:
          "Según la documentación de Bitnami, ¿cuál es el tiempo de respuesta objetivo para las preguntas en sus proyectos de GitHub en días laborables?",
        answer:
          "El equipo de soporte de Bitnami intenta responder cualquier pregunta recibida en un plazo de 24 horas en días laborables.",
      },
      {
        prompt:
          "En un Dockerfile, ¿qué instrucción se recomienda para las imágenes base para mantener un tamaño reducido, como en el caso de la imagen Alpine?",
        answer:
          "La instrucción `FROM`, utilizando imágenes oficiales actuales y pequeñas como Alpine, que tiene menos de 6 MB.",
      },
      {
        prompt:
          "Para excluir archivos no relevantes para la compilación de Docker sin reestructurar el repositorio de origen, se utiliza un archivo ____.",
        answer: ".dockerignore",
      },
      {
        prompt: "En Docker, ¿qué significa que un contenedor debe ser efímero?",
        answer:
          "Significa que el contenedor puede ser detenido, destruido, reconstruido y reemplazado con una configuración y preparación mínimas.",
      },
      {
        prompt:
          "Para asegurar que se utiliza la versión más reciente de una imagen base al construir una imagen de Docker, se puede usar el flag ____.",
        answer: "--pull",
      },
      {
        prompt:
          "En el contexto de Kafka en Kubernetes, ¿cuál es el factor de replicación estándar recomendado para la producción?",
        answer: "Un factor de replicación de 3 es el estándar para producción.",
      },
      {
        prompt:
          "El parámetro `min.insync.replicas` en Kafka define el número mínimo de réplicas que deben confirmar una escritura para que se considere ____.",
        answer: "exitosa",
      },
      {
        prompt:
          "¿Qué herramienta de línea de comandos se utiliza para crear clústeres en Amazon EKS según la guía de AWS?",
        answer: "La herramienta `eksctl`.",
      },
      {
        prompt:
          "En el Dockerfile de ejemplo de AWS para un microservicio Java, ¿qué imagen base de BellSoft se utiliza?",
        answer:
          "La imagen base utilizada es `bellsoft/liberica-openjdk-alpine-musl:17`.",
      },
      {
        prompt:
          "¿Cuál es la mejor práctica para los registros de imágenes en un entorno de producción de Kubernetes para mejorar la seguridad y el control?",
        answer:
          "Utilizar un registro de imágenes privado en lugar de uno público.",
      },
      {
        prompt:
          "Para garantizar la integridad de las imágenes de contenedor en Kubernetes, ¿qué proceso se debe implementar?",
        answer:
          "Se debe implementar la firma y verificación de imágenes utilizando herramientas como Notary o Docker Content Trust (DCT).",
      },
      {
        prompt:
          "En la arquitectura de Kubernetes, ¿cuál es el componente responsable de asegurar que los contenedores se estén ejecutando en un Pod y de comunicarse con el API server?",
        answer: "El Kubelet.",
      },
      {
        prompt:
          "Kubernetes puede exponer un contenedor usando un nombre DNS o su propia dirección IP y, si el tráfico es alto, puede distribuir el tráfico de red. Esta característica se conoce como _____.",
        answer: "Balanceo de carga (Load Balancing)",
      },
      {
        prompt:
          "¿Qué propiedad de configuración de Spark se utiliza para especificar la imagen de contenedor a usar para la aplicación Spark en Kubernetes?",
        answer: "La propiedad `spark.kubernetes.container.image`.",
      },
      {
        prompt:
          "¿Qué comando de `kubectl` se utiliza para crear un nuevo namespace en Kubernetes?",
        answer: "`kubectl create namespace <nombre-del-namespace>`.",
      },
      {
        prompt:
          "¿Qué opción de la JVM permite especificar exactamente cuántos núcleos de CPU debe usar la JVM, independientemente de la detección de contenedores?",
        answer: "La opción `-XX:ActiveProcessorCount`.",
      },
      {
        prompt:
          "Para deshabilitar completamente el soporte de detección de contenedores en OpenJDK, se debe utilizar la opción de la JVM ____.",
        answer: "-XX:-UseContainerSupport",
      },
      {
        prompt:
          "El patrón de diseño en Kubernetes que consiste en un contenedor secundario que se ejecuta en el mismo Pod que la aplicación principal para proporcionar funcionalidades de soporte se llama _____.",
        answer: "patrón sidecar (sidecar pattern)",
      },
      {
        prompt:
          "En el patrón sidecar, ¿qué recurso de Kubernetes comparten el contenedor de la aplicación principal y el contenedor sidecar?",
        answer:
          "Comparten el mismo Pod y, por lo tanto, el mismo espacio de red y volúmenes.",
      },
      {
        prompt:
          "Para monitorear contenedores sidecar, se recomienda rastrear métricas a nivel de Pod, como el consumo de CPU y memoria, y un alto número de ____, que a menudo señala un error de configuración.",
        answer: "reinicios (restart count)",
      },
      {
        prompt:
          "Según el video de Java Techie, ¿cuál es una de las principales ventajas del patrón sidecar en un entorno políglota?",
        answer:
          "El servicio principal no necesita saber en qué lenguaje está escrito el servicio sidecar, lo que permite flexibilidad y versatilidad.",
      },
      {
        prompt:
          "En el ejemplo del video de Java Techie, ¿qué herramienta de orquestación se utiliza para ejecutar los contenedores del servicio principal y del sidecar en un único pod?",
        answer: "Se utiliza Kubernetes.",
      },
      {
        prompt:
          "Las compilaciones de Docker de varias etapas (multi-stage builds) permiten separar el entorno de compilación del entorno de ____.",
        answer: "ejecución (runtime)",
      },
      {
        prompt:
          "En un Dockerfile de varias etapas, ¿cómo se copia un artefacto de una etapa anterior a la etapa actual?",
        answer:
          "Se utiliza la instrucción `COPY --from=<nombre-o-indice-de-la-etapa> <origen> <destino>`.",
      },
      {
        prompt:
          "¿Qué propiedad de configuración de Spark se utiliza para especificar el namespace de Kubernetes para ejecutar los pods del driver y los ejecutores?",
        answer: "La propiedad `spark.kubernetes.namespace`.",
      },
      {
        prompt:
          "En Confluent, ¿qué biblioteca de Spring se utiliza para la integración con clientes estándar de Kafka y la API de Kafka Streams?",
        answer: "La biblioteca Spring for Apache Kafka.",
      },
      {
        prompt:
          "En un entorno de microservicios gestionado con GitOps, ¿cómo se revierte un despliegue fallido para volver a un estado funcional?",
        answer:
          "Se revierte el commit anterior en el repositorio de Git, lo que desencadena el proceso de GitOps para aplicar el estado anterior.",
      },
      {
        prompt:
          "En Strimzi, ¿qué tipo de almacenamiento se debe configurar en el recurso `Kafka` para utilizar volúmenes persistentes locales vinculados a un nodo específico?",
        answer:
          "Se deben usar Volúmenes Persistentes Locales (Local Persistent Volumes), que se configuran a través de una `StorageClass` y se especifican con `type: persistent-claim` en Strimzi.",
      },
      {
        prompt:
          "¿Qué tipo de almacenamiento en Strimzi es temporal y se pierde en cada actualización continua (rolling update)?",
        answer: "El almacenamiento de tipo `ephemeral`.",
      },
      {
        prompt:
          "Un error común en Kubernetes donde un pod se reinicia repetidamente en un bucle se conoce como _____.",
        answer: "CrashLoopBackOff",
      },
      {
        prompt:
          "Comando `kubectl` para obtener información detallada de un pod, incluyendo eventos recientes:",
        answer: "`kubectl describe pod <nombre-del-pod>`.",
      },
      {
        prompt:
          "En Kubernetes, ¿qué tipo de sonda (probe) se utiliza para verificar si un contenedor está listo para aceptar tráfico?",
        answer: "Sonda de preparación (Readiness Probe).",
      },
      {
        prompt:
          "Si una sonda de actividad (Liveness Probe) falla repetidamente, ¿qué acción toma Kubernetes?",
        answer: "Kubernetes reinicia el contenedor.",
      },
      {
        prompt:
          "La sonda de _____ se utiliza en Kubernetes para dar tiempo adicional a los contenedores para completar su lógica de inicio antes de que las otras sondas comiencen.",
        answer: "arranque (Startup Probe)",
      },
      {
        prompt:
          "En Strimzi, ¿qué recurso personalizado se utiliza para gestionar clústeres de Kafka?",
        answer: "El recurso personalizado `Kafka` (`kind: Kafka`).",
      },
      {
        prompt:
          "Para configurar el número de nodos de bróker en un clúster de Kafka con Strimzi, se modifica la propiedad _____.",
        answer: "`spec.kafka.replicas`",
      },
      {
        prompt:
          "En Strimzi, ¿cómo se habilita la exportación de métricas de Prometheus para los brókeres de Kafka?",
        answer:
          "Configurando la propiedad `spec.kafka.metrics` en el recurso `Kafka`, por ejemplo, asignándole un objeto vacío `{}`.",
      },
      {
        prompt:
          "La propiedad `rack.topologyKey` en la configuración de Kafka en Strimzi se usa para habilitar la _____.",
        answer: "conciencia de rack (rack awareness)",
      },
      {
        prompt:
          "Para gestionar usuarios de Kafka de forma declarativa con Strimzi, se utiliza el recurso personalizado _____.",
        answer: "`KafkaUser`",
      },
      {
        prompt:
          "El operador de Strimzi que gestiona temas de Kafka a través de recursos `KafkaTopic` se llama ____.",
        answer: "Topic Operator",
      },
      {
        prompt:
          "En Helm, ¿qué comando se utiliza para aplicar actualizaciones a una release existente?",
        answer: "`helm upgrade`.",
      },
      {
        prompt:
          "Para pasar un archivo de valores de configuración al instalar o actualizar un chart de Helm, se usa el flag ____.",
        answer: "`--values` o `-f`",
      },
      {
        prompt:
          "La práctica de revisar las diferencias en los manifiestos renderizados antes de aplicar un cambio en un chart de Helm se conoce como ____.",
        answer: "diffing (hacer un diff)",
      },
      {
        prompt:
          "Para evitar cambios inesperados en las imágenes base de Docker, es una buena práctica usar etiquetas ____ en lugar de `latest`.",
        answer: "específicas y estables (specific and stable tags)",
      },
      {
        prompt:
          "En Kubernetes, la unidad de despliegue más pequeña y simple es el ____, que puede contener uno o más contenedores.",
        answer: "Pod",
      },
      {
        prompt:
          "¿Cuál es la función del Kube-proxy en un nodo trabajador de Kubernetes?",
        answer:
          "Mantiene las reglas de red en los nodos, permitiendo la comunicación de red hacia los Pods desde dentro o fuera del clúster.",
      },
      {
        prompt:
          "El proceso de empaquetar una aplicación con todas sus librerías y configuraciones necesarias se conoce como _____.",
        answer: "Contenerización",
      },
      {
        prompt:
          "En Docker, la instrucción _____ y _____ son funcionalmente similares, pero la segunda soporta la obtención de archivos desde URLs remotas y la extracción automática de archivos tar.",
        answer: "`COPY` y `ADD`",
      },
      {
        prompt:
          "¿Cuál es el propósito de los `labels` en los objetos de Kubernetes?",
        answer:
          "Ayudan a organizar y seleccionar subconjuntos de objetos, como Pods, para diversas operaciones.",
      },
      {
        prompt:
          "En el contexto de la seguridad de contenedores, ¿qué principio se cumple al ejecutar contenedores como usuarios no root por defecto?",
        answer:
          "El principio de mínimo privilegio (principle of least privilege).",
      },
      {
        prompt:
          "En el ecosistema de Big Data, Kafka logra la escalabilidad horizontal dividiendo los temas en múltiples ____.",
        answer: "particiones",
      },
      {
        prompt:
          "Si la opción `unclean.leader.election.enable` en Kafka se establece en `false`, se previene la pérdida de datos a costa de la ____.",
        answer: "disponibilidad",
      },
      {
        prompt:
          "¿Qué utilidad de AWS distribuye automáticamente el tráfico entrante a través de múltiples destinos como instancias EC2 o contenedores?",
        answer: "Elastic Load Balancing (ELB).",
      },
      {
        prompt:
          "En un Dockerfile para una aplicación Java, ¿qué instrucción expone un puerto del contenedor?",
        answer: "La instrucción `EXPOSE`.",
      },
      {
        prompt:
          "Para asegurar que las configuraciones del clúster sean inmutables, los charts de Helm de Bitnami montan los archivos de configuración como ____ de solo lectura.",
        answer: "ConfigMaps",
      },
      {
        prompt:
          "El motor de análisis unificado de código abierto diseñado para el procesamiento de datos a gran escala, tanto en batch como en streaming, es _____.",
        answer: "Apache Spark",
      },
      {
        prompt:
          "En Kubernetes, el componente del plano de control responsable de mantener el estado deseado del clúster se conoce como el _____.",
        answer: "Nodo maestro (Master Node)",
      },
      {
        prompt:
          "La característica de Kubernetes que reinicia automáticamente contenedores fallidos y los reemplaza o reprograma se llama _____.",
        answer: "Autoreparación (Self-Healing)",
      },
      {
        prompt:
          "Para gestionar información sensible como contraseñas y tokens OAuth en Kubernetes, se utiliza el objeto ____.",
        answer: "Secret",
      },
      {
        prompt:
          "En Java, ¿qué opciones de la JVM establecen el tamaño del heap como un porcentaje de la memoria disponible del contenedor?",
        answer:
          "`-XX:InitialRAMPercentage`, `-XX:MaxRAMPercentage`, y `-XX:MinRAMPercentage`.",
      },
      {
        prompt:
          "Cuando tanto `-Xmx` como `-XX:MaxRAMPercentage` están configurados para la JVM, ¿cuál de ellos tiene precedencia?",
        answer: "La opción `-Xmx` (y `-Xms`) tiene precedencia.",
      },
      {
        prompt:
          "Un beneficio clave del patrón sidecar es que permite actualizar o reemplazar los componentes auxiliares de forma ____ a la aplicación principal.",
        answer: "independiente",
      },
      {
        prompt:
          "Para definir un contenedor sidecar en el YAML de un Pod de Kubernetes, simplemente se añade otro contenedor en el array ____.",
        answer: "`spec.containers`",
      },
      {
        prompt:
          "En un Dockerfile, ¿para qué se utiliza la instrucción `WORKDIR`?",
        answer:
          "Establece el directorio de trabajo para cualquier instrucción `RUN`, `CMD`, `ENTRYPOINT`, `COPY` y `ADD` que le siga.",
      },
      {
        prompt:
          "El error `ImagePullBackOff` en Kubernetes indica que el clúster no puede ____ la imagen del contenedor desde el registro.",
        answer: "descargar (pull)",
      },
      {
        prompt:
          "En Strimzi, ¿qué propiedad se utiliza dentro de la configuración de un listener para restringir el acceso a nivel de red a aplicaciones o namespaces seleccionados?",
        answer: "La propiedad `networkPolicyPeers`.",
      },
      {
        prompt:
          "El componente de Strimzi que proporciona una interfaz RESTful para interactuar con un clúster de Kafka se llama ____.",
        answer: "Kafka Bridge",
      },
      {
        prompt: "¿Qué es el Cruise Control en el contexto de Strimzi?",
        answer:
          "Es una herramienta para reequilibrar la carga de trabajo de un clúster de Kafka generando y aplicando propuestas de optimización.",
      },
      {
        prompt:
          "En Helm, ¿qué archivo se usa para definir los valores de configuración por defecto de un chart?",
        answer: "El archivo `values.yaml`.",
      },
      {
        prompt:
          "Para anular un valor específico de un chart de Helm desde la línea de comandos sin usar un archivo, se puede utilizar el flag ____.",
        answer: "`--set`",
      },
      {
        prompt:
          "En la monitorización de Kubernetes, la estrategia de tener un agente de monitorización por cada pod se logra comúnmente con el patrón ____.",
        answer: "sidecar",
      },
      {
        prompt: "Término en Kubernetes: Ingress",
        answer:
          "Un objeto de la API que gestiona el acceso externo a los servicios en un clúster, típicamente tráfico HTTP y HTTPS.",
      },
      {
        prompt:
          "En el archivo de despliegue (deployment.yaml) de Kubernetes, la propiedad `replicas` especifica el número deseado de ____.",
        answer: "Pods",
      },
      {
        prompt:
          "El comando `kubectl get pods` muestra, entre otras cosas, el estado, el número de reinicios y la ____ de cada pod.",
        answer: "antigüedad (age)",
      },
      {
        prompt:
          "En el contexto de Strimzi, ¿qué tipo de listener se configura para clientes externos que se conectan a través de un balanceador de carga de un proveedor de nube?",
        answer: "Un listener de tipo `loadbalancer`.",
      },
      {
        prompt:
          "Para un clúster de ZooKeeper de cinco nodos, ¿cuántos nodos deben estar en funcionamiento como mínimo para mantener el quórum?",
        answer: "Se requieren al menos tres nodos en funcionamiento.",
      },
      {
        prompt:
          "¿Qué herramienta de la línea de comandos de AWS te ayuda a interactuar con los servicios de AWS a través de comandos en tu shell?",
        answer: "La Interfaz de Línea de Comandos de AWS (AWS CLI).",
      },
      {
        prompt:
          "En el `pom.xml` de un proyecto Maven, las dependencias del proyecto se declaran dentro de la etiqueta ____.",
        answer: "`<dependencies>`",
      },
      {
        prompt:
          "¿Qué es un 'fat JAR' o 'uber JAR' en el contexto de las aplicaciones Java?",
        answer:
          "Es un archivo JAR que contiene tanto el código de la aplicación como todas sus dependencias en un único archivo.",
      },
      {
        prompt:
          "En un Dockerfile, la instrucción `RUN` ejecuta comandos en una nueva capa sobre la imagen actual y ____ los cambios.",
        answer: "confirma (commits)",
      },
      {
        prompt:
          "En Strimzi, el recurso personalizado `KafkaMirrorMaker2` se utiliza para la replicación de datos entre dos clústeres de Kafka y se basa en el framework ____.",
        answer: "Kafka Connect",
      },
      {
        prompt:
          "La herramienta Prometheus se utiliza ampliamente en el ecosistema de Kubernetes para recopilar métricas en formato de ____.",
        answer: "series de tiempo (time-series)",
      },
      {
        prompt:
          "En Kubernetes, ¿qué objeto se utiliza para asegurar que un número mínimo de pods de una aplicación esté disponible durante interrupciones voluntarias?",
        answer: "Un PodDisruptionBudget (PDB).",
      },
      {
        prompt:
          "Para configurar afinidad de pod en Kubernetes y asegurar que ciertos pods no se programen en el mismo nodo, se utiliza la regla ____.",
        answer: "`podAntiAffinity`",
      },
      {
        prompt:
          "En Strimzi, ¿dónde se configura el uso de almacenamiento `jbod` (Just a Bunch Of Disks) para los brókeres de Kafka?",
        answer:
          "En la propiedad `spec.kafka.storage`, estableciendo `type` en `jbod` y definiendo los volúmenes en la propiedad `volumes`.",
      },
      {
        prompt:
          "En un Dockerfile de varias etapas, la primera etapa, que incluye herramientas de compilación como Maven, se conoce comúnmente como la etapa de ____.",
        answer: "compilación (build stage)",
      },
      {
        prompt:
          "La segunda etapa en un Dockerfile de varias etapas, que solo contiene el artefacto de la aplicación y el tiempo de ejecución, se llama la etapa de ____.",
        answer: "ejecución (runtime stage)",
      },
      {
        prompt:
          "Para la autorización en Kafka con Strimzi, se puede usar `AclAuthorizer`, que gestiona el acceso a los brókeres mediante reglas ____.",
        answer: "ACL (Access Control List)",
      },
      {
        prompt:
          "En la configuración de autenticación OAuth 2.0 en Strimzi, la propiedad `tokenEndpointUri` especifica la URL del servidor de autorización para obtener un ____.",
        answer: "token de acceso",
      },
      {
        prompt:
          "Comando `kubectl` para ver los logs de un contenedor específico dentro de un pod que tiene múltiples contenedores:",
        answer: "`kubectl logs <nombre-del-pod> -c <nombre-del-contenedor>`.",
      },
      {
        prompt:
          "El concepto de que el software responsable de ejecutar contenedores, como Docker o containerd, se conoce en Kubernetes como el ____.",
        answer: "Container Runtime",
      },
      {
        prompt:
          "¿Qué herramienta de Spring permite crear servicios REST con anotaciones declarativas de Java para definir puntos finales HTTP?",
        answer: "Spring Web (o Spring MVC).",
      },
      {
        prompt:
          "En Spring Boot, ¿qué archivo de propiedades se utiliza comúnmente para la configuración externa por defecto de la aplicación?",
        answer: "El archivo `application.properties` o `application.yaml`.",
      },
      {
        prompt:
          "En Strimzi, la propiedad `deleteClaim` dentro de la configuración de `persistent-claim` storage, si se establece en `false`, ¿qué sucede con el PVC cuando se elimina el clúster?",
        answer:
          "El Persistent Volume Claim (PVC) no se elimina, preservando los datos.",
      },
      {
        prompt:
          "En la configuración de un `Ingress` de Kubernetes, la sección `rules` define cómo se enruta el tráfico entrante a los ____.",
        answer: "Servicios (Services)",
      },
      {
        prompt: "¿Qué es un `ServiceAccount` en Kubernetes?",
        answer:
          "Proporciona una identidad para los procesos que se ejecutan en un Pod, que puede ser utilizada para autenticarse en el servidor de la API.",
      },
      {
        prompt:
          "En el patrón de microservicios, las preocupaciones transversales (cross-cutting concerns) como el logging y la monitorización son gestionadas idealmente por un servicio ____.",
        answer: "separado, como un sidecar",
      },
      {
        prompt:
          "En un archivo YAML de Kubernetes, `apiVersion: apps/v1` y `kind: Deployment` indican que se está definiendo un objeto de tipo ____.",
        answer: "Deployment",
      },
      {
        prompt:
          "En Helm, para ver los valores de configuración de una release ya instalada, se utiliza el comando `helm get ____ <nombre-release>`.",
        answer: "values",
      },
      {
        prompt:
          "La característica de Kubernetes que permite escalar una aplicación hacia arriba o hacia abajo con un simple comando o automáticamente se conoce como _____.",
        answer: "Escalado horizontal (Horizontal Scaling)",
      },
      {
        prompt: "¿Qué significa la sigla CRI en el contexto de Kubernetes?",
        answer: "Significa Container Runtime Interface.",
      },
      {
        prompt:
          "El `Cluster Operator` de Strimzi es el componente principal que gestiona el ciclo de vida de los clústeres de ____ en Kubernetes.",
        answer: "Kafka",
      },
      {
        prompt:
          "En la configuración de `livenessProbe` en Kubernetes, `initialDelaySeconds` define el tiempo de espera antes de que se realice la ____.",
        answer: "primera sonda (first probe)",
      },
      {
        prompt:
          "La propiedad `periodSeconds` en una sonda de Kubernetes especifica la ____ con la que se realiza la comprobación de salud.",
        answer: "frecuencia",
      },
      {
        prompt:
          "En la configuración de autenticación de un listener de Kafka en Strimzi, se pueden usar tipos como `tls`, `scram-sha-512` y ____.",
        answer: "`oauth`",
      },
      {
        prompt:
          "¿Qué es la 'observabilidad' en el contexto de sistemas distribuidos como Kubernetes?",
        answer:
          "Es la capacidad de medir el estado interno de un sistema a partir de los datos que genera, como logs, métricas y trazas.",
      },
      {
        prompt:
          "Para evitar que Docker utilice la caché para una instrucción específica y todas las subsiguientes en una compilación, se puede usar el flag ____ en el comando `docker build`.",
        answer: "--no-cache",
      },
      {
        prompt:
          "En una arquitectura de microservicios, ¿qué principio se viola cuando múltiples equipos implementan soluciones repetidas para necesidades comunes?",
        answer: 'El principio "Don\'t Repeat Yourself" (DRY).',
      },
      {
        prompt:
          "En Strimzi, ¿cómo se puede configurar el registro (logging) para los componentes de Kafka utilizando una configuración externa en lugar de en línea?",
        answer:
          "Estableciendo `logging.type` en `external` y especificando el nombre de un ConfigMap en `logging.name`.",
      },
      {
        prompt:
          "El comando `kubectl top pod <nombre-del-pod>` se utiliza para ver el uso actual de ____ y ____ del pod.",
        answer: "CPU y memoria",
      },
      {
        prompt:
          "En el contexto de la seguridad de Docker, el aislamiento de contenedores con un espacio de nombres de usuario ayuda a mitigar las vulnerabilidades de escalada de ____.",
        answer: "privilegios",
      },
      {
        prompt:
          "En la configuración de un `Service` de Kubernetes de tipo `NodePort`, se expone el servicio en un puerto estático en la ____ de cada nodo.",
        answer: "dirección IP",
      },
      {
        prompt:
          "Una de las ventajas de Apache Spark sobre MapReduce de Hadoop es su capacidad de computación en ____, que lo hace significativamente más rápido.",
        answer: "memoria (in-memory)",
      },
      {
        prompt:
          "En el contexto de Strimzi y Kafka, la propiedad `superUsers` en la configuración de autorización define una lista de principales de usuario con ____.",
        answer: "derechos de acceso ilimitados",
      },
      {
        prompt:
          "En un entorno GitOps, el estado deseado de la infraestructura y las aplicaciones se declara de forma declarativa en un repositorio ____.",
        answer: "Git",
      },
      {
        prompt:
          "Para usar la autenticación mutua TLS (mTLS) en un listener de Kafka, tanto el cliente como el servidor se validan mutuamente mediante ____.",
        answer: "certificados",
      },
      {
        prompt:
          "En Helm, la validación de esquemas (schema validation) se puede implementar usando un archivo llamado `____` para asegurar que solo se acepten entradas válidas.",
        answer: "values.schema.json",
      },
    ],
  },
  {
    id: "spring_ai",
    name: "Spring Ai",
    cards: [
      {
        prompt:
          "¿Qué combinación tecnológica mostró el mejor rendimiento en escenarios de alto conteo de usuarios según los benchmarks de Project Loom?",
        answer: "Virtual Threads (hilos virtuales) sobre Netty.",
      },
      {
        prompt:
          "¿Por qué no se recomiendan los hilos virtuales (Virtual Threads) sobre Tomcat para escenarios con un número masivo de usuarios?",
        answer:
          "Debido a un uso de recursos considerablemente mayor y la aparición de errores por tiempo de espera (timeout).",
      },
      {
        prompt:
          "En los benchmarks de Spring Boot, ¿qué propósito cumple el parámetro delayCallDepth?",
        answer:
          "Simular llamadas recursivas a servicios ascendentes (upstream) para evaluar la reutilización de hilos de la plataforma.",
      },
      {
        prompt:
          "Según los resultados de rendimiento, ¿en qué porcentaje aproximado de los escenarios los Virtual Threads sobre Netty superaron a Project Reactor?",
        answer: "En aproximadamente un 45% de los casos.",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de usar WebFlux o Virtual Threads en microservicios con alta concurrencia?",
        answer:
          "Reducir la sobrecarga de recursos al mapear solicitudes entrantes a muy pocos hilos del sistema operativo compartidos.",
      },
      {
        prompt:
          "¿Qué herramienta se utiliza para generar los informes de comparación y los gráficos PNG en el proyecto de benchmarks de Chris Gleissner?",
        answer: "Python 3 con la librería Matplotlib.",
      },
      {
        prompt:
          "¿Qué objeto de Spring AI proporciona una API fluida para comunicarse con modelos de IA de forma sincrónica o por streaming?",
        answer: "ChatClient.",
      },
      {
        prompt:
          "En Spring AI, ¿cuál es la función de los 'Advisors' (asesores) en la cadena de llamadas del ChatClient?",
        answer:
          "Interceptar, modificar y mejorar las interacciones con el modelo de IA, como añadir historial o datos de contexto.",
      },
      {
        prompt:
          "¿Qué método del ChatClient.Builder permite configurar parámetros globales para todas las llamadas, como la salida estructurada nativa?",
        answer: "defaultAdvisors().",
      },
      {
        prompt:
          "¿Cómo se obtiene el contenido de la respuesta de un modelo de IA en formato String utilizando la API de ChatClient?",
        answer: "Invocando el método content() después de call().",
      },
      {
        prompt:
          "En el contexto de RAG con Spring AI, ¿qué hace el QuestionAnswerAdvisor?",
        answer:
          "Añade información de contexto relevante al prompt basándose en el texto del usuario mediante una búsqueda previa.",
      },
      {
        prompt:
          "¿Cuál es la implementación predeterminada de memoria de chat en Spring AI que mantiene una ventana limitada de mensajes?",
        answer: "MessageWindowChatMemory.",
      },
      {
        prompt:
          "¿Qué sucede con los mensajes del sistema en MessageWindowChatMemory cuando se excede el límite de tamaño de la ventana?",
        answer:
          "Los mensajes del sistema se preservan mientras que los mensajes antiguos de usuario o asistente son desalojados.",
      },
      {
        prompt:
          "¿Qué propiedad debe establecerse en false para deshabilitar la autoconfiguración de ChatClient.Builder en Spring AI?",
        answer: "spring.ai.chat.client.enabled.",
      },
      {
        prompt:
          "En Spring Integration, ¿qué componente se encarga de transformar los datos de entrada, como extraer el título de un feed RSS?",
        answer: "Un <int:transformer>.",
      },
      {
        prompt:
          "¿Qué tipo de adaptador de canal se utiliza en Spring Integration para escribir datos procesados en un archivo local?",
        answer:
          "Un adaptador de salida (outbound-channel-adapter) del namespace file.",
      },
      {
        prompt:
          "En el desarrollo con Spring Boot y OAuth2, ¿cuál es el endpoint predeterminado que suele devolver los detalles del usuario autenticado en formato JSON?",
        answer: "/user.",
      },
      {
        prompt:
          "¿Qué especificación de autenticación abierta sigue la implementación de Google OAuth 2.0?",
        answer: "OpenID Connect 1.0.",
      },
      {
        prompt:
          "¿Cuál es la línea de base (baseline) de Jakarta EE para Spring AI 2.0.0-M1?",
        answer: "Jakarta EE 11.",
      },
      {
        prompt:
          "¿Qué repositorio de memoria de chat se añadió en Spring AI 2.0.0-M1 para permitir el almacenamiento persistente mediante una base de datos NoSQL clave-valor?",
        answer: "Redis Chat Memory Repository.",
      },
      {
        prompt:
          "En Spring AI 2.0.0-M1, ¿cuál es el modelo de chat predeterminado para la integración oficial de OpenAI?",
        answer: "gpt-4o-mini.",
      },
      {
        prompt:
          "¿Qué nueva capacidad permite a los modelos de Anthropic Claude referenciar partes específicas de documentos proporcionados en sus respuestas?",
        answer: "La API de Citaciones (Citations API).",
      },
      {
        prompt:
          "¿Qué anotación de Spring Boot inicia el proceso de autoconfiguración al escanear el classpath?",
        answer: "@EnableAutoConfiguration.",
      },
      {
        prompt:
          "¿Qué archivo JAR de Spring Boot contiene la lógica principal de autoconfiguración para MVC, datos y otros frameworks?",
        answer: "spring-boot-autoconfigure.jar.",
      },
      {
        prompt:
          "¿Cuál es la función del archivo spring.factories en el mecanismo de autoconfiguración de Spring Boot?",
        answer:
          "Definir las clases de configuración que deben cargarse automáticamente si se cumplen ciertas condiciones.",
      },
      {
        prompt:
          "¿Qué anotación compuesta de Spring Boot incluye @Configuration, @EnableAutoConfiguration y @ComponentScan?",
        answer: "@SpringBootApplication.",
      },
      {
        prompt:
          "¿Cuál es el cambio principal en la estructura de Spring Boot 4 respecto a la autoconfiguración?",
        answer:
          "Se ha vuelto modular, dividiendo el JAR masivo de autoconfiguración en módulos más pequeños y enfocados.",
      },
      {
        prompt:
          "¿Qué atributo se introdujo en @RequestMapping en Spring Boot 4 para manejar el versionado de APIs de forma nativa?",
        answer: "El atributo version.",
      },
      {
        prompt:
          "En Spring Boot 4, ¿qué biblioteca se adoptó para estandarizar la seguridad contra valores nulos (null safety)?",
        answer: "JSpecify.",
      },
      {
        prompt:
          "¿Qué anotación de JSpecify se utiliza en un archivo package-info.java para declarar que todo en el paquete es no nulo por defecto?",
        answer: "@NullMarked.",
      },
      {
        prompt:
          "¿Qué característica de Spring Boot 4 permite definir clientes HTTP mediante interfaces sin depender de bibliotecas externas como OpenFeign?",
        answer:
          "Los clientes HTTP declarativos nativos (Declarative HTTP Clients).",
      },
      {
        prompt:
          "¿Qué nueva capacidad de monitoreo automático se añadió al Actuator de Spring Boot 4 para evitar fallos de seguridad críticos?",
        answer:
          "El monitoreo de certificados SSL (SSL Certificate Monitoring).",
      },
      {
        prompt: "En el núcleo de Spring, ¿qué es un 'Bean'?",
        answer:
          "Un objeto que es instanciado, ensamblado y gestionado por el contenedor de Inversión de Control (IoC) de Spring.",
      },
      {
        prompt:
          "¿Qué diferencia hay entre autowiring por tipo y por nombre en Spring?",
        answer:
          "Por tipo busca una coincidencia de clase/interfaz, mientras que por nombre busca una coincidencia con el ID del bean.",
      },
      {
        prompt:
          "¿Qué anotación se utiliza para resolver la ambigüedad cuando existen múltiples beans del mismo tipo y se desea priorizar uno por nombre?",
        answer: "@Qualifier.",
      },
      {
        prompt:
          "¿Qué patrón de diseño utiliza principalmente el framework de Programación Orientada a Aspectos (AOP) de Spring?",
        answer: "El patrón Proxy (Proxy pattern).",
      },
      {
        prompt:
          "¿Cuál es el componente de Spring MVC que actúa como controlador frontal (Front Controller) para despachar solicitudes?",
        answer: "DispatcherServlet.",
      },
      {
        prompt:
          "En Spring MVC, ¿qué interfaz es responsable de mapear una solicitud a un controlador específico basándose en la URL?",
        answer: "HandlerMapping.",
      },
      {
        prompt:
          "¿Qué motor de plantillas moderno se utiliza frecuentemente con Spring MVC como alternativa a JSP?",
        answer: "Thymeleaf.",
      },
      {
        prompt:
          "¿Cuál es la diferencia fundamental entre Spring WebFlux y Spring MVC?",
        answer:
          "Spring MVC es bloqueante y basado en servlets, mientras que WebFlux es no bloqueante y basado en flujos reactivos.",
      },
      {
        prompt:
          "¿Qué herramienta de Google Cloud permite la resolución de nombres de servicios en Kubernetes mediante DNS interno?",
        answer: "Kf (basado en el DNS de Kubernetes).",
      },
      {
        prompt:
          "¿Bajo qué circunstancias es preferible usar DNS de Kubernetes en lugar de Netflix Eureka para el descubrimiento de servicios?",
        answer:
          "Cuando se trabaja en entornos políglotas (múltiples lenguajes) o se desea depender únicamente de la infraestructura nativa de Kubernetes.",
      },
      {
        prompt:
          "¿Qué puerto TCP mapea Kf por defecto para que las aplicaciones se comuniquen entre sí dentro de un espacio?",
        answer: "El puerto 80.",
      },
      {
        prompt:
          "En Kubernetes, ¿qué tipo de servicio permite redirigir solicitudes DNS a una autoridad externa mediante un registro CNAME?",
        answer: "ExternalName.",
      },
      {
        prompt:
          "¿Cuál es la principal debilidad de Spring Cloud cuando se compara con soluciones nativas de Kubernetes?",
        answer:
          "Está limitado principalmente al ecosistema Java y requiere que las aplicaciones gestionen lógica de infraestructura en el código.",
      },
      {
        prompt:
          "¿Qué patrón utiliza Spring AI para permitir que un modelo de chat 'recuerde' el contexto de una conversación?",
        answer:
          "El patrón de historial de conversación (Chat Memory) enviado con cada nueva solicitud.",
      },
      {
        prompt:
          "¿Qué implementación de ChatMemoryRepository en Spring AI permite el almacenamiento en una base de datos relacional mediante JDBC?",
        answer: "JdbcChatMemoryRepository.",
      },
      {
        prompt:
          "¿Qué anotación de Spring se utiliza para marcar una clase como fuente de definiciones de beans?",
        answer: "@Configuration.",
      },
      {
        prompt:
          "¿Cómo se define una tarea de procesamiento por lotes que lee, procesa y escribe volúmenes masivos de datos en Spring?",
        answer:
          "Mediante el framework Spring Batch, utilizando un Job compuesto por uno o más Steps.",
      },
      {
        prompt:
          "En Spring Integration, ¿qué componente separa una carga útil (payload) grande en varias más pequeñas?",
        answer: "Un Splitter.",
      },
      {
        prompt:
          "¿Qué protocolo de comunicación permite canales full-duplex sobre una conexión TCP y es soportado por Spring para aplicaciones en tiempo real?",
        answer: "WebSocket.",
      },
      {
        prompt:
          "Según la arquitectura de microservicios, ¿qué componente de Spring Cloud se encarga de centralizar la configuración externa?",
        answer: "Spring Cloud Config Server.",
      },
      {
        prompt:
          "¿Qué anotación de Spring Boot permite activar el soporte para perfiles específicos (como 'dev' o 'prod')?",
        answer: "@Profile.",
      },
      {
        prompt:
          "Dentro de Spring Boot 4, ¿cómo se configura la estrategia de versionado de API para que sea basada en la ruta (path-based)?",
        answer:
          "Configurando el ApiVersionStrategy para usar un patrón de URI como /api/v{version}/.",
      },
      {
        prompt:
          "¿Qué herramienta web permite generar proyectos de Spring Boot con dependencias preconfiguradas?",
        answer: "Spring Initializr (start.spring.io).",
      },
      {
        prompt:
          "¿Qué anotación se usa para inyectar una dependencia de forma automática en un campo, constructor o setter?",
        answer: "@Autowired.",
      },
      {
        prompt: "¿Cuál es la diferencia entre @Component y @Bean?",
        answer:
          "@Component es para detección automática de clases, mientras que @Bean se usa en métodos de configuración para registrar objetos manualmente.",
      },
      {
        prompt:
          "En el contexto de Spring Framework, ¿qué significa 'Inversión de Control' (IoC)?",
        answer:
          "Es el proceso donde el contenedor asume la responsabilidad de instanciar y gestionar el ciclo de vida de los objetos en lugar del desarrollador.",
      },
      {
        prompt:
          "¿Qué anotación de JSpecify indica que un valor de retorno o parámetro *podría* ser nulo y debe ser verificado?",
        answer: "@Nullable.",
      },
      {
        prompt:
          "¿Qué propiedad de Spring Boot se usa para habilitar el registro detallado (logging) del proceso de autoconfiguración?",
        answer: "debug=true (en application.properties).",
      },
      {
        prompt:
          "¿Qué componente de Spring Integration combina múltiples mensajes relacionados en un solo resultado?",
        answer: "Un Aggregator.",
      },
      {
        prompt:
          "En Spring Cloud Gateway, ¿cuál es el nuevo nombre del artefacto para el servidor basado en WebFlux a partir de la versión 2025.0?",
        answer: "spring-cloud-gateway-server-webflux.",
      },
      {
        prompt:
          "¿Qué dependencia de Spring Boot 3.5.0 obligó a actualizar a Fabric8 7.3.1 en Spring Cloud Kubernetes?",
        answer: "Jackson 2.19.x.",
      },
      {
        prompt:
          "¿Qué método de autenticación para backends de Vault se añadió en Application Services 3.3.4?",
        answer: "El método AppRole.",
      },
      {
        prompt:
          "¿Qué anotación de Spring permite aplicar lógica antes, después o alrededor de la ejecución de un método sin modificar su código?",
        answer: "@Around (en el contexto de AOP).",
      },
      {
        prompt: "En Spring AI, ¿qué hace el SimpleLoggerAdvisor?",
        answer:
          "Registra (logs) los datos de las solicitudes y respuestas del ChatClient para depuración.",
      },
      {
        prompt:
          "¿Qué anotación de Spring MVC se utiliza para mapear una variable de la URL a un parámetro de un método del controlador?",
        answer: "@PathVariable.",
      },
      {
        prompt:
          "¿Cómo se activa un perfil específico de Spring Boot desde la línea de comandos?",
        answer:
          "Usando el argumento --spring.profiles.active=nombre_del_perfil.",
      },
      {
        prompt:
          "¿Qué interfaz de Spring se debe implementar para ejecutar código justo después de que la aplicación se haya iniciado?",
        answer: "CommandLineRunner o ApplicationRunner.",
      },
      {
        prompt:
          "¿Qué ventaja ofrece el uso de RestClient sobre RestTemplate en versiones recientes de Spring?",
        answer:
          "Ofrece una API fluida y moderna, similar a la de WebClient, pero para aplicaciones imperativas sincrónicas.",
      },
      {
        prompt:
          "¿Qué anotación habilita el soporte de Programación Orientada a Aspectos basada en anotaciones de AspectJ?",
        answer: "@EnableAspectJAutoProxy.",
      },
      {
        prompt:
          "En Spring Data, ¿qué interfaz permite realizar operaciones CRUD básicas sin escribir implementaciones?",
        answer: "CrudRepository.",
      },
      {
        prompt:
          "¿Qué mecanismo utiliza Spring Boot para cargar archivos de propiedades específicos del entorno, como application-test.yml?",
        answer: "Carga de perfiles (Profiles).",
      },
      {
        prompt:
          "En Spring AI 2.0.0-M1, ¿qué mejora se añadió al vector store de Redis?",
        answer:
          "Capacidades de búsqueda de texto, consultas por rango y ajuste de parámetros del índice HNSW.",
      },
      {
        prompt:
          "¿Qué puerto se utiliza tradicionalmente para acceder a la base de datos H2 en memoria durante el desarrollo con Spring Boot?",
        answer: "El puerto 8080 (a través de /h2-console si está habilitado).",
      },
      {
        prompt:
          "En Spring Integration, ¿qué adaptador permite integrar sistemas que usan el protocolo AMQP como RabbitMQ?",
        answer:
          "Los adaptadores amqp-inbound-channel-adapter y amqp-outbound-channel-adapter.",
      },
      {
        prompt:
          "¿Qué anotación de Spring Boot permite activar el binding de propiedades de archivos YAML o properties a objetos Java?",
        answer: "@ConfigurationProperties.",
      },
      {
        prompt:
          "¿Cuál es la función del componente MultipartResolver en Spring MVC?",
        answer:
          "Facilitar la carga de archivos (file uploads) envolviendo las solicitudes HTTP entrantes.",
      },
      {
        prompt:
          "En el contexto de Spring Security, ¿qué componente se encarga de decidir si un usuario autenticado tiene permiso para acceder a un recurso?",
        answer: "El AccessDecisionManager (o los nuevos AuthorizationManager).",
      },
      {
        prompt:
          "¿Qué biblioteca de Java utiliza Spring AI para renderizar plantillas de prompts por defecto?",
        answer: "StringTemplate (ST).",
      },
      {
        prompt:
          "¿Qué significa que el modelo de programación de Spring sea 'no intrusivo'?",
        answer:
          "Que las clases de la aplicación no necesitan heredar de clases de Spring ni implementar sus interfaces en la mayoría de los casos.",
      },
      {
        prompt:
          "En Spring Boot 4, ¿cómo se puede activar el monitoreo del tiempo de ejecución de un método mediante Micrometer?",
        answer: "Añadiendo la anotación @Observed al método.",
      },
      {
        prompt:
          "¿Qué motor de base de datos vectorial se utiliza como backend cuando se configura el PgVectorStore en Spring AI?",
        answer: "PostgreSQL con la extensión pgvector.",
      },
    ],
  },
];
