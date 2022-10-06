# Loop

Loop allows you to repeat specific block of codes as long as the condition are met.
There are different type of loops: <br/> **For Loop** <br/>**While Loop**

## While Loop

The while statement checks a condition and executes the statement or statement block following the while. It repeatedly checks the condition, executing those statements until the condition is false.

There's one other new operator in this example. The ++ after the counter variable is the increment operator. It adds 1 to the value of counter and stores that value in the counter variable.

```csharp
int counter = 0;
while (counter < 10)
{
    Console.WriteLine($"Hello World! The counter is {counter}");
    counter++;
}
```

***Note:***<br/>
The while loop tests the condition before executing the code following the while.

***Important*** <br/>
Make sure that the while loop condition changes to false as you execute the code. Otherwise, you create an infinite loop where your program never ends. That is not demonstrated in this sample, because you have to force your program to quit using CTRL-C or other means.

## For loop
For loop is commonly referred to as counted loopd