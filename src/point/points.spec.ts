import { PointService } from './point.service';
import { PointController } from './point.controller';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CreatePointDto } from './dto/createPoint.dto';
import { ResultCheckService } from './resultCheck.service';
import { Point } from './DBModels/point.model';
import { ForbiddenException } from '@nestjs/common';


describe("Тестирование модуля Points", () => {

  describe("Point Service", () => {

    let pointsService: PointService;
    let pointsController: PointController;
    const pointModelMock = {
      find: (dto) => {
        if (dto.number === 1)
          return [dto];
        return []
      },
      create: (model) => {
        return {}
      }
    }
    const newID = "new";

    let pointDto;

    beforeAll(async () => {
      pointDto = {
        address: '',
        area: '',
        contract: '',
        dateCheck: new Date(),
        email: [],
        lastDateCheck: undefined,
        name: '',
        numberContract: '',
        numberDevice: '123123',
        objectDescription: '',
        phone: [],
        pointNumber: '',
        power: 13
      }
      const moduleRef = await Test.createTestingModule({
        providers: [
          PointService,
          {
            provide: getModelToken('Point'),
            useValue: pointModelMock
          },
        ],
        controllers: [PointController]
      }).compile();
      pointsService = moduleRef.get<PointService>(PointService);
      pointsController = moduleRef.get<PointController>(PointController);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(pointsService, "_createModel").mockImplementation((dto) => {
        return dto;
      });
      jest.spyOn(pointModelMock, "create").mockImplementation((model) => {
        return {...model, _id: newID};
      });

    });

    it("Должен вернуть переданный объект с добавленным полем _id", async () => {
      expect(await pointsService.createPoint(pointDto)).toEqual({...pointDto, _id: newID});
    });


    it("Должен выбросить ошибку", async () => {
      pointDto.number = 1;
      jest.spyOn(pointsService, "_hasDuplicate").mockImplementationOnce(async (dto) => {
        return true;
      });
      let point;
      try {
        point = await pointsService.createPoint(pointDto);
      } catch (e) {
        expect(e).toBeDefined();
      }
      expect(point).toBeUndefined();
    });


  });

  describe("Point controller", () => {
    let pointsService: PointService;
    let pointsController: PointController;
    const dbMock = {
    }
    const dto: CreatePointDto = {
      address: '',
      area: '',
      contract: '',
      dateCheck: undefined,
      email: [],
      lastDateCheck: undefined,
      name: '',
      numberContract: '',
      numberDevice: '',
      objectDescription: '',
      phone: [],
      pointNumber: '',
      power: 0

    };

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          PointService,
          {
            provide: getModelToken('Point'),
            useValue: dbMock
          }
        ],
        controllers: [PointController]
      }).compile();
      pointsService = moduleRef.get<PointService>(PointService);
      pointsController = moduleRef.get<PointController>(PointController);
    });

    it("Должен вернуть объект Point с поле _id",async () => {
      const _id = "id";

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(pointsService, "createPoint").mockImplementationOnce(async (dto: CreatePointDto) => {
        return {_id: _id};
      });
      let point;
      try {
        point = await pointsController.createPoint(dto);
      } catch (e) {
        expect(e).toBeUndefined();
      }
      expect(point).toEqual({_id: _id});
    });

    it("Должен вернуть ошибку ForbiddenException", async () => {
      jest.spyOn(pointsService, "createPoint").mockImplementationOnce(async () => {
        throw new Error();
        return new Point();
      });
      await expect(pointsController.createPoint(dto)).rejects.toThrowError(new ForbiddenException());
    });




  })

});