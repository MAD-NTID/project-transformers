# Count Up using for loop

For this exercise you will build a program that acts upon the selection of the user. Your 
program will prompt the user for the starting value, the stopping value, whether the user want to count up
or down


## Steps
1. Create a new project **TotalUserControl**
2. Prompt the user for the starting value
   1. If the user enter a negative starting value, you must show "The starting value cannot have negative number"
3. Prompt the user for the stopping value
   1. If the user enter a negative stopping value, you must show "The stopping value cannot have negative number"
4. Prompt the user for what kind of counter they want to do:
   1. Count up
   2. Count down

5. your program must count up or down using the starting and stopping value that the user provided.

***Important*** 

1. The starting/stopping value cannot contain negative value. If the user provides a negative value, depending on the selection,
you must show:
   - "The starting value cannot have negative number"
   - "The stopping value cannot have negative number"

2. The kind of counter selection must be 1 or 2. If the user select other than 1,2 you must show,
   - "Invalid counter option selected! Please select the option 1 or 2"

3. Your program must show the error message and exit on the invalid actions.


***Screenshot***
```
Enter the starting value:5
Enter the stopping value:10

Type of counter options
=======================
1. Count up
2. Count down

You selected the count up option with a starting value of 5 and a stopping value of 10.
Here are the counting results:

5
6
7
8
9
10

```