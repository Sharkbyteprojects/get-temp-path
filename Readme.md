# get-temp-path

## Get the path of the tmp dir of your os:

```
const osTmpPath=require("get-temp-path")();
```

## Get the path of the tmp dir + a random file name

```
const randomFilePathThatDoesNotExist=require("get-temp-path")(true);
```

&copy; Sharkbyteprojects