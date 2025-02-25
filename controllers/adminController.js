const Request = require('../models/requestModel');

exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.findAll();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'خطأ في جلب الطلبات' });
    }
};

exports.updateRequestStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const request = await Request.findByPk(id);
        if (request) {
            request.status = status;
            await request.save();
            res.status(200).json(request);
        } else {
            res.status(404).json({ message: 'الطلب غير موجود' });
        }
    } catch (error) {
        res.status(500).json({ message: 'خطأ في تحديث الطلب' });
    }
};

exports.deleteRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const request = await Request.findByPk(id);
        if (request) {
            await request.destroy();
            res.status(200).json({ message: 'تم حذف الطلب بنجاح' });
        } else {
            res.status(404).json({ message: 'الطلب غير موجود' });
        }
    } catch (error) {
        res.status(500).json({ message: 'خطأ في حذف الطلب' });
    }
};
