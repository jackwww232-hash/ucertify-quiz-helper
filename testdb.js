quiz = {
  "Which of the following are true for the given declaration?\n\n\nCopy \n\nvar is = IntStream.empty();": [
    "is.findAny() returns the type OptionalInt.",
    "is.sum() returns the type int."
  ],
  "Assume that the directory /animals exists and is empty. What is the result of executing the following code?\n\n\n\nPath path = Path.of(\"/animals\");\ntry (var z = Files.walk(path)) {\n   boolean b = z\n      .filter((p,a) -> a.isDirectory() && !path.equals(p)) // x\n      .findFirst().isPresent();  // y\n   System.out.print(b ? \"No Sub\": \"Has Sub\");\n}": [
    "The code will not compile because of line x."
  ],
  "Which of the following statements are true about this code?\n\n\n\nPredicate<String> empty = String::isEmpty;\nPredicate<String> notEmpty = empty.negate();\n\nvar result = Stream.generate(() -> \"\")\n   .limit(10)\n   .filter(notEmpty)\n   .collect(Collectors.groupingBy(k -> k))\n   .entrySet()\n   .stream()\n   .map(Entry::getValue)\n   .flatMap(Collection::stream)\n   .collect(Collectors.partitioningBy(notEmpty));\nSystem.out.println(result);": [
    "If we changed line 12 from partitioningBy(notEmpty) to groupingBy(n -> n), it would output {}.",
    "It outputs {false=[], true=[]}."
  ],
  "Which of the following throw an exception when an Optional is empty?": [
    "opt.orElseThrow();",
    "opt.orElseThrow(RuntimeException::new);",
    "opt.get();"
  ],
  "What is the output of the following?\n\n\n\npublic class Paging {\n   record Sesame(String name, boolean human)  {\n      @Override public String toString() {\n         return name();\n      }\n   }\n   record Page(List<Sesame> list, long count)  {}\n\n   public static void main(String[] args) {\n      var monsters = Stream.of(new Sesame(\"Elmo\", false));\n      var people = Stream.of(new Sesame(\"Abby\", true));\n      printPage(monsters, people);\n   }\n\n   private static void printPage(Stream<Sesame> monsters,\n         Stream<Sesame> people) {\n      Page page = Stream.concat(monsters, people)\n         .collect(Collectors.teeing(\n            Collectors.filtering(s -> s.name().startsWith(\"E\"),\n               Collectors.toList()),\n            Collectors.counting(),\n            (l, c) -> new Page(l, c)));\n      System.out.println(page);\n   } }": [
    "Page[list=[Elmo], count=2]"
  ],
  "What could be the output of the following code snippet?\n\n\n\nvar stream = Stream.iterate(\"\", (s) -> s + \"1\");\nSystem.out.println(stream.limit(2).map(x -> x + \"2\"));": [
    "java.util.stream.ReferencePipeline$3@4517d9a3"
  ],
  "Which of the following sets result to 8.0?": [
    "double result = LongStream.of(6L, 8L, 10L).mapToInt(x -> (int) x).boxed().collect(Collectors.groupingBy(x -> x, Collectors.toSet())).keySet().stream().collect(Collectors.averagingInt(x -> x));",
    "double result = LongStream.of(6L, 8L, 10L).mapToInt(x -> (int) x).boxed().collect(Collectors.groupingBy(x -> x)).keySet().stream().collect(Collectors.averagingInt(x -> x));"
  ],
  "Given the four statements (L, M, N, O), select and order the ones that would complete the expression and cause the code to output 10 lines.\n\n\n\nStream.generate(() -> \"1\")\n   L: .filter(x -> x.length()> 1)\n   M: .forEach(System.out::println)\n   N: .limit(10)\n   O: .peek(System.out::println)\n;": [
    "N, M"
  ],
  "What is the simplest way of rewriting this code?\n\n\n\nList<Integer> x = IntStream.range(1, 6)\n   .mapToObj(i -> i)\n   .collect(Collectors.toList());\nx.forEach(System.out::println);": [
    "IntStream.range(1, 6).forEach(System.out::println);"
  ],
  "What is the output of the following code?\n\n\n\nvar spliterator = Stream.generate(() -> \"x\")\n   .spliterator();\n\nspliterator.tryAdvance(System.out::print);\nvar split = spliterator.trySplit();\nsplit.tryAdvance(System.out::print);": [
    "xx"
  ],
  "What could be the output of the following?\n\n\n\nPredicate<String> predicate = s -> s.startsWith(\"g\");\nvar stream1 = Stream.generate(() -> \"growl!\");\nvar stream2 = Stream.generate(() -> \"growl!\");\nvar b1 = stream1.anyMatch(predicate);\nvar b2 = stream2.allMatch(predicate);\nSystem.out.println(b1 + \" \" + b2);": [
    "The code hangs."
  ],
  "Which of the following are true?\n\n\n\nStream<Integer> s = Stream.of(1);\nIntStream is = s.boxed();\nDoubleStream ds = s.mapToDouble(x -> x);\nStream<Integer> s2 = ds.mapToInt(x -> x);\ns2.forEach(System.out::print);": [
    "Line 4 causes a compiler error.",
    "Line 2 causes a compiler error."
  ],
  "We have a method that returns a sorted list without changing the original. Which of the following can replace the method implementation to do the same with streams?\n\n\n\nprivate static List<String> sort(List<String> list) {\n   var copy = new ArrayList<String>(list);\n   Collections.sort(copy, (a, b) -> b.compareTo(a));\n   return copy;\n}": [
    "return list.stream().sorted((a, b) -> b.compareTo(a)).collect(Collectors.toList());"
  ],
  "What is the result of the following code?\n\n\n\nvar s = DoubleStream.of(1.2, 2.4);\ns.peek(System.out::println).filter(x -> x> 2).count();": [
    "1.2 and 2.4"
  ],
  "Which of the following can fill in the blank so that the code prints out false?\n\n\n\nvar s = Stream.generate(() -> \"meow\");\nvar match = s.______(String::isEmpty);\nSystem.out.println(match);": [
    "allMatch"
  ],
  "What could be the output of the following?\n\n\n\nPredicate<String> predicate = s -> s.length()> 3;\nvar stream = Stream.iterate(\"-\",\n    s -> ! s.isEmpty(), (s) -> s + s);\nvar b1 = stream.noneMatch(predicate);\nvar b2 = stream.anyMatch(predicate);\nSystem.out.println(b1 + \" \" + b2);": [
    "An exception is thrown."
  ],
  "Which are true statements about terminal operations in a stream that runs successfully?": [
    "At most one terminal operation can exist in a stream pipeline.",
    "Terminal operations are a required part of the stream pipeline in order to get a result."
  ],
  "Which of the following can we add after line 3 for the code to run without error and not produce any output?\n\n\n\nvar stream = LongStream.of(1, 2, 3);\nvar opt = stream.map(n -> n * 10)\n   .filter(n -> n < 5).findFirst();": [
    "opt.ifPresent(System.out::println);",
    "if (opt.isPresent())   System.out.println(opt.getAsLong());"
  ],
  "What changes need to be made together for this code to print the string 12345?\n\n\n\nStream.iterate(1, x -> x++)\n   .limit(5).map(x -> x)\n   .collect(Collectors.joining());": [
    "Change map(x -> x) to map(x -> \"\" + x).",
    "Change x -> x++ to x -> ++x.",
    "Wrap the entire line in a System.out.print statement."
  ],
  "Which of the following is true?\n\n\n\nList<Integer> x1 = List.of(1, 2, 3);\nList<Integer> x2 = List.of(4, 5, 6);\nList<Integer> x3 = List.of();\nStream.of(x1, x2, x3).map(x -> x + 1)\n   .flatMap(x -> x.stream())\n   .forEach(System.out::print);": [
    "The code does not compile."
  ],
  "Given the generic type String, the partitioningBy() collector creates a Map<Boolean, List<String>> when passed to collect() by default. When a downstream collector is passed to partitioningBy(), which return types can be created?": [
    "Map<Boolean, Set<String>>",
    "Map<Boolean, List<String>>"
  ],
  "Which is true of the following code?\n\n\n\nSet<String> birds = Set.of(\"oriole\", \"flamingo\");\nStream.concat(birds.stream(), birds.stream(), birds.stream())\n   .sorted()       // line X\n   .distinct()\n   .findAny()\n   .ifPresent(System.out::println);": [
    "The code does not compile."
  ]
}