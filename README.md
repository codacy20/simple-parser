# Simple Parser
There are many ways to parse/filter bank transactions. Since the assignment did not specify the implementation approach, I created a Nodejs Microservice as Backend to process and filter and Angular 7 for Frontend so users can interact with the application. It was fun!

## Why the application is divided into Backend and Frontend?
- Scalability: the division provides the ability to separate the concerns and responsibility. FE only takes care of the sending, receiving and user interaction. While the BE handles data related topics.
- Maintainability: Since both applications were written in Typescript, one developer could maintain both application. Additionally, it is Typescript's nature to work with data Models therefor it results in clean, easy to maintain, more readable code.  
 
 ## How can I run the applications?
 Simple. You can either use:
 - The Docker-Compose file to spin up both apps
 
    $ `docker-compose up` 
 - The docker files in each repository. So you can spin them up individually. 

Backend:

    $ `docker build -t simple-parser .`
    $ `docker run --rm -d -p 3000:3000 simple-parser` 

Frontend:

    $ `docker build -t www-simpleparser .`
    $ `docker run --rm -d -p 4200:4200 www-simpleparser` 

 - Alternatively you can use the development environment commands.

## Where can I see your code
- Backend API code is hosted here: [https://github.com/codacy20/simple-parser](https://github.com/codacy20/simple-parser)
- Frontend app code is hosted here: [https://github.com/codacy20/www-simpleParser](https://github.com/codacy20/www-simpleParser)

## Sample input and output
The sample input which was provided to me was a CSV file:

    Reference Account Number Description Start Balance Mutation End Balance 
    156108 NL69ABNA0433647324 Flowers from Erik de Vries 13.92 -7.25 6.67 
    112806 NL93ABNA0585619023 Subscription from Rik Theuß 77.29 -23.99 53.3 
    181631 NL27SNSB0917829871 Tickets for Jan King 60.83 41.96 102.79 
    147132 NL56RABO0149876948 Subscription for Richard Dekker 103.65 2.58 106.23

The sample output are:
- Report which can be accessed using the frontend application. 
- or JSON which the backend generates.

*Please note: You can choose the option to use the sample data or upload your own CSV to test the applications.*  

## Data validation
Data validation is being done by the API. The service makes sure that the reference number is unique and the balance is calculated currently.  
One nice to have in future could be generating a report for users and indicating what went wrong. The service could accommodate this feature very easily.  

## Explain the technology stack
In Frontend:
- Angular 7
- Angular material 
- TypeScript

In Backend:
- Nodejs
- Typescript

Both applications contain data models which are in charge of Data Transfer (DTOs).
The data models looks like this:

    export  interface  ITransaction {
	    accountNumber:  string;
	    description:  string;
	    endBalance:  number;
	    mutation:  number;
	    reference:  number;
	    startBalance:  number;
	    }
Please note: the Api only returns the "invalid transactions" and frontend presents them as a report.

## Scale it! 
With few lines of code, you can scale up the backend api into a fully functional event based microservice. Using a "Master" to distribute tasks between as many as microservices as you wish.
For this transition (event based microservices) you will need something like Redis as queuing mechanism. You can read more here if you are interested:
 [https://docs.nestjs.com/microservices/redis](https://docs.nestjs.com/microservices/redis)