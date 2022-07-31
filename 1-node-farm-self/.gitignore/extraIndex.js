///////////////////////////////////////////////////////////////////////////////////////////////
//FILES

//blocking, synchronus way
// const textIn= fs.readFileSync('./text/input.txt','utf-8');
// console.log(textIn);
// const inputIn = `This is what we know about udemy ${textIn}\ncreated on ${Date()}`
// fs.writeFileSync('./text/output.txt',inputIn);

//Non-blocking,asynchronus way
// fs.readFile('./text/start.txt','utf-8',(err,data1)=>{
//     fs.readFile(`./text/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile(`./text/append.txt`,'utf-8',(err,data3)=>{
//             console.log(data3);
//             fs.writeFile('./text/writeFile.txt',`${data2}\n${data3}`,err=>{
//                 console.log("Your file has been written");
//             })
//         });

//     });
// });
// console.log("Data is reading");