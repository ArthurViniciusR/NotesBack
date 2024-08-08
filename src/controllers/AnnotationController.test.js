const Annotations = require('../models/AnnotationsData');
const annotationsController = require('./AnnotationController');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Annotations Controller', () => {

    describe('read', () => {
        it('deve retornar uma lista de anotações', async () => {
            const req = {};
            const res = mockResponse();

            Annotations.find = jest.fn().mockResolvedValue([{ title: 'Test', notes: 'Test notes', priority: false }]);

            await annotationsController.read(req, res);

            expect(Annotations.find).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith([{ title: 'Test', notes: 'Test notes', priority: false }]);
        });
    });

    describe('create', () => {
        it('deve criar uma nova anotação com sucesso', async () => {
            const req = {
                body: {
                    title: 'Nova Anotação',
                    notes: 'Test notes',
                    priority: false
                }
            };
            const res = mockResponse();

            Annotations.create = jest.fn().mockResolvedValue(req.body);

            await annotationsController.create(req, res);

            expect(Annotations.create).toHaveBeenCalledWith(req.body);
            expect(res.json).toHaveBeenCalledWith(req.body);
        });

        it('deve retornar erro 400 se faltar o campo title ou notes', async () => {
            const req = {
                body: {
                    title: '',
                    notes: ''
                }
            };
            const res = mockResponse();

            await annotationsController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Preencha os campos corretamente!' });
        });
    });

    describe('delete', () => {
        it('deve deletar uma anotação existente', async () => {
            const req = {
                params: {
                    id: '123'
                }
            };
            const res = mockResponse();

            Annotations.findOneAndDelete = jest.fn().mockResolvedValue({ _id: '123', title: 'Test', notes: 'Test notes', priority: false });

            await annotationsController.delete(req, res);

            expect(Annotations.findOneAndDelete).toHaveBeenCalledWith({ _id: '123' });
            expect(res.json).toHaveBeenCalledWith({ _id: '123', title: 'Test', notes: 'Test notes', priority: false });
        });

        it('deve retornar erro 401 se a anotação não for encontrada', async () => {
            const req = {
                params: {
                    id: '123'
                }
            };
            const res = mockResponse();

            Annotations.findOneAndDelete = jest.fn().mockResolvedValue(null);

            await annotationsController.delete(req, res);

            expect(Annotations.findOneAndDelete).toHaveBeenCalledWith({ _id: '123' });
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Nota não encontrada' });
        });
    });

    describe('update', () => {
        it('deve atualizar as notas de uma anotação existente', async () => {
            const req = {
                params: { id: '123' },
                body: { notes: 'Notas atualizadas' }
            };
            const res = mockResponse();

            const annotation = { _id: '123', title: 'Test', notes: 'Test notes', save: jest.fn().mockResolvedValue(true) };
            Annotations.findOne = jest.fn().mockResolvedValue(annotation);

            await annotationsController.update(req, res);

            expect(Annotations.findOne).toHaveBeenCalledWith({ _id: '123' });
            expect(annotation.notes).toBe('Notas atualizadas');
            expect(annotation.save).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(annotation);
        });

        it('deve retornar a anotação sem alterações se o campo notes não for fornecido', async () => {
            const req = {
                params: { id: '123' },
                body: {}
            };
            const res = mockResponse();

            const annotation = { _id: '123', title: 'Test', notes: 'Test notes', save: jest.fn() };
            Annotations.findOne = jest.fn().mockResolvedValue(annotation);

            await annotationsController.update(req, res);

            expect(Annotations.findOne).toHaveBeenCalledWith({ _id: '123' });
            expect(annotation.notes).toBe('Test notes');
            expect(annotation.save).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(annotation);
        });

        it('deve retornar erro se a anotação não for encontrada', async () => {
            const req = {
                params: { id: '123' },
                body: { notes: 'Notas atualizadas' }
            };
            const res = mockResponse();

            Annotations.findOne = jest.fn().mockResolvedValue(null);

            await annotationsController.update(req, res);

            expect(Annotations.findOne).toHaveBeenCalledWith({ _id: '123' });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Anotação não encontrada' });
        });
    });


});
