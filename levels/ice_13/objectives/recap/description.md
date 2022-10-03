# Array
Arrays are used to store multiple values in a single variable, instead of declaring separate variables for each value.

To declare an array, define the variable type with square brackets:
```text
string[] cars;
```

We have now declared a variable that holds an array of strings.

To insert values to it, we can use an array literal - place the values in a comma-separated list, inside curly braces:
```text
string[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
```

### Access the Elements of an Array
You access an array element by referring to the index number.

This statement accesses the value of the first element in cars:
```text
string[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
Console.WriteLine(cars[0]);
// Outputs Volvo
```
[Read More](https://www.w3schools.com/cs/cs_arrays.php)
