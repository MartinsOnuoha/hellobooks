# Hello-Books
> Library management
<hr>
<img src=https://img.shields.io/badge/Sniffed%20by-HoundCI-brightgreen.svg /> <img src=https://img.shields.io/github/license/mashape/apistatus.svg />
Hello-Books is a simple application that manages <b>library</b> processes like <b>stocking</b>, <b>tracking</b> and <b>renting</b> of books.



background details below relevant to understanding what this app does

## Usage
<b>Option 1</b>
> Navigate to App Url.
```
https://hellobooksproject.herokuapp.com/
```
<b>Option 2</b>
> <code>git clone</code> this repository
> Install Packages
 ```
$ npm install
```
> Start Sever 
```
$ npm start
```
> Open ```index.html``` in browser
> Create an account and Jump in our pile of books

## Functionalities
> Registered Users can borrow available books from the Library<br />
> Registered Users can return books when done <br />
> Registered Users can view borrowing history <br />
> The application allows two levels of user account ```Free``` and ```Pro``` <br />
> The ```Free``` account has the functionality of borrowing a specified ammount of books <br />
> This restriction is however removed with the ```Pro``` User account. <br />
> An ```Admin``` User manages the entire library processes
>> ```Add Books```
>> ```Delete Books```
>> ```Modify Books```

## API ROUTES
``` <b>POST</b> : /api/users/signup```
``` <b>POST</b> : /api/users/signin```
``` <b>POST</b> : /api/books```
``` <b>PUT</b> : /api/books/<bookId>```
``` <b>GET</b> : /api/books```
``` <b>GET</b> : /api/users/<userId>/books?returned=false```
``` <b>POST</b> : /api/users/<userId>/books```
``` <b>PUT</b> : /api/users/<userId>/books```



## Acknowledgments

hello-books was inspired by ```Andela Fellowship```

## See Also

https://www.pivotaltracker.com/n/projects/2084801 <code> Project Progress on PT Board </code>

- ...

## License

```ISC``` <br />
```MIT```
  
