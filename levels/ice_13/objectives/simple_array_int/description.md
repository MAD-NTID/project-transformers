# Part 1 - Simple Array Int

In this exercise you will practice the following skills:
- Array Declaration
- Assign size to an array
- Assigning values using index
- Display the elements to the console by accessing each element by their index.




Steps:
1. cd into the classroom repository folder that you cloned
2. Create a new project called **SimpleArrayInt** in the repository using the dotnet command
3. cd into the SimpleArrayInt project
4. Declare a new array called numbers to store **integers** with the size **10**
5. create a variable called assignIndex and give it a starting value of 0
6. assign 10 of your favorite numbers to the array, use assignIndex to set the value at a specific location. After the value 
has been assigned, increment the assignIndex. Example:
```
   //this assign the value 12 at the current available index
   numbers[assignIndex] = 12;
   assignIndex++; //this move the index to the next available position 
   
```
7. create a variable called displayIndex and assign the value to 0.
8. Use the displayIndex to show all 10 of your favorite number oputput to the Console using Console.WriteLine()
Example:
```
//This will show the first number. Remember index starts at 0 so we do a display+1 to have it show
//in 1-based
Console.WriteLine("My {0} favorite number is {1}", displayIndex+1, numbers[displayIndex]);
displayIndex++; 
```