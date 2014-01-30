# Kraken Example: Dynamic Layouts

## What we'll be doing

Starting with a [plain vanilla](https://github.com/lmarkus/Kraken_Example_Layouts/commit/93f27dd40ee413addce0474abcd0d01624ba8085) application,
we'll highlight some of the features in the adaro module, that allow you to change templates on the fly.

We're going to create an application with a single dust template, and this template will be wrapped within a few different
layouts.

## Running this example

Clone this repo: `git clone https://github.com/lmarkus/Kraken_Example_Layouts.git`

Install the dependencies: `npm install`

Start the server: `npm start`

## Relevant code

### Create a simple layout
We're going to update `/public/templates/index.dust` with some simple content. Just a welcome message, a list of examples and some time travel buttons.

```html
<form>
<table id="time">
    <caption>Go to...</caption>
    <tr>
        <td><input type="submit" name="year" value="1994"></td>
        <td><input type="submit" name="year" value="1999"></td>
        <td><input type="submit" name="year" value="2004"></td>
        <td><input type="submit" name="year" value="2014"></td>
    </tr>
</table>
</form>
<div id="title">
    <h1>Kraken welcomes you to {year}</h1>
    <p>You can switch years above to see how design has evolved over the years.</p>
</div>

<div id="examples">
    <h2>Here's a list of Kraken examples</h2>
    <ul>
        <li>
            <a href="https://github.com/lmarkus/Kraken_Example_Shopping_Cart" target="_blank">Kraken Shopping Cart</a>
            <p>An end-to-end example showing how to build a shopping cart that integrates with PayPal</p>
        </li>
       ...
        <li>
            <a href="https://github.com/lensam69/Kraken_Example_Custom_Middleware" target="_blank">Deploying middleware</a>
            <p>Create a custom page counter. Explains how and when middleware is deployed in the application lifecycle.</p>
        </li>
    </ul>
</div>
```

[<img src='http://upload.wikimedia.org/wikipedia/commons/thumb/2/25/External.svg/600px-External.svg.png' width='12px' height='12px'/>View commit](https://github.com/lmarkus/Kraken_Example_Layouts/commit/93f27dd40ee413addce0474abcd0d01624ba8085)
[<img src='http://upload.wikimedia.org/wikipedia/commons/thumb/2/25/External.svg/600px-External.svg.png' width='12px' height='12px'/>Addendum](https://github.com/lmarkus/Kraken_Example_Layouts/commit/179cef8db34eb00d978d3a5c42854890cfb10dab)


### Creating a layout that can wrap around the template

We can create a simple layout that has a partial called `_main`. At render time, kraken can take the desired template and
insert it as a partial within a template.

For example, let's create a layout called `./public/templates/layouts/1994.dust`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>1994 Kraken</title>
    <link rel="stylesheet" href="css/1994.css"/>
</head>
<body>
<div id="wrapper">
    {>"{_main}"/}
</div>

</body>
</html>
```

[<img src='http://upload.wikimedia.org/wikipedia/commons/thumb/2/25/External.svg/600px-External.svg.png' width='12px' height='12px'/>View commit](https://github.com/lmarkus/Kraken_Example_Layouts/commit/ca76d29f0fdbb35f6016928eecf8877c034771bf)

And just for kicks, lets create a few more layouts, and add some assets to see how our website will look in 1999, 2004 and 2014.

[<img src='http://upload.wikimedia.org/wikipedia/commons/thumb/2/25/External.svg/600px-External.svg.png' width='12px' height='12px'/>View commit](https://github.com/lmarkus/Kraken_Example_Layouts/commit/d09f45ce22cd7941444bc9a385b77869c68009d7)


### Making the controller switch the layout
Our basic template included a form, that will submit a `year` parameter.
Let's modify `./controllers/index.js` to take this parameter into account, and change the layout based on it:

```javascript
    app.get('/', function (req, res) {

        //Retrieve the "year" parameter from the request. If nothing is present, default to 1994
        var year = req.param(year) || '1994';

        //Set the layout to be used.
        model.layout='layouts/'+year;
        model.year = year;

        //Render the index template using the appropriate layout.
        res.render('index', model);

    });
```

By specifying a `layout` parameter in the `model`, we tell the renderer to use a particular layout (**note**: It is not necessary to include a file extension). In this case it will default to `/layouts/1994.dust`.

Addendum: [<img src='http://upload.wikimedia.org/wikipedia/commons/thumb/2/25/External.svg/600px-External.svg.png' width='12px' height='12px'/>View commit](https://github.com/lmarkus/Kraken_Example_Layouts/commit/179cef8db34eb00d978d3a5c42854890cfb10dab)


### Run the application!
Type `npm start` and party like it's 1999.
