fetch("http://54.144.3.140:5000/users")
  .then((result) => result.json())
  .then((data) => console.log(data));
