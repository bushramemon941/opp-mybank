#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Bank Acount Class
class BankAcount {
    acountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.acountNumber = accountNumber;
        this.balance = balance;
    }
    //  Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    //  Credit Money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }
    //  Check Balance
    CheckBalance() {
        console.log(`Current balance: $${this.balance}`);
    }
}
//  Customer Class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//  Create Bank Accounts
const accounts = [
    new BankAcount(1234, 500),
    new BankAcount(1111, 1000),
    new BankAcount(2222, 2000)
];
//  Create Customers
const customers = [
    new Customer("maham", "khan", "Female", 25, 335018677, accounts[0]),
    new Customer("bushra", "memon", "Female", 23, 336018677, accounts[1]),
    new Customer("akhter", "hussain", "male", 35, 335000000, accounts[2])
];
//  Function to interact with Bank Account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: chalk.green("Enter your account number:")
        });
        const customer = customers.find(customer => customer.account.acountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: chalk.blue("Select an operation"),
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.green("Enter the amount of deposit:")
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.yellow("Enter the amount of withdraw:")
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.CheckBalance();
                    break;
                case "Exit":
                    console.log(chalk.red("Exiting bank program.."));
                    console.log(chalk.yellow("\n Thank you for using our bank services. Have a great day!"));
                    return;
            }
        }
        else {
            console.log(chalk.red("Invalid account number. Please try again."));
        }
    } while (true);
}
service();
