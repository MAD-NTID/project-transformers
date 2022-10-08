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
For loop is commonly referred to as counted looped.
```text
for (int index = 0; index < 10; index++)
{
    Console.WriteLine($"Hello World! The index is {index}");
}
```

The previous code does the same work as the while loop and the do loop you've already used. The for statement has three parts that control how it works.

The first part is the for **initializer**: int index = 0; declares that index is the loop variable, and sets its initial value to 0.

The middle part is the for **condition**: index < 10 declares that this for loop continues to execute as long as the value of counter is less than 10.

The final part is the for **iterator**: index++ specifies how to modify the loop variable after executing the block following the for statement. Here, it specifies that index should be incremented by 1 each time the block executes.

Experiment yourself. Try each of the following variations:

Change the initializer to start at a different value.
Change the condition to stop at a different value.
When you're done, let's move on to write some code yourself to use what you've learned.