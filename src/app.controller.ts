import { Controller, Get, Render, Post, Req } from '@nestjs/common'
import { AppService } from './app.service'
import{ Request } from 'express'


@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async root() {
    await this.appService.readAllTodos()
    const todos = this.appService.getMyTodos()
    console.log(todos)
    const myArr = ['one', 'two', 'five']

    return { message: this.appService.getHello(), todos, myArr }
  }

  @Post("/create-todo")
  createTodo(@Req() request: Request){
    console.log(request.body.item)
    this.appService.createTodo(request.body.item)
  }

}
