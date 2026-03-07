import type { TechDeck } from "@/features/data/techDecks_chunks/types";

export const techDecksPart1: TechDeck[] = [
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
];
