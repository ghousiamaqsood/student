#! /usr/bin/env node

import inquirer from "inquirer";

const randomNumber: number = Math.floor(10000 + Math.random() * 90000);
let myBalance: number = 0;

const answer = await inquirer.prompt([
    {
        name: "students",
        type: "input",
        message: "Enter student name:",
        validate: function(value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value";
        }
    },
    {
        name: "courses",
        type: "list",
        message: "Select the course to enroll:",
        choices: ["HTML", "Python", "JavaScript", "C++", "TypeScript"]
    }
]);

const tuetionFee: { [key: string]: number } = {
    "C++": 10000,
    "HTML": 2000,
    "Python": 2500,
    "JavaScript": 1500,
    "TypeScript": 3000
};

console.log(`\nTuition Fee: ${tuetionFee[answer.courses]}/-\n`);
console.log(`Balance: ${myBalance}\n`);

let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "Select the payment method:",
        choices: ["Bank Transfer", "Easypaisa", "Jazzcash"]
    },
    {
        name: "amount",
        type: "input",
        message: "Please transfer your money:",
        validate: function(value) {
            if (!isNaN(parseFloat(value)) && parseFloat(value) > 0) {
                return true;
            }
            return "Please enter a valid amount";
        }
    }
]);

console.log(`\nYou selected payment method: ${paymentType.payment}\n`);
const tuitionFees = tuetionFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);

if (tuitionFees === paymentAmount) {
    console.log(`Congratulations! You have successfully enrolled in ${answer.courses}\n`);
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "What would you like to do next?",
            choices: ["View Status", "Exit"]
        }
    ]);

    if (ans.select === "View Status") {
        console.log("\n*******Status********\n");
        console.log(`Student Name: ${answer.students}`);
        console.log(`Student ID: ${randomNumber}`);
        console.log(`Course: ${answer.courses}`);
        console.log(`Tuition Fees paid: ${paymentAmount}`);
        console.log(`Balance: ${myBalance += paymentAmount}`);
    } else {
        console.log("\nExiting student management system\n");
    }
} else {
    console.log('Invalid amount entered for the course\n');
}