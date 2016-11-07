var fs=require('fs')
for(var i=1;i<=100;i++){
fs.writeFile('file'+i+'.txt', 'Hello from file '+i, (err) => {
  if (err) throw err;
  console.log('It's saved!');
});}