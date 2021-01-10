import { PointService } from './point.service';
import { PointController } from './point.controller';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CreatePointDto } from './dto/createPoint.dto';
import { ResultCheckService } from './resultCheck.service';
import { Point } from './DBModels/point.model';
import { ForbiddenException, Res } from '@nestjs/common';
import { ResultCheck } from './DBModels/result-check.model';
import { CreateResultDto } from './dto/createResult.dto';



describe("Тестирование модуля Points", () => {

  let pointsService: PointService;
  let pointsController: PointController;
  let resultCheckService: ResultCheckService;

  const dbMock = {
    create: function(dto) {
      return {};
    },
    find: function(number) {
      return {}
    }
  }

  const createPointDto: CreatePointDto = {
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
  const resultCheckDto: CreateResultDto = {
    description: '',
    pointID: 'sdfsdf',
    result: ''
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ResultCheckService,
        PointService,
        {
          provide: getModelToken('Point'),
          useValue: dbMock
        },
        {
          provide: getModelToken('ResultCheck'),
          useValue: dbMock
        },
      ],
      controllers: [PointController]
    }).compile();

    pointsService = moduleRef.get<PointService>(PointService);
    pointsController = moduleRef.get<PointController>(PointController);
    resultCheckService = moduleRef.get<ResultCheckService>(ResultCheckService);
  });


  describe("Point Service", () => {

    const newID = "new";

    beforeAll(async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(pointsService, "_createModel").mockImplementation((dto) => {
        return dto;
      });
      jest.spyOn(dbMock, "create").mockImplementation((model) => {
        return {...model, _id: newID};
      });

    });

    it("Должен вернуть переданный объект с добавленным полем _id", async () => {
      jest.spyOn(dbMock, "find").mockImplementation((number) => {
        return [];
      });
      expect(await pointsService.createPoint(createPointDto)).toEqual({...createPointDto, _id: newID});
    });


    it("Должен выбросить ошибку", async () => {
      jest.spyOn(pointsService, "_hasDuplicate").mockImplementationOnce(async (dto) => {
        return true;
      });
      let point;
      try {
        point = await pointsService.createPoint(createPointDto);
      } catch (e) {
        expect(e).toBeDefined();
      }
      expect(point).toBeUndefined();
    });


  });

  describe("Point controller", () => {

    it("Должен вернуть объект Point с поле _id",async () => {
      const _id = "id";

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(pointsService, "createPoint").mockImplementationOnce(async (dto: CreatePointDto) => {
        return {_id: _id};
      });
      let point;
      try {
        point = await pointsController.createPoint(createPointDto);
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
      await expect(pointsController.createPoint(createPointDto)).rejects.toThrowError(new ForbiddenException());
    });

    it("Должен вернуть тот же объект Point с добавленным полем ResultCheck", async () => {
      const _idResultCheck = "idresult";
      jest.spyOn(resultCheckService, "createResultCheck").mockImplementationOnce(async (resultDto) => {
        const result = new ResultCheck();
        result._id = _idResultCheck;
        return result;
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(pointsService, 'findPointByID').mockImplementationOnce(async (_id) => {
        return {_id: _id};
      });
      try {
        const point = await pointsController.createResultCheck(resultCheckDto);
        expect(point).toHaveProperty("resultCheck", {_id: _idResultCheck});
      } catch (e) {
        console.log(e);
        expect(e).toBeUndefined();
      }
    });



  })

});