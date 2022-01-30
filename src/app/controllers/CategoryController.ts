import { Request, Response } from 'express';
import { StatusCode } from '../types';
import CategoriesRepository from '../repositories/CategoriesRepository';

class CategoryControllerClass {
  async index(req: Request, res: Response) {
    const categories = await CategoriesRepository.findAll();

    res.json(categories);
  }

  async store(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create(name);

    res.json(category);
  }
}

export const CategoryController = new CategoryControllerClass();
