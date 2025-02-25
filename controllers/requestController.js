const Request = require('../models/requestModel');

exports.createRequest = async (req, res) => {
    const { title, description } = req.body;
    const file_path = req.file ? req.file.path : null;
    try {
        const request = await Request.create({ title, description, file_path, user_id: req.user.id });
        res.status(201).json({ message: 'تم إنشاء الطلب بنجاح', request });
    } catch (error) {
        res.status(500).json({ message: 'خطأ في إنشاء الطلب' });
    }
};

exports.getUserRequests = async (req, res) => {
    try {
        const requests = await Request.findAll({ where: { user_id: req.user.id } });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'خطأ في جلب الطلبات' });
    }
};
