
const { execSync } = require("child_process");
const fs = require("fs");
const files = fs.readdirSync("./load-tests/tests/");
console.log(files);

files.forEach((test) => {
  const res = execSync("artillery run .\\load-tests\\tests\\" + test);
  console.log(
    "Executing test: " +
      test +
      "\n" +
      res.toString().substring(0, 95) +
      "\n\n" +
      res
        .toString()
        .substring(
          res.toString().indexOf("All virtual users"),
          res.toString().length
        )
  );
});
