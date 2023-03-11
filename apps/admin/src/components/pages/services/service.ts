import { isGeneric, isGenericArray } from "utils";

export interface ServiceDto {
  id: number;
  name: string;
  description: string;
  subServices?: SubServiceDto[];
}

export interface CreateServiceDto {
  name?: string;
  description?: string;
}

export interface UpdateServiceDto {
  name?: string;
  description?: string;
}

const serviceDto: ServiceDto = {
  id: 1,
  name: "",
  description: "",
} as const;

export const isService = (data: unknown): data is ServiceDto => {
  return isGeneric(data, serviceDto);
};

export const isServiceArray = (data: unknown): data is ServiceDto[] => {
  return isGenericArray(data, serviceDto);
};

export interface SubServiceDto {
  id: number;
  textType: string;
  pricePerCharacter: number;
}

export interface CreateSubServiceDto {
  textType?: string;
  pricePerCharacter?: number;
}

const subServiceDto: SubServiceDto = {
  id: 1,
  textType: "",
  pricePerCharacter: 1,
};

export const isSubService = (data: unknown): data is SubServiceDto => {
  return isGeneric(data, subServiceDto);
};

export const isSubServiceArray = (data: unknown): data is SubServiceDto[] => {
  return isGenericArray(data, subServiceDto);
};
