import type { Request, Response } from "express";
import propertyService from "@/api/services/property.service.ts";
import { StatusCodes } from "http-status-codes";

const getHomeScreenProperties = async (req: Request, res: Response) => {
  try {
    const result = await propertyService.getHomeScreenProperties();
    res.status(StatusCodes.OK).send(result);
  } catch (error) {}
};

const getProperties = async (req: Request, res: Response) => {
  try {
    const result = await propertyService.getProperties();
    res.status(StatusCodes.OK).send(result);
  } catch (error) {}
};

const getPropertiesByBusiness = async (req: Request, res: Response) => {
  try {
    const result = await propertyService.getPropertiesByBusiness();
    res.status(StatusCodes.OK).send(result);
  } catch (error) {}
};

const uploadMetadeta = async (req: Request, res: Response) => {
  console.log(req.files);
  // console.log(req.body);
};

export default {
  getProperties,
  getHomeScreenProperties,
  getPropertiesByBusiness,
  uploadMetadeta
};
