# Working with Array, Loop and Assigning array size based on input from the user

In the previous challenge, you assigned a size of 7 to the array. This type of approach
only works if you know the size of the inputs we will be working with. Very often, we do
not know the size of the inputs we might need. In this case, we need to be able to allow
the user to define the size of the array. In order to achieve this, we can declare the array
but doesnt assign any size to it until we get an input from the user.

**Example**
```
//declaring the array
int[] numbers;

//prompt the user for the size of the array
Console.Write("How many numbers do you want to add:");
int size = int.Parse(Console.ReadLine());

//now we assign the size to the array
numbers = new int[size]; //at this point, the array will take whatever size the user
assigned to it at the run time


//rest of the code logic goes here
...
...
...
```

This exercise is similar to the previous exercise, instead of 7 names, you want to allow
the user to define(decide). You will need to assign the user entered size as the size of the array

## Setup
- Create a new project call **UserDefinedArraySize**
- Use loop to prompt the user to enter the names based on the size the user entered
  - The prompt must match the exact wording, "Enter your name:"
- Use another loop to display all names in the array


**ScreenShot**
```
How many names do you want to add:15

Enter your name:Kemoy
Enter your name:Jarvis
Enter your name:Tony
Enter your name:Sam
Enter your name:Bucky
Enter your name:Peter
Enter your name:Scott
...
...
...
...

Kemoy
Jarvis
Tony
Sam
Bucky
Peter
Scott
...
...
...
...
```

***Important***
You MUST use loops to accomplish the challenge, you cannot hardcoded the values