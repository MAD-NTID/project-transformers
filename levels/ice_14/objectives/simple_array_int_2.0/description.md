# Part 2 - Simple Array Int

In this exercise you will practice the following skills:
- Array Declaration
- Assign size to an array
- Assigning values using index
- Display the elements to the console by accessing each element by their index.

In part 1, you access the read and write array through the use of different array variable.
In this part, you will access both using the same index variable. However, you will need to reset
the index prior to using it to display the contents of the array.

For this project you will copy over the codes you have for Part 1. However, use the same index to read and 
modifying the array elements.




Steps:
1. cd into the classroom repository folder that you cloned
2. Create a new project called **SimpleArrayInt2** in the repository using the dotnet command
3. cd into the SimpleArrayInt2 project
4. Declare a new array called numbers to store **integers** with the size **10**
5. create a variable called index and give it a starting value of 0
6. assign 10 of your favorite numbers to the array, use index to set the value at a specific location. After the value 
has been assigned, increment the index. Example:
```
   //this assign the value 12 at the current available index
   numbers[index] = 12;
   index++; //this move the index to the next available position 
   
```
7. reset the index back to 0 before displaying the elements of the array
8. Use the index to show all 10 of your favorite number oputput to the Console using Console.WriteLine()
Example:
```
//This will show the first number. Remember index starts at 0 so we do a display+1 to have it show
//in 1-based
Console.WriteLine("My {0} favorite number is {1}", index+1, numbers[index]);
index++; 
```
9. reset the index back to 0
10. In each of your elements, multiply the current element by 20
11. After you have update all the elements, use the console write line to display the new values of the elements. Dont
forget to reset the index prior to displaying