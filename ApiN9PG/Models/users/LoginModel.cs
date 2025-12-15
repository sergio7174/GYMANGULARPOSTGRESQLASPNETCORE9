using System;
/**The using System.Collections.Generic; directive in C# is used to import the System.Collections.Generic namespace, which provides generic collections for storing and manipulating groups of objects. These collections are type-safe, efficient, and widely used in C# applications.
🧩 What It Enables
Generic Collections
Provides access to type-safe collections like:
List<T> – Dynamic array for ordered elements.
Dictionary<TKey, TValue> – Key-value pairs.
Queue<T> – First-in, first-out (FIFO) collection.
Stack<T> – Last-in, first-out (LIFO) collection.
HashSet<T> – Unique elements with fast lookups.
LinkedList<T> – Doubly linked list.
Type Safety
Ensures compile-time type checking, preventing runtime errors like invalid casts.
Performance
Avoids boxing/unboxing for value types (e.g., int, DateTime) compared to non-generic collections like ArrayList.***/
using System.Collections.Generic;
/***The using System.Linq; directive in C# is used to import the System.Linq namespace, which provides Language Integrated Query (LINQ) functionality for querying and manipulating collections of data. This namespace contains extension methods for types like IEnumerable<T> and IQueryable<T>, enabling powerful, readable, and concise data operations.
🧩 What It Enables
LINQ Methods
Provides access to LINQ extension methods like:
Where() – Filters elements.
Select() – Projects elements into a new form.
OrderBy() – Sorts elements.
GroupBy() – Groups elements.
Aggregate() – Performs calculations (e.g., Sum(), Count()).
Query Syntax
Allows the use of LINQ query expressions (e.g., from x in ... select x) for querying collections.***/
using System.Linq;
/**System.Threading.Tasks is fundamental to the Task Asynchronous Programming (TAP) model, which is the standard way to write efficient, non-blocking code using the async and await keywords.**/
using System.Threading.Tasks;

namespace ApiN9PG.Models.users
{
public class LoginModel
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}