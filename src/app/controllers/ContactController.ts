import { Request, Response } from 'express';
import { ORDER_BY_TYPE, StatusCode } from '../types';
import ContactsRepository from '../repositories/ContactsRepository';

class ContactControllerClass {
  /* list all registers */
  async index(req: Request, res: Response) {
    let { orderBy } = req.query;

    const contacts = await ContactsRepository.findAll(orderBy as ORDER_BY_TYPE);

    res.json(contacts);
  }

  /* list one register */
  async show(req: Request, res: Response) {
    const id = req.params.id;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(StatusCode.NOT_FOUND).json({ error: 'User not found' });
    }

    res.json(contact);
  }

  /* create register */
  async store(req: Request, res: Response) {
    const { name, email, phone, category_id } = req.body;

    if (!name) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ error: 'Name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);
    console.log(contactExists);

    if (contactExists?.length > 0) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ error: 'Email already been registered' });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
      id: '',
    });

    res.json(contact);
  }

  /* update one register */
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, phone, category_id } = req.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return res.status(StatusCode.NOT_FOUND).json({ error: 'User not found' });
    }

    if (!name) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);
    if (contactByEmail?.length > 0) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ error: 'Email already been registered' });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
      id: '',
    });

    res.json(contact);
  }

  /* delete one register */
  async delete(req: Request, res: Response) {
    const id = req.params.id;

    await ContactsRepository.delete(id);

    res.sendStatus(StatusCode.NO_CONTENT);
  }
}

export const ContactController = new ContactControllerClass();
