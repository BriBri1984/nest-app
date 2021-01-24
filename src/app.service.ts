import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {

  private todoDir: string = "/tmp/todos"

  private myTodos = []

  getHello(): string {
    return 'To Do List App';
  }

  // make a new item
  createTodo(item: string){

    if(!fs.existsSync(this.todoDir)){
      fs.mkdirSync(this.todoDir)
    }

    const fileName = Date.now() + ".json"
    const fileContents = {
      "item" : item,
      "date" : (new Date()).toISOString(),
      "status" : "incomplete",
    }

    const jsonString = JSON.stringify(fileContents)
    fs.writeFileSync(`${this.todoDir}/${fileName}`,jsonString)
  }

  async readAllTodos(){
    this.myTodos = []
    return await this.readFiles(this.todoDir + '/', (fileName,content)=>{
      const fileAsObject = JSON.parse(content)
        fileAsObject["file"]= fileName
        this.myTodos.push(fileAsObject)
    },(err)=>{
      console.error(err)
    })
  }

  getMyTodos(){
    return this.myTodos
  }

  async readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function(err, filenames) {
      if (err) {
        onError(err);
        return;
      }
      filenames.forEach(function(filename) {
        fs.readFile(dirname + filename, 'utf-8', function(err, content) {
          if (err) {
            onError(err);
            return;
          }
          onFileContent(filename, content);
        });
      });
    });
  }



}
