module.exports = htmlCreator = (content) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    </head>
    <body>
        <div class="container">
            <div class="row my-4">
                <div class="col-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Position</th>
                            <th>Tech</th>
                            <th>Exp</th>
                            <th>Sex</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    ${content}
                </table>
                <form action="/" method="get">
                    <input type="text" name="page">
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>
    </body>
    </html>
    `
};