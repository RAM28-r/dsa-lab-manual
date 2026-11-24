// Edit this file to change a manual or its code.
// Code is inside String.raw`...` so backslashes stay as typed.
// Do not put a backtick (`) or ${ inside the code.

const experiments = [
{
  title: "Doubly Circular Linked List",
  manual: "Write a program in Python/C++ to implement a Doubly Circular Linked List for employee records. Perform operations such as insertion, deletion, and traversal.",
  code: String.raw`class Node:
    def __init__(self, emp_id, name, salary):
        self.emp_id, self.name, self.salary = emp_id, name, salary
        self.next = self.prev = None


class DoublyCircularList:
    def __init__(self):
        self.head = None

    def insert(self, emp_id, name, salary):
        node = Node(emp_id, name, salary)
        if self.head is None:
            node.next = node.prev = node
            self.head = node
        else:
            tail = self.head.prev
            tail.next, node.prev = node, tail
            node.next, self.head.prev = self.head, node
        print("Inserted:", name)

    def delete(self, emp_id):
        if self.head is None:
            print("List is empty")
            return
        cur = self.head
        while True:
            if cur.emp_id == emp_id:
                if cur.next is cur:
                    self.head = None
                else:
                    cur.prev.next = cur.next
                    cur.next.prev = cur.prev
                    if cur is self.head:
                        self.head = cur.next
                print("Deleted:", cur.name)
                return
            cur = cur.next
            if cur is self.head:
                break
        print("Employee not found")

    def traverse(self, reverse=False):
        if self.head is None:
            print("List is empty")
            return
        start = self.head.prev if reverse else self.head
        cur = start
        print("ID\tName\tSalary")
        while True:
            print(cur.emp_id, cur.name, cur.salary, sep="\t")
            cur = cur.prev if reverse else cur.next
            if cur is start:
                break


lst = DoublyCircularList()
while True:
    print("\n1.Insert  2.Delete  3.Traverse forward  4.Traverse backward  5.Exit")
    ch = input("Choice: ")
    if ch == "1":
        lst.insert(int(input("ID: ")), input("Name: "), float(input("Salary: ")))
    elif ch == "2":
        lst.delete(int(input("ID to delete: ")))
    elif ch == "3":
        lst.traverse()
    elif ch == "4":
        lst.traverse(reverse=True)
    elif ch == "5":
        break
    else:
        print("Invalid choice")
`
},
{
  title: "Linear Search and Binary Search",
  manual: "Write a program in Python/C++ to implement: Linear Search, Binary Search. Display the number of comparisons and analyze time complexity using step count method.",
  code: String.raw`import math


def linear_search(arr, key):
    comparisons = 0
    for i in range(len(arr)):
        comparisons += 1
        if arr[i] == key:
            return i, comparisons
    return -1, comparisons


def binary_search(arr, key):
    low, high, comparisons = 0, len(arr) - 1, 0
    while low <= high:
        mid = (low + high) // 2
        comparisons += 1
        if arr[mid] == key:
            return mid, comparisons
        if arr[mid] < key:
            low = mid + 1
        else:
            high = mid - 1
    return -1, comparisons


def show(name, pos, count):
    result = "found at index %d" % pos if pos != -1 else "not found"
    print("%-14s: %s | comparisons = %d" % (name, result, count))


arr = sorted(map(int, input("Enter numbers (space separated): ").split()))
key = int(input("Enter key to search: "))
n = len(arr)
print("Sorted array:", arr)

show("Linear Search", *linear_search(arr, key))
show("Binary Search", *binary_search(arr, key))

print("\nStep count analysis for n =", n)
print("Linear Search : best = 1, average = (n+1)/2, worst = n   -> O(n)")
print("Binary Search : best = 1, worst = floor(log2 n) + 1 = %d -> O(log n)"
      % (int(math.log2(n)) + 1))
`
},
{
  title: "Binary Search: Iterative vs Recursive",
  manual: "Write a program in Python/C++ to implement Binary Search using: Iterative approach • Recursive approach. Compare execution time for both approaches.",
  code: String.raw`import time


def binary_iterative(arr, key):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == key:
            return mid
        if arr[mid] < key:
            low = mid + 1
        else:
            high = mid - 1
    return -1


def binary_recursive(arr, key, low, high):
    if low > high:
        return -1
    mid = (low + high) // 2
    if arr[mid] == key:
        return mid
    if arr[mid] < key:
        return binary_recursive(arr, key, mid + 1, high)
    return binary_recursive(arr, key, low, mid - 1)


def measure(func, runs=100000):
    start = time.perf_counter()
    for _ in range(runs):
        func()
    return (time.perf_counter() - start) / runs * 1e6  # microseconds per call


arr = list(range(0, 100000, 2))
key = int(input("Enter key to search (try 99998 or 7): "))

print("Iterative result :", binary_iterative(arr, key))
print("Recursive result :", binary_recursive(arr, key, 0, len(arr) - 1))

t_iter = measure(lambda: binary_iterative(arr, key))
t_rec = measure(lambda: binary_recursive(arr, key, 0, len(arr) - 1))

print("\nIterative time : %.3f microseconds per search" % t_iter)
print("Recursive time : %.3f microseconds per search" % t_rec)
print("Both are O(log n); recursion adds function-call overhead and O(log n) stack space.")
`
},
{
  title: "Bubble, Selection and Insertion Sort",
  manual: "Write a program in Python/C++ to implement the following sorting techniques: Bubble Sort, Selection Sort, Insertion Sort.",
  code: String.raw`def bubble_sort(a):
    a = a[:]
    n = len(a)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return a


def selection_sort(a):
    a = a[:]
    n = len(a)
    for i in range(n - 1):
        m = i
        for j in range(i + 1, n):
            if a[j] < a[m]:
                m = j
        a[i], a[m] = a[m], a[i]
    return a


def insertion_sort(a):
    a = a[:]
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key
    return a


data = list(map(int, input("Enter numbers (space separated): ").split()))
print("Original       :", data)
print("Bubble Sort    :", bubble_sort(data))
print("Selection Sort :", selection_sort(data))
print("Insertion Sort :", insertion_sort(data))
`
},
{
  title: "Quick Sort, Shell Sort and Comparison",
  manual: "Write a program in Python/C++ to implement: Quick Sort, Shell Sort. Compare all sorting algorithms based on: Execution time, Number of comparisons.",
  code: String.raw`import random
import time


def bubble_sort(a):
    c = 0
    n = len(a)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            c += 1
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return c


def selection_sort(a):
    c = 0
    n = len(a)
    for i in range(n - 1):
        m = i
        for j in range(i + 1, n):
            c += 1
            if a[j] < a[m]:
                m = j
        a[i], a[m] = a[m], a[i]
    return c


def insertion_sort(a):
    c = 0
    for i in range(1, len(a)):
        key, j = a[i], i - 1
        while j >= 0:
            c += 1
            if a[j] > key:
                a[j + 1] = a[j]
                j -= 1
            else:
                break
        a[j + 1] = key
    return c


def quick_sort(a):
    count = [0]

    def sort(low, high):
        if low < high:
            pivot, i = a[high], low - 1
            for j in range(low, high):
                count[0] += 1
                if a[j] <= pivot:
                    i += 1
                    a[i], a[j] = a[j], a[i]
            a[i + 1], a[high] = a[high], a[i + 1]
            sort(low, i)
            sort(i + 2, high)

    sort(0, len(a) - 1)
    return count[0]


def shell_sort(a):
    c, n = 0, len(a)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp, j = a[i], i
            while j >= gap:
                c += 1
                if a[j - gap] > temp:
                    a[j] = a[j - gap]
                    j -= gap
                else:
                    break
            a[j] = temp
        gap //= 2
    return c


n = int(input("Enter number of random elements (e.g. 2000): "))
base = [random.randint(1, 10000) for _ in range(n)]

print("\nQuick Sort and Shell Sort demo on first 10 elements")
demo = base[:10]
print("Original:", demo)
d1, d2 = demo[:], demo[:]
quick_sort(d1)
shell_sort(d2)
print("Quick   :", d1)
print("Shell   :", d2)

print("\n%-15s %-18s %s" % ("Algorithm", "Time (ms)", "Comparisons"))
for name, func in [("Bubble", bubble_sort), ("Selection", selection_sort),
                   ("Insertion", insertion_sort), ("Quick", quick_sort),
                   ("Shell", shell_sort)]:
    arr = base[:]
    start = time.perf_counter()
    comps = func(arr)
    ms = (time.perf_counter() - start) * 1000
    assert arr == sorted(base)
    print("%-15s %-18.3f %d" % (name, ms, comps))
`
},
{
  title: "Stack using Doubly Linked List: Infix to Postfix and Evaluation",
  manual: "Write a program in Python/C++ to implement a Stack using Doubly Linked List. Use it to: Convert Infix expression to Postfix, Evaluate Postfix expression.",
  code: String.raw`import re


class Node:
    def __init__(self, data):
        self.data = data
        self.prev = self.next = None


class Stack:
    def __init__(self):
        self.top = None

    def is_empty(self):
        return self.top is None

    def push(self, data):
        node = Node(data)
        node.prev = self.top
        if self.top:
            self.top.next = node
        self.top = node

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack underflow")
        node = self.top
        self.top = node.prev
        if self.top:
            self.top.next = None
        return node.data

    def peek(self):
        return None if self.is_empty() else self.top.data


PREC = {"+": 1, "-": 1, "*": 2, "/": 2, "^": 3}


def infix_to_postfix(expr):
    tokens = re.findall(r"\w+|[^\w\s]", expr)
    out, st = [], Stack()
    for t in tokens:
        if t.isalnum():
            out.append(t)
        elif t == "(":
            st.push(t)
        elif t == ")":
            while st.peek() != "(":
                out.append(st.pop())
            st.pop()
        else:
            while (not st.is_empty() and st.peek() != "("
                   and (PREC[st.peek()] > PREC[t]
                        or (PREC[st.peek()] == PREC[t] and t != "^"))):
                out.append(st.pop())
            st.push(t)
    while not st.is_empty():
        out.append(st.pop())
    return out


def apply(op, a, b):
    return {"+": a + b, "-": a - b, "*": a * b, "/": a / b, "^": a ** b}[op]


def evaluate_postfix(tokens, values):
    st = Stack()
    for t in tokens:
        if t in PREC:
            b, a = st.pop(), st.pop()
            st.push(apply(t, a, b))
        else:
            st.push(float(t) if t.isdigit() else values[t])
    return st.pop()


expr = input("Enter infix expression (e.g. (A+B)*C-D/E or 2+3*4): ")
post = infix_to_postfix(expr)
print("Postfix:", " ".join(post))

values = {}
for t in post:
    if t.isalpha() and t not in values:
        values[t] = float(input("Value of %s: " % t))
print("Result :", evaluate_postfix(post, values))
`
},
{
  title: "Queue using Doubly Linked List",
  manual: "Write a program in Python/C++ to implement a Queue using Doubly Linked List. Perform enqueue and dequeue operations.",
  code: String.raw`class Node:
    def __init__(self, data):
        self.data = data
        self.prev = self.next = None


class Queue:
    def __init__(self):
        self.front = self.rear = None

    def enqueue(self, data):
        node = Node(data)
        if self.rear is None:
            self.front = self.rear = node
        else:
            node.prev = self.rear
            self.rear.next = node
            self.rear = node
        print("Enqueued:", data)

    def dequeue(self):
        if self.front is None:
            print("Queue underflow (empty)")
            return
        data = self.front.data
        self.front = self.front.next
        if self.front:
            self.front.prev = None
        else:
            self.rear = None
        print("Dequeued:", data)

    def display(self):
        if self.front is None:
            print("Queue is empty")
            return
        cur, items = self.front, []
        while cur:
            items.append(str(cur.data))
            cur = cur.next
        print("Front -> " + " <-> ".join(items) + " <- Rear")


q = Queue()
while True:
    print("\n1.Enqueue  2.Dequeue  3.Display  4.Exit")
    ch = input("Choice: ")
    if ch == "1":
        q.enqueue(input("Enter value: "))
    elif ch == "2":
        q.dequeue()
    elif ch == "3":
        q.display()
    elif ch == "4":
        break
    else:
        print("Invalid choice")
`
},
{
  title: "Binary Search Tree and Traversals",
  manual: "Write a program in Python/C++ to create a Binary Search Tree (BST) and perform: Preorder traversal, Inorder traversal, Postorder traversal.",
  code: String.raw`class Node:
    def __init__(self, key):
        self.key = key
        self.left = self.right = None


def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    else:
        print("Duplicate ignored:", key)
    return root


def preorder(root):
    if root:
        print(root.key, end=" ")
        preorder(root.left)
        preorder(root.right)


def inorder(root):
    if root:
        inorder(root.left)
        print(root.key, end=" ")
        inorder(root.right)


def postorder(root):
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.key, end=" ")


root = None
for x in map(int, input("Enter values to insert (space separated): ").split()):
    root = insert(root, x)

print("\nPreorder  :", end=" ")
preorder(root)
print("\nInorder   :", end=" ")
inorder(root)
print("  (sorted order)")
print("Postorder :", end=" ")
postorder(root)
print()
`
},
{
  title: "Singly and Circular Linked Lists",
  manual: "Write a program in Python/C++ to implement different types of linked lists: Singly Linked List, Circular Linked List. Perform operations such as insertion, deletion, and searching.",
  code: String.raw`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class SinglyLinkedList:
    def __init__(self):
        self.head = None

    def insert(self, data):
        node = Node(data)
        if self.head is None:
            self.head = node
            return
        cur = self.head
        while cur.next:
            cur = cur.next
        cur.next = node

    def delete(self, data):
        cur, prev = self.head, None
        while cur and cur.data != data:
            prev, cur = cur, cur.next
        if cur is None:
            print("Value not found")
            return
        if prev:
            prev.next = cur.next
        else:
            self.head = cur.next
        print("Deleted", data)

    def search(self, data):
        cur, pos = self.head, 0
        while cur:
            if cur.data == data:
                return pos
            cur, pos = cur.next, pos + 1
        return -1

    def display(self):
        cur, items = self.head, []
        while cur:
            items.append(str(cur.data))
            cur = cur.next
        print(" -> ".join(items) + " -> None" if items else "List is empty")


class CircularLinkedList:
    def __init__(self):
        self.tail = None  # tail.next is the head

    def insert(self, data):
        node = Node(data)
        if self.tail is None:
            node.next = node
        else:
            node.next = self.tail.next
            self.tail.next = node
        self.tail = node

    def delete(self, data):
        if self.tail is None:
            print("List is empty")
            return
        prev, cur = self.tail, self.tail.next
        while True:
            if cur.data == data:
                if cur is prev:
                    self.tail = None
                else:
                    prev.next = cur.next
                    if cur is self.tail:
                        self.tail = prev
                print("Deleted", data)
                return
            if cur is self.tail:
                break
            prev, cur = cur, cur.next
        print("Value not found")

    def search(self, data):
        if self.tail is None:
            return -1
        cur, pos = self.tail.next, 0
        while True:
            if cur.data == data:
                return pos
            if cur is self.tail:
                return -1
            cur, pos = cur.next, pos + 1

    def display(self):
        if self.tail is None:
            print("List is empty")
            return
        cur, items = self.tail.next, []
        while True:
            items.append(str(cur.data))
            if cur is self.tail:
                break
            cur = cur.next
        print(" -> ".join(items) + " -> (back to head)")


def menu(lst):
    while True:
        print("\n1.Insert  2.Delete  3.Search  4.Display  5.Back")
        ch = input("Choice: ")
        if ch == "1":
            lst.insert(input("Value: "))
        elif ch == "2":
            lst.delete(input("Value: "))
        elif ch == "3":
            pos = lst.search(input("Value: "))
            print("Found at position %d" % pos if pos != -1 else "Not found")
        elif ch == "4":
            lst.display()
        elif ch == "5":
            return
        else:
            print("Invalid choice")


while True:
    print("\n1.Singly Linked List  2.Circular Linked List  3.Exit")
    ch = input("Choice: ")
    if ch == "1":
        menu(SinglyLinkedList())
    elif ch == "2":
        menu(CircularLinkedList())
    elif ch == "3":
        break
`
},
{
  title: "Deque using Linked List",
  manual: "Write a program in Python/C++ to implement a Deque (Double Ended Queue) using linked list and perform insertion and deletion from both ends.",
  code: String.raw`class Node:
    def __init__(self, data):
        self.data = data
        self.prev = self.next = None


class Deque:
    def __init__(self):
        self.front = self.rear = None

    def insert_front(self, data):
        node = Node(data)
        if self.front is None:
            self.front = self.rear = node
        else:
            node.next = self.front
            self.front.prev = node
            self.front = node

    def insert_rear(self, data):
        node = Node(data)
        if self.rear is None:
            self.front = self.rear = node
        else:
            node.prev = self.rear
            self.rear.next = node
            self.rear = node

    def delete_front(self):
        if self.front is None:
            print("Deque underflow (empty)")
            return
        print("Deleted from front:", self.front.data)
        self.front = self.front.next
        if self.front:
            self.front.prev = None
        else:
            self.rear = None

    def delete_rear(self):
        if self.rear is None:
            print("Deque underflow (empty)")
            return
        print("Deleted from rear:", self.rear.data)
        self.rear = self.rear.prev
        if self.rear:
            self.rear.next = None
        else:
            self.front = None

    def display(self):
        cur, items = self.front, []
        while cur:
            items.append(str(cur.data))
            cur = cur.next
        print("Front <-> " + " <-> ".join(items) + " <-> Rear" if items else "Deque is empty")


d = Deque()
while True:
    print("\n1.Insert front  2.Insert rear  3.Delete front  4.Delete rear  5.Display  6.Exit")
    ch = input("Choice: ")
    if ch == "1":
        d.insert_front(input("Value: "))
    elif ch == "2":
        d.insert_rear(input("Value: "))
    elif ch == "3":
        d.delete_front()
    elif ch == "4":
        d.delete_rear()
    elif ch == "5":
        d.display()
    elif ch == "6":
        break
    else:
        print("Invalid choice")
`
},
{
  title: "Infix to Prefix and Postfix, Prefix Evaluation",
  manual: "Write a program in Python/C++ to: Convert Infix expression to Prefix and Postfix, Evaluate Prefix expression.",
  code: String.raw`import re

PREC = {"+": 1, "-": 1, "*": 2, "/": 2, "^": 3}


def tokenize(expr):
    return re.findall(r"\w+|[^\w\s]", expr)


def to_postfix(tokens, prefix_mode=False):
    """Shunting-yard. prefix_mode=True is used on the reversed expression."""
    out, st = [], []
    for t in tokens:
        if t.isalnum():
            out.append(t)
        elif t == "(":
            st.append(t)
        elif t == ")":
            while st[-1] != "(":
                out.append(st.pop())
            st.pop()
        else:
            while st and st[-1] != "(" and (
                    PREC[st[-1]] > PREC[t]
                    or (PREC[st[-1]] == PREC[t] and (t == "^") == prefix_mode)):
                out.append(st.pop())
            st.append(t)
    while st:
        out.append(st.pop())
    return out


def infix_to_postfix(expr):
    return to_postfix(tokenize(expr))


def infix_to_prefix(expr):
    swap = {"(": ")", ")": "("}
    rev = [swap.get(t, t) for t in reversed(tokenize(expr))]
    return list(reversed(to_postfix(rev, prefix_mode=True)))


def apply(op, a, b):
    return {"+": a + b, "-": a - b, "*": a * b, "/": a / b, "^": a ** b}[op]


def evaluate_prefix(tokens, values):
    st = []
    for t in reversed(tokens):  # scan right to left
        if t in PREC:
            a, b = st.pop(), st.pop()
            st.append(apply(t, a, b))
        else:
            st.append(float(t) if t.isdigit() else values[t])
    return st.pop()


expr = input("Enter infix expression (e.g. (A+B)*C-D/E or 2+3*4): ")
pre = infix_to_prefix(expr)
print("Prefix :", " ".join(pre))
print("Postfix:", " ".join(infix_to_postfix(expr)))

values = {}
for t in pre:
    if t.isalpha() and t not in values:
        values[t] = float(input("Value of %s: " % t))
print("Prefix evaluation result:", evaluate_prefix(pre, values))
`
},
{
  title: "Graph Representation and DFS",
  manual: "Write a program in Python/C++ to represent a graph using Adjacency Matrix or Adjacency List and perform Depth First Search (DFS).",
  code: String.raw`class Graph:
    def __init__(self, n):
        self.n = n
        self.matrix = [[0] * n for _ in range(n)]
        self.adj = {i: [] for i in range(n)}

    def add_edge(self, u, v):
        self.matrix[u][v] = self.matrix[v][u] = 1
        self.adj[u].append(v)
        self.adj[v].append(u)

    def show(self):
        print("\nAdjacency Matrix:")
        print("   " + " ".join(str(i) for i in range(self.n)))
        for i, row in enumerate(self.matrix):
            print(i, " ", " ".join(map(str, row)))
        print("\nAdjacency List:")
        for u in self.adj:
            print(u, "->", sorted(self.adj[u]))

    def dfs_recursive(self, start):
        visited, order = set(), []

        def visit(u):
            visited.add(u)
            order.append(u)
            for v in sorted(self.adj[u]):
                if v not in visited:
                    visit(v)

        visit(start)
        return order

    def dfs_iterative(self, start):
        visited, order, stack = set(), [], [start]
        while stack:
            u = stack.pop()
            if u not in visited:
                visited.add(u)
                order.append(u)
                for v in sorted(self.adj[u], reverse=True):
                    if v not in visited:
                        stack.append(v)
        return order


n = int(input("Number of vertices: "))
e = int(input("Number of edges: "))
g = Graph(n)
for _ in range(e):
    u, v = map(int, input("Edge (u v): ").split())
    g.add_edge(u, v)

g.show()
start = int(input("\nStart vertex for DFS: "))
print("DFS (recursive):", g.dfs_recursive(start))
print("DFS (iterative):", g.dfs_iterative(start))
`
}
];
