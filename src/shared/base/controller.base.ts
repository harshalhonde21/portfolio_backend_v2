import { Response } from 'express';
import { IResponse, IPaginatedResponse } from '../interfaces/response.interface';

export abstract class BaseController {
  protected sendSuccess<T>(res: Response, data: T, message: string = 'Success') {
    const response: IResponse<T> = {
      success: true,
      message,
      data,
    };
    return res.status(200).json(response);
  }

  protected sendCreated<T>(res: Response, data: T, message: string = 'Created') {
    const response: IResponse<T> = {
      success: true,
      message,
      data,
    };
    return res.status(201).json(response);
  }

  protected sendPaginated<T>(
    res: Response,
    data: T[],
    page: number,
    limit: number,
    total: number,
    message: string = 'Success'
  ) {
    const totalPages = Math.ceil(total / limit);
    const response: IPaginatedResponse<T> = {
      success: true,
      message,
      data,
      pagination: {
        page,
        limit,
        total,
        pages: totalPages,
      },
    };
    return res.status(200).json(response);
  }

  protected sendError(res: Response, message: string, statusCode: number = 400) {
    const response: IResponse = {
      success: false,
      message,
    };
    return res.status(statusCode).json(response);
  }
}
