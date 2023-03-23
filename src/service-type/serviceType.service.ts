import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceType, ServiceTypeDocument } from '../model/serviceType.schema';
import {
  ServiceTypeInput,
  UpdateServiceTypeInput,
} from 'src/dto/serviceType.dto';

@Injectable()
export class serviceTypeService {
  constructor(
    @InjectModel(ServiceType.name)
    private serviceTypeModel: Model<ServiceTypeDocument>,
  ) {}

  async findAll() {
    try {
      const data = await this.serviceTypeModel.find();
      return data;
    } catch (e) {
      throw new Error(`Could not fetch serviceType: ${e.message}`);
      console.log(e);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.serviceTypeModel.findById(id);
      return data;
    } catch (error) {
      throw new Error(
        `Could not fetch serviceType with id ${id}: ${error.message}`,
      );
    }
  }
  async create(createServiceTypeDto: ServiceTypeInput) {
    try {
      const createServiceType = new this.serviceTypeModel({
        ...createServiceTypeDto,
        selectedCount: 0,
      });
      await createServiceType.save();
      const data = await this.serviceTypeModel.findById(createServiceType._id);
      return data;
    } catch (error) {
      throw new Error(`Could not create serviceType: ${error.message}`);
    }
  }

  async update(id: string, updateServiceTypeDto: UpdateServiceTypeInput) {
    try {
      return await this.serviceTypeModel.findByIdAndUpdate(
        id,
        updateServiceTypeDto,
        {
          new: true,
        },
      );
    } catch (error) {
      throw new Error(
        `Could not update ServiceType with id ${id}: ${error.message}`,
      );
    }
  }

  async delete(id: string) {
    try {
      return await this.serviceTypeModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(
        `Could not delete serviceType with id ${id}: ${error.message}`,
      );
    }
  }
}
