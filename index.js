#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 1000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // Initialize an empty array for courses
        this.balance = 100;
    }
    //Method to enroll a student in a course 
    enroll_course(course) {
        this.courses.push(course);
    }
    //Method to view a student balance
    view_balance() {
        console.log(`Balance for ${this.name} : $${chalk.yellowBright(this.balance)}`);
    }
    //method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log("-".repeat(50));
        console.log(` $${chalk.yellowBright(amount)}  Fees paid Sucessfully for ${this.name}`);
        console.log("-".repeat(50));
        console.log(`${this.name} Remaining Balance : ${chalk.yellowBright(this.balance)}`);
        console.log("-".repeat(50));
    }
    // method to display student status
    show_status() {
        console.log(`ID: ${chalk.yellowBright(this.id)}`);
        console.log(`Name: ${chalk.magenta(this.name)}`);
        console.log(`Courses: ${chalk.blue(this.courses)}`);
        console.log(`Balance: ${chalk.yellowBright(this.balance)}`);
    }
}
// Defining a  student_manager class to manage a student
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new student 
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log("-------------------------------------------------------------");
        console.log((` Student : ${chalk.magenta(name)} added sucessfully. Student ID: ${chalk.yellowBright(student.id)}`));
        console.log("--------------------------------------------------------------");
    }
    //Method to enroll a student in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log("-".repeat(50));
            console.log(`${student.name} enrolled in ${chalk.magenta(course)} sucessfully`);
            console.log("-".repeat(50));
        }
    }
    //Method to a view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    //    Method to pay student feees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    // Method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // Method to find a student by student_id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// Method Function to run the program 
async function main() {
    console.log(chalk.magenta("\n \t Welcome to 'Kinza'- Student Management System \n"));
    console.log("-".repeat(50));
    let student_manager = new Student_manager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.yellowBright("Select an option"),
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit",
                ]
            }
        ]);
        //Using Switch case to handel use choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                console.log("-".repeat(50));
                student_manager.view_student_balance(balance_input.student_id);
                console.log("-".repeat(50));
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay"
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    }
                ]);
                console.log("-".repeat(50));
                student_manager.show_student_status(status_input.student_id);
                console.log("-".repeat(50));
                break;
            case "Exit":
                console.log(chalk.red("Exiting..."));
                process.exit();
        }
    }
}
// Calling a neew function
main();
