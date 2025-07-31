import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { drizzle } from 'drizzle-orm/node-postgres';
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { tasksTable } from '../../src/db/schema';
import { Pool } from 'pg';
import { response } from 'express';
import { of } from 'rxjs';

const pool = new Pool({
  connectionString:process.env.DATABASE_URL
})


const db = drizzle(pool);

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post('createTask')
  
  async createTask(@Body() body: any): Promise<any> {
    try{
      const task: typeof tasksTable.$inferInsert = {
          title: body.title,
          description: body.description,
          priority: body.priority,
          dueDate: new Date(body.dueDate),
          assignedTo: body.assignedTo,
          tags: body.tags,
          estimatedHours: body.estimatedHours,
          status: body.status,
      };
      await db.insert(tasksTable).values(task)

      const tasks = await db.select().from(tasksTable);
      return tasks
      }catch(err){
        console.log(err)
      }

    
  }

  @Get('getTasks')
  async getTasks(): Promise<any> {
    const tasks = await db.select().from(tasksTable)
    return tasks ;
  }
  @Get('getTasksPerDay')
  async getTasksPerDay(): Promise<any> {


    const tasks = await db.select({
      field: tasksTable.createdAt
    }).from(tasksTable)
    
    const countPerDay = {};

      for (const records of tasks) {
        const dateISO = new Date(records.field)
        const dateFormated = dateISO.toISOString().split("T")[0]

        if (!countPerDay[dateFormated]) {
          countPerDay[dateFormated] = 0
        }

        countPerDay[dateFormated]++
    } 
    return countPerDay 
  }
  @Get('getTasksPriorityNumber')
  async getTasksPriorityNumber(): Promise<any> {


    const tasks = await db.select({
      fieldID: tasksTable.id,
      field: tasksTable.priority
    }).from(tasksTable)
    
    const countPerPriority = {
      'HIGH': 0,
      'MEDIUM': 0,
      'LOW':0,
    };

      
      
      for (const records of tasks) {
        if (countPerPriority.hasOwnProperty(records.field)){
          countPerPriority[records.field] ++;
        }
    } 
    
    return countPerPriority ;
  }
}
