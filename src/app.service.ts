import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {

  private todoDir: string = "/tmp/todos"

  private myTodos: Array<string> = []

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
      "todo-item" : item,
      "date-time" : (new Date()).toISOString(),
      "status" : "incomplete",
    }

    const jsonString = JSON.stringify(fileContents)
    fs.writeFileSync(`${this.todoDir}/${fileName}`,jsonString)
  }


  async readAllTodos(){
    return this.readFiles(this.todoDir + '/', (fileName,content)=>{
        this.myTodos[fileName] = content
    },(err)=>{
      console.error(err)
    })
  }

  getMyTodos(){
    return this.myTodos
  }

  readFiles(dirname, onFileContent, onError) {
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
